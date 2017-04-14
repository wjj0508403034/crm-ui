'use strict';

huoyunWidget.directive('widgetDatePicker', function () {
  return {
    restrict: 'A',
    scope: {
      value: "=ngModel"
    },
    templateUrl: 'datepicker/datepicker.html',
    link: function ($scope, ele, attrs) {
      var $input = ele.find("input");
      if ($input.length > 0 && typeof $input.datepicker === "function") {
        $input.datepicker({
          autoclose: true
        });
      }
    }
  }
});