'use strict';
huoyunWidget.controller('SortListViewController',['$scope',function($scope){
  console.log($scope.ngDialogData.params);
  $scope.pageData=$scope.ngDialogData.params.pageData.slice(0);
  $scope.onMoveRow=function(direction,index){
    if(direction==='up'){
       if(index===0){
         return;
       }
        var temp=$scope.pageData[index-1];
        $scope.pageData[index-1]=$scope.pageData[index];
        $scope.pageData[index]=temp;
    }else{
      var length=$scope.pageData.length;
      if(index===length-1){
         return;
       }
        var temp=$scope.pageData[index+1];
        $scope.pageData[index+1]=$scope.pageData[index];
        $scope.pageData[index]=temp;
    }
  };
  $scope.ngDialogData.onConfirmButtonClicked=function(){
    $scope.closeThisDialog(['OK', $scope.pageData.slice(0)]);
  };
}]);