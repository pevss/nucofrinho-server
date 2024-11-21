const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
	cpf: String,
	pin: String,
});

modeule.exports = mongoose.Model("User", userSchema);
