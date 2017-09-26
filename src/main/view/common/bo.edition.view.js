'use strict';

huoyun.controller('NewBoEditionViewController', ["$scope", "$state", "$stateParams", "MetadataService",
  "BoService", "BoEditionViewModel", "$stateHistory", "HuoYunWidgets",
  function($scope, $state, $stateParams, MetadataService, BoService, BoEditionViewModel, $stateHistory,
    HuoYunWidgets) {

    var boEdition = $state.current;
    var boName = boEdition.getBoName();
    var boNamespace = boEdition.getBoNamespace();
    var boId = $stateParams.boId;

    var controller = {
      getButtons: function() {
        var buttons = boEdition.getButtons();
        if (Array.isArray(buttons)) {
          var that = this;

          var buttonMap = buttons.linq().toMap("name");
          ["cancel", "save"].forEach(function(name) {
            if (!buttonMap[name]) {
              buttons.push(DefaultButtons[name]);
            } else {
              buttonMap[name] = angular.extend({}, DefaultButtons[name], buttonMap[name])
            }
          });

          return buttons;
        } else {
          return [DefaultButtons["cancel"], DefaultButtons["save"]];
        }
      },

      saveBo: function(boId, data) {
        BoService.updateBo(boNamespace, boName, boId, data)
          .then(function() {
            HuoYunWidgets.Tip.show("保存成功");
            $stateHistory.back();
          });
      }
    };

    MetadataService.getMetadata(boNamespace, boName)
      .then(function(boMeta) {
        $scope.vm = new BoEditionViewModel(boMeta, controller);
      }).then(function() {
        return BoService.getBo(boNamespace, boName, boId)
      }).then(function(boData) {
        $scope.vm.setData(boData);
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
          controller.saveBo(boId, $scope.vm.getData());
        }
      }
    };
  }
]);