'use strict';

huoyunWidget.directive('widgetBoCreation', function () {
  return {
    restrict: 'A',
    scope: {
      boMetadata: "=",
      onSave: "&",
      onValid: "&",
      onCancel: "&"
    },
    templateUrl: 'framework/bo.creation.html',
    link: function ($scope, ele, attrs) {
      $scope.errors = {};
      $scope.data = {};

      $scope.onCancelButtonClicked = function(){
        $scope.onCancel();
      };

      $scope.onSaveButtonClicked = function () {
        $scope.errors = {};
        var param = {
          data: $scope.data,
          boMetadata: $scope.boMetadata
        };

        $scope.onValid(param)
          .then($scope.onSave.bind(this, param))
          .then(function () {
            console.log("Save Successfully.");
          }).catch(function (err) {
            console.warn("Save Failed.");
            console.warn(err);
            if (err.propMetadata) {
              $scope.errors[err.propMetadata.name] = err;
            }
          });
      };
    }
  }
});