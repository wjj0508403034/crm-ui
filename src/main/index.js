'use strict';

var huoyun = angular.module('huoyun', ["huoyun.widget", 'ui.router']);

huoyun.controller("appController", ["$scope", "Dialog", "HttpErrorHandler", "HomepageService", "EmployeeService",
  "MetadataService",
  function($scope, Dialog, HttpErrorHandlerProvider, HomepageService, EmployeeService, MetadataService) {

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

    Promise.all([MetadataService.getMetadata("com.huoyun.sbo", "Employee"), EmployeeService.getProfile()])
      .then(function(data) {
        $scope.user = data[1];
        $scope.userMeta = data[0];
      });
  }
]);