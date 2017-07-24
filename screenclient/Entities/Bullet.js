var Bullet = (function (color, x, y) {
    this.circle = new createjs.Shape();
    this.circle.graphics.beginFill(color).drawCircle(0, 0, 2);
    this.circle.x = x;
    this.circle.y = y;
    function update() {

    }

    return {
        object: this.circle,
        id: this.id,
        update: update,
    }
});