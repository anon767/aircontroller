/**
 * Created by Tom on 25.07.2017.
 */
var BulletManager = (function (gameState) {
    var destroyBullet = function (i) {
        gameState.stage.removeChild(gameState.bullets[i].object);
        gameState.bullets[i] = null;
        gameState.bullets.splice(i, 1);
    };
    var tick = function (delta) {
        for (var i = 0; i < gameState.bullets.length; i++) {
            if (!gameState.bullets[i].update(delta))
                destroyBullet(i);
        }
    };
    return {
        tick: tick
    };
});