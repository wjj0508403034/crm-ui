'use strict';

huoyunWidget.directive('widgetFormGroupText', [
  function() {
    return {
      restrict: 'A',
      scope: {
        prop: "=",
        value: "=ngModel"
      },
      replace: true,
      templateUrl: 'form-group/text/text.html',
      link: function($scope, ele, attrs) {}
    }
  }
]);