'use strict';

huoyunWidget.directive('widgetHeader', ["Session",
  function(SessionProvider) {
    return {
      restrict: 'A',
      scope: {},
      templateUrl: 'header/header.html',
      link: function($scope, ele, attrs) {
        SessionProvider.on("user", function(oldValue, newValue) {
          $scope.user = newValue;
        });

        SessionProvider.on("company", function(oldValue, newValue) {
          $scope.company = newValue;
        });
      }
    }
  }
]);