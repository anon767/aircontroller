/* global createjs, queue */

//Background
var Background = (function (image, queue) {

    var img = new Image(800, 800);
    img.src = queue.getResult(image).src;
    var canvasO = new createjs.Shape();
    canvasO.x = 0;
    canvasO.y = 0;
    canvasO.tickEnabled = false;
    canvasO.graphics.beginBitmapFill(img, 'repeat').drawRect(0, 0, 800,800);
    return canvasO;

});
