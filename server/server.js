// const WebSocket = recuire('socket.io');

// const games = {} //то, где по идее будут храниться игры

// function start() {
//     /* const wss = new WebSocket.Server({ port:2000 }, () => 
//     console.log('WebSocket Server started on port 2000')
//     );
//     wss.on('connection',(wsClient) => {
//         wsClient.on('message',async (message) => {
//             const req = JSON.parse(message.toString());
//             if(req.event == 'connect') {
//                 wsClient.nickname = req.payload.username
//                 initGames(wsClient, req.payload.gameId)
//             }
//             broadcast(req);
//         });
//      }); */
//     // здесь прописывается то, что Даня и так прописал при написании сервера


//     function initGames(socketio, gameId) {
//         if(!games[gameId]) {
//             games[gameId] = [socet.io] //помещаем первого игрока в массив
//         }
    
//         if(games[gameId] && games[gameId]?.length < 2) { //если в комнате уже есть игрок, то нового игрока закидываем в эту комнату
//             games[gameId] = [...games[gameId],socet.io] //разворачиваем массив и помещаем туда нового пользователя
//         }

//         if(games[gameId] && games[gameId].length === 2) {
//             games[gameId] = games[gameId].filter(wsc => wsc.nickname !== ws.nickname) //в случае вылета игрока из комнаты, переподключает без завершения сессии
//             games[gameId] = [...games[gameId],socet.io] 
//         }
// }

// function broadcast(params) {
//     let res;
//     const { username, gameId} = params.payload
//     games[gameId].forEach((client) => {
//         switch (params.event) {
//             case 'connect':
//                 res = {
//                   type: 'connectToPlay',
//                    payload: {
//                      success: true,
//                      rivalName: games[gameId].find(user => user.nickname !== client.nickname)?.nickname,
//                      username: client.nickname
//                   }
//                 };
//                 break;
//             case 'ready':
//               res = { type: 'readyToPlay', payload: { canStart: games[gameId].length > 1, username } };
//               break;
//             case 'shoot':
//               res = { type: 'afterShooyByMe', payload: params.payload }
//               break;
//             case 'checkShoot':
//               res = { type: 'isPerfectHit', payload: params.payload }
//               break;
//             default:
//               res = { type: 'logout', payload: params.payload };
//               break; 
//         }
//         client.send( JSON.stringify(res));
//     });
// }
// }
// start()

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

// DEFINES CONSTS
const COUNT_SHIPS = 10;

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

	socket.on("InviteToGame", (data, InviteResult) => {
		data = JSON.parse(data);

		IO.sockets.id(data.id_client).emit("InviteRequest", (req) => {
			req = JSON.parse(req);

			if(req.accept == true)
			{
				IO.sockets.id(data.id_client).join(socket.id.toString());
				socket.join(socket.id.toString());

				req["room_id"] = data.id_client.toString();
				req["player_turn"] = 2;
				req["count_ships"] = COUNT_SHIPS;

				activePlayers[socket.id.toString()].inGame = true;
				activePlayers[socket.id.toString()].player_turn = 2;
				activePlayers[socket.id.toString()].opponent = data.id_client;
				activePlayers[socket.id.toString()].map = Array(100).fill(0);
				activePlayers[socket.id.toString()].count_ships = COUNT_SHIPS;

				activePlayers[data.id_client.toString()].inGame = true;
				activePlayers[data.id_client.toString()].player_turn = 2;
				activePlayers[data.id_client.toString()].opponent = socket.id;
				activePlayers[data.id_client.toString()].map = Array(100).fill(0);
				activePlayers[data.id_client.toString()].count_ships = COUNT_SHIPS;

				IO.in(req.room_id).emit("StartGame", JSON.stringify(req));
			} else {
				// на случай отказа от игры
				InviteResult(JSON.stringify(req));
			}
		});
	});

	socket.on("GameAction", (game_info, GameActionResult) => {

		/*
		* state: prepare | shoot
		* player_turn: 0 | 1 | 2: 2 means that game in prepare state and both players can place ships
		* room_id
		* player_id: socket.id
		* ship_set: index of array which point where we need to place ship | Only in !!!! state: prepare !!!!
		* shoot_position: index of array which point where we need check the opponent ship
		*
		*/
		game_info = JSON.parse(game_info);

		switch(game_info.state)
		{
			case "prepare":
			{
				if(activePlayers[game_info.player_id].count_ships > 0)
				{
					activePlayers[game_info.player_id].map[ship_set] = 1;
					
					if(--activePlayers[game_info.player_id].count_ships == 0)
					{
						activePlayers[game_info.player_id].count_ships = 0;

						// Возвращение новой информации о количестве кораблей их расстановке на карте
						GameActionResult(JSON.stringify({"state": "prepare", "count_ships": 0, "map": activePlayers[game_info.player_id].map}));

						// Проверка полного старта игры
						if(activePlayers[activePlayers[game_info.player_id].opponent].count_ships == 0)
						{
							const turn = Math.floor(Math.random() * 2);
							let start_initialize = {};
							start_initialize[game_info.player_id.toString()] = turn;
							start_initialize[activePlayers[game_info.player_id].opponent.toString()] = turn ^ 1;

							activePlayers[game_info.player_id].player_turn = turn;
							activePlayers[activePlayers[game_info.player_id].opponent].player_turn = turn ^ 1;

							IO.in(game_info.room_id).emit("FullyStartGame", JSON.stringify(start_initialize));
						}
					}
				}
				break;
			}
			case "shoot":
			{
				if(game_info.player_turn != activePlayers[game_info.player_id].player_turn)
					break;

				if(activePlayers[activePlayers[game_info.player_id].opponent].map[game_info.shoot_position] == 1)
				{
					activePlayers[activePlayers[game_info.player_id].opponent].map[game_info.shoot_position] = 0;

					if(activePlayers[activePlayers[game_info.player_id].opponent].map.filter(i => i == 1).length != 0)
					{
						GameActionResult(JSON.stringify({"state": "shoot", "hit": true, "map_opponent": activePlayers[activePlayers[game_info.player_id].opponent].map}));
					} else {
						let game_end = {};

						game_end["winner"] = game_info.player_id;
						game_end["loser"] = activePlayers[game_info.player_id].opponent;

						IO.in(game_info.room_id).emit("GameEnd", JSON.stringify(game_end));
					}
				} else {
					activePlayers[game_info.player_id].player_turn ^= 1;
					activePlayers[activePlayers[game_info.player_id].opponent].player_turn ^= 1;

					let turn_change = {};
					turn_change[game_info.player_id.toString()] = activePlayers[game_info.player_id].player_turn;
					turn_change[activePlayers[game_info.player_id].opponent.toString()] = activePlayers[activePlayers[game_info.player_id].opponent.toString()].player_turn;

					IO.in(game_info.room_id).emit("ChangePlayerTurn", JSON.stringify(turn_change));
					GameActionResult(JSON.stringify({"state": "shoot", "hit": false}));
				}
				
				break;
			}
		}
	});

	socket.on("disconnect", (reason) => {
		// удаление игркоа из списков
		IO.in("connected_players").emit("PlayerDisconnect", JSON.stringify(activePlayers[socket.id.toString()]));
		delete activePlayers[socket.id.toString()];

		// Дописать логику окончания активных игр этого игрока
	});
});