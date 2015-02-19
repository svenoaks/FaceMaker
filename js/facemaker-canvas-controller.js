/**
 * Created by Steve on 2/15/15.
 */
(function() {
    "use strict";

    var app = angular.module("canvas", []);

    app.controller("CanvasController", [ '$scope', 'model',  function($scope, model) {
        $( document ).ready(function() {
            $(function() {

                $( ".layer-card" ).sortable({
                    start: function(event, ui) {
                        ui.item.oldPos = ui.item.index();
                    },
                    stop: function(event, ui) {
                        var HIDDEN_DIV = 1;
                        var newPos = ui.item.index() - HIDDEN_DIV;
                        var oldPos = ui.item.oldPos - HIDDEN_DIV;

                        var canvas = $('#face-canvas');

                        if (oldPos >= newPos)
                        {
                            var temp = model.layers[oldPos];
                            model.layers.splice(oldPos, 1);
                            model.layers.splice(newPos, 0, temp);
                        }
                        else
                        {

                        }
                        
                        canvas.drawLayers();

                        if (oldPos === model.layerSelected)
                            model.layerSelected = newPos;
                    }
                });
                $( ".layer-card" ).disableSelection();
            });
        });

    }]);

})();