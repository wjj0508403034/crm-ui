'use strict';

huoyunWidget.directive('widgetFormGroupLabelBoLabel', [
  function() {
    return {
      restrict: 'A',
      scope: {
        prop: "=",
        value: "=ngModel"
      },
      replace: true,
      templateUrl: 'form-group-label/bolabel/bolabel.html',
      link: function($scope, ele, attrs) {}
    }
  }
]);