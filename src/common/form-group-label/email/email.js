'use strict';

huoyunWidget.directive('widgetFormGroupLabelEmail', [
  function() {
    return {
      restrict: 'A',
      scope: {
        prop: "=",
        value: "=ngModel"
      },
      replace: true,
      templateUrl: 'form-group-label/email/email.html',
      link: function($scope, ele, attrs) {}
    }
  }
]);