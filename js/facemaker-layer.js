/**
 * Created by Steve on 2/15/15.
 */
(function() {
    "use strict";

    var app = angular.module("layers", []);

    app.controller("LayerController", [ '$scope', 'model',  function($scope, model) {
        $scope.layers = model.layers;
        $scope.$watch(function () { return model.layers }, function (newVal, oldVal) {
            if (typeof newVal !== 'undefined') {
                $scope.layers = model.layers;
            }
        });
        model.layerSelected = -1;

        $scope.isSelected = function(num) {
            return model.layerSelected === num;
        };
        $scope.select = function(num) {
            model.layerSelected = num;
        };
        $scope.deleteLayer = function(layerNum) {
            $('#face-canvas').removeLayer(layerNum)
                .drawLayers();
            --model.currentDrawingLayer;
            if (layerNum === model.layerSelected)
                model.layerSelected = -1;
            if (layerNum < model.layerSelected)
                --model.layerSelected;
        }
    }]);
})();