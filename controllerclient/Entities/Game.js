"use strict";
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

        if (!joystickright.right() && !joystickright.left() && !joystickright.up() && !joystickright.down()) {
            return;
        }
        var x = joystickright.deltaX();
        var y = joystickright.deltaY();
        var angle = Math.atan2(y, x);
        communication.send({
            action: "s",
            data: {x: Math.cos(angle), y: Math.sin(angle)}
        });
    };
    var moveEvent = function (event) {
        if (!joystickleft.right() && !joystickleft.left() && !joystickleft.up() && !joystickleft.down()) {
            return;
        }
        var x = joystickleft.deltaX();
        var y = joystickleft.deltaY();
        var angle = Math.atan2(y, x);
        communication.send({
            action: "m",
            data: {x: Math.cos(angle), y: Math.sin(angle)}
        });
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