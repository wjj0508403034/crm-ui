'use strict';
huoyunWidget.directive('widgetSearchArea', ["SearchHelper",
  function(SearchHelper) {
    return {
      restrict: 'A',
      scope: {
        boMetadata: "=",
        onSearch: "&"
      },
      templateUrl: 'framework/search.area.html',
      link: function($scope, ele, attrs) {
        $scope.simpleSearchText = "";
        $scope.searchData = {};

        $scope.onSearchButtonClicked = function() {
          console.log('Search Expr:');
          console.log($scope.searchData);
          var exprs = [];
          Object.keys($scope.searchData).forEach(function(key) {
            if ($scope.searchData[key]) {
              exprs.push($scope.searchData[key]);
            }
          });
          $scope.onSearch({
            "query": exprs.join(" and ")
          });
        };
      }
    }
  }
]);