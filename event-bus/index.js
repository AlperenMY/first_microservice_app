const express = require("express");
const axios = require("axios");

const app = express();
const events = [];

app.use(express.json());

app.get("/events", (req, res) => {
	res.status(200).send(events);
});

app.post("/events", (req, res) => {
	const event = req.body;

	events.push(event); // Store event in memory for demonstration purposes

	axios.post("http://post-clusterip-srv:4000/events", event).catch((err) => {
		console.log(err.message);
	}); //post
	axios.post("http://comments-srv:4001/events", event).catch((err) => {
		console.log(err.message);
	}); //comment
	axios.post("http://query-srv:4002/events", event).catch((err) => {
		console.log(err.message);
	}); //query
	axios.post("http://moderation-srv:4003/events", event).catch((err) => {
		console.log(err.message);
	}); //comment moderation

	res.status(200).send("ok");
});

app.listen(4005, () => {
	console.log("Event processor running on port 4005");
});
