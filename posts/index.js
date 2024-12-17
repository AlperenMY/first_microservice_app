const express = require("express");
const { randomBytes } = require("crypto");
const cors = require("cors");
const axios = require("axios");

const app = express();
const posts = {};

app.use(express.json());
app.use(cors()); // Enable CORS for cross-origin requests

app.get("/posts", (req, res) => {
	res.status(200).send(posts);
});

app.post("/posts", async (req, res) => {
	try {
		const id = randomBytes(4).toString("hex");
		const { title } = req.body;

		posts[id] = { id, title };

		await axios.post("http://event-bus-srv:4005/events", {
			type: "post_created",
			data: { id, title },
		});

		res.status(201).send(posts[id]);
	} catch (error) {
		console.error(error);
		res
			.status(500)
			.send({ message: "An error occurred while creating the post." });
	}
});

app.post("/events", (req, res) => {
	console.log("Event sent", req.body.type);
	res.status(200).send("ok");
});

app.listen(4000, () => {
	console.log("New version from Docker Hub v3");
	console.log("Posts service running on port 4000");
});
