/**
 * Created by Steve on 2/15/15.
 */
(function() {
    "use strict";

    var app = angular.module("model", []);

    app.factory("model", function () {
        return {
            currentDrawingLayer: 0,
            DrawingTypeEnum: {
                SHAPE: 0,
                TEXT: 1,
                IMAGE: 2
            },
            indexSelected: -1,
            drawingTypeSelected: -1

        };
    });
})();