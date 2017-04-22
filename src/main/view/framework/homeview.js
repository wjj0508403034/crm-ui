'use strict';
huoyun.controller('BoHomeViewController', ["$scope", "$state", "$stateParams", "MetadataService", "BoService", "Dialog",
  function($scope, $state, $stateParams, MetadataService, BoService, Dialog) {
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
      .then(function(boMeta) {
        $scope.boMetadata = boMeta;
      });

    BoService.getBo(boNamespace, boName, boId)
      .then(function(boData) {
        $scope.boData = boData;
      });

    $scope.onEditButtonClicked = function() {
      $state.go("boEdit", {
        boId: boId,
        boName: boName,
        boNamespace: boNamespace
      });
    };

    $scope.onDeleteButtonClicked = function() {
      var options = {
        title: "提示",
        content: "确定要删除该对象么，一旦删除，数据将不可恢复？",
        confirm: {
          callback: function() {
            BoService.deleteBo(boNamespace, boName, boId)
              .then(function() {
                $state.go("boList", {
                  boName: boName,
                  boNamespace: boNamespace
                });
              });
          }
        }
      };
      var dialog = Dialog.showConfirm(options);
    };
  }
]);