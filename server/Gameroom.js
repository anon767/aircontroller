/**
 * Created by Tom on 16.07.2017.
 */
var GameRoom = (function () {
    var players = [];
    var gameScreen = null;
    var id = 0;
    return {
        id: id,
        gameScreen: gameScreen,
        players: players
    }
});
module.exports = GameRoom;