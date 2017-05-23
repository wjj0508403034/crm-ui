'use strict';

huoyunWidget.directive('widgetFormGroupText', [
  function() {
    return {
      restrict: 'A',
      scope: {
        prop: "=",
        value: "=ngModel",
        errorMessage: "="
      },
      replace: true,
      templateUrl: 'form-group/text/text.html',
      link: function($scope, ele, attrs) {}
    }
  }
]);