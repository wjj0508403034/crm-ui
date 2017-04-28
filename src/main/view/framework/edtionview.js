'use strict';
huoyun.controller('BoEdtionViewController', ["$scope", "$state", "$stateParams", "MetadataService", "BoService", "BoDataHelper", "Dialog", "$injector",
  function($scope, $state, $stateParams, MetadataService, BoService, BoDataHelper, Dialog, $injector) {
    var boName = $stateParams.boName;
    var boNamespace = $stateParams.boNamespace;
    var boId = $stateParams.boId;
    var navs = null;
    var title = null;
    var subTitle = null;
    var onSave = null;
    var onSaveCallback = null;
    var onCancelCallback = null;

    var loadBoDataService = null;
    if ($state.current.data) {
      boName = $state.current.data.boName;
      boNamespace = $state.current.data.boNamespace;

      if (typeof $state.current.data.loadBoDataService === "function") {
        loadBoDataService = $state.current.data.loadBoDataService.apply($scope, [$injector]);
      }

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
    }

    if (!loadBoDataService) {
      loadBoDataService = BoService.getBo(boNamespace, boName, boId);
    }

    loadBoDataService.then(function(boData) {
      $scope.boData = boData;
    });

    MetadataService.getMetadata(boNamespace, boName)
      .then(function(boMeta) {
        $scope.boMetadata = boMeta;
        return Promise.resolve(boMeta);
      })
      .then(function(boMeta) {
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

    $scope.onSave = function(data, boMetadata) {
      var boSaveService = null;
      if (onSave) {
        boSaveService = onSave.apply($scope, [$injector, data, boMetadata]);
      }
      if (!boSaveService) {
        boSaveService = BoService.updateBo(boNamespace, boName, boId, data);
      }

      boSaveService.then(function() {
        console.log("Save Successfully");
        if (onSaveCallback) {
          onSaveCallback.apply($scope, [$injector]);
        } else {
          $state.go("boHome", {
            boName: boName,
            boNamespace: boNamespace,
            boId: boId
          });
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
              $state.go("boHome", {
                boName: boName,
                boNamespace: boNamespace,
                boId: boId
              });
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