const express = require("express");
const http = require("http");
const bodyParser = require("body-parser");
const cors = require("cors");
const { Server } = require("socket.io");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));

app.use(
	cors({
		origin: true,
		optionsSuccessStatus: 200,
		credentials: true,
	})
);

const httpServer = http.createServer(app);

app.get("/", (req, res) => {
	return res.json({"test": "tttt"});
});

httpServer.listen(2000, () => {
	console.log("SERVER IS STARTED!");
});

const IO = new Server(httpServer, {
	cors: {
		origin: "*",
		methods: ["GET", "POST"],
		credentials: true
	}
});

IO.on("connection", (socket) => {
	console.log("Connect to server | ", IO.engine.clientsCount);

	socket.on("GetUserList", (callback) => {
		callback("test");
	});
});