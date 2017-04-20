'use strict';
huoyun.controller('BoCreationViewController', ["$scope", "$state", "$stateParams", "MetadataService", "BoService", "BoDataHelper",
  function ($scope, $state, $stateParams, MetadataService, BoService, BoDataHelper) {
    var boName = $stateParams.boName;
    var boNamespace = $stateParams.boNamespace;

    const BoListState = `boList({"boNamespace":"${boNamespace}","boName": "${boName}"})`;

    if (!boName || !boNamespace) {
      $state.go("home");
    }

    $scope.setPageTitle("新建客户", "客户列表");
    $scope.setNavInfos([{
      label: "主页",
      state: "home"
    }, {
      label: "客户列表",
      state: BoListState
    }, {
      label: "新建客户"
    }]);

    MetadataService.getMetadata(boNamespace, boName)
      .then(function (boMeta) {
        $scope.boMetadata = boMeta;
      });


    $scope.onSave = function (data, boMetadata) {
      BoService.createBo(boNamespace, boName, data)
        .then(function () {
          console.log("Save Successfully");
          $state.go("boList", {
            boName: boName,
            boNamespace: boNamespace
          });
        });
    };

    $scope.onValid = function (data, boMetadata) {
      return BoDataHelper.validator(data, boMetadata);
    };
  }
]);