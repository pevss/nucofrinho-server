const filterDeletedPiggyBanks = function (user) {
	const filteredPiggyBanks = user.piggyBanks.filter(
		(piggyBank) => !piggyBank.isDeleted
	);

	return { ...user, piggyBanks: filteredPiggyBanks };
};

module.exports = { filterDeletedPiggyBanks };
