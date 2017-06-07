'use strict';

huoyun.controller('LeadsStatusPropertyStatusController', ["$scope",
  function($scope) {

    $scope.style = function() {
      if ($scope.propValue) {
        return {
          color: $scope.propValue
        };
      }
    };
  }
]);