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
		default: 0,
		min: 0,
	},
	isDeleted: {
		type: Boolean,
		defalt: false,
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
		totalBalance: {
			type: Number,
			default: function () {
				return this.piggyBanks.reduce((acc, piggyBank) => {
					acc += piggyBank.balance;
					return acc;
				}, 0);
			},
		},
		piggyBanks: {
			type: [piggyBankSchema],
			default: [],
		},
	},
	{ timestamps: true }
);

userSchema.pre("save", (next) => {
	this.lastUpdatedAt = Date.now();

	this.totalBalance = this.piggyBanks.reduce((acc, piggyBank) => {
		acc += piggyBank.balance;
		return acc;
	}, 0);

	next();
});

userSchema.pre("findOneAndUpdate", (next) => {
	const { $set = {} } = this.getUpdate();

	$set.lastUpdatedAt = Date.now();

	next();
});

module.exports = mongoose.Model("User", userSchema);
