'use strict';

huoyun.controller('PermissionPropertyStatesInDetailPageController', ["$scope", "PermissionControl", "BoHelper",
  function($scope, PermissionControlProvider, BoHelper) {

    BoHelper.getBoData($scope)
      .then(function(boData) {
        init(boData);
      });

    function init(boData) {
      var states = (boData["states"] || "").split(",");
      $scope.stateGroups = PermissionControlProvider.getGroupsByItemNames(states);
      console.log($scope.stateGroups);
    }
  }
]);