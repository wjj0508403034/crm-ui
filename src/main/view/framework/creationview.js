'use strict';
huoyun.controller("testController", ["$scope", function ($scope) {
  $scope.aa = "aa";
}]);
huoyun.controller('BoCreationViewController', ["$scope", "$state", "$stateParams", "MetadataService", "BoService", "BoDataHelper", "Dialog",
  function ($scope, $state, $stateParams, MetadataService, BoService, BoDataHelper, Dialog) {
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

    $scope.onCancel = function () {
      var options = {
        title: "提示",
        content: "当前内容没有保存，要放弃么？",
        templateUrl: "framework/choosefromlistview.html",
        appendClassName: "bo-choose-from-list-dialog",
        confirm: {
          callback: function () {
            $state.go("boList", {
              boName: boName,
              boNamespace: boNamespace
            });
          }
        },
        params: {
          boName: boName,
          boNamespace: boNamespace
        }
      };
      var dialog = Dialog.showConfirm(options);

    };

    $scope.onValid = function (data, boMetadata) {
      return BoDataHelper.validator(data, boMetadata);
    };
  }
]);