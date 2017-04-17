'use strict';

var huoyun = angular.module('huoyun', ["huoyun.widget", 'ui.router']);

huoyun.controller("appController", ["$scope",
  function ($scope) {
    $scope.title = "火云CRM";
    $scope.navs = [];
    $scope.setPageTitle = function (title, subTitle) {
      $scope.pageTitle = title;
      $scope.pageSubTitle = subTitle;
    };

    $scope.setNavInfos = function (navs) {
      $scope.navs = navs;
    };
  }
]);