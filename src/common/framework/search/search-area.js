'use strict';
huoyunWidget.directive('widgetSearchArea', ["$log", "SearchHelper", "SearchEvent",
  function($log, SearchHelper, SearchEvent) {
    return {
      restrict: 'A',
      scope: {
        boMetadata: "=",
        onSearch: "&"
      },
      templateUrl: 'framework/search/search-area.html',
      link: function($scope, ele, attrs) {
        $scope.searchData = {};

        $scope.onResetButtonClicked = function() {
          $log.info('Reset search condition.');
          $scope.$broadcast(SearchEvent.Reset);
          $scope.onSearch();
        };

        $scope.$on(SearchEvent.Changed, function(event) {
          $log.info('Search Expr:', $scope.searchData);
          var exprs = [];
          Object.keys($scope.searchData).forEach(function(key) {
            if ($scope.searchData[key]) {
              exprs.push($scope.searchData[key]);
            }
          });
          $scope.onSearch({
            "query": exprs.join(" and ")
          });
        });
      }
    }
  }
]);