var PlayerMoveAction = (function (gameState, actionData) {
    var id = actionData.id;
    var player = gameState.playerList[id];
    player.object.x += actionData.x * player.acceleration;
    player.object.y += actionData.y * player.acceleration;
});