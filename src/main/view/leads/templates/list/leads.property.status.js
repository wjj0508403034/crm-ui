'use strict';

huoyun.controller('LeadsListPropertyStatusController', ["$scope", "BoMeta",
  function($scope, BoMeta) {
    $scope.style = function($line, $column) {
      var columnValue = $scope.getColumnValue($line, $column);
      return columnValue && { color: columnValue.background };
    };

    $scope.propValue = function($line, $column) {
      return $column.getValueText($scope.getColumnValue($line, $column));
    };
  }
]);