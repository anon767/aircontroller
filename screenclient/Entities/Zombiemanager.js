var Zombiemanager = (function (stage) {
    this.zombies = [];
    var levelCount = 5;
    this.addZombie = function (amount) {
        for (var i = 0; i < amount; i++) {
            var x = -Math.floor((Math.random() * 50) + 1);
            var y = -Math.floor((Math.random() * 50) + 1);
            var zombie = new Zombie(x, y);
            this.zombies[zombie.id] = zombie;
            stage.addChild(zombie.object);
        }
    };
    this.check = function (playerList, delta) {
        for (i in this.zombies) {
            this.zombies[i].update(playerList, delta);
        }

        if (this.zombies.length < levelCount) {
            this.add(levelCount - this.zombies.length);
        }
    };
    return {
        add: this.addZombie,
        zombies: this.zombies,
        check: this.check
    };
});