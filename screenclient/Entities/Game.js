var game = null;
$(document).ready(function () {
    game = new Game();
});
var Game = (function () {
    var myCommands = {
        NewPlayer: NewPlayerAction,
        m: PlayerMoveAction,
        Init: InitAction,
        s: ShootAction
    };
    var queue = new createjs.LoadQueue(false);
    var stage = new createjs.Stage("stage");
    var gameState = new GameState(stage);
    var bulletManager = new BulletManager(gameState);
    var communication = null;
    var onReceive = function (data) {
        var actionName = data.actionName;
        var actionData = data.actionData;
        new myCommands[actionName](gameState, actionData);
    }

    var fullscreen = function () {
        stage.canvas.width = window.innerWidth;
        stage.canvas.height = window.innerHeight;
    };

    var onOpen = function () {
        console.log("connected");
        communication.send({init: "gameScreen"});
    };

    var tick = function (event) {
        stage.update();
        bulletManager.tick(1);
        requestAnimationFrame(tick);
    }

    var init = function () {
        fullscreen();
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
    return {
        fullscreen: fullscreen
    }

});