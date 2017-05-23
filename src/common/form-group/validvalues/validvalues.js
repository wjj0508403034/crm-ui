'use strict';

huoyunWidget.directive('widgetFormGroupValidValues', [
  function() {
    return {
      restrict: 'A',
      scope: {
        prop: "=",
        value: "=ngModel",
        errorMessage: "="
      },
      replace: true,
      templateUrl: 'form-group/validvalues/validvalues.html',
      link: function($scope, ele, attrs) {}
    }
  }
]);