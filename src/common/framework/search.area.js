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
        $scope.advanceSearch = false;
        $scope.searchData = {};
        $scope.onOpenAdvanceButtonClicked = function(isAdvance) {
          $scope.advanceSearch = isAdvance;
        };

        $scope.onSearchButtonClicked = function() {
          var propName = $scope.boMetadata.businessKey;
          var simpleSearchText = $scope.simpleSearchText;
          $scope.onSearch({
            "query": `${propName} like '${simpleSearchText}'`
          });
        };

        $scope.onAdvanceSearchButtonClicked = function() {
          console.log('Search Expr:');
          console.log($scope.searchData);
          var exprs = [];
          Object.keys($scope.searchData).forEach(function(key) {
            exprs.push($scope.searchData[key]);
          });
          $scope.onSearch({
            "query": exprs.join(" and ")
          });
        };
      }
    }
  }
]);