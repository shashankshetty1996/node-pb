const faker = require("faker");

const blogs = [];
for (let i = 1; i <= 100; i++) {
	const title = faker.lorem.sentence(10);
	const type = faker.vehicle.type();
	const name = faker.name.firstName();
	const blog = { id: i, title, type, name };
	blogs.push(blog);
}

module.exports = { blogs };
