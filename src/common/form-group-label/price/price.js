'use strict';

huoyunWidget.directive('widgetFormGroupLabelPrice', [
  function() {
    return {
      restrict: 'A',
      scope: {
        prop: "=",
        value: "=ngModel"
      },
      replace: true,
      templateUrl: 'form-group-label/price/price.html',
      link: function($scope, ele, attrs) {}
    }
  }
]);