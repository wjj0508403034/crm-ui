'use strict';

huoyunWidget.directive('widgetFormGroupDateTime', [
  function() {
    return {
      restrict: 'A',
      scope: {
        prop: "=",
        value: "=ngModel",
        errorMessage: "="
      },
      replace: true,
      templateUrl: 'form-group/datetime/datetime.html',
      link: function($scope, ele, attrs) {}
    }
  }
]);