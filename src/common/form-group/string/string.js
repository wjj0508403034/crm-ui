'use strict';

huoyunWidget.directive('widgetFormGroupString', [
  function() {
    return {
      restrict: 'A',
      scope: {
        prop: "=",
        value: "=ngModel",
        errorMessage: "="
      },
      replace: true,
      templateUrl: 'form-group/string/string.html',
      link: function($scope, ele, attrs) {}
    }
  }
]);