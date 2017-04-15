'use strict';

var huoyun = angular.module('huoyun', ["huoyun.widget", 'ui.router']);

huoyun.controller("appController", ["$scope", "MetadataService", "MetadataHelper", "BoService", "BoDataHelper",
  function ($scope, MetadataService, MetadataHelper, BoService, BoDataHelper) {
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

    $scope.onSave = function (data, boMetadata) {
      return new Promise(function (reslove, reject) {
        reslove("Save Successfully");
      });
    };

    $scope.onValid = function (data, boMetadata) {
      return BoDataHelper.validator(data, boMetadata);
    };
  }]);