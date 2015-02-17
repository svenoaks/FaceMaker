/**
 * Created by Steve on 2/15/15.
 */


(function() {
    "use strict";

    var app = angular.module("canvas", []);

    app.directive("drawing", [ '$rootScope', 'model', function($rootScope, model){
        return {
            restrict: "A",
            link: function(scope, element){
                var canvas = element;

                var drawing = false;

                var startX, startY;
                var currentX, currentY;

                model.layers = canvas.getLayers();

                canvas.mousedown(function(event){

                    startX = event.offsetX;
                    startY = event.offsetY;

                    drawing = true;
                });

                canvas.mousemove(function(event){
                    if(drawing){
                        // get current mouse position
                        currentX = event.offsetX;
                        currentY = event.offsetY;

                        beginDraw(model.drawSelected);
                    }
                });

                canvas.mouseup(function(event){
                    if (drawing) {
                        drawing = false;
                        ++model.currentDrawingLayer;
                        scope.$digest();
                    }
                });

                function beginDraw(toDraw) {
                    var sizeX = currentX - startX;
                    var sizeY = currentY - startY;

                    removeLayerWithRedraw(model.currentDrawingLayer);

                    switch(toDraw) {
                        case 0:
                            drawLine(startX, startY, currentX, currentY);
                            break;
                        case 1:
                            drawRect(startX, startY, sizeX, sizeY);
                            break;
                    };
                };

                function removeLayerWithRedraw(layNum) {
                    canvas.removeLayer(layNum);
                    canvas.drawLayers();
                };

                function noDrawOnDrag() {
                    if (drawing) {
                        drawing = false;
                    }
                    removeLayerWithRedraw(model.currentDrawingLayer);
                };

                function drawLine(startX, startY, endX, endY) {
                    canvas.drawLine({
                        type: 'Line',
                        draggable:true,
                        layer:true,
                        strokeStyle: '#fff',
                        strokeWidth: 4,
                        x1: startX,
                        y1: startY,
                        x2: endX,
                        y2: endY,
                        drag: noDrawOnDrag
                    });
                };

                function drawRect(startX, startY, sizeX, sizeY) {

                    canvas.drawRect({
                        type: 'Rectangle',
                        draggable:true,
                        layer:true,
                        strokeStyle: '#fff',
                        strokeWidth: 4,
                        x: startX,
                        y: startY,
                        width: sizeX,
                        height: sizeY,
                        fromCenter: false,
                        drag: noDrawOnDrag
                    });
                }
            }
        };
    }]);
})();
