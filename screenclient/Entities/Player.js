var Player = (function (color, x, y, id) {
    this.circle = new createjs.Shape();
    this.circle.graphics.beginFill(color).drawCircle(0, 0, 5);
    this.circle.x = x;
    this.circle.y = y;
    this.circle.regX = this.circle.graphics.command.radius;
    this.circle.regY = this.circle.graphics.command.radius;
    this.id = id;
    this.canShoot = true;
    this.acceleration = 2;
    function update() {

    }

    this.hitTest = function (object) {
        object = object.object;
        return !(this.object.x >= object.x + object.graphics.command.radius || this.object.x + this.object.graphics.command.radius <= object.x || this.object.y >= object.y + object.graphics.command.radius || this.object.y + this.object.graphics.command.radius <= object.y);
    };
    this.collide = function (object) {

    };
    return {
        object: this.circle,
        id: this.id,
        update: update,
        acceleration: this.acceleration,
        hitTest: this.hitTest,
        collide: this.collide,
        canShoot: this.canShoot
    };
});