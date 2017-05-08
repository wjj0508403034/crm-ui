'use strict';

huoyun.controller('BoCreationViewController', ["$scope", "$state", "$stateParams", "MetadataService", "BoService", "BoDataHelper", "Dialog", "StateHelper", "$injector", "Tip",
  function($scope, $state, $stateParams, MetadataService, BoService, BoDataHelper, Dialog, StateHelper, $injector, Tip) {
    var boName = $stateParams.boName;
    var boNamespace = $stateParams.boNamespace;
    var boId = $stateParams.boId;
    var navs = null;
    var title = null;
    var subTitle = null;
    var onSave = null;
    var onSaveCallback = null;
    var onCancelCallback = null;
    var loadBoMetadataCallback = null;

    if ($state.current.data) {
      boName = $state.current.data.boName;
      boNamespace = $state.current.data.boNamespace;

      navs = $state.current.data.navs;
      if (Array.isArray(navs)) {
        $scope.setNavInfos(navs);
      }

      title = $state.current.data.title;
      subTitle = $state.current.data.subTitle;
      if (title) {
        $scope.setPageTitle(title, subTitle);
      }

      if (typeof $state.current.data.onSave === "function") {
        onSave = $state.current.data.onSave;
      }
      if (typeof $state.current.data.onSaveCallback === "function") {
        onSaveCallback = $state.current.data.onSaveCallback;
      }

      if (typeof $state.current.data.onCancelCallback === "function") {
        onCancelCallback = $state.current.data.onCancelCallback;
      }

      if (typeof $state.current.data.loadBoMetadataCallback === "function") {
        loadBoMetadataCallback = $state.current.data.loadBoMetadataCallback;
      }
    }

    MetadataService.getMetadata(boNamespace, boName)
      .then(function(boMeta) {
        if (loadBoMetadataCallback) {
          return loadBoMetadataCallback.apply($scope, [$injector, boMeta]);
        }

        return Promise.resolve(boMeta);
      })
      .then(function(boMeta) {
        $scope.boMetadata = boMeta;
        if (!title) {
          $scope.setPageTitle(`修改${boMeta.label}`, `${boMeta.label}列表`);
        }

        if (!navs) {
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
      });

    BoService.initBo(boNamespace, boName)
      .then(function(boData) {
        $scope.boData = boData;
      });

    $scope.onSave = function(data, boMetadata) {

      var boSaveService = null;
      if (onSave) {
        boSaveService = onSave.apply($scope, [$injector, data, boMetadata]);
      }
      if (!boSaveService) {
        boSaveService = BoService.createBo(boNamespace, boName, data);
      }

      boSaveService.then(function() {
        if (onSaveCallback) {
          onSaveCallback.apply($scope, [$injector]);
        } else {
          Tip.show("创建成功！");
          StateHelper.gotoBoList(boNamespace, boName);
        }
      });
    };

    $scope.onCancel = function() {
      var options = {
        title: "提示",
        content: "当前内容没有保存，要放弃么？",
        confirm: {
          callback: function() {
            if (onCancelCallback) {
              onCancelCallback.apply($scope, [$injector]);
            } else {
              StateHelper.gotoBoList(boNamespace, boName);
            }
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