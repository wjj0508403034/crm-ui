'use strict';

huoyunWidget.controller('SearchNumberConditionDialog', ['$scope', "GeneralCondition",
  function($scope, GeneralCondition) {
    $scope.rules = GeneralCondition.getRules();

    $scope.data = $scope.ngDialogData.params.data || {
      rule: "eq"
    };

    $scope.ngDialogData.onConfirmButtonClicked = function() {
      $scope.closeThisDialog(['OK', $scope.data]);
    };
  }
]);