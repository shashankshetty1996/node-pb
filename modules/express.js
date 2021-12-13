const express = require("express");
const cors = require("cors");
const app = express();

const authRouter = require("../routes/auth");
const blogRouter = require("../routes/blogs");

// body parser middleware
app.use(cors());
app.use(express.json());

// Router setup
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/blogs", blogRouter);

// app.post("/api/v1/auth/login", (req, res) => {
// 	const username = req.body.username;
// 	const password = req.body.password;

// 	console.log({ username, password });

// 	res.json({
// 		success: true,
// 		message: "Login successfully",
// 	});
// });

app.get("/", (req, res) => {
	res.send("<h1>Hello from ExpressJS landing page</h1>");
});

// Approach of API
// 1 parse data
// 2 validate data
// 3 transform or process data
// 4 send valid response

// Data is passed to server from server
// 1. via body -> req.body
// 2. URL params (/:id) -> req.params
// 3. Query params (?username=shashank&password=1234) -> req.query

module.exports = app;
