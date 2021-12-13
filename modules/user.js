const faker = require("faker");

const name = faker.name.firstName();
const address = faker.address.secondaryAddress();

module.exports = { name, address };
