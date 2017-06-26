'use strict';
huoyun.controller('BoEdtionViewController', ["$scope", "$state", "$stateParams", "MetadataService", "BoService",
  "BoDataHelper", "Dialog", "$injector", "StateHelper", "MetadataHelper", "HuoyunWidgetConstant",
  function($scope, $state, $stateParams, MetadataService, BoService, BoDataHelper, Dialog, $injector, StateHelper,
    MetadataHelper, HuoyunWidgetConstant) {
    var boName = $stateParams.boName;
    var boNamespace = $stateParams.boNamespace;
    var boId = $stateParams.boId;
    var navs = null;
    var title = null;
    var onSave = null;
    var onSaveCallback = null;
    var onCancelCallback = null;
    var loadBoMetadataCallback = null;
    var setPageTitle = null;
    var dynamicMeta = null;

    var loadBoDataService = null;
    if ($state.current.data) {

      if (typeof $state.current.data.init === "function") {
        $state.current.data.init.apply($scope, [$injector]);
      }
      boName = $state.current.data.boName;
      boNamespace = $state.current.data.boNamespace;

      if (typeof $state.current.data.loadBoDataService === "function") {
        loadBoDataService = $state.current.data.loadBoDataService.apply($scope, [$injector]);
      }

      navs = $state.current.data.navs;
      if (Array.isArray(navs)) {
        $scope.setNavInfos(navs);
      } else if (typeof navs === "function") {
        var navsFuncResult = navs.apply(this, [$injector]);
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
        if (title) {
          $scope.setPageTitle(title);
        }
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

      if ($state.current.data.dynamicMeta) {
        dynamicMeta = $state.current.data.dynamicMeta;
      }
    }

    if (!loadBoDataService) {
      loadBoDataService = BoService.getBo(boNamespace, boName, boId);
    }

    loadBoDataService.then(function(boData) {
      $scope.boData = boData;
      $scope.$broadcast("BoDataLoaded", boData);
    }).catch(function(err) {
      $scope.loadDataFailed = true;
    });

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
      });

    $scope.onSave = function(data, boMetadata) {
      var boSaveService = null;
      if (onSave) {
        boSaveService = onSave.apply($scope, [$injector, data, boMetadata]);
      }
      if (!boSaveService) {
        boSaveService = BoService.updateBo(boNamespace, boName, boId, data);
      }

      boSaveService.then(function(boData) {
        $scope.$emit(HuoyunWidgetConstant.Events.SaveSuccess, boData);
        console.log("Save Successfully");
        if (onSaveCallback) {
          onSaveCallback.apply($scope, [$injector, boNamespace, boName, boId]);
        } else {
          StateHelper.gotoBoDetail(boNamespace, boName, boId);
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
              onCancelCallback.apply($scope, [$injector, boNamespace, boName, boId]);
            } else {
              StateHelper.gotoBoDetail(boNamespace, boName, boId);
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