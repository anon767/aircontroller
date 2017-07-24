$(document).ready(function () {
    var room = prompt("Please enter roomid", 0);
    if (room)
        new Game(room);
});
var Game = (function (id) {
    var gameId = id;
    var gameState = new GameState();
    var joystickleft = new VirtualJoystick({
        mouseSupport: true,
        stationaryBase: true,
        limitStickTravel: true,
        baseX: 200,
        baseY: 200
    });
    var joystickright = new VirtualJoystick({
        mouseSupport: true,
        stationaryBase: true,
        limitStickTravel: true,
        baseX: 500,
        baseY: 200
    });
    var myCommands = {
        InitAction: InitAction
    };
    var shootEvent = function () {
        var xs, ys = 0;
        if (joystickright.right()) {
            xs = "1";
        }
        else if (joystickright.left()) {
            xs = "-1";
        }
        if (joystickright.up()) {
            ys = "-1";
        }
        else if (joystickright.down()) {
            ys = "1";
        }
        if (xs || ys)
            communication.send({action: "s", data: {x: x, y: y}});
    };
    var mouseEvent = function () {
        var x, y = 0;
        if (joystickleft.right()) {
            x = "1";
        }
        else if (joystickleft.left()) {
            x = "-1";
        }
        if (joystickleft.up()) {
            y = "-1";
        }
        else if (joystickleft.down()) {
            y = "1";
        }
        if (x || y)
            communication.send({action: "m", data: {x: x, y: y}});
    };
    var moveEvent = function () {
        shootEvent();
        mouseEvent();
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

    joystickleft._container.addEventListener('mousedown', mouseDown, false);
    joystickleft._container.addEventListener('touchdown', mouseDown, false);
    joystickleft._container.addEventListener('mouseup', mouseUp, false);
    joystickleft._container.addEventListener('touchend', mouseUp, false);

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