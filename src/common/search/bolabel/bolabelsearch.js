'use strict';

huoyunWidget.directive('widgetSearchBoLabel', ["Dialog", "SearchHelper", "SearchEvent", "$timeout", "BoDialogFactory",
  "HuoyunWidgetConstant",
  function(Dialog, SearchHelper, SearchEvent, $timeout, BoDialogFactory, HuoyunWidgetConstant) {
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
            title: "设置搜索条件",
            boNamespace: $scope.prop.additionInfo.boNamespace,
            boName: $scope.prop.additionInfo.boName,
            selectedItems: $scope.selectedBos,
            mode: HuoyunWidgetConstant.SelectionMode.Multiple
          };

          BoDialogFactory.openChooseFromList(options)
            .then(function(dialogResult) {
              if (dialogResult.key === "OK") {
                $scope.selectedBos = dialogResult.data || [];
                var labels = [];
                (dialogResult.data || []).forEach(function(bo, index) {
                  labels.push(bo[$scope.prop.additionInfo.labelField]);
                });
                $scope.text = labels.join(" , ");
                $scope.value = SearchHelper.getBoLabelSearchExpr($scope.prop, dialogResult.data);
                $timeout(function() {
                  $scope.$emit(SearchEvent.Changed);
                });
              }
            });
        };
      }
    }
  }
]);