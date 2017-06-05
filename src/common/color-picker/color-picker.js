'use strict';

huoyunWidget.directive("widgetColorPicker", ["$log", function($log) {
  return {
    restrict: "A",
    templateUrl: "color-picker/color-picker.html",
    replace: true,
    scope: {
      value: "=ngModel",
      placeholder: "@"
    },
    link: function($scope, elem, attrs) {
      var button = elem.find("input");

      button.colorpicker({
        hideButton: true
      });

      button.on("change.color", function(event, color) {
        $scope.value = color;
        button.css("background-color", color + " !important");
      });

      // $scope.$watch("ngModel", function() {
      //   button.css("background-color", $scope.ngModel);
      // });
    }
  };
}]);