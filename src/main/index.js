'use strict';

var huoyun = angular.module('huoyun', ["huoyun.widget", 'ui.router']);

huoyun.controller("appController", ["$scope", "Dialog", "HttpErrorHandler", "HomepageService", "EmployeeService",
  "MetadataService", "MenuService", "CompanyService",
  function($scope, Dialog, HttpErrorHandlerProvider, HomepageService, EmployeeService, MetadataService, MenuService,
    CompanyService) {

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

    MenuService.getMenus()
      .then(function(menus) {
        $scope.sideBarItems = menus;
      });

    $scope.reloadMenus = function() {
      // HomepageService.reloadMenus()
      //   .then(function(menus) {
      //     $scope.sideBarItems = menus;
      //   });
    };

    Promise.all([CompanyService.getCompanyInfo(), EmployeeService.getProfile()])
      .then(function(data) {
        $scope.company = data[0];
        $scope.user = data[1];
      });
  }
]);