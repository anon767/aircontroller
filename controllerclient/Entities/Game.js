$(document).ready(function () {
    var room = prompt("Please enter roomid", 0);
    if (room)
        new Game(room);
});
var Game = (function (id) {
    var gameId = id;
    var gameState = new GameState();

    var myCommands = {
        Init: InitAction
    };
    var shootEvent = function (event) {
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
            communication.send({action: "s", data: {x: xs, y: ys}});
    };
    var moveEvent = function (event) {
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
    var moveEventID = -1;  //Global ID of mouse down interval
    var shootEventID = -1;  //Global ID of mouse down interval
    var joystickleft = new VirtualJoystick({
        mouseSupport: true,
        container: document.getElementById("joystickleft"),
        stationaryBase: true,
        limitStickTravel: true,
        baseX: 100,
        baseY: window.innerHeight / 2,
        stickRadius: 150,
        touch: function (event) {
            if (moveEventID == -1)  //Prevent multiple loops!
                moveEventID = setInterval(function () {
                    moveEvent(event)
                }, 10);
        },
        touchend: function () {
            if (moveEventID != -1) {  //Only stop if exists
                clearInterval(moveEventID);
                moveEventID = -1;
            }
        }
    });
    var joystickright = new VirtualJoystick({
        mouseSupport: true,
        container: document.getElementById("joystickright"),
        stationaryBase: true,
        limitStickTravel: true,
        baseX: window.innerWidth - 100,
        baseY: window.innerHeight / 2,
        stickRadius: 150,
        touch: function (event) {
            if (shootEventID == -1)  //Prevent multiple loops!
                shootEventID = setInterval(function () {
                    shootEvent(event)
                }, 10);
        },
        touchend: function () {
            if (shootEventID != -1) {  //Only stop if exists
                clearInterval(shootEventID);
                shootEventID = -1;
            }
        }
    });
    var onReceive = function (data) {
        var actionName = data.actionName;
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