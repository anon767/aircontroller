var ShootAction = (function (gameState, actionData) {
    var player = gameState.playerList[actionData.id];
    if (player.canShoot) {
        var bullet = new Bullet("black", player.object.x, player.object.y, {
            x: actionData.x,
            y: actionData.y
        }, gameState);
        gameState.stage.addChild(bullet.object);
        gameState.bullets.push(bullet);
        player.canShoot = false;
        setTimeout(function () {
            player.canShoot = true;
        }, bullet.timeout);
    }
});