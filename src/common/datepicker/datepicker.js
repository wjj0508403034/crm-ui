'use strict';

huoyunWidget.directive('widgetDatePicker', function () {
  return {
    restrict: 'A',
    scope: {
      value: "=ngModel"
    },
    templateUrl: 'datepicker/datepicker.html',
    link: function ($scope, ele, attrs) {
      function convertSecondsToDate(seconds){
        var dateStr='';
        if(seconds){
          var date = new Date(seconds),
              Y = date.getFullYear() + '/',
              M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '/',
              D = date.getDate() + ' ',
              // h = date.getHours() + ':',
              // m = date.getMinutes() + ':',
              // s = date.getSeconds(); 
              dateStr=D+M+Y;
        }
        return dateStr;
      }

      $scope.showValue=convertSecondsToDate($scope.value);

      var $input = ele.find("input");
      if ($input.length > 0 && typeof $input.datepicker === "function") {
        $input.datepicker({
          autoclose: true
        }).on('changeDate', function(ev){
           $scope.$apply(function(){
             $scope.value=ev.date.valueOf();
           });
        });
      }
    }
  }
});