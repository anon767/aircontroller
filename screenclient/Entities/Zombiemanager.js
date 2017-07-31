var Zombiemanager = (function (stage) {
    this.zombies = [];
    var levelCount = 5;
    var positions = [{x: -10, y: 0}, {x: -10, y: window.innerHeight / 2}, {x: -10, y: window.innerHeight},
        {x: window.innerWidth / 2, y: 10}, {x: window.innerWidth, y: 10}, {
            x: window.innerWidth,
            y: window.innerHeight
        }, {x: window.innerWidth / 2, y: window.innerHeight}]
    this.addZombie = function (amount) {
        for (var i = 0; i < amount; i++) {
            var pos = positions[Math.floor(Math.random() * positions.length)];
            var x = pos.x;
            var y = pos.y;
            var zombie = new Zombie(x, y, this);
            this.zombies[zombie.id] = zombie;
            stage.addChild(zombie.object);
        }
    };

    this.check = function (playerList, delta) {
        for (var i in this.zombies) {
            this.zombies[i].update(playerList, delta);
        }
        var size = this.zombies.filter(function (value) {
            return value !== undefined
        }).length;
        if (size < levelCount) {
            this.add(levelCount - size);
        }
    };
    this.kill = function (i) {
        if (typeof this.zombies[i] !== "undefined") {
            stage.removeChild(this.zombies[i].object);
        }
        delete this.zombies[i];
    };
    return {
        add: this.addZombie,
        zombies: this.zombies,
        check: this.check,
        kill: this.kill
    };
});