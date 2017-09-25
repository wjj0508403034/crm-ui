'use strict';

huoyun.controller('LeadsStatusListPropertyStatusController', ["$scope", "BoMeta",
  function($scope, BoMeta) {
    $scope.style = function($line, $column) {
      var columnValue = $scope.getColumnValue($line, $column);
      return columnValue && { color: columnValue.background };
    };
  }
]);