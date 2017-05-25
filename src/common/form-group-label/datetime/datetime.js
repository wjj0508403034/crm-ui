'use strict';

huoyunWidget.directive('widgetFormGroupLabelDateTime', [
  function() {
    return {
      restrict: 'A',
      scope: {
        prop: "=",
        value: "=ngModel"
      },
      replace: true,
      templateUrl: 'form-group-label/datetime/datetime.html',
      link: function($scope, ele, attrs) {}
    }
  }
]);