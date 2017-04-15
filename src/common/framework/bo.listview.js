'use strict';

huoyunWidget.directive('widgetBoListView', function () {
  return {
    restrict: 'A',
    scope: {
      boMetadata: "=",
      pageData: "=",
      onRowClicked: "&",
      onPagingChanged: "&"
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

      $scope.onPagingChangedHandler = function (pageIndex) {
        console.log(`Paging button [${pageIndex}] clicked.`);
        $scope.onPagingChanged({
          pageIndex: pageIndex
        });
      };
    }
  }
});