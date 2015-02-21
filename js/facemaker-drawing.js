/**
 * Created by Steve on 2/15/15.
 */


(function() {
    "use strict";

    var app = angular.module("drawing", ['flow']);

    app.directive('drawing', [ '$window', '$rootScope', 'model', function($window, $rootScope, model){
        return {
            restrict: "A",
            link: function(scope, element){
                var canvas = element;

                var drawing = false;
                var didDraw = false;

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

                        beginDraw(model.drawingTypeSelected, model.indexSelected);
                    }
                });

                $(window).mouseup(function(event){
                    if (drawing && didDraw) {

                        ++model.currentDrawingLayer;
                        model.layerSelected = model.currentDrawingLayer - 1;
                        console.log(model.layerSelected);
                        console.log(model.layers.length);
                        $rootScope.$digest();
                    }
                    didDraw = false;
                    drawing = false;
                });

                function beginDraw(drawingType, index) {
                    var sizeX = currentX - startX;
                    var sizeY = currentY - startY;

                    removeLayerWithRedraw(model.currentDrawingLayer);

                    switch(drawingType)
                    {
                        case model.DrawingTypeEnum.SHAPE:
                            switch(index) {
                                case 0:
                                    drawLine(startX, startY, currentX, currentY);
                                    break;
                                case 1:
                                    drawRect(startX, startY, sizeX, sizeY);
                                    break;
                            };
                            break;
                        case model.DrawingTypeEnum.IMAGE:
                            drawImage(startX, startY, sizeX, sizeY);
                            break;
                    }


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

                function dragDigest(layer) {
                    $rootScope.$digest();
                }

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
                function nonNegXY(startX, startY, sizeX, sizeY) {
                    var dims = {};
                    if (sizeX < 0) {
                        dims.xP = startX + sizeX;
                        dims.w = -sizeX;
                    }
                    else {
                        dims.xP = startX;
                        dims.w = sizeX;
                    }
                    if (sizeY < 0) {
                        dims.yP = startY + sizeY;
                        dims.h = -sizeY;
                    }
                    else {
                        dims.yP = startY;
                        dims.h = sizeY;
                    }
                    return dims;
                }

                function drawRect(startX, startY, sizeX, sizeY) {
                    var dims = nonNegXY(startX, startY, sizeX, sizeY);
                    if (dims.w === 0 || dims.h === 0)
                        return;
                    didDraw = true;
                    canvas.drawRect({
                        type: 'Rectangle',
                        draggable:true,
                        layer:true,
                        strokeStyle: '#fff',
                        strokeWidth: 4,
                        x: dims.xP,
                        y: dims.yP,
                        width: dims.w,
                        height: dims.h,
                        fromCenter: false,
                        drag: function() {
                            noDrawOnDrag();
                            dragDigest();

                            var layer = model.layers.filter(function(element) { return element.dragging == true;});
                            var index = model.layers.indexOf(layer[0]);

                            model.layerSelected = index;

                        }

                    });
                }

                function drawImage(startX, startY, sizeX, sizeY) {

                    canvas.drawImage({
                        type: 'Image',
                        source: scope.flow.files[model.indexSelected].file.name,
                        draggable:true,
                        layer:true,
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
