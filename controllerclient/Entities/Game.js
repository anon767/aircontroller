$(document).ready(function () {
    var room = prompt("Please enter roomid", 0);
    if (room)
        new Game(room);
});
var Game = (function (id) {
    var gameId = id;
    var gameState = new GameState();
    var joystick = new VirtualJoystick({
        mouseSupport: true,
        stationaryBase: true,
        limitStickTravel: true,
        baseX: 200,
        baseY: 200
    });
    var myCommands = {
        InitAction: InitAction
    };

    var moveEvent = function () {
        var x, y = 0;
        if (joystick.right()) {
            x = "1";
        }
        else if (joystick.left()) {
            x = "-1";
        }
        if (joystick.up()) {
            y = "-1";
        }
        else if (joystick.down()) {
            y = "1";
        }
        if (x || y)
            communication.send({action: "m", data: {x: x, y: y}});
    };
    var mousedownID = -1;  //Global ID of mouse down interval
    function mouseDown(event) {
        if (mousedownID == -1)  //Prevent multiple loops!
            mousedownID = setInterval(moveEvent, 10);
    }

    function mouseUp(event) {
        if (mousedownID != -1) {  //Only stop if exists
            clearInterval(mousedownID);
            mousedownID = -1;
        }
    }

    joystick._container.addEventListener('mousedown', mouseDown, false);
    joystick._container.addEventListener('touchdown', mouseDown, false);
    joystick._container.addEventListener('mouseup', mouseUp, false);
    joystick._container.addEventListener('touchend', mouseUp, false);

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