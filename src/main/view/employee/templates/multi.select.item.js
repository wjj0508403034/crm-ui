'use strict';

huoyun.controller('EmployeeMultiSelectItemController', ["$scope",
  function($scope) {
    $scope.onItemClicked = function(boItem) {
      boItem.$$selected = !boItem.$$selected;
      $scope.onCheckboxValueChanged(boItem.$$selected, boItem);
    };
  }
]);