/**
 * Created by Steve on 2/15/15.
 */
(function() {
    "use strict";

    var app = angular.module("selection", []);

    app.controller("SelectController", [ 'model',  function(model) {
        model.indexSelected = 0;
        this.TypeEnum = model.DrawingTypeEnum;

        this.isSelected = function(type, index) {
            return type === model.drawingTypeSelected &&
                model.indexSelected === index;
        };
        this.select = function(type, index) {
            model.drawingTypeSelected = type;
            model.indexSelected = index;
        };

        this.shapes = [ "shape-line.png", "shape-rectangle.png", "shape-circle.png", "shape-triangle.png", "shape-path.png"];

    }]);
})();