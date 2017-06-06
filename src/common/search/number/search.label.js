'use strict';

huoyunWidget.directive('widgetSearchNumberLabel', ["Dialog", "SearchHelper", "SearchEvent", "$timeout",
  function(Dialog, SearchHelper, SearchEvent, $timeout) {
    return {
      restrict: 'A',
      scope: {
        value: "=ngModel",
        prop: "="
      },
      templateUrl: 'search/number/search.label.html',
      link: function($scope, ele, attrs) {
        $scope.$on(SearchEvent.Reset, function(event) {
          $scope.data = null;
          $scope.value = null;
        });

        $scope.onButtonClicked = function() {
          var options = {
            title: `设置搜索条件`,
            templateUrl: "search/number/condition.dialog.html",
            appendClassName: "general-choose-from-list-dialog",
            params: {
              prop: $scope.prop,
              data: angular.copy($scope.data)
            },
            closeCallback: function(key, data) {
              if (key === "OK") {
                $scope.data = data;
                $scope.value = SearchHelper.getNumberSearchExpr($scope.prop, data);
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