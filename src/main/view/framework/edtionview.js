'use strict';
huoyun.controller('BoEdtionViewController', ["$scope", "$state", "$stateParams", "MetadataService", "BoService", "BoDataHelper", "Dialog",
  function($scope, $state, $stateParams, MetadataService, BoService, BoDataHelper, Dialog) {
    var boName = $stateParams.boName;
    var boNamespace = $stateParams.boNamespace;
    var boId = $stateParams.boId;
    if (!boName || !boNamespace || !boId) {
      $state.go("home");
    }

    MetadataService.getMetadata(boNamespace, boName)
      .then(function(boMeta) {
        $scope.boMetadata = boMeta;
        setTitleAndNav(boMeta);
      });

    function setTitleAndNav(boMeta) {
      $scope.setPageTitle(`修改${boMeta.label}`, `${boMeta.label}列表`);
      $scope.setNavInfos([{
        label: "主页",
        state: "home"
      }, {
        label: `${boMeta.label}列表`,
        state: `boList({"boNamespace":"${boNamespace}","boName": "${boName}"})`
      }, {
        label: `修改${boMeta.label}`
      }]);
    }

    BoService.getBo(boNamespace, boName, boId)
      .then(function(boData) {
        $scope.boData = boData;
      });


    $scope.onSave = function(data, boMetadata) {
      BoService.updateBo(boNamespace, boName, boId, data)
        .then(function() {
          console.log("Save Successfully");
          $state.go("boHome", {
            boName: boName,
            boNamespace: boNamespace,
            boId: boId
          });
        });
    };

    $scope.onCancel = function() {
      var options = {
        title: "提示",
        content: "当前内容没有保存，要放弃么？",
        confirm: {
          callback: function() {
            $state.go("boHome", {
              boName: boName,
              boNamespace: boNamespace,
              boId: boId
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