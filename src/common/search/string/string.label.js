'use strict';

huoyunWidget.directive('widgetSearchStringLabel', ["SearchHelper",
  function(SearchHelper) {
    return {
      restrict: 'A',
      scope: {
        value: "=ngModel",
        prop: "="
      },
      templateUrl: 'search/string/string.label.html',
      link: function($scope, ele, attrs) {
        $scope.$watch("text", function(newValue, oldValue, scope) {
          $scope.value = SearchHelper.getStringSearchExpr($scope.prop, newValue);
        });
      }
    }
  }
]);