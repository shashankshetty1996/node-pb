const http = require("http");

const server = http.createServer((request, response) => {
	console.log(`HTTP method: ${request.method} and url: ${request.url}`);

	if (request.url === "/") {
		if (request.method === "GET") {
			response.writeHead(200, { "Content-Type": "text/html", Access: true });
			// response - reply to the request made
			response.write("<h1>Response from server</h1>");
			response.write("<p>this is from NodeJs</p>");
		} else {
			response.writeHead(401, { "Content-Type": "application/json" });
			response.write(
				JSON.stringify({ success: false, message: "Invalid http method" })
			);
		}
	} else {
		response.writeHead(400, { "Content-Type": "application/json" });
		response.write(JSON.stringify({ success: false, message: "Invalid path" }));
	}
	response.end();
});

// ES5 syntax
module.exports = server;
// export default server;
