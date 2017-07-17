/* global createjs, queue */

//Background
var Background = (function (image, queue) {
    var img = new Image(800, 800);
    img.src = queue.getResult(image).src;
    var canvasO = new createjs.Shape();
    canvasO.x = 0;
    canvasO.y = 0;
    canvasO.scaleX = (window.innerWidth / 1024)
    canvasO.scaleY = (window.innerHeight / 768);
    canvasO.tickEnabled = false;
    canvasO.graphics.beginBitmapFill(img, 'no-repeat').drawRect(0, 0, window.innerWidth, window.innerHeight);
    return canvasO;

});
