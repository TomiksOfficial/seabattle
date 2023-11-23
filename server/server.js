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
	/**
	 * @function AddNewUser
	 * @brief Add new user
	 * @param {JSON} data
	 * @param {Function} Send_UserData
	 */
	socket.on("AddNewUser", (data, Send_UserData) => {
		data = JSON.parse(data);

		// player:
		//			{
		//				nickname: "nick"
		//			}
		
		// activePlayers.push({"nickname": data.nickname, "id": socket.id});
		activePlayers[socket.id.toString()] = { "nickname": data.nickname, "inGame": false, "id": socket.id };

		const returnData = {};
		returnData[socket.id.toString()] = { "nickname": data.nickname, "inGame": false, "id": socket.id };

		// Send_UserData(JSON.stringify({"nickname": data.nickname, "inGame": false, "id": socket.id}));
		Send_UserData(JSON.stringify(returnData));

		IO.in("connected_players").emit("NewPlayerAdded", JSON.stringify({"nickname": data.nickname, "inGame": false, "id": socket.id}));
		socket.join("connected_players");
	});

	/**
	 * @function GetUserList
	 * @brief Получение списка пользователей
	 * @param {Function} Send_UserList каллбек для получения данных JSON
	 */
	socket.on("GetUserList", (Send_UserList) => {
		Send_UserList(JSON.stringify(activePlayers));
	});

	/**
	 * @function InviteToGame
	 * @brief Вызов приглашения в игру
	 * @param {JSON} data JSON содержащий id_client: socket.id
	 * @param {Function} InviteResult каллбек для получения данных JSON
	 */
	socket.on("InviteToGame", (data, InviteResult) => {
		/*
		* id_client: socket.id
		*/
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

				/*
				 * activePlayers[player id]:
				 * inGame - в игре или нет | bool
				 * player_turn - номер хода в игре | int | 0 1 2 | 0 - ходит первый, 1 - ходит второй, 2 - этап расстановки кораблей
				 * opponent - player id противника | string
				 * map - поле текущего игрока | Массив(Array) из 100 элементов, поле учитывается с 1 - 100
				 * count_ships - количество нерасставленных кораблей | int
				 * nickname - имя игрока | string
				 * id - player id текущего игрока | string
				*/

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

	/**
	 * @function GameAction
	 * @brief Событие игровых действий
	 * @param {JSON} game_info JSON данные передаваемые в событие
	 * @param {Function} GameAction_Result каллбек для получения данных JSON
	 */
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
						/*
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
							let start_initialize = {};
							start_initialize[game_info.player_id.toString()] = turn;
							start_initialize[activePlayers[game_info.player_id].opponent.toString()] = turn ^ 1;

							activePlayers[game_info.player_id].player_turn = turn;
							activePlayers[activePlayers[game_info.player_id].opponent].player_turn = turn ^ 1;

							/*
							 * start_initialize{}:
							 * [player.id] - по player id в объекте хранится кто ходит
							 * Аналогично по player id противникаа
							 */
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
					activePlayers[activePlayers[game_info.player_id].opponent].map[game_info.shoot_position] = -1; //changed to -1

					if(activePlayers[activePlayers[game_info.player_id].opponent].map.filter(i => i == 1).length != 0)
					{
						/*
						 * Объект
						 * state - текущее состоянии игры | shoot - выстрел
						 * hit - попал или нет
						 * map_opponent - текущая карта противника
						 */
						GameActionResult(JSON.stringify({"state": "shoot", "hit": true, "map_opponent": activePlayers[activePlayers[game_info.player_id].opponent].map}));
					} else {
						let game_end = {};

						game_end["winner"] = game_info.player_id;
						game_end["loser"] = activePlayers[game_info.player_id].opponent;

						// TODO: добавить изменение в общих переменных об игроках активных.
						activePlayers[game_info.player_id].inGame = false;
						activePlayers[activePlayers[game_info.player_id].opponent].inGame = false;


						/*
						 * game_end
						 * winner - id победитель | int
						 * loser - id проигравший | int
						 */
						IO.in(game_info.room_id).emit("GameEnd", JSON.stringify(game_end));
					}
				} else {
					activePlayers[game_info.player_id].player_turn ^= 1;
					activePlayers[activePlayers[game_info.player_id].opponent].player_turn ^= 1;

					let turn_change = {};
					turn_change[game_info.player_id.toString()] = activePlayers[game_info.player_id].player_turn;
					turn_change[activePlayers[game_info.player_id].opponent.toString()] = activePlayers[activePlayers[game_info.player_id].opponent.toString()].player_turn;

					/*
					 * turn_change{}:
					 * [player.id] - по player id в объекте хранится кто ходит
					 * Аналогично по player id противникаа
					 */
					IO.in(game_info.room_id).emit("ChangePlayerTurn", JSON.stringify(turn_change));

					/*
					 * Объект
					 * state - текущее состоянии игры | shoot - выстрел
					 * hit - попал или нет
					 */
					GameActionResult(JSON.stringify({"state": "shoot", "hit": false}));
				}
				
				break;
			}
		}
	});

	/**
	 * @function disconnect
	 * @brief Событие отключение пользователя с сайта
	 */
	socket.on("disconnect", (reason) => {
		// удаление игркоа из списков
		IO.in("connected_players").emit("PlayerDisconnect", JSON.stringify(activePlayers[socket.id.toString()]));
		delete activePlayers[socket.id.toString()];

		// Дописать логику окончания активных игр этого игрока
	});
});