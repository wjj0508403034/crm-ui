'use strict';

var huoyun = angular.module('huoyun', ["huoyun.widget", 'ui.router']);

huoyun.controller("appController", ["$scope", "Dialog", "HttpErrorHandler", "HomepageService",
  function($scope, Dialog, HttpErrorHandlerProvider, HomepageService) {
    HttpErrorHandlerProvider.setDialog(Dialog);
    $scope.title = "火云CRM";
    $scope.navs = [];
    $scope.setPageTitle = function(title, subTitle) {
      $scope.pageTitle = title;
      $scope.pageSubTitle = subTitle;
    };

    $scope.setNavInfos = function(navs) {
      $scope.navs = navs;
    };

    HomepageService.getMenus()
      .then(function(menus) {
        $scope.sideBarItems = menus;
      });

    $scope.reloadMenus = function() {
      HomepageService.reloadMenus()
        .then(function(menus) {
          $scope.sideBarItems = menus;
        });
    };
  }
]);