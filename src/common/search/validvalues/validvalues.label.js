'use strict';

huoyunWidget.directive('widgetSearchValidValuesLabel', ["Dialog", "SearchHelper",
  function (Dialog, SearchHelper) {
    return {
      restrict: 'A',
      scope: {
        value: "=ngModel",
        prop: "="
      },
      templateUrl: 'search/validvalues/validvalues.label.html',
      link: function ($scope, ele, attrs) {
        $scope.onButtonClicked = function () {
          var options = {
            title: `设置搜索条件`,
            templateUrl: "choose.from.list/search/validvalues/validvalues.html",
            appendClassName: "general-choose-from-list-dialog",
            params: {
              prop: $scope.prop
            },
            closeCallback: function (key, data) {
              if (key === "OK") {
                $scope.value = data;
                var labels = [];
                (data || []).forEach(function (validvalue, index) {
                  labels.push(validvalue.label);
                });
                $scope.text = labels.join(" , ");
                $scope.value = SearchHelper.getValidValueSearchExpr($scope.prop, data);
              }
            }
          };
          var dialog = Dialog.showConfirm(options);
        };

      }
    }
  }]);