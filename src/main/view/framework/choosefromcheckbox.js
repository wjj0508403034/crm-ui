'use strict';
huoyun.controller('BoChooseFromCheckbox',['$scope',function($scope){
    $scope.updateValue=function(){
        var result=$scope.ngDialogData.params.boList.filter(function(item){
            return !!item.checked;
        });
        //$scope.closeThisDialog(result);
    }
}]);