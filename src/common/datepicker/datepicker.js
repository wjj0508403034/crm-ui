'use strict';

huoyunWidget.directive('widgetDatePicker', function() {
  return {
    restrict: 'A',
    scope: {
      value: "=ngModel",
      date: "="
    },
    templateUrl: 'datepicker/datepicker.html',
    link: function($scope, ele, attrs) {

      var $input = ele.find("input");
      if ($input.length > 0 && typeof $input.datepicker === "function") {
        $input.datepicker({
          autoclose: true
        }).on('changeDate', function(event) {
          $scope.value = event.date.getTime();
          $scope.$apply();
        });
      }
    }
  }
});