'use strict';
huoyun.controller('BoListViewController', ["$scope", "$state", "$stateParams", "MetadataService", "BoService",
  "BoDataHelper", "StateHelper", "$injector", "$timeout", "Dialog", "BoViewHelper", "TableSelectEvent",
  "HuoyunWidgetConstant", "Tip", "$log",
  function($scope, $state, $stateParams, MetadataService, BoService, BoDataHelper, StateHelper, $injector, $timeout,
    Dialog, BoViewHelper, TableSelectEvent, HuoyunWidgetConstant, Tip, $log) {
    var navs = null;
    var title = null;
    var boName = $stateParams.boName;
    var boNamespace = $stateParams.boNamespace;
    var queryExprText = null;
    var onCreate = null;
    var onRowClicked = null;

    $scope.currentPageIndex = 0;
    $scope.selectionMode = HuoyunWidgetConstant.SelectionMode.None;

    if ($state.current.data) {
      boName = $state.current.data.boName;
      boNamespace = $state.current.data.boNamespace;
      queryExprText = $state.current.data.queryExpr;

      title = $state.current.data.title;
      if (title) {
        $scope.setPageTitle(title);
      }

      navs = $state.current.data.navs;
      if (Array.isArray(navs)) {
        $scope.setNavInfos(navs);
      }

      if ($state.current.data.disableSearch === true) {
        $scope.disableSearch = true;
      }

      if (typeof $state.current.data.onCreate === "function") {
        onCreate = $state.current.data.onCreate;
      }

      if (typeof $state.current.data.onRowClicked === "function") {
        onRowClicked = $state.current.data.onRowClicked;
      }

      if ($state.current.data.selectionMode) {
        $scope.selectionMode = $state.current.data.selectionMode;
      }
    }

    if (!boName || !boNamespace) {
      Dialog.showError("参数错误");
      StateHelper.getHome();
      return;
    }

    var defaultButtonMap = {
      "adjustTableColumn": {
        text: "调整表格字段",
        icon: "fa-table",
        appendClass: "pull-right btn-default",
        onButtonClicked: function() {
          var options = {
            title: `调整表格字段`,
            templateUrl: "framework/dialog/adjust.table.columns.dialog.html",
            appendClassName: "adjust-table-columns-dialog",
            params: {
              boMetadata: $scope.boMetadata
            },
            closeCallback: function(key, data) {
              if (key === "OK") {
                $scope.boMetadata.listview.properties = data;
              }
            }
          };
          var dialog = Dialog.showConfirm(options);
        }
      },
      "adjustTableDataSort": {
        visibility: false,
        text: "排序",
        appendClass: "pull-right btn-default",
        onButtonClicked: function() {
          var options = {
            title: `${$scope.boMetadata.label}排序`,
            templateUrl: "framework/dialog/adjust.table.data.sort.dialog.html",
            appendClassName: "adjust-table-data-sort-dialog",
            params: {
              pageData: angular.copy($scope.pageData.content),
              boMetadata: $scope.boMetadata
            },
            closeCallback: function(key, data) {
              if (key === "OK") {
                $scope.pageData.content = data;
              }

            }
          };
          var dialog = Dialog.showConfirm(options);
        }
      },
      "create": {
        text: "新建",
        icon: "fa-plus",
        appendClass: "btn-primary",
        onButtonClicked: function() {
          if (onCreate) {
            onCreate.apply($scope, [$injector]);
          } else {
            StateHelper.gotoBoCreate(boNamespace, boName);
          }
        }
      }
    };

    $scope.buttons = BoViewHelper.mergeButtonsFromState(defaultButtonMap, $state, $scope);


    MetadataService.getMetadata(boNamespace, boName)
      .then(function(boMeta) {
        $scope.boMetadata = boMeta;
        return Promise.resolve(boMeta);
      })
      .then(function(boMeta) {
        if (!title) {
          $scope.setPageTitle(`${boMeta.label}列表`, "主页");
        }

        if (!navs) {
          $scope.setNavInfos([{
            label: "主页",
            state: "home"
          }, {
            label: `${boMeta.label}列表`
          }]);
        }

        $scope.reload();
      });

    $scope.onSearch = function(queryExpr) {
      $scope.currentPageIndex = 0;
      if ($state.current.data && $state.current.data.queryExpr) {
        if (queryExpr) {
          queryExprText = `${$state.current.data.queryExpr} and ${queryExpr}`;
        } else {
          queryExprText = $state.current.data.queryExpr;
        }
      } else {
        queryExprText = queryExpr;
      }

      $scope.reload();
    };

    $scope.reload = function() {
      return BoService.query(boNamespace, boName, $scope.currentPageIndex, queryExprText, $scope.boMetadata.listview
          .orderBy)
        .then(function(pageData) {
          $scope.pageData = pageData;
        });
    };

    $scope.deleteBo = function(boId) {
      return new Promise(function(resolve, reject) {
        var options = {
          title: "提示",
          content: "确定要删除本条信息吗? 一旦删除，数据将不可恢复？",
          confirm: {
            callback: function() {
              BoService.deleteBo(boNamespace, boName, boId)
                .then(function() {
                  Tip.show("删除成功！");
                  resolve();
                }).catch(function(err) {
                  $log.warn("删除失败！", err);
                  reject(err);
                });
            }
          },
          cancel: {
            callback: function() {
              reject();
            }
          }
        };
        var dialog = Dialog.showConfirm(options);
      });
    };

    $scope.onRowClicked = function(lineData, index) {
      if (onRowClicked) {
        $state.current.data.onRowClicked.apply($scope, [$injector, lineData, index]);
      } else {
        StateHelper.gotoBoDetail(boNamespace, boName, lineData.id);
      }
    };

    $scope.onPagingChanged = function(pageIndex) {
      $scope.currentPageIndex = pageIndex;
      $scope.reload();
    };

    $scope.getSelectionItem = function() {
      if ($scope.selectionMode !== HuoyunWidgetConstant.SelectionMode.Single) {
        throw new Error(`Can't call this function, because current selection mode is ${$scope.selectionMode}`);
      }

      if ($scope.pageData && Array.isArray($scope.pageData.content)) {
        for (var index = 0; index < $scope.pageData.content.length; index++) {
          if ($scope.pageData.content[index].$$selected) {
            return $scope.pageData.content[index];
          }
        }
      }
    };
  }
]);