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
        var businessKeyProp = null;

        $scope.$watch("boMetadata", function(newValue, oldValue, scope) {
          if (newValue) {
            businessKeyProp = $scope.boMetadata.propMap[$scope.boMetadata.businessKey];
            $scope.simpleSearchPlaceHolder = `搜索${$scope.boMetadata.label} (${businessKeyProp.label})`;
          }
        });

        $scope.onOpenAdvanceButtonClicked = function(isAdvance) {
          $scope.advanceSearch = isAdvance;
        };

        $scope.onSearchButtonClicked = function() {
          if (businessKeyProp) {
            $scope.onSearch({
              "query": SearchHelper.getGeneralSearchExpr(businessKeyProp, $scope.simpleSearchText)
            });
          } else {
            console.log("Cannot search, beacuse no set business key.");
          }
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