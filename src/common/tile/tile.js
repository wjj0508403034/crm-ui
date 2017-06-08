'use strict';

huoyunWidget.directive('widgetTile', ["$q", function($q) {
  return {
    restrict: 'A',
    scope: {
      tileData: "=",
    },
    replace: true,
    templateUrl: 'tile/tile.html',
    link: function($scope, ele, attrs) {
      $scope.$$number = "--";

      $scope.reload = function() {
        if (!$scope.tileData) {
          return;
        }

        if (typeof $scope.tileData.number === "function") {
          var result = $scope.tileData.number.apply($scope.tileData, []);
          if (result instanceof Promise || result instanceof $q) {
            result.then(function(data) {
              $scope.$$number = data;
            });
          } else {
            $scope.$$number = result;
          }
        } else {
          $scope.$$number = $scope.tileData.number;
        }
      };

      $scope.$watch("tileData", function(newVal, oldVal) {
        if (newVal) {
          $scope.reload();
        }
      });
    }
  }
}]);