'use strict';

huoyun.controller('BoCreationViewController', ["$scope", "$state", "$stateParams", "MetadataService", "BoService", "BoDataHelper", "Dialog", "StateHelper",
  function($scope, $state, $stateParams, MetadataService, BoService, BoDataHelper, Dialog, StateHelper) {
    var boName = $stateParams.boName;
    var boNamespace = $stateParams.boNamespace;

    if (!boName || !boNamespace) {
      StateHelper.gotoHome();
      return;
    }

    MetadataService.getMetadata(boNamespace, boName)
      .then(function(boMeta) {
        $scope.boMetadata = boMeta;
        setTitleAndNav(boMeta);
      });

    function setTitleAndNav(boMeta) {
      $scope.setPageTitle(`新建${boMeta.label}`, `${boMeta.label}列表`);
      $scope.setNavInfos([{
        label: "主页",
        state: StateHelper.getHome()
      }, {
        label: `${boMeta.label}列表`,
        state: StateHelper.getBoListState(boNamespace, boName)
      }, {
        label: `新建${boMeta.label}`
      }]);
    }


    $scope.onSave = function(data, boMetadata) {
      BoService.createBo(boNamespace, boName, data)
        .then(function() {
          console.log("Save Successfully");
          if (boNamespace === "com.huoyun.sbo" && boName === "CustomerStatus") {
            $scope.reloadMenus();
          }
          StateHelper.gotoBoList(boNamespace, boName);
        });
    };

    $scope.onCancel = function() {
      var options = {
        title: "提示",
        content: "当前内容没有保存，要放弃么？",
        confirm: {
          callback: function() {
            StateHelper.gotoBoList(boNamespace, boName);
          }
        }
      };
      var dialog = Dialog.showConfirm(options);
    };

    $scope.onValid = function(data, boMetadata) {
      return BoDataHelper.validator(data, boMetadata);
    };
  }
]);