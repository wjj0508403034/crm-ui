'use strict';
huoyun.controller('BoListViewController', ["$scope", "$state", "$stateParams", "MetadataService", "BoService",
  "BoDataHelper", "StateHelper", "$injector", "$timeout", "Dialog", "BoViewHelper",
  function($scope, $state, $stateParams, MetadataService, BoService, BoDataHelper, StateHelper, $injector, $timeout,
    Dialog, BoViewHelper) {
    var navs = null;
    var title = null;
    var subTitle = null;
    var boName = $stateParams.boName;
    var boNamespace = $stateParams.boNamespace;
    var queryExprText = null;
    var onCreate = null;
    var onRowClicked = null;

    if ($state.current.data) {
      boName = $state.current.data.boName;
      boNamespace = $state.current.data.boNamespace;
      queryExprText = $state.current.data.queryExpr;

      title = $state.current.data.title;
      subTitle = $state.current.data.subTitle;
      if (title) {
        $scope.setPageTitle(title, subTitle);
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
        onClickedHandler: function() {
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
        onClickedHandler: function() {
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
        onClickedHandler: function() {
          if (onCreate) {
            onCreate.apply($scope, [$injector]);
          } else {
            StateHelper.gotoBoCreate(boNamespace, boName);
          }
        }
      }
    };

    $scope.buttons = BoViewHelper.mergeButtonsFromState(defaultButtonMap, $state);


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

        return BoService.query(boNamespace, boName, null, queryExprText, boMeta.listview.orderBy)
      }).then(function(pageData) {
        $timeout(function() {
          $scope.pageData = pageData;
        });
      });

    $scope.onSearch = function(queryExpr) {
      queryExprText = queryExpr;
      BoService.query(boNamespace, boName, null, queryExpr, $scope.boMetadata.listview.orderBy)
        .then(function(pageData) {
          $scope.pageData = pageData;
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
      BoService.query(boNamespace, boName, pageIndex, queryExprText)
        .then(function(pageData) {
          $scope.pageData = pageData;
        });
    };

  }
]);