'use strict';
huoyunWidget.directive('widgetRadioBox', function() {
  return {
    restrict: 'A',
    templateUrl: 'radiobox/radiobox.html',
    scope: {
      value: '=ngModel',
      content: "@",
      onRadioboxValueChanged: '&'
    },
    link: function($scope, ele, attr) {

      var $radiobutton = ele.find("input[type='radio']");

      $radiobutton.iCheck({
        radioClass: "iradio_square-blue",
        increaseArea: '0%'
      });

      $radiobutton.on("ifClicked", function(event) {
        onRadioButtonValueChanged(event);
      });

      $scope.$watch("value", function(newValue, oldValue, scope) {
        $radiobutton.iCheck(newValue === true ? "check" : "uncheck");
      });

      $scope.onRadioButtonClicked = function(event) {
        onRadioButtonValueChanged(event);
      };

      function onRadioButtonValueChanged(event) {
        event.stopPropagation();
        $scope.value = !$scope.value;
        $scope.onRadioboxValueChanged({
          checked: $scope.value
        });
      }
    }
  }
});