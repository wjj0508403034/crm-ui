'use strict';

huoyunWidget.directive('widgetFormGroupLabelString', [
  function() {
    return {
      restrict: 'A',
      scope: {
        prop: "=",
        value: "=ngModel"
      },
      replace: true,
      templateUrl: 'form-group-label/string/string.html',
      link: function($scope, ele, attrs) {}
    }
  }
]);