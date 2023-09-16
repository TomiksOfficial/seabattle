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

let activePlayers = {};

IO.on("connection", (socket) => {
	console.log("Connect to server | ", IO.engine.clientsCount);

	// Добавление нового пользователя
	socket.on("AddNewUser", (data, Send_UserData) => {
		data = JSON.parse(data);

		// player:
		//			{
		//				nickname: "nick"
		//			}
		// activePlayers.push({"nickname": data.nickname, "id": socket.id});
		activePlayers[socket.id.toString()] = { "nickname": data.nickname, "inGame": false, "id": socket.id };

		Send_UserData(JSON.stringify({"nickname": data.nickname, "inGame": false, "id": socket.id}));

		IO.in("connected_players").emit("NewPlayerAdded", JSON.stringify({"nickname": data.nickname, "inGame": false, "id": socket.id}));
		socket.join("connected_players");
	});

	// Получение списка пользователей
	socket.on("GetUserList", (Send_UserList) => {
		Send_UserList(JSON.stringify(activePlayers));
	});

	socket.on("disconnect", (reason) => {
		// удаление игркоа из списков
		IO.in("connected_players").emit("PlayerDisconnect", JSON.stringify(activePlayers[socket.id.toString()]));
		delete activePlayers[socket.id.toString()];

		// Дописать логику окончания активных игр этого игрока
	});
});