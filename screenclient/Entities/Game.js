$(document).ready(function () {
    new Game();
});
var Game = (function () {
    var myCommands = {
        NewPlayerAction: NewPlayerAction,
        PlayerMoveAction: PlayerMoveAction,
        InitAction: InitAction
    };
    var queue = new createjs.LoadQueue(false);
    var stage = new createjs.Stage("stage");
    var gameState = new GameState(stage);
    var communication = null;
    var onReceive = function (data) {
        console.log(data);
        var actionName = data.actionName + "Action";
        var actionData = data.actionData;
        console.log(actionName);
        new myCommands[actionName](gameState, actionData);
    }

    var onOpen = function () {
        console.log("connected");
        communication.send({init: "gameScreen"});
    };

    var tick = function () {
        stage.update();
        requestAnimationFrame(tick);
    }

    var init = function () {
        queue.loadManifest([
            {id: "bg", src: "assets/img/plain-white-background.jpg"}]);
        queue.on("complete", handleComplete, this);
    }

    var handleComplete = function () {
        gameState.background = new Background("bg", queue);
        gameState.stage.addChild(gameState.background);
        createjs.Ticker.setFPS(65);
        communication = new Communication(onReceive, onOpen);
        tick();
    }
    init();


});