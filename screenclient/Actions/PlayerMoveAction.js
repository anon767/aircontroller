var PlayerMoveAction = (function (gameState, actionData) {
    var id = actionData.id;
    var player = gameState.playerList[id];
    var newPlayerX = player.object.x + actionData.x * player.acceleration;
    var newPlayerY = player.object.y + actionData.y * player.acceleration;
    if (newPlayerX < 0)
        newPlayerX = window.innerWidth;
    else if (newPlayerX > window.innerWidth)
        newPlayerX = 0;
    if(newPlayerY < 0)
        newPlayerY = window.innerHeight;
    else if(newPlayerY > window.innerHeight)
        newPlayerY = 0;

    player.object.x = newPlayerX;
    player.object.y = newPlayerY;
});