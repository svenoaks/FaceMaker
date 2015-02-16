/**
 * Created by Steve on 2/15/15.
 */
(function() {
    "use strict";

    var app = angular.module("selection", []);

    app.controller("SelectController", [ 'model',  function(model) {
        model.drawSelected = 0;

        this.isSelected = function(num) {
            return model.drawSelected === num;
        };
        this.select = function(num) {
            model.drawSelected = num;
        };

    }]);
})();