const users = [
	{ id: 1, username: "zuber", password: "1234@zuber" },
	{ id: 2, username: "soumya", password: "soumyaissleeping" },
	{ id: 3, username: "test", password: "1234" },
];

const getRandomUserId = () => {
	let randomIndex = Math.abs(Math.ceil(Math.random() * users.length) - 1);
	return users[randomIndex].id;
};

module.exports = { users, getRandomUserId };
