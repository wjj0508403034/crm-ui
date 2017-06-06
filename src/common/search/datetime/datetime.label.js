'use strict';

huoyunWidget.directive('widgetSearchDateTimeLabel', ["Dialog", "$filter", "SearchHelper", "SearchEvent", "$timeout",
  function(Dialog, $filter, SearchHelper, SearchEvent, $timeout) {
    return {
      restrict: 'A',
      scope: {
        value: "=ngModel",
        prop: "="
      },
      templateUrl: 'search/datetime/datetime.label.html',
      link: function($scope, ele, attrs) {

        $scope.$on(SearchEvent.Reset, function(event) {
          $scope.text = null;
          $scope.value = null;
        });

        $scope.onButtonClicked = function() {
          var options = {
            title: `设置搜索条件`,
            templateUrl: "choose.from.list/search/datetime/datetime.html",
            appendClassName: "general-choose-from-list-dialog",
            params: {
              prop: $scope.prop
            },
            closeCallback: function(key, data) {
              if (key === "OK") {
                if (data.name === 'custom') {
                  var startDate = formatDate(data.startDate);
                  var endDate = formatDate(data.endDate);
                  $scope.text = `${startDate} ~ ${endDate}`;
                } else {
                  $scope.text = data.label;
                }

                $scope.value = SearchHelper.getDataSearchExpr($scope.prop, data);
                $timeout(function() {
                  $scope.$emit(SearchEvent.Changed);
                });
              }
            }
          };
          var dialog = Dialog.showConfirm(options);
        };

        function formatDate(time) {
          var date = $filter('joda')(time);
          if (date) {
            return $filter('date')(date, 'yyyy-MM-dd');
          }
        }
      }
    }
  }
]);