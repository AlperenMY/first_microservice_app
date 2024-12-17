const express = require("express");
const { randomBytes } = require("crypto");
const cors = require("cors");
const axios = require("axios");

const app = express();
const commentsByPostId = {};

app.use(express.json());
app.use(cors()); // Enable CORS for cross-origin requests

app.get("/comments/:postId", (req, res) => {
	res.status(200).send(commentsByPostId[req.params.postId] || []);
});

app.post("/comments/:postId", async (req, res) => {
	try {
		const commentId = randomBytes(4).toString("hex");
		const postId = req.params.postId;
		const { content } = req.body;

		const comments = commentsByPostId[postId] || [];
		comments.push({ id: commentId, content, status: "pending" });
		commentsByPostId[postId] = comments;

		await axios.post("http://event-bus-srv:4005/events", {
			type: "comment_created",
			data: { id: commentId, content, postId, status: "pending" },
		});

		res.status(201).send(comments);
	} catch (error) {
		console.error(error);
		res.status(500).send(error.message);
	}
});

app.post("/events", async (req, res) => {
	console.log("Event sent", req.body.type);
	const { type, data } = req.body;

	if (type === "comment_moderated") {
		const { id, status, postId } = data;
		const comments = commentsByPostId[postId];
		const commentIndex = comments.findIndex((comment) => comment.id === id);

		if (commentIndex !== -1) {
			comments[commentIndex].status = status;

			await axios.post("http://event-bus-srv:4005/events", {
				type: "comment_updated",
				data,
			});
		} else {
			console.error(`Comment with id ${id} not found.`);
		}

		commentsByPostId[postId] = comments;
	}
	res.status(200).send("ok");
});

app.listen(4001, () => {
	console.log("Comments service running on port 4001");
});
