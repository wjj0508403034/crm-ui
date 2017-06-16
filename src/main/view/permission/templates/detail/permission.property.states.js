'use strict';

huoyun.controller('PermissionPropertyStatesInDetailPageController', ["$scope", "BoTemplate", "BoHelper",
  function($scope, BoTemplatePrivoder, BoHelper) {
    $scope.states = [];
    var selectedMap = {};

    BoHelper.getBoData($scope)
      .then(function(boData) {
        init(boData);
      });

    function init(boData) {
      (boData["states"] || "").split(",").forEach(function(state) {
        selectedMap[state] = state;
      });

      $scope.stateGroups = BoTemplatePrivoder.getStateGroups();
    }
  }
]);