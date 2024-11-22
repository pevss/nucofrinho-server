const express = require("express");
const router = express.Router();

const { filterDeletedPiggyBanks } = require("../utils");
const { faker } = require("@faker-js/faker");

const userModel = require("../database/schemas/User");

router.get("/login", async (req, res) => {
	try {
		const { cpf, pin } = req.body;

		const requestedUser = await userModel.findOne({ cpf });

		if (requestedUser) {
			if (requestedUser.pin === pin) {
				res.status(200).send({
					status: 200,
					message: "Usuário autenticado com sucesso!",
					data: {
						user: filterDeletedPiggyBanks(requestedUser),
					},
				});
			} else {
				res.status(400).send({
					status: 400,
					message: "Senha incorreta.",
				});
			}
		} else {
			const createdUser = userModel.create({
				cpf,
				pin,
				username: faker.person.firstName(),
				balance: faker.number.float({ fractionDigits: 2 }),
			});

			res.status(200).send({
				status: 200,
				message: "Usuário autenticado com sucesso!",
				data: {
					user: createdUser,
				},
			});
		}
	} catch (err) {
		res.status(400).send({
			status: 400,
			message: `Algo de errado aconteceu. ${err.message}`,
			error: err.stack,
		});
	}
});

module.exports = router;
