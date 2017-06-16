'use strict';

huoyun.controller('PermissionPropertyStatesController', ["$scope", "BoStateCache", "HuoyunWidgetConstant",
  function($scope, BoStateCachePrivoder, HuoyunWidgetConstant) {
    $scope.states = [];
    var selectedMap = {};

    if ($scope.boData) {
      init($scope.boData);
    }

    $scope.$on(HuoyunWidgetConstant.Events.BoEvent.BoDataChanged, function(event, boData) {
      boData && init(boData);
    });

    function init(boData) {
      (boData["states"] || "").split(",").forEach(function(state) {
        selectedMap[state] = state;
      });

      var stateMap = BoStateCachePrivoder.getAllStates();
      Object.keys(stateMap).forEach(function(key) {
        $scope.states.push({
          state: key,
          label: stateMap[key].label,
          $$selected: !!selectedMap[key]
        });
      });
    }

    $scope.onCheckboxValueChanged = function(checked, item) {
      if (checked) {
        selectedMap[item.state] = item;
      } else {
        delete selectedMap[item.state];
      }

      $scope.$emit(HuoyunWidgetConstant.Events.BoEvent.PropertyUpdate, "states", Object.keys(selectedMap).join(
        ","));
    };
  }
]);