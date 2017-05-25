'use strict';

huoyunWidget.directive('widgetFormGroupLabelValidValues', [
  function() {
    return {
      restrict: 'A',
      scope: {
        prop: "=",
        value: "=ngModel"
      },
      replace: true,
      templateUrl: 'form-group-label/validvalues/validvalues.html',
      link: function($scope, ele, attrs) {}
    }
  }
]);