'use strict';

huoyun.factory("BoHomeHelper", ["$injector", "BoService", "StateHelper", "Dialog",
  function($injector, BoService, StateHelper, Dialog) {

    function isCustomerBo(boNamespace, boName) {
      return boNamespace === "com.huoyun.sbo" && boName === "Customer";
    }

    function onRestoreButtonClicked(boNamespace, boName, boId) {
      if (StateHelper.getCurrentStateName() === "trash.detail") {
        BoService.updateBo(boNamespace, boName, boId, {
          deleted: false
        }).then(function() {
          StateHelper.gotoBoList(boNamespace, boName);
        });
      }
    }

    function onDeleteButtonClicked(boNamespace, boName, boId) {
      var content = "确定要删除本条信息吗? 一旦删除，数据将不可恢复？";
      if (StateHelper.getCurrentStateName() !== "trash.detail" && isCustomerBo(boNamespace, boName)) {
        content = "确定要删除本条信息吗? 删除后可在『回收站』恢复!";
      }

      var options = {
        title: "提示",
        content: content,
        confirm: {
          callback: function() {
            if (StateHelper.getCurrentStateName() !== "trash.detail" && isCustomerBo(boNamespace, boName)) {
              BoService.updateBo(boNamespace, boName, boId, {
                deleted: true
              }).then(function() {
                StateHelper.gotoBoList(boNamespace, boName);
              });
            } else {
              BoService.deleteBo(boNamespace, boName, boId)
                .then(function() {
                  StateHelper.gotoBoList(boNamespace, boName);
                });
            }
          }
        }
      };
      var dialog = Dialog.showConfirm(options);
    }

    function onEditButtonClicked(boNamespace, boName, boId) {
      StateHelper.gotoBoEdit(boNamespace, boName, boId);
    }

    return {

      getButtonsConfig: function() {

        var btnMap = {
          "restore": {
            text: "恢复",
            visibility: false,
            onButtonClicked: onRestoreButtonClicked
          },
          "delete": {
            text: "删除",
            onButtonClicked: onDeleteButtonClicked
          },
          "edit": {
            text: "编辑",
            onButtonClicked: onEditButtonClicked
          }
        };


        if (StateHelper.getCurrentStateName() === "trash.detail") {
          delete btnMap.restore.visibility;
          btnMap.edit.visibility = false;
        }

        var btns = [];

        Object.keys(btnMap).forEach(function(key, index) {
          btnMap[key].name = key;
          btns.push(btnMap[key]);
        });

        return btns;
      },

      loadBoData: function(boNamespace, boName, boId) {
        if (boNamespace === 'com.huoyun.sbo' && boName === "Company") {
          return $injector.get("CompanyService").getCompanyInfo();
        }

        return BoService.getBo(boNamespace, boName, boId);
      },

      setTitleAndNav: function($scope, boMeta, $state) {
        if ($state.current.data) {
          if (Array.isArray($state.current.data.navs)) {
            $scope.setNavInfos($state.current.data.navs);
          }

          if ($state.current.data.title) {
            $scope.setPageTitle($state.current.data.title, $state.current.data.subTitle);
          }

          return;
        }


        if ($state.current.data && $state.current.data.listStateName) {
          $scope.setPageTitle(`${boMeta.label}详情`, $state.current.data.listStateLabel);
          $scope.setNavInfos([{
            label: "主页",
            state: "home"
          }, {
            label: $state.current.data.listStateLabel,
            state: $state.current.data.listStateName
          }, {
            label: `${boMeta.label}详情`
          }]);
          return;
        }

        if ($state.current.name === "company") {
          $scope.setPageTitle(`${boMeta.label}详情`, `主页`);
          $scope.setNavInfos([{
            label: "主页",
            state: "home"
          }, {
            label: `${boMeta.label}详情`
          }]);
        } else {
          $scope.setPageTitle(`${boMeta.label}详情`, `${boMeta.label}列表`);
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

      }
    };
  }
]);