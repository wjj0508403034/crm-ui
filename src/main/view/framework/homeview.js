'use strict';
huoyun.controller('BoHomeViewController', ["$scope", "$state", "$stateParams", "MetadataService", "BoService", "Dialog",
  "StateHelper", "$injector", "Tip", "UploadService", "MetadataHelper", "BoViewHelper", "HuoyunWidgetConstant",
  function($scope, $state, $stateParams, MetadataService, BoService, Dialog, StateHelper, $injector, Tip,
    UploadService, MetadataHelper, BoViewHelper, HuoyunWidgetConstant) {
    var title = null;
    var navs = null;
    var boName = $stateParams.boName;
    var boNamespace = $stateParams.boNamespace;
    var boId = $stateParams.boId;
    var setPageTitle = null;
    var dynamicMeta = null;

    $scope.getBoId = function() {
      return boId;
    };

    if ($state.current.data) {
      boName = $state.current.data.boName;
      boNamespace = $state.current.data.boNamespace;

      if (typeof $state.current.data.setPageTitle === "function") {
        setPageTitle = $state.current.data.setPageTitle;
        setPageTitle.apply($scope, [$injector]);
      } else {
        title = $state.current.data.title;
        if (title) {
          $scope.setPageTitle(title);
        }
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

      if ($state.current.data.dynamicMeta) {
        dynamicMeta = $state.current.data.dynamicMeta;
      }
    }

    var defaultButtonMap = {
      "delete": {
        text: "删除",
        icon: "fa-remove",
        onButtonClicked: onDeleteButtonClicked
      },
      "edit": {
        text: "编辑",
        appendClass: "btn-primary",
        icon: "fa-pencil",
        onButtonClicked: onEditButtonClicked
      }
    };

    $scope.buttons = BoViewHelper.mergeButtonsFromState(defaultButtonMap, $state, $scope);


    MetadataService.getMetadata(boNamespace, boName)
      .then(function(boMeta) {
        MetadataHelper.merge(boMeta, dynamicMeta);
        $scope.boMetadata = boMeta;
        return Promise.resolve(boMeta);
      }).then(function(boMeta) {
        if (!setPageTitle && !title) {
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

    loadBoData();

    $scope.$on(HuoyunWidgetConstant.Events.BoReloadData, function(event) {
      loadBoData();
    });

    $scope.onImageRemoved = function(image, boMeta, prop) {
      UploadService.deleteImageForImageList(prop.additionInfo.boNamespace, prop.additionInfo.boName, image.id,
          prop.name)
        .then(function() {
          Tip.show("删除成功！");
          $scope.refresh();
        });
    };

    $scope.updateBo = function(boData) {
      return BoService.updateBo(boNamespace, boName, boId, boData);
    };

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
                  Tip.show("删除成功！");
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

    function loadBoDataService() {
      if ($state.current.data && typeof $state.current.data.loadBoDataService === "function") {
        return $state.current.data.loadBoDataService.apply($scope, [$injector]);
      }

      return BoService.getBo(boNamespace, boName, boId);
    }

    function loadBoData() {
      loadBoDataService()
        .then(function(boData) {
          $scope.boData = boData;
        }).catch(function(err) {
          $scope.loadDataFailed = true;
        });
    }
  }
]);