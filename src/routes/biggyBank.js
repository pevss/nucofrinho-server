const express = require("express");
const router = express.Router();

const { filterDeletedPiggyBanks } = require("../utils");

const userModel = require("../database/schemas/User");

// create new piggybank
router.post("/", async (req, res) => {
	try {
		// newPiggyBank: name
		const { userId, newPiggyBank } = req.body;

		//prettier-ignore
		const userAfterInsert = await userModel.findByIdAndUpdate(
			userId,
			{ $push: { piggyBanks: newPiggyBank } },
			{ new: true }
		);

		res.status(200).send({
			status: 200,
			message: "NuCofrinho criado com sucesso!",
			data: {
				user: filterDeletedPiggyBanks(userAfterInsert),
			},
		});
	} catch (err) {
		res.status(400).send({
			status: 400,
			message: `Algo de errado aconteceu: ${err.message}`,
			error: err.stack,
		});
	}
});

// update piggybank name
router.patch("/name", async (req, res) => {
	try {
		const { piggyBankId, userId, newName } = req.body;

		//prettier-ignore
		const userAfterUpdate = await userModel.findOneAndUpdate(
			{ _id: userId, "piggyBanks._id": piggyBankId },
			{ $set: { "piggyBanks.$.name": newName } },
			{ new: true }
		);

		res.status(200).send({
			status: 200,
			message: "O nome do seu NuCofrinho foi atualizado!",
			data: {
				user: filterDeletedPiggyBanks(userAfterUpdate),
			},
		});
	} catch (err) {
		res.status(400).send({
			status: 400,
			message: `Algo de errado aconteceu: ${err.message}`,
			error: err.stack,
		});
	}
});

// update piggybank balance
router.patch("/balance", async (req, res) => {
	try {
		// {in: Number, out: Number}
		const { piggyBankId, userId, movement } = req.body;

		const user = await userModel.findOne({
			_id: userId,
		});

		if (!user)
			throw new Error(
				"Não foi possível encontrar nenhum usuário com o ID especificado"
			);

		const requestedPiggyBank = user.piggyBanks.find(
			(piggyBank) => piggyBank._id.toString() === piggyBankId
		);

		//prettier-ignore
		const userAfterUpdate = await userModel.findOneAndUpdate(
			{_id: userId, "piggyBanks._id": piggyBankId},
			{
				$set: {
					"piggyBanks.$.balance": requestedPiggyBank.balance + movement.in - movement.out,
					balance: user.balance - movement.in + movement.out
				},
			},
			{new: true}
		);

		res.status(200).send({
			status: 200,
			message: "O valor do seu NuCofrinho foi atualizado!",
			data: {
				user: filterDeletedPiggyBanks(userAfterUpdate),
			},
		});
	} catch (err) {
		res.status(400).send({
			status: 400,
			message: `Algo de errado aconteceu: ${err.message}`,
			error: err.stack,
		});
	}
});

// delete piggybank
router.delete("/", async (req, res) => {
	try {
		const { requestedPiggyBank, userId } = req.body;

		// prettier-ignore
		const userAfterDeletion = await userModel.findOneAndUpdate(
			{_id: userId, "piggyBanks._id": requestedPiggyBank},
			{ $set: { "piggyBanks.$.isDeleted": true } },
			{ new: true }
		);

		res.status(200).send({
			status: 200,
			message: "NuCofrinho deletado com sucesso!",
			data: {
				user: filterDeletedPiggyBanks(userAfterDeletion),
			},
		});
	} catch (err) {
		res.status(400).send({
			status: 400,
			message: `Algo de errado aconteceu: ${err.message}`,
			error: err.stack,
		});
	}
});

module.exports = router;
