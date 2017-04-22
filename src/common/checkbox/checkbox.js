'use strict';
huoyunWidget.directive('widgetCheckBox', function () {
    return {
        restrict: 'A',
        templateUrl: 'checkbox/checkbox.html',
        scope: {
            value: '=ngModel',
            content: "@",
            onCheckboxValueChanged: '&'
        },
        link: function ($scope, ele, attr) {
            /**选择操作 */
            $scope.onCheckBoxClicked = function ($event) {
                $event.stopPropagation();
                $scope.value = !$scope.value;
                $scope.onCheckboxValueChanged({
                    checked: $scope.value
                });
            };
        }
    }
});