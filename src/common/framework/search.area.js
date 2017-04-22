'use strict';

huoyunWidget.directive('widgetSearchArea', function () {
  return {
    restrict: 'A',
    scope: {
      boMetadata: "=",
      onSearch: "&"
    },
    templateUrl: 'framework/search.area.html',
    link: function ($scope, ele, attrs) {
      $scope.simpleSearchText = null;
      $scope.advanceSearch = false;
      $scope.onOpenAdvanceButtonClicked = function (isAdvance) {
        $scope.advanceSearch = isAdvance;
      };

      $scope.onSearchButtonClicked = function () {
        var propName = $scope.boMetadata.businessKey;
        $scope.onSearch({
          "query": `${propName} like '%${$scope.simpleSearchText}%'`
        });
      };
    }
  }
});