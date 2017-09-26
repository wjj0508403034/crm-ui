'use strict';

huoyun.controller('NewBoDetailViewController', ["$scope", "$state", "$stateParams", "MetadataService",
  "BoService", "BoDetailViewModel",
  function($scope, $state, $stateParams, MetadataService, BoService, BoDetailViewModel) {

    var boDetail = $state.current;
    var boName = boDetail.getBoName();
    var boNamespace = boDetail.getBoNamespace();
    var boId = $stateParams.boId;

    var controller = {
      getButtons: function() {
        var buttons = boDetail.getButtons();
        if (Array.isArray(buttons)) {
          var that = this;

          var buttonMap = buttons.linq().toMap("name");
          ["remove", "edit"].forEach(function(name) {
            if (!buttonMap[name]) {
              buttons.push(DefaultButtons[name]);
            } else {
              buttonMap[name] = angular.extend({}, DefaultButtons[name], buttonMap[name])
            }
          });

          return buttons;
        } else {
          return [DefaultButtons["remove"], DefaultButtons["edit"]];
        }
      },
      gotoEditView: function(boId) {
        $state.go(boListState.getParent().getEditStateName(), {
          boId: boId
        });
      },
      deleteBo: function(boId) {

      }
    };

    MetadataService.getMetadata(boNamespace, boName)
      .then(function(boMeta) {
        $scope.vm = new BoDetailViewModel(boMeta, controller);
      }).then(function() {
        return BoService.getBo(boNamespace, boName, boId)
      }).then(function(boData) {
        $scope.vm.setData(boData);
      });


    const DefaultButtons = {
      "remove": {
        name: "remove",
        icon: "fa-remove",
        label: "删除",
        onClick: function() {
          controller.deleteBo(boId);
        }
      },
      "edit": {
        name: "edit",
        icon: "fa-pencil",
        label: "编辑",
        onClick: function() {
          controller.gotoEditView(boId);
        }
      }
    };
  }
]);