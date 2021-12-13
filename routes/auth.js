const express = require("express");
const jwt = require("jsonwebtoken");
const { JWT_SECRET_KEY } = require("../constants");

const router = express.Router();

const users = [
	{ id: 1, username: "zuber", password: "1234@zuber" },
	{ id: 2, username: "soumya", password: "soumyaissleeping" },
	{ id: 3, username: "test", password: "1234" },
];

const jwtConfig = { expiresIn: "2min" };

/**
 * @description A User login
 * @method POST
 * @listens /api/v1/auth
 */
router.post("/", (req, res) => {
	const username = req.body.username;
	const password = req.body.password;

	// check for username and password - validation

	// Check for registered users.
	const user = users.find(
		(user) => user.username === username && user.password === password
	);

	if (user === undefined) {
		res.status(401).json({
			success: false,
			message: "Invalid username or password",
		});
		return;
	}

	const payload = { userId: user.id };
	try {
		const token = jwt.sign(payload, secretKey, jwtConfig);
		res.json({
			success: true,
			message: "login successfully",
			data: { token },
		});
	} catch (error) {
		res.status(501).json({
			success: false,
			message: "ERROR: while generating token",
			data: error,
		});
	}
});

/**
 * @description This is a route to verify the token and return payload
 * @method GET
 * @listens /api/v1/auth/verify-token
 */
router.get("/verify-token", (req, res) => {
	// const authorization = req.headers["authorization"];
	const { authorization } = req.headers;
	if (authorization === undefined) {
		res.status(400).json({
			success: false,
			message: "ERROR: Invalid Auth header",
		});
	}

	const [, token] = authorization.split(" ");

	try {
		const payload = jwt.verify(token, secretKey);
		res.json({
			success: true,
			message: "login successfully",
			data: payload,
		});
	} catch (error) {
		res.status(403).json({
			success: false,
			message: "ERROR: Invalid",
			data: error,
		});
	}
});

module.exports = router;
