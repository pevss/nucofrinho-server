const express = require("express");
const router = express.Router();

const userModel = require("../database/schemas/User");

router.post("/", async (req, res) => {});

router.delete("/", async (req, res) => {
	try {
	} catch (err) {
		res.status(400).send({
			status: 400,
			message: `Algo de errado aconteceu: ${err.message}`,
			error: err.stack,
		});
	}
});

router.patch("/name");

router.patch("/balance");

module.exports = router;
