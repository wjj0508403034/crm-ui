'use strict';

huoyun.config(function ($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.when("", "home");
  $stateProvider
    .state("home", {
      url: "/home",
      templateUrl: "home/home.html",
      controller: 'HomeController'
    }).state("customer", {
      url: "/customer",
      templateUrl: "framework/listview.html",
      controller: 'BoListViewController',
      data: {
        boName: "Customer",
        boNamespace: "com.huoyun.sbo"
      }
    })
});