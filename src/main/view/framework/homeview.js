'use strict';
huoyun.controller('BoHomeViewController', ["$scope", "$state", "$stateParams", "MetadataService", "BoService", "Dialog",
  "BoHomeHelper", "StateHelper", "$injector",
  function($scope, $state, $stateParams, MetadataService, BoService, Dialog, BoHomeHelper, StateHelper, $injector) {
    var params = {};
    initParams();

    function initParams() {
      if ($state.current.data) {
        params.boName = $state.current.data.boName;
        params.boNamespace = $state.current.data.boNamespace;
      }

      if (!params.boNamespace) {
        params.boNamespace = $stateParams.boNamespace;
      }

      if (!params.boName) {
        params.boName = $stateParams.boName;
      }
    }

    params.boId = $stateParams.boId;

    // if (StateHelper.getCurrentStateName() === "company") {
    //   params.boName = "Company";
    //   params.boNamespace = "com.huoyun.sbo";
    // } else {
    //   if (!params.boName || !params.boNamespace || !params.boId) {
    //     StateHelper.gotoHome();
    //   }
    // }
    var defaultButtonMap = {
      "delete": {
        text: "删除",
        onButtonClicked: onDeleteButtonClicked
      },
      "edit": {
        text: "编辑",
        onButtonClicked: onEditButtonClicked
      }
    };

    if ($state.current.data && $state.current.data.buttons) {
      Object.keys($state.current.data.buttons).forEach(function(buttonKey, index) {
        if (defaultButtonMap[buttonKey]) {
          angular.extend(defaultButtonMap[buttonKey], $state.current.data.buttons[buttonKey]);
        } else {
          defaultButtonMap[buttonKey] = $state.current.data.buttons[buttonKey];
        }
      });
    }

    $scope.buttons = [];

    Object.keys(defaultButtonMap).forEach(function(key, index) {
      defaultButtonMap[key].name = key;
      $scope.buttons.push(defaultButtonMap[key]);
    });

    function onDeleteButtonClicked(button) {
      var options = {
        title: "提示",
        content: "确定要删除本条信息吗? 一旦删除，数据将不可恢复？",
        confirm: {
          callback: function() {
            BoService.deleteBo(params.boNamespace, params.boName, params.boId)
              .then(function() {
                if (typeof button.onDeleteCallback === "function") {
                  button.onDeleteCallback.apply($scope, [button, $injector]);
                } else {
                  StateHelper.gotoBoList(params.boNamespace, params.boName);
                }

              });
          }
        }
      };
      var dialog = Dialog.showConfirm(options);
    }

    function onEditButtonClicked(button) {
      StateHelper.gotoBoEdit(params.boNamespace, params.boName, params.boId);
    }


    //$scope.buttons = BoHomeHelper.getButtonsConfig();

    MetadataService.getMetadata(params.boNamespace, params.boName)
      .then(function(boMeta) {
        $scope.boMetadata = boMeta;
        BoHomeHelper.setTitleAndNav($scope, boMeta, $state);
      });

    if ($state.current.data && typeof $state.current.data.loadBoDataService === "function") {
      $state.current.data.loadBoDataService.apply($scope, [$injector])
        .then(function(boData) {
          $scope.boData = boData;
        });
    } else {
      BoHomeHelper.loadBoData(params.boNamespace, params.boName, params.boId)
        .then(function(boData) {
          $scope.boData = boData;
          if ($state.current.name === "company") {
            boId = boData.id;
          }
        });
    }


    $scope.onButtonClicked = function(buttonName, button) {
      if (typeof button.onButtonClicked === "function") {
        button.onButtonClicked.apply($scope, [button, $injector]);
      }
    };
  }
]);