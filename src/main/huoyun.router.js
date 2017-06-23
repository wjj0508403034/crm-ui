'use strict';

huoyun.run(function($rootScope) {
  $rootScope.$on('$stateChangeStart',
    function(event, toState) {
      if (event.currentScope) {

        if (typeof event.currentScope.setPageTitle === "function") {
          event.currentScope.setPageTitle();
        }

        if (typeof event.currentScope.setNavInfos === "function") {
          event.currentScope.setNavInfos([]);
        }
      }
    });

  $rootScope.$on('$stateNotFound',
    function(event, unfoundState, fromState, fromParams) {
      console.log(arguments);
    });

  $rootScope.$on('$stateChangeSuccess',
    function(event, toState, toParams, fromState, fromParams) {
      console.log(arguments);
    });

  $rootScope.$on('$stateChangeError',
    function(event, toState, toParams, fromState, fromParams, error) {
      console.log(arguments);
    });
});

huoyun.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.when("/", ["$state", function($state) {
    $state.go("home");
  }]);

  $urlRouterProvider.otherwise(function($injector, $location) {
    console.warn(`URL not found, URL: ${$location.$$absUrl}, Path: ${$location.$$url}`);
    $injector.get("$state").go("home");
  });

  $stateProvider
    .state("home", {
      url: "/index",
      templateUrl: "home/home.html",
      controller: 'HomeViewController',
      label: "主页"
    })
    .state("boList", {
      url: "/list(:boNamespace,:boName)?:queryExpr",
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
    })
    .state("boHome", {
      url: "/home(:boNamespace,:boName)/:boId",
      templateUrl: "framework/homeview.html",
      controller: 'BoHomeViewController'
    });

});

huoyun.factory("StateHelper", ["$state",
  function($state) {

    return {


      getBoListState: function(boNamespace, boName, queryExpr) {
        if (!queryExpr) {
          return `boList({"boNamespace":"${boNamespace}","boName": "${boName}","queryExpr":""})`;
        } else {
          return `boList({"boNamespace":"${boNamespace}","boName": "${boName}","queryExpr": "${queryExpr}"})`;
        }

      },

      gotoBoList: function(boNamespace, boName, queryExpr) {
        if ($state.current.data && $state.current.data.listStateName) {
          $state.go($state.current.data.listStateName);
          return;
        }
        $state.go("boList", {
          boNamespace: boNamespace,
          boName: boName,
          queryExpr: queryExpr || ""
        });
      },

      gotoBoEdit: function(boNamespace, boName, boId) {
        $state.go("boEdit", {
          boId: boId,
          boName: boName,
          boNamespace: boNamespace
        });
      },

      gotoBoCreate: function(boNamespace, boName) {
        $state.go("boCreate", {
          boName: boName,
          boNamespace: boNamespace
        });
      },

      gotoBoDetail: function(boNamespace, boName, boId) {
        $state.go("boHome", {
          boId: boId,
          boName: boName,
          boNamespace: boNamespace
        });
      }
    };
  }
]);