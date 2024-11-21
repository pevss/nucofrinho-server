const express = require("express");
const router = express.Router();

const userSchema = require("../database/schemas/User");

// user login
router.get(async (req, res) => {
	try {
		// if cpf exists => check pin
		// if pin is correct login else deny
		// if cpf does not exists => create new user => log in
	} catch (err) {
		res.status(400).send({
			message: `Algo de errado aconteceu. ${err.message}`,
			error: err.stack,
		});
	}
});

module.exports = router;
