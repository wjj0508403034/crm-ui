'use strict';

huoyun.controller('BoCreationViewController', ["$scope", "$state", "$stateParams", "MetadataService", "BoService", "BoDataHelper", "Dialog", "StateHelper", "$injector", "Tip", "MetadataHelper",
  function($scope, $state, $stateParams, MetadataService, BoService, BoDataHelper, Dialog, StateHelper, $injector, Tip, MetadataHelper) {
    var boName = $stateParams.boName;
    var boNamespace = $stateParams.boNamespace;
    var boId = $stateParams.boId;
    var navs = null;
    var title = null;
    var subTitle = null;
    var onSave = null;
    var beforeSave = null;
    var onSaveCallback = null;
    var onCancelCallback = null;
    var loadBoMetadataCallback = null;
    var initBoDataService = null;
    var setPageTitle = null;
    var dynamicMeta = null;

    if ($state.current.data) {
      boName = $state.current.data.boName;
      boNamespace = $state.current.data.boNamespace;

      navs = $state.current.data.navs;
      if (Array.isArray(navs)) {
        $scope.setNavInfos(navs);
      } else if (typeof navs === "function") {
        var navsFuncResult = navs.apply($scope, [$injector]);
        if (navsFuncResult instanceof Promise) {
          navsFuncResult.then(function(res) {
            $scope.setNavInfos(res);
          });
        } else {
          $scope.setNavInfos(navsFuncResult);
        }
      }

      if (typeof $state.current.data.setPageTitle === "function") {
        setPageTitle = $state.current.data.setPageTitle;
        setPageTitle.apply($scope, [$injector]);
      } else {
        title = $state.current.data.title;
        subTitle = $state.current.data.subTitle;
        if (title) {
          $scope.setPageTitle(title, subTitle);
        }
      }

      if (typeof $state.current.data.onSave === "function") {
        onSave = $state.current.data.onSave;
      }
      if (typeof $state.current.data.onSaveCallback === "function") {
        onSaveCallback = $state.current.data.onSaveCallback;
      }

      if (typeof $state.current.data.beforeSave === "function") {
        beforeSave = $state.current.data.beforeSave;
      }

      if (typeof $state.current.data.onCancelCallback === "function") {
        onCancelCallback = $state.current.data.onCancelCallback;
      }

      if (typeof $state.current.data.loadBoMetadataCallback === "function") {
        loadBoMetadataCallback = $state.current.data.loadBoMetadataCallback;
      }

      if (typeof $state.current.data.initBoDataService === "function") {
        initBoDataService = $state.current.data.initBoDataService.apply($scope, [$injector]);
      }

      if ($state.current.data.propTemplates) {
        $scope.propTemplates = $state.current.data.propTemplates;
      }

      if ($state.current.data.dynamicMeta) {
        dynamicMeta = $state.current.data.dynamicMeta;
      }
    }

    MetadataService.getMetadata(boNamespace, boName)
      .then(function(boMeta) {
        MetadataHelper.merge(boMeta, dynamicMeta);
        if (loadBoMetadataCallback) {
          return loadBoMetadataCallback.apply($scope, [$injector, boMeta]);
        }
        return Promise.resolve(boMeta);
      })
      .then(function(boMeta) {
        $scope.boMetadata = boMeta;
        if (!setPageTitle && !title) {
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

        return Promise.resolve(boMeta);
      });

    if (!initBoDataService) {
      initBoDataService = BoService.initBo(boNamespace, boName);
    }

    initBoDataService
      .then(function(boData) {
        $scope.boData = boData;
      });

    $scope.onSave = function(dataParam, boMetadata) {
      var data = angular.copy(dataParam);
      if (beforeSave != null) {
        var beforeSaveFuncResult = beforeSave.apply($scope, [$injector, data, boMetadata]);
        if (beforeSaveFuncResult instanceof Promise) {
          beforeSaveFuncResult.then(function(res) {
            data = res;
          });
        }
      }

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