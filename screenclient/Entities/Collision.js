var Collision = (function (gameState) {
    this.tick = function () {
        var objects = gameState.bullets.concat(gameState.zombieManager.zombies.concat(gameState.playerList));
        for (var i in objects) {
            for (var j in objects) {
                var objecta = objects[i];
                var objectb = objects[j];
                if (objecta !== null && objectb !== null && objecta.object.id !== objectb.object.id && objecta.hitTest(objectb))
                    objecta.collide(objectb);
            }
        }

    };

    return {
        tick: this.tick
    }
});