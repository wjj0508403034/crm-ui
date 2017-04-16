'use strict';

huoyun.config(function ($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.when("", "home");
  $stateProvider
    .state("baseInfo", {
      url: "/baseInfo",
      templateUrl: "base_info/baseInfo.html",
      controller: 'BaseInfoController'
    })
    .state("customer", {
      url: "/customer",
      templateUrl: "framework/listview.html",
      controller: 'BoListViewController',
      data: {
        boName: "Customer",
        boNamespace: "com.huoyun.sbo"
      }
    })
});