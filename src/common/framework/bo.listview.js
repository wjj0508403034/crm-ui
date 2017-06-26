'use strict';



huoyunWidget.constant("TableSelectEvent", {
  Changed: "HuoYun.Table.TableSelectEvent.Changed"
});

huoyunWidget.directive('widgetBoListView', ["$log", 'Dialog', "HuoyunWidgetConstant", "TableSelectEvent", "$injector",
  "BoTemplate",
  function($log, Dialog, HuoyunWidgetConstant, TableSelectEvent, $injector, BoTemplateProvider) {
    return {
      restrict: 'A',
      scope: {
        boMetadata: "=",
        pageData: "=",
        onRowClicked: "&",
        onPagingChanged: "&",
        buttons: "=",
        tableTitle: "@",
        selectionMode: "@",
        options: "="
      },
      templateUrl: 'framework/bo.listview.html',
      link: function($scope, ele, attrs) {
        $scope.clickRow = function(lineData, index) {
          $log.info(`Click table line ${index}`);
          if ($scope.selectionMode === HuoyunWidgetConstant.SelectionMode.Single) {
            lineData.$$selected = true;
            $scope.pageData.content.forEach(function(lineItem) {
              if (lineItem !== lineData) {
                lineItem.$$selected = false;
              }
            });
            $scope.$emit(TableSelectEvent.Changed, lineData);
          } else if ($scope.selectionMode === HuoyunWidgetConstant.SelectionMode.Multiple) {
            lineData.$$selected = !lineData.$$selected;
            var selectedItems = $scope.pageData.content.filter(function(lineItem) {
              return lineItem.$$selected;
            });
            $scope.$emit(TableSelectEvent.Changed, selectedItems);
          } else {
            $scope.onRowClicked({
              lineData: lineData,
              index: index
            });
          }
        };

        $scope.onButtonClicked = function(button) {
          if (typeof button.onButtonClicked === "function") {
            button.onButtonClicked.apply(button.$scope || $scope, [button, $injector]);
          } else {
            $log.warn("No click handler for this button", button);
          }
        };

        $scope.getPropTemplateUrl = function(boMetadata, prop) {
          if (boMetadata && prop) {
            return BoTemplateProvider.getListPagePropTemplateUrl(boMetadata.boNamespace, boMetadata.boName,
              prop.name);
          }
          return null;
        };

        $scope.onPagingChangedHandler = function(pageIndex) {
          $log.info(`Paging button [${pageIndex}] clicked.`);
          $scope.onPagingChanged({
            pageIndex: pageIndex
          });
        };

        $scope.isButtonDisabled = function(button) {
          if (!button.hasOwnProperty("disabled")) {
            return false;
          }

          if (typeof button.disabled === "boolean") {
            return button.disabled;
          }

          if (typeof button.disabled === "function") {
            return button.disabled.apply(button.$scope || $scope, [button, $injector]);
          }

          $log.warn("Button disable set invalid", button);
          return true;
        };

        $scope.isButtonVisibility = function(button) {
          if (!button.hasOwnProperty("visibility")) {
            return true;
          }

          if (typeof button.visibility === "boolean") {
            return button.visibility;
          }

          if (typeof button.visibility === "function") {
            return button.visibility.apply(button.$scope || $scope, [button, $injector])
          }

          return false;
        };


      }
    }
  }
]);