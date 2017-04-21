'use strict';
huoyun.controller('BoEdtionViewController', ["$scope", "$state", "$stateParams", "MetadataService", "BoService", "BoDataHelper",
  function ($scope, $state, $stateParams, MetadataService, BoService, BoDataHelper) {
    var boName = $stateParams.boName;
    var boNamespace = $stateParams.boNamespace;
    var boId = $stateParams.boId;
    if (!boName || !boNamespace || !boId) {
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
        $scope.boMetadata = boMeta;
      });

    BoService.getBo(boNamespace, boName, boId)
      .then(function (boData) {
        $scope.boData = boData;
      });


    $scope.onSave = function (data, boMetadata) {
      BoService.updateBo(boNamespace, boName, boId, data)
        .then(function () {
          console.log("Save Successfully");
          $state.go("boHome", {
            boName: boName,
            boNamespace: boNamespace,
            boId: boId
          });
        });
    };

    $scope.onCancel = function () {
      $state.go("boHome", {
        boName: boName,
        boNamespace: boNamespace,
        boId: boId
      });
    };

    $scope.onValid = function (data, boMetadata) {
      return BoDataHelper.validator(data, boMetadata);
    };
  }
]);