const mongoose = require("mongoose");

const piggyBankSchema = new mongoose.Schema({
	createdAt: {
		type: Date,
		default: Date.now,
		immutable: true,
	},
	lastUpdatedAt: {
		type: Date,
		default: Date.now,
	},
	name: {
		type: String,
		required: true,
	},
	balance: {
		type: Number,
		min: 0,
	},
});

const userSchema = new mongoose.Schema(
	{
		firstLoginAt: {
			type: Date,
			default: Date.now,
			immutable: true,
		},
		cpf: {
			type: String,
			unique: true,
		},
		pin: {
			type: String,
			required: true,
		},
		username: String,
		balance: {
			type: Number,
			min: 0,
		},
		piggyBanks: {
			type: [piggyBankSchema],
			default: [],
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.Model("User", userSchema);
