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
        //$scope.isSelected = function()
    }]);
})();