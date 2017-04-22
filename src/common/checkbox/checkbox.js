'use strict';
huoyunWidget.directive('widgetCheckBox',function(){
    return{
        restrict:'A',
        templateUrl:'checkbox/checkbox.html',
        scope:{
            ngModel:'=',
            updateValue:'&'
        },
        link:function($scope,ele,attr){
            /**选择操作 */
            $scope.selectCheckbox=function($event){
                $event.stopPropagation();
                $scope.ngModel.checked=!$scope.ngModel.checked;
                $scope.updateValue();
            };
        }
    }
});