'use strict';
huoyun.controller('BoHomeViewController', ["$scope", "$state", "$stateParams", "MetadataService", "BoService", "Dialog", "BoHomeHelper", "StateHelper",
  function($scope, $state, $stateParams, MetadataService, BoService, Dialog, BoHomeHelper, StateHelper) {
    var params = {};
    initParams();

    function initParams() {
      if ($state.current.data) {
        params.boName = $state.current.data.boName;
        params.boNamespace = $state.current.data.boNamespace;
      }

      if (!params.boNamespace) {
        params.boNamespace = $stateParams.boNamespace;
      }

      if (!params.boName) {
        params.boName = $stateParams.boName;
      }
    }

    params.boId = $stateParams.boId;

    if (StateHelper.getCurrentStateName() === "company") {
      params.boName = "Company";
      params.boNamespace = "com.huoyun.sbo";
    } else {
      if (!params.boName || !params.boNamespace || !params.boId) {
        StateHelper.gotoHome();
      }
    }

    $scope.buttons = BoHomeHelper.getButtonsConfig();

    MetadataService.getMetadata(params.boNamespace, params.boName)
      .then(function(boMeta) {
        $scope.boMetadata = boMeta;
        BoHomeHelper.setTitleAndNav($scope, boMeta, $state);
      });

    BoHomeHelper.loadBoData(params.boNamespace, params.boName, params.boId)
      .then(function(boData) {
        $scope.boData = boData;
        if ($state.current.name === "company") {
          boId = boData.id;
        }
      });

    $scope.onButtonClicked = function(buttonName, button) {
      if (typeof button.onButtonClicked === "function") {
        button.onButtonClicked.apply(this, [params.boNamespace, params.boName, params.boId]);
      }
    };
  }
]);