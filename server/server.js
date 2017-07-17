const WebSocket = require('uws');
var GameRoom = require('./Gameroom.js');


const wss = new WebSocket.Server({port: 9300});
console.log("started");

var clientid = 0;
var idcounter = 0;
var games = [];

wss.on('connection', function connection(ws) {
    console.log("connected");
    ws.send("hello");
    ws.id = clientid;
    clientid++;
    ws.on('message', function incoming(data) {
            var response = JSON.parse(data);
            console.log(data);
            if (response.init == "gameScreen") {
                var gameRoom = new GameRoom();
                games[idcounter] = gameRoom;
                gameRoom.id = idcounter;
                gameRoom.gameScreen = ws;
                ws.send(JSON.stringify({actionName: "Init", actionData: {id: idcounter}}));
                idcounter++;

            } else if (response.init == "player") {
                var gameroom = games[response.id];
                gameroom.players[gameroom.players.length + 1] = ws;
                ws.room = response.id;
                ws.send(JSON.stringify({actionName: "Init", actionData: {id: ws.id}}));
                gameroom.gameScreen.send(JSON.stringify({
                    actionName: "NewPlayer",
                    actionData: {x: 20, y: 20, color: "red", id: ws.id}
                }));
            } else if (response.action == "m") {
                var x = response.data.x;
                var y = response.data.y;
                var room = games[ws.room];
                room.gameScreen.send(JSON.stringify({
                    actionName: "m",
                    actionData: {x: x * 2, y: y * 2, id: ws.id}
                }));
            }


        }
    );

    ws.on('close', function close() {

    });
});