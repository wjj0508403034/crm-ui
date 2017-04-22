'use strict';

huoyunWidget.controller('BoChooseFromCheckbox', ['$scope', function ($scope) {
	$scope.validvalues = $scope.ngDialogData.params.prop.validvalues;


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