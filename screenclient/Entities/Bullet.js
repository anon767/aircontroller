var Bullet = (function (color, x, y, direction) {
    this.circle = new createjs.Shape();
    this.circle.graphics.beginFill(color).drawCircle(0, 0, 2);
    this.circle.x = x;
    this.circle.y = y;
    this.circle.direction = direction;
    this.circle.time = 1000;
    var update = function (delta) {
        this.object.time--;
        this.object.x += this.object.direction.x*10/delta;
        this.object.y += this.object.direction.y*10/delta;
        return this.object.time >0;
    };

    return {
        object: this.circle,
        id: this.id,
        update: update
    }
});