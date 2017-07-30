var Player = (function (color, x, y, id) {
    this.circle = new createjs.Shape();
    this.circle.graphics.beginFill(color).drawCircle(0, 0, 5);
    this.circle.x = x;
    this.circle.y = y;
    this.id = id;
    this.acceleration = 2;
    function update() {

    }

    return {
        object: this.circle,
        id: this.id,
        update: update,
        acceleration: this.acceleration
    }
});