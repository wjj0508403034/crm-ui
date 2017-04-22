'use strict';

huoyunWidget.controller('BoChooseFromCheckbox', ['$scope', function ($scope) {
	$scope.validvalues = $scope.ngDialogData.params.prop.validvalues;

	$scope.onSelectedAllChanged = function (checked) {
		$scope.validvalues.forEach(function (validvalue, index) {
			validvalue.selected = checked;
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