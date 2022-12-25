const { Server } = require("ws");
const express = require("express");
const bodyParser = require('body-parser');

const sockServer = new Server({ port: 443 });
const connections = new Set();
sockServer.on("connection", (ws, req) => {
	console.log(`New client connected to ${req.url}!`);
	connections.add({ws, url: req.url});

	ws.on("message", (data) => {
		const message = JSON.parse(data);
		connections.forEach((client) => {
			client.ws.send(JSON.stringify(message));
		});
	});

	ws.on("close", () => {
		connections.delete(ws);
		console.log("Client has disconnected!");
	});
});

const server = express();
server.use(bodyParser.json());

server.post("/onNotification", (req, res, next) => {
	var {target} = req.body;
	connections.forEach((client) => {
		if (client.url === `/${target}`){
			console.log('sending notification');
			client.ws.send(JSON.stringify(req.body));
		}		
	});
	res.json('success!');
});

server.listen(3001, () => console.log(`Listening on ${3001}`));

