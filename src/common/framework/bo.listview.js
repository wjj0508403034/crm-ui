'use strict';

huoyunWidget.directive('widgetBoListView', ['Dialog',function (Dialog) {
  return {
    restrict: 'A',
    scope: {
      boMetadata: "=",
      pageData: "=",
      onRowClicked: "&",
      onPagingChanged: "&",
      onCreate: "&"
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

      $scope.onCreateButtonClicked = function () {
        $scope.onCreate();
      };

      $scope.onSortHandler=function(){
        var options = {
          title: `${$scope.boMetadata.label}排序`,
          templateUrl:"framework/sortListView.html",
          appendClassName: "sort-list-view-dialog",
          params: {
            properties: $scope.boMetadata.listview.properties,
            pageData:$scope.pageData
          },
          closeCallback: function(key, data) {
            if (key === "selected") {
              $scope.value = data;
            }

          }
        };
        var dialog = Dialog.showConfirm(options);
      }
    }
  }
}]);