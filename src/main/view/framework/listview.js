'use strict';
huoyun.controller('BoListViewController', ["$scope", "$state", "$stateParams", "MetadataService", "BoService", "BoDataHelper", "StateHelper", "$injector",
  function($scope, $state, $stateParams, MetadataService, BoService, BoDataHelper, StateHelper, $injector) {
    var navs = null;
    var title = null;
    var subTitle = null;
    var boName = $stateParams.boName;
    var boNamespace = $stateParams.boNamespace;
    var queryExprText = null;
    var onCreate = null;
    var onRowClicked = null;

    $scope.disableCreate = false;

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

      if ($state.current.data.disableCreate === true) {
        $scope.disableCreate = true;
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
      $state.go("home");
      return;
    }


    var params = {};

    //initParams();

    // function initParams() {
    //   if ($state.current.data) {
    //     params.boName = $state.current.data.boName;
    //     params.boNamespace = $state.current.data.boNamespace;
    //     params.queryExprText = $state.current.data.queryExpr || "";
    //     params.pageTitle = $state.current.data.title;
    //     params.detailStateName = $state.current.data.detailStateName;
    //   }

    //   if (!params.boNamespace) {
    //     params.boNamespace = $stateParams.boNamespace;
    //   }

    //   if (!params.boName) {
    //     params.boName = $stateParams.boName;
    //   }
    // }

    var that = this;

    // if (!params.boName || !params.boNamespace) {
    //   $state.go("home");
    // }


    // if (params.boNamespace === "com.huoyun.sbo" && params.boName === "Customer" &&
    //   StateHelper.getCurrentStateName() !== "myCustomer") {
    //   $scope.disableCreate = true;
    // }

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
        $scope.pageData = pageData;
      });

    // function setTitleAndNav(boMeta) {
    //   var title = params.pageTitle || `${boMeta.label}列表`;
    //   $scope.setPageTitle(title);
    //   $scope.setNavInfos([{
    //     label: "主页",
    //     state: "home"
    //   }, {
    //     label: title
    //   }]);
    // }

    $scope.onSearch = function(queryExpr) {
      params.queryExprText = queryExpr;
      BoService.query(boNamespace, boName, null, queryExpr, $scope.boMetadata.listview.orderBy)
        .then(function(pageData) {
          $scope.pageData = pageData;
        });
    };

    $scope.onRowClicked = function(lineData, index) {
      if ($state.current.data.onRowClicked) {
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

    $scope.onCreate = function() {
      if (onCreate) {
        onCreate.apply($scope, [$injector]);
      } else {
        $state.go("boCreate", {
          boName: params.boName,
          boNamespace: params.boNamespace
        });
      }
    };

  }
]);