'use strict';

huoyunWidget.directive('widgetFormGroupPrice', [
  function() {
    return {
      restrict: 'A',
      scope: {
        prop: "=",
        value: "=ngModel",
        errorMessage: "="
      },
      replace: true,
      templateUrl: 'form-group/price/price.html',
      link: function($scope, ele, attrs) {}
    }
  }
]);