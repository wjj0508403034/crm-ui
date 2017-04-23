'use strict';

huoyunWidget.directive('widgetSearchBoLabel', ["Dialog", "SearchHelper",
  function(Dialog, SearchHelper) {
    return {
      restrict: 'A',
      scope: {
        value: "=ngModel",
        prop: "="
      },
      templateUrl: 'search/bolabel/bolabelsearch.html',
      link: function($scope, ele, attrs) {
        $scope.selectedBos = [];

        $scope.onButtonClicked = function() {
          var options = {
            title: `设置搜索条件`,
            templateUrl: $scope.prop.chooseFromTemplateUrl || "framework/choosefromlistview.html",
            appendClassName: "bo-choose-from-list-dialog",
            params: {
              boName: $scope.prop.additionInfo.boName,
              boNamespace: $scope.prop.additionInfo.boNamespace,
              multiSelected: true,
              selectedBos: $scope.selectedBos
            },
            closeCallback: function(key, data) {
              $scope.selectedBos = data || [];
              if (key === "OK") {
                var labels = [];
                (data || []).forEach(function(bo, index) {
                  labels.push(bo[$scope.prop.additionInfo.labelField]);
                });
                $scope.text = labels.join(" , ");
                $scope.value = SearchHelper.getBoLabelSearchExpr($scope.prop, data);
              }

            }
          };
          var dialog = Dialog.showConfirm(options);
        };
      }
    }
  }
]);