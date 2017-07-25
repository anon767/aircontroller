var Bullet = (function (color, x, y, direction) {
    this.circle = new createjs.Shape();
    this.circle.graphics.beginFill(color).drawCircle(0, 0, 2);
    this.circle.x = x;
    this.circle.y = y;
    this.direction = direction;
    this.circle.time = 1000;
    var update = function (delta) {
        circle.time--;
        circle.x += direction.x*delta/100;
        circle.y += direction.y*delta/100;
        return circle.time >0;
    };

    return {
        object: this.circle,
        id: this.id,
        update: update,
    }
});