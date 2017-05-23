'use strict';

huoyunWidget.directive('widgetFormGroupDate', [
  function() {
    return {
      restrict: 'A',
      scope: {
        prop: "=",
        value: "=ngModel",
        errorMessage: "="
      },
      replace: true,
      templateUrl: 'form-group/date/date.html',
      link: function($scope, ele, attrs) {}
    }
  }
]);