'use strict';
huoyun.controller('BoHomeViewController', ["$scope", "$state", "$stateParams", "MetadataService", "BoService",
  function ($scope, $state, $stateParams, MetadataService, BoService) {
    var boName = $stateParams.boName;
    var boNamespace = $stateParams.boNamespace;
    var boId = $stateParams.boId;
    if (!boName || !boNamespace || !boId) {
      $state.go("home");
    }

    $scope.setPageTitle("客户详情", "客户列表");
    $scope.setNavInfos([{
      label: "主页",
      state: "home"
    }, {
      label: "客户列表",
      state: `boList({"boNamespace":"${boNamespace}","boName": "${boName}"})`
    }, {
      label: "客户详情"
    }]);

    MetadataService.getMetadata(boNamespace, boName)
      .then(function (boMeta) {
        $scope.boMetadata = boMeta;
      });

    BoService.getBo(boNamespace, boName, boId)
      .then(function (boData) {
        $scope.boData = boData;
      });
  }
]);