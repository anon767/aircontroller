$(document).ready(function () {
    var room = prompt("Please enter roomid", null);
    if (room)
        new Game(room);
});
var Game = (function (id) {
    var gameId = id;
    var gameState = new GameState();
    var joystick = new VirtualJoystick({
        mouseSupport: true,
        stationaryBase: true,
        baseX: 200,
        baseY: 200
    });
    var myCommands = {
        InitAction: InitAction
    };


    setInterval(function () {
        var x, y = 0;
        if (joystick.right()) {
            x = "1";
        }
        if (joystick.left()) {
            x = "-1";
        }
        if (joystick.up()) {
            y = "-1";
        }
        if (joystick.down()) {
            y = "1";
        }
        if (x || y)
            communication.send({action: "move", data: {x: x, y: y}});
    }, 1 / 75 * 1000);


    var onReceive = function (data) {
        var actionName = data.actionName + "Action";
        var actionData = data.actionData;
        console.log(actionName);
        new myCommands[actionName](gameState, actionData);
    };
    var onOpen = function () {
        console.log("connected");
        communication.send({init: "player", id: gameId});
    };

    var communication = new Communication(onReceive, onOpen);

});