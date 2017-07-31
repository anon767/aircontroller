var Zombie = (function (x, y, zombieManager) {
    this.circle = new createjs.Shape();
    this.circle.graphics.beginFill("red").drawCircle(0, 0, 15);
    this.circle.x = x;
    this.circle.y = y;
    this.circle.regX = this.circle.graphics.command.radius;
    this.circle.regY = this.circle.graphics.command.radius;
    this.health = 100;
    this.acceleration = (Math.random() * 2) + 1;
    this.getNearestPlayer = function (playerList) {
        var player = null;
        var minDistance = -1;
        for (i in playerList) {
            if (typeof playerList[i] !== "undefined") {
                var distance = Math.pow(playerList[i].object.x - this.object.x, 2) + Math.pow(playerList[i].object.y - this.object.y, 2);
                if (distance < minDistance || minDistance == -1) {
                    player = playerList[i];
                    minDistance = distance;
                }
            }
        }
        return player;
    };
    this.destroy = function () {

    };
    this.update = function (playerList, delta) {
        var nearestPlayer = this.getNearestPlayer(playerList);
        if (nearestPlayer === null) return;
        var angle = Math.atan2(nearestPlayer.object.y - this.object.y, nearestPlayer.object.x - this.object.x);
        this.object.x += Math.cos(angle) * delta * this.acceleration / 10;
        this.object.y += Math.sin(angle) * delta * this.acceleration / 10;
    };
    this.hitTest = function (object) {
        object = object.object;
        var a, x, y;
        a = this.object.graphics.command.radius + object.graphics.command.radius;
        x = this.object.x - object.x;
        y = this.object.y - object.y;

        return a * a > ((x * x) + (y * y));

    };
    this.collide = function (object) {
        if (object.type === "bullet") {
            this.health -= object.damage;
            this.object.x += object.object.direction.x * object.drawBack;
            this.object.y += object.object.direction.y * object.drawBack;
            if (this.health <= 0)
                zombieManager.kill(this.object.id);
        }
    };
    return {
        object: this.circle,
        id: this.circle.id,
        update: this.update,
        acceleration: this.acceleration,
        getNearestPlayer: this.getNearestPlayer,
        health: this.health,
        hitTest: this.hitTest,
        collide: this.collide
    }
});