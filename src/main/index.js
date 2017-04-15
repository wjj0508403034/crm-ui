'use strict';

var huoyun = angular.module('huoyun', ["huoyun.widget",'ui.router']);

huoyun.controller("appController", ["$scope", "MetadataService", "MetadataHelper", "BoService",
  function ($scope, MetadataService, MetadataHelper, BoService) {
    $scope.title = "火云CRM";

    MetadataService.getMetadata()
      .then(function (boMeta) {
        $scope.boMetadata = MetadataHelper.convertTo(boMeta);
      });

    BoService.query()
      .then(function (pageData) {
        $scope.pageData = pageData;
      });

    $scope.onRowClicked = function (lineData, index) {
      var ss = index;
    };
  }]);