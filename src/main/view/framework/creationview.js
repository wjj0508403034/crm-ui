'use strict';

huoyun.controller('BoCreationViewController', ["$scope", "$state", "$stateParams", "MetadataService", "BoService", "BoDataHelper", "Dialog",
  function($scope, $state, $stateParams, MetadataService, BoService, BoDataHelper, Dialog) {
    var boName = $stateParams.boName;
    var boNamespace = $stateParams.boNamespace;

    const BoListState = `boList({"boNamespace":"${boNamespace}","boName": "${boName}"})`;

    if (!boName || !boNamespace) {
      $state.go("home");
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
        state: "home"
      }, {
        label: `${boMeta.label}列表`,
        state: BoListState
      }, {
        label: `新建${boMeta.label}`
      }]);
    }


    $scope.onSave = function(data, boMetadata) {
      BoService.createBo(boNamespace, boName, data)
        .then(function() {
          console.log("Save Successfully");
          $state.go("boList", {
            boName: boName,
            boNamespace: boNamespace
          });
        });
    };

    $scope.onCancel = function() {
      var options = {
        title: "提示",
        content: "当前内容没有保存，要放弃么？",
        confirm: {
          callback: function() {
            $state.go("boList", {
              boName: boName,
              boNamespace: boNamespace
            });
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