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
//счётчик кораблей у каждого игрока по дефолту
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
		activePlayers[socket.id.toString()] = { "nickname": data.nickname, "inGame": false, "id": socket.id, "inWait": false };
		//Добавлено состояние ожидания отклика на приглашение
		const returnData = JSON.parse(JSON.stringify(activePlayers));
		// returnData[socket.id.toString()] = { "nickname": data.nickname, "inGame": false, "id": socket.id };

		Send_UserData(JSON.stringify(returnData));
		// Send_UserData(JSON.stringify(activePlayers));

		IO.in("connected_players").emit("NewPlayerAdded", JSON.stringify(returnData));
		socket.join("connected_players");
	});

	// Получение списка пользователей
	socket.on("GetUserList", (Send_UserList) => {
		Send_UserList(JSON.stringify(activePlayers));
	});
	//Ожидание ответа на инвайт
	socket.on("SetInWaiting", (data) => {
		data = JSON.parse(data);

		activePlayers[data.id_client]["inWait"] = data.state;
		activePlayers[socket.id]["inWait"] = data.state;

		IO.emit("UpdatePlayersState", JSON.stringify(activePlayers));
	});


	//Приглашение 
	socket.on("InviteToGame", async (data) => {
		/*
		* id_client: socket.id
		*/
		data = JSON.parse(data);
		const sockets_array = await IO.fetchSockets();

		for(const sck of sockets_array)
		{
			if(sck.id != data.id_client)
				continue;

			sck.emit("InviteRequest", activePlayers[socket.id.toString()].nickname, socket.id.toString());
		}
	});

	socket.on("InviteAccept", async (req) => {
		// req = JSON.parse(req);

		const sockets_array = await IO.fetchSockets();

		for(const sck of sockets_array)
		{
			if(sck.id != req.id_client)
				continue;

			if(req.accept == true)
			{
				sck.join(socket.id.toString());

				socket.join(socket.id.toString());
	
				req["room_id"] = socket.id.toString();

				req["player_turn"] = 2;

				req["count_ships"] = COUNT_SHIPS;

				req[socket.id.toString()] = req.id_client;

				req[req.id_client.toString()] = socket.id;
	
				activePlayers[socket.id.toString()].inGame = true;

				activePlayers[socket.id.toString()].player_turn = 2;

				activePlayers[socket.id.toString()].opponent = req.id_client;

				activePlayers[socket.id.toString()].map = Array(100).fill(0);

				activePlayers[socket.id.toString()].count_ships = COUNT_SHIPS;

				activePlayers[socket.id.toString()].room_id = socket.id.toString();

	
				/**
				 * activePlayers[player id]:
				 * inGame - в игре или нет | bool
				 * player_turn - номер хода в игре | int | 0 1 2 | 0 - ходит первый, 1 - ходит второй, 2 - этап расстановки кораблей
				 * opponent - player id противника | string
				 * map - поле текущего игрока | Массив(Array) из 100 элементов, поле учитывается с 1 - 100
				 * count_ships - количество нерасставленных кораблей | int
				 * nickname - имя игрока | string
				 * id - player id текущего игрока | string
				*/
	
				activePlayers[req.id_client.toString()].inGame = true;

				activePlayers[req.id_client.toString()].player_turn = 2;

				activePlayers[req.id_client.toString()].opponent = socket.id;

				activePlayers[req.id_client.toString()].map = Array(100).fill(0);

				activePlayers[req.id_client.toString()].count_ships = COUNT_SHIPS;

				activePlayers[req.id_client.toString()].room_id = socket.id.toString();
	
				IO.in(req.room_id).emit("StartGame", JSON.stringify(req));
				// InviteResult(JSON.stringify({"accept": true}));
				
				IO.emit("UpdatePlayersState", JSON.stringify(activePlayers));
				sck.emit("InviteResult", JSON.stringify({"accept": false}));
			} else {
				// на случай отказа от игры
				// InviteResult(JSON.stringify({"accept": false}));
				sck.emit("InviteResult", JSON.stringify({"accept": false}));
			}
		}

		
	});

	socket.on("GameAction", async (game_info, GameActionResult) => {

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

		if(activePlayers[game_info.player_id] !== undefined && activePlayers[game_info.player_id].inGame)
		{
			switch(game_info.state)
			{
				case "prepare":
				{
					// console.log(game_info)
					if(activePlayers[game_info.player_id].count_ships > 0)
					{
						activePlayers[game_info.player_id].map[game_info.ship_set] = 1;
						
						if(--activePlayers[game_info.player_id].count_ships == 0)
						{
							activePlayers[game_info.player_id].count_ships = 0;

							// Возвращение новой информации о количестве кораблей их расстановке на карте
							/**
							 * Объект
							 * state - текущее состоянии игры
							 * count_shps - оставшееся количество кораблей нерасставленных игроком
							 * map - текущая карта игрока
							 */
							GameActionResult(JSON.stringify({"state": "prepare", "count_ships": 0, "map": activePlayers[game_info.player_id].map}));

							// Проверка полного старта игры
							if(activePlayers[activePlayers[game_info.player_id].opponent].count_ships == 0)
							{
								const turn = Math.floor(Math.random() * 2);
								// let start_initialize = {};
								// start_initialize[game_info.player_id.toString()] = turn;
								// start_initialize[activePlayers[game_info.player_id].opponent.toString()] = turn ^ 1;

								activePlayers[game_info.player_id].player_turn = turn;
								activePlayers[activePlayers[game_info.player_id].opponent].player_turn = turn ^ 1;

								const ret = {};

                                ret[game_info.player_id] = turn;
                                ret[activePlayers[game_info.player_id].opponent] = turn ^ 1;

                                /**
                                 * start_initialize{}:
                                 * [player.id] - по player id в объекте хранится кто ходит
                                 * Аналогично по player id противникаа
                                 */
                                IO.in(game_info.room_id).emit("FullyStartGame", JSON.stringify(ret));
							}
						} else {
							GameActionResult(JSON.stringify({"state": "prepare", "count_ships": activePlayers[game_info.player_id].count_ships, "map": activePlayers[game_info.player_id].map}));
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
						activePlayers[activePlayers[game_info.player_id].opponent].map[game_info.shoot_position] = -1; //changed to -1

						if(activePlayers[activePlayers[game_info.player_id].opponent].map.filter(i => i == 1).length != 0)
						{
							const sockets = await IO.in(game_info.room_id).fetchSockets();

                            for(const sck of sockets)
                            {
                                if(sck.id !== activePlayers[game_info.player_id].opponent)
                                    continue;

                                sck.emit("ShootToYou", {"index": game_info.shoot_position});
                            }

							/**
							 * Объект
							 * state - текущее состоянии игры | shoot - выстрел
							 * hit - попал или нет
							 * map_opponent - текущая карта противника
							 */
							GameActionResult(JSON.stringify({"state": "shoot", "hit": true, "map_opponent": activePlayers[activePlayers[game_info.player_id].opponent].map}));
						} else {
							const sockets = await IO.in(game_info.room_id).fetchSockets();

                            for(const sck of sockets)
                            {
                                if(sck.id !== activePlayers[game_info.player_id].opponent)
                                    continue;

                                sck.emit("ShootToYou", {"index": game_info.shoot_position});
                            }

							let game_end = {};

							game_end["winner"] = game_info.player_id;
							game_end["loser"] = activePlayers[game_info.player_id].opponent;

							
							activePlayers[game_info.player_id].inGame = false;
							activePlayers[activePlayers[game_info.player_id].opponent].inGame = false;

							GameActionResult(JSON.stringify({"state": "shoot", "hit": true, "map_opponent": activePlayers[activePlayers[game_info.player_id].opponent].map}));
							//здесь прописано удаление параметров игроков
							delete activePlayers[activePlayers[game_info.player_id].opponent].map; //удаление поля противника

							delete activePlayers[game_info.player_id].map; //удаление поля игрока

							delete activePlayers[game_info.player_id].count_ships; //удаление количества кораблей*

							delete activePlayers[activePlayers[game_info.player_id].opponent].count_ships; //удаление количества кораблей*

							delete activePlayers[game_info.player_id].room_id; // удалиение игровой румы

							delete activePlayers[activePlayers[game_info.player_id].opponent].room_id; // удалиение игровой румы для оппонента

							delete activePlayers[game_info.player_id].player_turn; //удаление переменной ходов

							delete activePlayers[activePlayers[game_info.player_id].opponent].player_turn; //удаление переменной ходов для оппонента

							delete activePlayers[activePlayers[game_info.player_id].opponent].opponent; //удаление и самого оппонента (из жизни :3)

							delete activePlayers[game_info.player_id].opponent;

							/**
							 * game_end
							 * winner - id победитель | int
							 * loser - id проигравший | int
							 */
							IO.in(game_info.room_id).emit("GameEnd", JSON.stringify(game_end));
							IO.emit("UpdatePlayersState", JSON.stringify(activePlayers));
						}
					} else {
						activePlayers[game_info.player_id].player_turn ^= 1;
						activePlayers[activePlayers[game_info.player_id].opponent].player_turn ^= 1;

						const sockets = await IO.in(game_info.room_id).fetchSockets();

						for(const sck of sockets)
						{
							if(sck.id !== activePlayers[game_info.player_id].opponent)
								continue;

							sck.emit("ShootToYou", {"index": game_info.shoot_position});
						}

						// let turn_change = {};
						// turn_change[game_info.player_id.toString()] = activePlayers[game_info.player_id].player_turn;
						// turn_change[activePlayers[game_info.player_id].opponent.toString()] = activePlayers[activePlayers[game_info.player_id].opponent.toString()].player_turn;

						/**
						 * turn_change{}:
						 * [player.id] - по player id в объекте хранится кто ходит
						 * Аналогично по player id противникаа
						 */
						IO.in(game_info.room_id).emit("ChangePlayerTurn");

						/**
						 * Объект
						 * state - текущее состоянии игры | shoot - выстрел
						 * hit - попал или нет
						 */
						GameActionResult(JSON.stringify({"state": "shoot", "hit": false}));
					}
					
					break;
				}
			}
		}
	});

	socket.on("disconnect", (reason) => {
		// удаление игроков из списков

		/*if(activePlayers[socket.id] !== undefined && activePlayers[activePlayers[socket.id].opponent]!== undefined && activePlayers[activePlayers[socket.id].opponent].inGame === false)
		{
			let game_end = {};

			game_end["winner"] = activePlayers[socket.id].opponent;;
			game_end["loser"] = socket.id;

			IO.in(activePlayers[socket.id].room_id).emit("GameEnd", JSON.stringify(game_end));
			InviteResult(JSON.stringify({"accept": false})); задаю false значение инвайту для того, чтобы можно было чонва получить приглашение от этого пользователя
		}
		*/
		if(activePlayers[socket.id] !== undefined && activePlayers[socket.id].inGame === true)
		{
			let game_end = {};

			game_end["winner"] = activePlayers[socket.id].opponent;

			game_end["loser"] = socket.id;

			activePlayers[activePlayers[socket.id].opponent].inGame = false;

			IO.in(activePlayers[socket.id].room_id).emit("GameEnd", JSON.stringify(game_end));

		}

		IO.in("connected_players").emit("PlayerDisconnect", JSON.stringify(activePlayers[socket.id.toString()]));

		
		//окончание игровой сессии(полное удаление комнаты оппонента)
		if(activePlayers[activePlayers[socket.id]] !== undefined && activePlayers[activePlayers[socket.id]].opponent !== undefined)
		{
			delete activePlayers[activePlayers[socket.id].opponent].map; //удаление игрового поля оппонента

			delete activePlayers[activePlayers[socket.id].opponent].count_ships; //удалиение счётчика кораблей оппонента

			delete activePlayers[activePlayers[socket.id].opponent].room_id; //удалиение игровой комнаты оппонента

			delete activePlayers[activePlayers[socket.id].opponent].player_turn; //удаление хода противника
			
			delete activePlayers[activePlayers[socket.id].opponent].opponent; //удаление оппонента 
		}
		delete activePlayers[socket.id.toString()]; //удаление игровой сессии
	});
});