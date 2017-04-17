'use strict';
huoyun.controller('BoCreationViewController', ["$scope", "$state", "$stateParams", "MetadataService", "MetadataHelper", "BoService", "BoDataHelper",
  function ($scope, $state, $stateParams, MetadataService, MetadataHelper, BoService, BoDataHelper) {
    var boName = $stateParams.boName;
    var boNamespace = $stateParams.boNamespace;
    if (!boName || !boNamespace) {
      $state.go("home");
    }

    $scope.setPageTitle("新建客户", "客户列表");
    $scope.setNavInfos([{
      label: "主页",
      state: "home"
    }, {
      label: "客户列表",
      state: `boList({"boNamespace":"${boNamespace}","boName": "${boName}"})`
    }, {
      label: "新建客户"
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