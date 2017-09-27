'use strict';

huoyun.controller('NewBoCreationViewController', ["$scope", "$state", "MetadataService", "BoService",
  "BoCreationViewModel", "HuoYunWidgets",
  function($scope, $state, MetadataService, BoService, BoCreationViewModel, HuoYunWidgets) {

    var boCreation = $state.current;
    var boName = boEdition.getBoName();
    var boNamespace = boEdition.getBoNamespace();

    var controller = {
      createBo: function(data) {
        BoService.createBo(boNamespace, boName, data)
          .then(function() {
            HuoYunWidgets.Tip.show("创建成功");
          });
      }
    };

    MetadataService.getMetadata(boNamespace, boName)
      .then(function(boMeta) {
        $scope.vm = new BoCreationViewModel(boMeta, controller);
      });

    const DefaultButtons = {
      "cancel": {
        name: "cancel",
        icon: "fa-remove",
        label: "取消",
        onClick: function() {
          $stateHistory.back();
        }
      },
      "save": {
        name: "save",
        icon: "fa-pencil",
        label: "保存",
        onClick: function() {
          controller.createBo($scope.vm.getData());
        }
      }
    };


  }
]);