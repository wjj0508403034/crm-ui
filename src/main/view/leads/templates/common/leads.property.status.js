'use strict';

huoyun.controller('LeadsPropertyStatusController', ["$scope",
  function($scope) {

    $scope.style = function() {
      if ($scope.propValue) {
        return {
          color: $scope.propValue.background
        };
      }
    };
  }
]);