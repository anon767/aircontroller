var ShootAction = (function (gameState, actionData) {
    var player = gameState.playerList[actionData.id];
    console.log(actionData);
    var bullet = new Bullet("black", player.object.x, player.object.y, {x: actionData.x, y: actionData.y});
    gameState.stage.addChild(bullet.object);
    gameState.bullets.push(bullet);
});