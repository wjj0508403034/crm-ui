'use strict';

huoyunWidget.directive('widgetFormGroupEmail', [
  function() {
    return {
      restrict: 'A',
      scope: {
        prop: "=",
        value: "=ngModel",
        errorMessage: "="
      },
      replace: true,
      templateUrl: 'form-group/email/email.html',
      link: function($scope, ele, attrs) {}
    }
  }
]);