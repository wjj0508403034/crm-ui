'use strict';
huoyun.controller('BoListViewController', ["$scope", "$state", "$stateParams", "MetadataService", "BoService", "BoDataHelper",
  function ($scope, $state, $stateParams, MetadataService, BoService, BoDataHelper) {
    var boName = $stateParams.boName;
    var boNamespace = $stateParams.boNamespace;

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
      .then(function (boMeta) {
        $scope.boMetadata = boMeta;
      });

    BoService.query(boNamespace, boName)
      .then(function (pageData) {
        var res = {};
        angular.copy(pageData, res);
        $scope.pageData = res;
      });

    $scope.onRowClicked = function (lineData, index) {
      $state.go("boEdit", {
        boId: lineData.id,
        boName: boName,
        boNamespace: boNamespace
      });
    };

    $scope.onPagingChanged = function (pageIndex) {
      BoService.query()
        .then(function (pageData) {
          var res = {};
          angular.copy(pageData, res);
          res.number = pageIndex;
          $scope.pageData = res;
          $scope.$apply();
        });
    };

    $scope.onCreate = function () {
      $state.go("boCreate", {
        boName: boName,
        boNamespace: boNamespace
      });
    };

  }
]);