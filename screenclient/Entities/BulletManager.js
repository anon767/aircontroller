/**
 * Created by Tom on 25.07.2017.
 */
var BulletManager = (function (gameState) {
    var destroyBullet = function (i) {
        gameState.bullets[i].destroy(i);
    };
    var tick = function (delta) {
        for (var i in gameState.bullets) {
            if (gameState.bullets[i] !== null && !gameState.bullets[i].update(delta))
                destroyBullet(i);
        }
    };
    return {
        tick: tick
    };
});