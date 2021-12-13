const express = require("express");
const { blogs } = require("../models/blogs");
const { JWT_SECRET_KEY } = require("../constants");

const router = express.Router();

/**
 * @description Fetching all the blogs
 * @method GET
 * @listens /api/v1/blogs
 */
router.get("/", (req, res) => {
	const limit = req.query.limit;
	const { authorization } = req.headers;
	if (authorization === undefined) {
		res.status(400).json({
			success: false,
			message: "ERROR: Invalid Auth header",
		});
	}
	const [, token] = authorization.split(" ");

	try {
		jwt.verify(token, secretKey);
	} catch (error) {
		res.status(403).json({
			success: false,
			message: "ERROR: Invalid user",
			data: error,
		});
	}

	if (limit && limit <= 0) {
		res.status(400).json({
			success: false,
			message: "invalid limit",
		});
		return;
	}

	const blogSlice = blogs.slice(0, limit);
	res
		.status(200)
		.json({ success: true, message: "Fetched all blogs!!!", data: blogSlice });
});

/**
 * @description Create the blogs
 * @method POST
 * @listens /api/v1/blogs
 */
router.post("/", (req, res) => {
	const title = req.body.title;

	// guard condition
	if (title === undefined || title === "") {
		res.status(400).json({
			success: false,
			message: "title attribute is missing",
		});
		return;
	}

	const id = blogs.length + 1; // Dangerous
	const blog = { id, title };
	blogs.push(blog);

	res
		.status(201)
		.json({ success: true, message: "Successfully created!!!", data: blog });
});

/**
 * @description Deleting a single blog
 * @method DELETE
 * @listens /api/v1/blogs/:id
 * @example /api/v1/blogs/1, /api/v1/blogs/2, /api/v1/blogs/23, /api/v1/blogs/paritosh-sir
 */
router.delete("/:id", (req, res) => {
	// const id = req.params.id;
	const { id } = req.params;

	if (id === undefined) {
		res
			.status(400)
			.json({ success: false, message: "Invalid URL, expected blog id" });
		return;
	}

	// how to delete an element using based on object id!
	const blogIndex = blogs.findIndex((blog) => blog.id === +id);
	if (blogIndex === -1) {
		res
			.status(404)
			.json({ success: false, message: "Invalid blog id, blog not found" });
		return;
	}

	blogs.splice(blogIndex, 1);
	res.json({ success: true, message: "Successfully deleted!!!", id });
});

module.exports = router;
