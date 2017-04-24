'use strict';
huoyun.controller('BoHomeViewController', ["$scope", "$state", "$stateParams", "MetadataService", "BoService", "Dialog", "BoHomeHelper",
  function($scope, $state, $stateParams, MetadataService, BoService, Dialog, BoHomeHelper) {
    var boName = $stateParams.boName;
    var boNamespace = $stateParams.boNamespace;
    var boId = $stateParams.boId;

    if ($state.current.name === "company") {
      boName = "Company";
      boNamespace = "com.huoyun.sbo";
    } else {
      if (!boName || !boNamespace || !boId) {
        $state.go("home");
      }
    }

    MetadataService.getMetadata(boNamespace, boName)
      .then(function(boMeta) {
        $scope.boMetadata = boMeta;
        BoHomeHelper.setTitleAndNav($scope, boMeta, $state);
      });

    BoHomeHelper.loadBoData(boNamespace, boName, boId)
      .then(function(boData) {
        $scope.boData = boData;
        if ($state.current.name === "company") {
          boId = boData.id;
        }
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