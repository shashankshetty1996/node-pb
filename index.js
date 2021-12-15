// node - 2009
// ES5 for importing packages
// import server from "./modules/server";
// const server = require("./modules/server");
const app = require("./modules/express");
// import { name, address } from "./modules/user";
const { name, address } = require("./modules/user");

console.log(`name: ${name} with address: ${address}`);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log("Started express server on port " + PORT));
// server.listen(PORT, () => console.log("Started Server on port " + PORT));

// console.log("Welcome to NodeJs Session");
// lock file will store dependance along with it's version and it's dependance's packages's version
