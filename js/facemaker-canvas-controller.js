/**
 * Created by Steve on 2/15/15.
 */
(function () {
    "use strict";

    var app = angular.module("canvas", []);

    app.controller("CanvasController", ['$rootScope', '$scope', 'model', function ($rootScope, $scope, model) {
        $(document).ready(function () {
            $(function () {

                $(".layer-card").sortable({
                    start: function (event, ui) {
                        ui.item.oldPos = ui.item.index();
                    },
                    stop: function (event, ui) {
                        var HIDDEN_DIV = 1;
                        var newPos = ui.item.index()
                        var oldPos = ui.item.oldPos;

                        var temp = model.layers[oldPos];
                        model.layers.splice(oldPos, 1);
                        model.layers.splice(newPos, 0, temp);

                        $('#face-canvas').drawLayers();

                        if (oldPos === model.layerSelected)
                            model.layerSelected = newPos;
                        $rootScope.$digest();
                    }
                });
                $(".layer-card").disableSelection();
            });
        });

    }]);

})();