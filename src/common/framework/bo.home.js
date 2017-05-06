'use strict';

huoyunWidget.directive('widgetBoHome', function() {
  return {
    restrict: 'A',
    scope: {
      boMetadata: "=",
      boData: "="
    },
    templateUrl: 'framework/bo.home.html',
    link: function($scope, ele, attrs) {

    }
  }
});