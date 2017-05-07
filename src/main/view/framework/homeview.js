'use strict';
huoyun.controller('BoHomeViewController', ["$scope", "$state", "$stateParams", "MetadataService", "BoService", "Dialog",
  "StateHelper", "$injector",
  function($scope, $state, $stateParams, MetadataService, BoService, Dialog, StateHelper, $injector) {
    var title = null;
    var subTitle = null;
    var navs = null;
    var boName = $stateParams.boName;
    var boNamespace = $stateParams.boNamespace;
    var boId = $stateParams.boId;

    if ($state.current.data) {
      boName = $state.current.data.boName;
      boNamespace = $state.current.data.boNamespace;

      title = $state.current.data.title;
      subTitle = $state.current.data.subTitle;
      if (title) {
        $scope.setPageTitle(title, subTitle);
      }

      navs = $state.current.data.navs;
      if (Array.isArray(navs)) {
        $scope.setNavInfos(navs);
      }
    }

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


    MetadataService.getMetadata(boNamespace, boName)
      .then(function(boMeta) {
        $scope.boMetadata = boMeta;
        return Promise.resolve(boMeta);
      }).then(function(boMeta) {
        if (!title) {
          $scope.setPageTitle(`${boMeta.label}详情`, `${boMeta.label}列表`);
        }

        if (!navs) {
          $scope.setNavInfos([{
            label: "主页",
            state: "home"
          }, {
            label: `${boMeta.label}列表`,
            state: StateHelper.getBoListState(boMeta.boNamespace, boMeta.boName)
          }, {
            label: `${boMeta.label}详情`
          }]);
        }
      });

    loadBoDataService()
      .then(function(boData) {
        $scope.boData = boData;
      });

    $scope.refresh = function() {
      loadBoDataService()
        .then(function(boData) {
          $scope.boData = boData;
        });
    };

    $scope.onButtonClicked = function(buttonName, button) {
      if (typeof button.onButtonClicked === "function") {
        button.onButtonClicked.apply($scope, [button, $injector]);
      }
    };

    function loadBoDataService() {
      if ($state.current.data && typeof $state.current.data.loadBoDataService === "function") {
        return $state.current.data.loadBoDataService.apply($scope, [$injector]);
      }

      return BoService.getBo(boNamespace, boName, boId);
    }

    function onDeleteButtonClicked(button) {
      var options = {
        title: "提示",
        content: "确定要删除本条信息吗? 一旦删除，数据将不可恢复？",
        confirm: {
          callback: function() {
            BoService.deleteBo(boNamespace, boName, boId)
              .then(function() {
                if (typeof button.onDeleteCallback === "function") {
                  button.onDeleteCallback.apply($scope, [button, $injector]);
                } else {
                  StateHelper.gotoBoList(boNamespace, boName);
                }
              });
          }
        }
      };
      var dialog = Dialog.showConfirm(options);
    }

    function onEditButtonClicked(button) {
      StateHelper.gotoBoEdit(boNamespace, boName, boId);
    }
  }
]);