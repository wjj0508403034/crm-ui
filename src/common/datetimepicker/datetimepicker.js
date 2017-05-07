'use strict';

huoyunWidget.directive('widgetDateTimePicker', ["$filter",
  function($filter) {
    return {
      restrict: 'A',
      scope: {
        value: "=ngModel" //时间戳，13位
      },
      templateUrl: 'datetimepicker/datetimepicker.html',
      link: function($scope, ele, attrs) {
        /**用于控件里显示的日期格式 */
        var cancleWatch = $scope.$watch('value', function(newV, oldV) {
          if (newV && newV !== oldV) {
            var date = $filter("joda")(newV);
            $scope.date = $filter("date")(date, "yyyy-MM-dd HH:mm");
            cancleWatch();
          }
        });
        /**控件初始化 */
        var $input = ele.find("input");
        if ($input.length > 0 && typeof $input.datetimepicker === "function") {
          $input.datetimepicker({
            autoclose: true,
            language: 'zh-CN',
            minuteStep: 1,
            format: 'yyyy-mm-dd hh:ii'
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