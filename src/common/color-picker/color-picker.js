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

      var cancleWatch = $scope.$watch('value', function(newVal, oldVal) {
        if (newVal) {
          button.colorpicker("val", newVal);
          cancleWatch();
        }
      });

      button.on("change.color", function(event, color) {
        $scope.value = color;
      });

      $scope.style = function() {
        return {
          "background-color": `${$scope.value} !important`
        };
      };


      $scope.onColorPickerClick = function(event) {
        button.colorpicker("showPalette");
      };
    }
  };
}]);