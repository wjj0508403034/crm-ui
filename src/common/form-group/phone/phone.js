'use strict';

huoyunWidget.directive('widgetFormGroupPhone', [
  function() {
    return {
      restrict: 'A',
      scope: {
        prop: "=",
        value: "=ngModel",
        errorMessage: "="
      },
      replace: true,
      templateUrl: 'form-group/phone/phone.html',
      link: function($scope, ele, attrs) {}
    }
  }
]);