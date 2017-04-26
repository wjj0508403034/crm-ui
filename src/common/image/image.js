'use strict';

huoyunWidget.directive('widgetImage', function() {
  return {
    restrict: 'A',
    scope: {
      src: "@"
    },
    replace: true,
    templateUrl: 'image/image.html',
    link: function($scope, ele, attrs) {

    }
  }
});