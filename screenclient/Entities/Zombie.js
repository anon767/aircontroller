var Zombie = (function (x, y) {
    this.circle = new createjs.Shape();
    this.circle.graphics.beginFill("red").drawCircle(0, 0, 5);
    this.circle.x = x;
    this.circle.y = y;
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
    }
    this.update = function (playerList, delta) {
        var nearestPlayer = this.getNearestPlayer(playerList);
        if (nearestPlayer === null) return;
        var angle = Math.atan2(nearestPlayer.object.y - this.object.y, nearestPlayer.object.x - this.object.x);
        this.object.x += Math.cos(angle) * delta * this.acceleration;
        this.object.y += Math.sin(angle) * delta * this.acceleration;
    };

    return {
        object: this.circle,
        id: this.circle.id,
        update: this.update,
        acceleration: this.acceleration,
        getNearestPlayer: this.getNearestPlayer
    }
});