/**
 * Created by Steve on 2/20/15.
 */
(function() {
    "use strict";

    var app = angular.module("properties", []);

    app.controller("PropertiesController", [ '$scope', 'model',  function($scope, model) {
        $scope.layers = model.layers;
        $scope.$watch(function () { return model.layers }, function (newVal, oldVal) {
            if (typeof newVal !== 'undefined') {
                $scope.layers = model.layers;
            }
        });

        $scope.xOffset = 0;

        var xListener;
        $scope.$watch(function () { return model.layerSelected }, function (newVal, oldVal) {
            if (typeof newVal !== 'undefined' && newVal !== -1) {
                if (typeof xListener !== 'undefined') xListener();
                $scope.xOffset = $scope.layers[model.layerSelected].x;
                xListener = $scope.$watch(function () {
                        if (typeof $scope.layers[model.layerSelected] !== 'undefined')
                            return $scope.layers[model.layerSelected].x;
                    },
                    function (newVal, oldVal) {
                        $scope.xOffset = newVal;
                });

            }
        });

    }]);
})();