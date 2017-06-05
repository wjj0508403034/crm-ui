'use strict';

huoyunWidget.directive('widgetDatePicker', ['$filter', 'DateFormat',
  function($filter, DateFormat) {
    return {
      restrict: 'A',
      scope: {
        value: "=ngModel",
        placeholder: "@"
      },
      templateUrl: 'datepicker/datepicker.html',
      link: function($scope, ele, attrs) {
        /**用于控件里显示的日期格式 */
        var cancleWatch = $scope.$watch('value', function(newV, oldV) {
          if (newV) {
            var date = $filter("joda")(newV);
            $scope.date = $filter("date")(date, DateFormat);
            cancleWatch();
          }
        });

        var $input = ele.find("input");
        if ($input.length > 0 && typeof $input.datepicker === "function") {
          $input.datepicker({
            autoclose: true,
            language: "zh-CN",
            format: "yyyy-mm-dd"
          }).on('changeDate', function(event) {
            $scope.value = event.date.getTime();
            $scope.$apply();
          });
        }

        $scope.onClickDate = function() {
          $input.focus();
        };
      }
    }
  }
]);