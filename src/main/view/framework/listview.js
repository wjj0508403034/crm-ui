'use strict';
huoyun.controller('BoListViewController', ["$scope", "$state", "$stateParams", "MetadataService", "BoService", "BoDataHelper", "StateHelper",
  function($scope, $state, $stateParams, MetadataService, BoService, BoDataHelper, StateHelper) {
    var params = {};

    initParams();

    function initParams() {
      if ($state.current.data) {
        params.boName = $state.current.data.boName;
        params.boNamespace = $state.current.data.boNamespace;
        params.queryExprText = $state.current.data.queryExpr || "";
        params.pageTitle = $state.current.data.title;
        params.detailStateName = $state.current.data.detailStateName;
      }

      if (!params.boNamespace) {
        params.boNamespace = $stateParams.boNamespace;
      }

      if (!params.boName) {
        params.boName = $stateParams.boName;
      }
    }

    var that = this;

    if (!params.boName || !params.boNamespace) {
      $state.go("home");
    }

    $scope.disableCreate = false;
    if (params.boNamespace === "com.huoyun.sbo" && params.boName === "Customer" &&
      StateHelper.getCurrentStateName() !== "myCustomer") {
      $scope.disableCreate = true;
    }

    MetadataService.getMetadata(params.boNamespace, params.boName)
      .then(function(boMeta) {
        $scope.boMetadata = boMeta;
        setTitleAndNav(boMeta);
        return Promise.resolve(boMeta);
      })
      .then(function(boMeta) {
        return BoService.query(params.boNamespace, params.boName, null, params.queryExprText, boMeta.listview.orderBy)
      }).then(function(pageData) {
        $scope.pageData = pageData;
      });

    function setTitleAndNav(boMeta) {
      var title = params.pageTitle || `${boMeta.label}列表`;
      $scope.setPageTitle(title);
      $scope.setNavInfos([{
        label: "主页",
        state: "home"
      }, {
        label: title
      }]);
    }

    $scope.onSearch = function(queryExpr) {
      params.queryExprText = queryExpr;
      BoService.query(boNamespace, boName, null, queryExpr, $scope.boMetadata.listview.orderBy)
        .then(function(pageData) {
          $scope.pageData = pageData;
        });
    };

    $scope.onRowClicked = function(lineData, index) {
      StateHelper.gotoBoDetail(params.boNamespace, params.boName, lineData.id);
    };

    $scope.onPagingChanged = function(pageIndex) {
      BoService.query(params.boNamespace, params.boName, pageIndex, params.queryExprText)
        .then(function(pageData) {
          $scope.pageData = pageData;
        });
    };

    $scope.onCreate = function() {
      $state.go("boCreate", {
        boName: params.boName,
        boNamespace: params.boNamespace
      });
    };

  }
]);