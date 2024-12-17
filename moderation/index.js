const express = require("express");
const axios = require("axios");

const app = express();

app.use(express.json());

app.post("/events", async (req, res) => {
	try {
		const { type, data } = req.body;

		if (type === "comment_created") {
			const status = data.content.includes("orange") ? "rejected" : "approved";

			await axios.post(`http://event-bus-srv:4005/events`, {
				type: "comment_moderated",
				data: { ...data, status },
			});
		}

		res.status(200).send("ok");
	} catch (error) {
		console.error(error);
		res.status(500).send(error.message);
	}
});

app.listen(4003, () => {
	console.log("Moderation service running on port 4003");
});
