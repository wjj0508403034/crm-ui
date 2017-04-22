'use strict';
huoyun.controller('BoListViewController', ["$scope", "$state", "$stateParams", "MetadataService", "BoService", "BoDataHelper",
  function($scope, $state, $stateParams, MetadataService, BoService, BoDataHelper) {
    var boName = $stateParams.boName;
    var boNamespace = $stateParams.boNamespace;
    var queryExprText = "";
    var that = this;

    if (!boName || !boNamespace) {
      $state.go("home");
    }

    $scope.setPageTitle("客户列表");
    $scope.setNavInfos([{
      label: "主页",
      state: "home"
    }, {
      label: "客户列表"
    }]);

    MetadataService.getMetadata(boNamespace, boName)
      .then(function(boMeta) {
        $scope.boMetadata = boMeta;
      });

    BoService.query(boNamespace, boName)
      .then(function(pageData) {
        $scope.pageData = pageData;
      });

    $scope.onSearch = function(queryExpr) {
      queryExprText = queryExpr;
      BoService.query(boNamespace, boName, null, queryExpr)
        .then(function(pageData) {
          $scope.pageData = pageData;
        });
    };

    $scope.onRowClicked = function(lineData, index) {
      $state.go("boHome", {
        boId: lineData.id,
        boName: boName,
        boNamespace: boNamespace
      });
    };

    $scope.onPagingChanged = function(pageIndex) {
      BoService.query(boNamespace, boName, pageIndex, queryExprText)
        .then(function(pageData) {
          $scope.pageData = pageData;
        });
    };

    $scope.onCreate = function() {
      $state.go("boCreate", {
        boName: boName,
        boNamespace: boNamespace
      });
    };

  }
]);