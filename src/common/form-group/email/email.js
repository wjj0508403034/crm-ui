'use strict';

huoyunWidget.directive('widgetFormGroupEmail', [
  function() {
    return {
      restrict: 'A',
      scope: {
        prop: "=",
        value: "=ngModel"
      },
      replace: true,
      templateUrl: 'form-group/email/email.html',
      link: function($scope, ele, attrs) {}
    }
  }
]);