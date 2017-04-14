'use strict';

huoyunWidget.directive('widgetBoListView', function () {
  return {
    restrict: 'A',
    scope: {
      boMetadata: "=",
      pageData: "=",
      onRowClicked: "&"
    },
    templateUrl: 'framework/bo.listview.html',
    link: function ($scope, ele, attrs) {

      $scope.clickRow = function (lineData, index) {
        console.log(`Click table line ${index}`);
        $scope.onRowClicked({
          lineData: lineData,
          index: index
        });
      };
    }
  }
});