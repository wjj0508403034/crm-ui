'use strict';

huoyunWidget.directive('widgetPagination', function () {
  return {
    restrict: 'A',
    scope: {
      pageData: "=",
      onPagingChanged: "&"
    },
    templateUrl: 'pagination/pagination.html',
    link: function ($scope, ele, attrs) {
      const MAXNumberCount = 5;
      $scope.numbers = [];

      $scope.$watch("pageData", function (newValue, oldValue) {
        if (newValue) {
          refresh(newValue);
        } else {
          $scope.numbers = [];
        }
      });

      $scope.onPagingClicked = function (pageIndex) {
        $scope.onPagingChanged({
          pageIndex: pageIndex
        });
      };

      function refresh(pageData) {
        $scope.numbers = [];
        var startIndex = parseInt(pageData.number / MAXNumberCount) * MAXNumberCount;
        var endIndex = startIndex + MAXNumberCount;
        if (endIndex > pageData.totalPages) {
          endIndex = pageData.totalPages;
        }
        for (var index = startIndex; index < endIndex; index++) {
          $scope.numbers.push(index);
        }
      }
    }
  }
});