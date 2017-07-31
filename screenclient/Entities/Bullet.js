var Bullet = (function (color, x, y, direction, gameState) {
    this.circle = new createjs.Shape();
    this.circle.graphics.beginFill(color).drawCircle(0, 0, 1);
    this.circle.x = x;
    this.circle.y = y;
    this.circle.direction = direction;
    this.circle.time = 100;
    this.circle.regX = this.circle.graphics.command.radius;
    this.circle.regY = this.circle.graphics.command.radius;
    this.damage = 4;
    this.timeout = 200;
    this.drawBack = 2;
    this.type = "bullet";
    var update = function (delta) {
        this.object.time--;
        this.object.x += this.object.direction.x * delta;
        this.object.y += this.object.direction.y * delta;
        return this.object.time > 0;
    };
    this.hitTest = function (object) {
        var object = object.object;
        return !(this.object.x >= object.x + object.graphics.command.radius || this.object.x + this.object.graphics.command.radius <= object.x || this.object.y >= object.y + object.graphics.command.radius || this.object.y + this.object.graphics.command.radius <= object.y);
    };
    this.collide = function (object) {

    };
    this.delete = function (i) {
        gameState.stage.removeChild(this.object);
        delete gameState.bullets[i];
        gameState.bullets.splice(i, 1);
    };
    return {
        object: this.circle,
        id: this.circle.id,
        update: update,
        damage: this.damage,
        hitTest: this.hitTest,
        collide: this.collide,
        type: this.type,
        drawBack: this.drawBack,
        destroy: this.delete,
        timeout: this.timeout
    }
});