'use strict';

huoyunWidget.directive('widgetBoListView', ['Dialog', function(Dialog) {
  return {
    restrict: 'A',
    scope: {
      boMetadata: "=",
      pageData: "=",
      onRowClicked: "&",
      onPagingChanged: "&",
      propTemplates: "=",
      buttons: "=",
      tableTitle: "@"
    },
    templateUrl: 'framework/bo.listview.html',
    link: function($scope, ele, attrs) {

      $scope.clickRow = function(lineData, index) {
        console.log(`Click table line ${index}`);
        $scope.onRowClicked({
          lineData: lineData,
          index: index
        });
      };

      $scope.onButtonClicked = function(button) {
        if (typeof button.onClickedHandler === "function") {
          button.onClickedHandler.apply($scope, []);
        }
      };

      $scope.onPagingChangedHandler = function(pageIndex) {
        console.log(`Paging button [${pageIndex}] clicked.`);
        $scope.onPagingChanged({
          pageIndex: pageIndex
        });
      };
    }
  }
}]);