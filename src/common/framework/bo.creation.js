'use strict';

huoyunWidget.directive('widgetBoCreation', function () {
  return {
    restrict: 'A',
    scope: {
      boMetadata: "="
    },
    templateUrl: 'framework/bo.creation.html',
    link: function ($scope, ele, attrs) {
      $scope.data = {};
      $scope.onSaveButtonClicked = function () {
        console.log($scope.data);
      };
    }
  }
});