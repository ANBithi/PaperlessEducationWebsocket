import { WebSocketServer } from "ws";
import express from "express";
import bodyParser from 'body-parser';
import activityService from "./Services/activity.service.js";

const sockServer = new WebSocketServer({ port: 443 });
const connections = new Set();

sockServer.on("connection", (ws, req) => {
	let message;
	console.log(`New client connected to ${req.url}!`);
	//console.log(`New data ${data}!`);
	connections.add({ws, url: req.url});
	ws.on("message", async (data) => {
		message = JSON.parse(data);
		if (req.url === `/exam`) {
			var payload = {...message, status : 0};
			console.log(payload);
			 await activityService.addActivity(payload);
		}
	});
	

	ws.on("close",async () => {
		if(req.url === '/exam') {
			var payload = {...message, status : 1};
			console.log(payload);
			 await activityService.addActivity(payload);
		}
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

