'use strict';

huoyunWidget.directive('widgetFormGroupLabelDate', [
  function() {
    return {
      restrict: 'A',
      scope: {
        prop: "=",
        value: "=ngModel"
      },
      replace: true,
      templateUrl: 'form-group-label/date/date.html',
      link: function($scope, ele, attrs) {}
    }
  }
]);