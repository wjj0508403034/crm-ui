'use strict';

huoyun.controller('PermissionPropertyStatesController', ["$scope", "PermissionControl", "BoHelper",
  function($scope, PermissionControlProvider, BoHelper) {
    var selectedMap = {};

    BoHelper.getBoData($scope)
      .then(function(boData) {
        init(boData);
      });

    $scope.onCheckboxValueChanged = function(checked, item) {
      if (checked) {
        selectedMap[item.name] = item;
      } else {
        delete selectedMap[item.name];
      }
      var propValue = Object.keys(selectedMap).join(",");
      BoHelper.setPropertyValue($scope, "states", propValue);
    };

    function init(boData) {
      (boData["states"] || "").split(",").forEach(function(name) {
        if (name) {
          selectedMap[name] = name;
        }
      });

      $scope.stateGroups = PermissionControlProvider.getPermissionGroups();
      $scope.stateGroups.forEach(function(group) {
        setSelectedInitState(group.items);
      });
    }

    function setSelectedInitState(states) {
      states.forEach(function(state, index) {
        if (selectedMap[state.name]) {
          states[index].$$selected = true;
        }
      });
    }
  }
]);