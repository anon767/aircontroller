/**
 * Created by Tom on 25.07.2017.
 */
var BulletManager = (function (gameState) {
    var destroyBullet = function (i) {
        gameState.stage.removeChild(gameState.bullets[i].object.id);
        gameState.bullets[i] = null;
        delete gameState.bullets[i];
    };
    var tick = function (delta) {
        for (i = 0; i < gameState.bullets.length - 1; i++) {
            if (gameState.bullets[i])
                if (!gameState.bullets[i].update(delta))
                    console.log("destroy");
        }
    };
    return {
        tick: tick
    };
});