'use strict';

huoyunWidget.directive('widgetFormGroupColorPicker', [
  function() {
    return {
      restrict: 'A',
      scope: {
        prop: "=",
        value: "=ngModel",
        errorMessage: "="
      },
      replace: true,
      templateUrl: 'form-group/colorpicker/colorpicker.html',
      link: function($scope, ele, attrs) {}
    }
  }
]);