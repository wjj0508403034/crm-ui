'use strict';

huoyunWidget.directive('widgetHeader', function() {
  return {
    restrict: 'A',
    scope: {
      user: "=",
      boMeta: "="
    },
    templateUrl: 'header/header.html',
    link: function(scope, ele, attrs) {
      // alert()
    }
  }
});