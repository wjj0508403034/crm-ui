'use strict';

huoyunWidget.directive('widgetSearchBoLabel', ["Dialog", "SearchHelper", "SearchEvent", "$timeout",
  function(Dialog, SearchHelper, SearchEvent, $timeout) {
    return {
      restrict: 'A',
      scope: {
        value: "=ngModel",
        prop: "="
      },
      templateUrl: 'search/bolabel/bolabelsearch.html',
      link: function($scope, ele, attrs) {
        $scope.selectedBos = [];

        $scope.$on(SearchEvent.Reset, function(event) {
          $scope.text = null;
          $scope.value = null;
          $scope.selectedBos = [];
        });

        $scope.onButtonClicked = function() {
          var options = {
            title: `设置搜索条件`,
            //templateUrl: $scope.prop.chooseFromTemplateUrl || "framework/choosefromlistview.html",
            //appendClassName: "bo-choose-from-list-dialog",
            templateUrl: $scope.prop.chooseFromTemplateUrl ||
              "framework/dialog/choose.multi.bo.items.dialog.html",
            appendClassName: "choose-multi-bo-items-dialog",
            params: {
              boName: $scope.prop.additionInfo.boName,
              boNamespace: $scope.prop.additionInfo.boNamespace,
              selectedBos: $scope.selectedBos
            },
            closeCallback: function(key, data) {
              if (key === "OK") {
                $scope.selectedBos = data || [];
                var labels = [];
                (data || []).forEach(function(bo, index) {
                  labels.push(bo[$scope.prop.additionInfo.labelField]);
                });
                $scope.text = labels.join(" , ");
                $scope.value = SearchHelper.getBoLabelSearchExpr($scope.prop, data);
                $timeout(function() {
                  $scope.$emit(SearchEvent.Changed);
                });
              }

            }
          };
          var dialog = Dialog.showConfirm(options);
        };
      }
    }
  }
]);