'use strict';

huoyunWidget.directive('widgetTile', function() {
  return {
    restrict: 'A',
    scope: {
      number: "@",
      text: "@",
      stateLink: "@",
      icon: "@"
    },
    replace: true,
    templateUrl: 'tile/tile.html',
    link: function($scope, ele, attrs) {

    }
  }
});