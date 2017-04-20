'use strict';

huoyunWidget.directive('widgetFlash', function () {
  return {
    restrict: 'A',
    scope: {
      message: "@",
      onClosed: "&"
    },
    replace: true,
    templateUrl: 'flash/flash.html',
    link: function ($scope, ele, attrs) {
      ele.bind('closed.bs.alert', function () {
        console.log("Closed the flash.");
        $scope.onClosed({});
      });
    }
  }
});



