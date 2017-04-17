'use strict';
huoyun.controller('BoEdtionViewController', ["$scope", "$state", "$stateParams", "MetadataService", "MetadataHelper", "BoService", "BoDataHelper",
  function ($scope, $state, $stateParams, MetadataService, MetadataHelper, BoService, BoDataHelper) {
    var boName = $stateParams.boName;
    var boNamespace = $stateParams.boNamespace;
    var boId = $stateParams.boId;
    if (!boName || !boNamespace) {
      $state.go("home");
    }

    $scope.setPageTitle("修改客户", "客户列表");
    $scope.setNavInfos([{
      label: "主页",
      state: "home"
    }, {
      label: "客户列表",
      state: `boList({"boNamespace":"${boNamespace}","boName": "${boName}"})`
    }, {
      label: "修改客户"
    }]);

    MetadataService.getMetadata(boNamespace, boName)
      .then(function (boMeta) {
        $scope.boMetadata = MetadataHelper.convertTo(boMeta);
      });


    $scope.onSave = function (data, boMetadata) {
      return new Promise(function (reslove, reject) {
        reslove("Save Successfully");
      });
    };

    $scope.onValid = function (data, boMetadata) {
      return BoDataHelper.validator(data, boMetadata);
    };
  }
]);