'use strict';

var huoyun = angular.module('huoyun', ["huoyun.widget", 'ui.router']);

huoyun.controller("appController", ["$scope", "MetadataService", "MetadataHelper", "BoService",
  function ($scope, MetadataService, MetadataHelper, BoService) {
    $scope.title = "火云CRM";

    MetadataService.getMetadata()
      .then(function (boMeta) {
        $scope.boMetadata = MetadataHelper.convertTo(boMeta);
      });

    BoService.query()
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