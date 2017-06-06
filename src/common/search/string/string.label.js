'use strict';

huoyunWidget.directive('widgetSearchStringLabel', ["SearchHelper", "SearchEvent", "$timeout",
  function(SearchHelper, SearchEvent, $timeout) {
    return {
      restrict: 'A',
      scope: {
        value: "=ngModel",
        prop: "="
      },
      templateUrl: 'search/string/string.label.html',
      link: function($scope, ele, attrs) {

        $scope.$on(SearchEvent.Reset, function(event) {
          $scope.text = null;
          $scope.value = null;
        });

        $scope.onTextInputChanged = function(text) {
          $scope.value = SearchHelper.getStringSearchExpr($scope.prop, text);
          $timeout(function() {
            $scope.$emit(SearchEvent.Changed);
          });
        };
      }
    }
  }
]);