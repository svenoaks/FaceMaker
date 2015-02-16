/**
 * Created by Steve on 2/15/15.
 */
(function() {
    "use strict";

    $( document ).ready(function() {
        $(function() {

            $( ".layer-card" ).sortable({
                start: function(event, ui) {
                    ui.item.oldPos = ui.item.index();
                },
                stop: function(event, ui) {
                    var newPos = ui.item.index();
                    var oldPos = ui.item.oldPos;

                    $('#face-canvas').moveLayer(oldPos, newPos).drawLayers();
                }
            });
            $( ".layer-card" ).disableSelection();
        });
    });

})();