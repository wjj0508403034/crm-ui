'use strict';
huoyunWidget.directive('widgetRadioBox', function () {
    return {
        restrict: 'A',
        templateUrl: 'radiobox/radiobox.html',
        scope: {
            value: '=ngModel',
            content: "@",
            onRadioboxValueChanged: '&'
        },
        link: function ($scope, ele, attr) {
            /**选择操作 */
            $scope.onCheckBoxClicked = function ($event) {
                $event.stopPropagation();
                //select current radio
                $scope.value = true;
                $scope.onRadioboxValueChanged();
            };
        }
    }
});