const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
const posts = {};

const handleEvent = (type, data) => {
	if (type === "post_created") {
		const { id, title } = data;

		posts[id] = { id, title, comments: [] };
	} else if (type === "comment_created") {
		const { id, content, postId, status } = data;

		posts[postId].comments.push({ id, content, status });
	} else if (type === "comment_updated") {
		const { id, content, postId, status } = data;

		const postIndex = posts[postId].comments.findIndex(
			(comment) => comment.id === id
		);

		if (postIndex !== -1) {
			posts[postId].comments[postIndex].content = content;
			posts[postId].comments[postIndex].status = status;
		} else {
			console.error(`Comment with id ${id} not found.`);
		}
	}
};

app.use(express.json());
app.use(cors()); // Enable CORS for cross-origin requests

app.get("/postsQuery", (req, res) => {
	res.status(200).send(posts);
});

app.post("/events", (req, res) => {
	const { type, data } = req.body;

	handleEvent(type, data);

	res.status(200).send("ok");
});

app.listen(4002, async () => {
	console.log("Query service running on port 4002");

	try {
		const result = await axios.get("http://event-bus-srv:4005/events");

		for (const event of result.data) {
			console.log("Processing event: ", event.type);

			handleEvent(event.type, event.data);
		}
	} catch (error) {
		console.error(error);
		res
			.status(500)
			.send({ message: "An error occurred while initializing event." });
	}
});
