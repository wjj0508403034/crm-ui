'use strict';

huoyunWidget.controller('BoPropertyController', ["$scope", "BoHelper",
  function($scope, BoHelper) {
    BoHelper.getBoData($scope)
      .then(function(boData) {
        $scope.propValue = boData[$scope.prop.name];
      });
  }
]);