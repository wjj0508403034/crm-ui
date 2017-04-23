'use strict';

huoyunWidget.controller('BoChooseFromDatePicker', ['$scope', function ($scope) {
	$scope.validvalues = $scope.ngDialogData.params.prop.validvalues;
   /**cancle all seleted radio */
  $scope.onRadioChanged=function(selectedIndex){
    $scope.validvalues.forEach(function(validvalue,index){
       if(selectedIndex===index){
         validvalue.selected=true;
       }else{
         validvalue.selected=false;
       }
    });
  };

	$scope.ngDialogData.onConfirmButtonClicked = function () {
		var res = [];
		$scope.validvalues.forEach(function (validvalue, index) {
			if (validvalue.selected) {
				res.push(validvalue);
			}
		});

		$scope.closeThisDialog(['OK', res]);
	};
}]);