'use strict';

huoyun.controller('LeadsPropertyStatusController', ["$scope",
  function($scope) {

    $scope.style = function() {
      if ($scope.prop && $scope.lineData) {
        if ($scope.lineData[$scope.prop.name]) {
          return {
            color: "red"
          };
        }
      }

    };
  }
]);