const faker = require("faker");
const { getRandomUserId } = require("./auth");

const blogs = [];
for (let i = 1; i <= 100; i++) {
	const title = faker.lorem.sentence(10);
	const type = faker.vehicle.type();
	const userId = getRandomUserId();
	const blog = { id: i, title, type, userId };
	blogs.push(blog);
}

module.exports = { blogs };
