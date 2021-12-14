const jwt = require("jsonwebtoken");
const { JWT_SECRET_KEY } = require("../constants");

const verifyToken = (req, res, next) => {
	const { authorization } = req.headers;
	if (authorization === undefined) {
		res.status(400).json({
			success: false,
			message: "ERROR: Invalid Auth header",
		});
		return;
	}

	const [, token] = authorization.split(" ");

	try {
		const payload = jwt.verify(token, JWT_SECRET_KEY);
		req.auth = payload;
		next();
	} catch (error) {
		res.status(403).json({
			success: false,
			message: "ERROR: Invalid token",
			data: error,
		});
	}
};

module.exports = verifyToken;
