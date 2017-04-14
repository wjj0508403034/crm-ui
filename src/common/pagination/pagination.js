'use strict';

huoyunWidget.directive('widgetPagination', function () {
  return {
    restrict: 'A',
    scope: {
      pageData: "="
    },
    templateUrl: 'pagination/pagination.html',
    controller: "paginationController",
    link: function ($scope, ele, attrs) {
      $scope.numbers = [];
      if ($scope.pageData) {
        const MAXNumberCount = 5;
        for (var index = $scope.pageData.number; index + MAXNumberCount < $scope.pageData.totalPages; index++) {
          $scope.numbers.push(index);
        }
      }

      $scope.$on("pageData", function () {
        const MAXNumberCount = 5;
        for (var index = $scope.pageData.number; index + MAXNumberCount < $scope.pageData.totalPages; index++) {
          $scope.numbers.push(index);
        }
      });
    }
  }
});

huoyunWidget.controller("paginationController",
  ["$scope", function ($scope) {
    var ss = $scope.pageData;

    $scope.$on("pageData", function () {
      const MAXNumberCount = 5;
      for (var index = $scope.pageData.number; index + MAXNumberCount < $scope.pageData.totalPages; index++) {
        $scope.numbers.push(index);
      }
    });
  }]);