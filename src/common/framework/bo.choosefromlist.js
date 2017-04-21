'use strict';

huoyunWidget.directive('widgetBoChooseFromList', function () {
  return {
    restrict: 'A',
    scope: {
      boMetadata: "=",
      pageData: "=",
      onRowClicked: "&",
      onPagingChanged: "&"
    },
    templateUrl: 'framework/bo.choosefromlist.html',
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