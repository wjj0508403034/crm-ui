'use strict';
huoyunWidget.directive('widgetCheckBox', function() {
  return {
    restrict: 'A',
    templateUrl: 'checkbox/checkbox.html',
    scope: {
      value: '=ngModel',
      content: "@",
      onCheckboxValueChanged: '&'
    },
    link: function($scope, ele, attr) {
      var $checkbox = ele.find("input[type='checkbox']");
      const CheckBoxClass = "icheckbox_square-blue";
      $checkbox.iCheck({
        checkboxClass: CheckBoxClass,
        increaseArea: '20%'
      });

      $checkbox.on("ifClicked", function(event) {
        onCheckboxValueChanged(event);
      });

      $scope.$watch("value", function(newValue, oldValue, scope) {
        $checkbox.iCheck(newValue === true ? "check" : "uncheck");
      });

      $scope.onCheckBoxClicked = function(event) {
        onCheckboxValueChanged(event);
      };

      function onCheckboxValueChanged(event) {
        event.stopPropagation();
        $scope.value = !$scope.value;
        $scope.onCheckboxValueChanged({
          checked: $scope.value
        });
      }
    }
  }
});