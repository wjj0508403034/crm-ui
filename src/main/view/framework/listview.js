'use strict';
huoyun.controller('BoListViewController', ["$scope", "$state", "MetadataService", "MetadataHelper", "BoService", "BoDataHelper",
  function ($scope, $state, MetadataService, MetadataHelper, BoService, BoDataHelper) {
    var boName = $state.current.data.boName;
    var boNamespace = $state.current.data.boNamespace;

    MetadataService.getMetadata(boNamespace, boName)
      .then(function (boMeta) {
        $scope.boMetadata = MetadataHelper.convertTo(boMeta);
      });

    BoService.query(boNamespace, boName)
      .then(function (pageData) {
        var res = {};
        angular.copy(pageData, res);
        $scope.pageData = res;
      });

    $scope.onRowClicked = function (lineData, index) {
      var ss = index;
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

  }]);