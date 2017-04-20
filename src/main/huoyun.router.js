'use strict';

huoyun.constant("ServiceContext", "");
huoyun.constant("DebugMode", true);

huoyun.run(function ($rootScope) {
  $rootScope.$on('$stateChangeStart',
    function (event, toState) {
      console.log(arguments);
    });

  $rootScope.$on('$stateNotFound',
    function (event, unfoundState, fromState, fromParams) {
      console.log(arguments);
    });

  $rootScope.$on('$stateChangeSuccess',
    function (event, toState, toParams, fromState, fromParams) {
      console.log(arguments);
    });

  $rootScope.$on('$stateChangeError',
    function (event, toState, toParams, fromState, fromParams, error) {
      console.log(arguments);
    });
});

huoyun.config(function ($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.when("/", ["$state", function ($state) {
    //console.log(arguments);
    $state.go("home");
  }]);

  $urlRouterProvider.otherwise(function ($injector, $location) {
    console.warn(`URL not found, URL: ${$location.$$absUrl}, Path: ${$location.$$url}`);
    $injector.get("$state").go("home");
  });

  $stateProvider
    .state("baseInfo", {
      url: "/baseInfo",
      templateUrl: "base_info/baseInfo.html",
      controller: 'BaseInfoController'
    })
    .state("home", {
      url: "/index",
      templateUrl: "home/home.html",
      controller: 'HomeViewController',
      label: "主页"
    })
    .state("boList", {
      url: "/list(:boNamespace,:boName)",
      templateUrl: "framework/listview.html",
      controller: 'BoListViewController'
    })
    .state("boCreate", {
      url: "/create(:boNamespace,:boName)",
      templateUrl: "framework/ceationview.html",
      controller: 'BoCreationViewController'
    })
    .state("boEdit", {
      url: "/edit(:boNamespace,:boName)/:boId",
      templateUrl: "framework/edtionview.html",
      controller: 'BoEdtionViewController'
    });

});