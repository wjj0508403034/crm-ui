'use strict';

huoyun.controller('PermissionPropertyStatesController', ["$scope", "BoTemplate", "BoHelper",
  function($scope, BoTemplatePrivoder, BoHelper) {
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
        selectedMap[name] = name;
      });

      $scope.stateGroups = BoTemplatePrivoder.getStateGroups();
      Object.keys($scope.stateGroups).forEach(function(groupName) {
        setSelectedInitState($scope.stateGroups[groupName].items);
      });
    }

    function setSelectedInitState(states) {
      Object.keys(states).forEach(function(stateName) {
        if (selectedMap[stateName]) {
          states[stateName].$$selected = true;
        }
      });
    }
  }
]);