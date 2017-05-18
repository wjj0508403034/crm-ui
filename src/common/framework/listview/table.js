'use strict';

huoyunWidget.directive('widgetBoListViewTable', ['Dialog', function(Dialog) {
  return {
    restrict: 'A',
    scope: {
      boMetadata: "=",
      pageData: "=",
      onRowClicked: "&"
    },
    templateUrl: 'framework/listview/table.html',
    link: function($scope, ele, attrs) {

      $scope.clickRow = function(lineData, index) {
        console.log(`Click table line ${index}`);
        $scope.onRowClicked({
          lineData: lineData,
          index: index
        });
      };
    }
  }
}]);