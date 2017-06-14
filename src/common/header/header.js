'use strict';

huoyunWidget.directive('widgetHeader', function() {
  return {
    restrict: 'A',
    scope: {
      user: "=",
      company: "="
    },
    templateUrl: 'header/header.html',
    link: function(scope, ele, attrs) {}
  }
});