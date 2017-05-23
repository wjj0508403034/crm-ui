'use strict';

huoyunWidget.directive('widgetBoListView', ['Dialog', function(Dialog) {
  return {
    restrict: 'A',
    scope: {
      boMetadata: "=",
      pageData: "=",
      onRowClicked: "&",
      onPagingChanged: "&",
      onCreate: "&",
      disableCreate: "="
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

      $scope.onPagingChangedHandler = function(pageIndex) {
        console.log(`Paging button [${pageIndex}] clicked.`);
        $scope.onPagingChanged({
          pageIndex: pageIndex
        });
      };

      $scope.onCreateButtonClicked = function() {
        $scope.onCreate();
      };

      $scope.onSortHandler = function() {
        var options = {
          title: `${$scope.boMetadata.label}排序`,
          templateUrl: "framework/sortListView.html",
          appendClassName: "sort-list-view-dialog",
          params: {
            pageData: angular.copy($scope.pageData.content),
            boMetadata: $scope.boMetadata
          },
          closeCallback: function(key, data) {
            if (key === "OK") {
              $scope.pageData.content = data;
            }

          }
        };
        var dialog = Dialog.showConfirm(options);
      };

      $scope.onAdjustTableColumnsButtonClicked = function() {
        var options = {
          title: `调整表格字段`,
          templateUrl: "framework/dialog/adjust.table.columns.dialog.html",
          appendClassName: "adjust-table-columns-dialog",
          params: {
            boMetadata: $scope.boMetadata
          },
          closeCallback: function(key, data) {
            if (key === "OK") {
              $scope.boMetadata.listview.properties = data;
            }
          }
        };
        var dialog = Dialog.showConfirm(options);
      };

    }
  }
}]);