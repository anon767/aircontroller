var NewPlayerAction = (function (gameState, actionData) {
    var player = new Player(actionData.color, actionData.x, actionData.y, actionData.id);
    gameState.stage.addChild(player.object);
    gameState.playerList[actionData.id] = player;
});