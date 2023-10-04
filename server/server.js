const WebSocket = recuire('socket.io');

const games = {} //то, где по идее будут храниться игры

function start() {
    /* const wss = new WebSocket.Server({ port:2000 }, () => 
    console.log('WebSocket Server started on port 2000')
    );
    wss.on('connection',(wsClient) => {
        wsClient.on('message',async (message) => {
            const req = JSON.parse(message.toString());
            if(req.event == 'connect') {
                wsClient.nickname = req.payload.username
                initGames(wsClient, req.payload.gameId)
            }
            broadcast(req);
        });
     }); */
    // здесь прописывается то, что Даня и так прописал при написании сервера


    function initGames(socketio, gameId) {
        if(!games[gameId]) {
            games[gameId] = [socet.io] //помещаем первого игрока в массив
        }
    
        if(games[gameId] && games[gameId]?.length < 2) { //если в комнате уже есть игрок, то нового игрока закидываем в эту комнату
            games[gameId] = [...games[gameId],socet.io] //разворачиваем массив и помещаем туда нового пользователя
        }

        if(games[gameId] && games[gameId].length === 2) {
            games[gameId] = games[gameId].filter(wsc => wsc.nickname !== ws.nickname) //в случае вылета игрока из комнаты, переподключает без завершения сессии
            games[gameId] = [...games[gameId],socet.io] 
        }
}

function broadcast(params) {
    let res;
    const { username, gameId} = params.payload
    games[gameId].forEach((client) => {
        switch (params.event) {
            case 'connect':
                res = {
                  type: 'connectToPlay',
                   payload: {
                     success: true,
                     rivalName: games[gameId].find(user => user.nickname !== client.nickname)?.nickname,
                     username: client.nickname
                  }
                };
                break;
            case 'ready':
              res = { type: 'readyToPlay', payload: { canStart: games[gameId].length > 1, username } };
              break;
            case 'shoot':
              res = { type: 'afterShooyByMe', payload: params.payload }
              break;
            case 'checkShoot':
              res = { type: 'isPerfectHit', payload: params.payload }
              break;
            default:
              res = { type: 'logout', payload: params.payload };
              break; 
        }
        client.send( JSON.stringify(res));
    });
}
}
start()