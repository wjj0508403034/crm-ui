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
      url: "/list(:boNamespace,:boName)?:queryExpr",
      templateUrl: "framework/listview.html",
      controller: 'BoListViewController'
    })
    .state("myCustomer", {
      url: "/myCustomer",
      templateUrl: "framework/listview.html",
      controller: 'BoListViewController',
      data: {
        boNamespace: "com.huoyun.sbo",
        boName: "Customer",
        title: "我的客户",
        queryExpr: "deleted eq false"
      }
    })
    .state("trash", {
      abstract: true,
      url: "/trash",
      templateUrl: "framework/general.html",
      data: {
        boNamespace: "com.huoyun.sbo",
        boName: "Customer"
      }
    })
    .state("trash.list", {
      url: "/list",
      templateUrl: "framework/listview.html",
      controller: 'BoListViewController',
      data: {
        title: "回收站",
        queryExpr: "deleted eq true",
        detailStateName: "trash.detail"
      }
    })
    .state("trash.detail", {
      url: "/list/:boId",
      templateUrl: "framework/homeview.html",
      controller: 'BoHomeViewController',
      data: {
        listStateName: "trash.list",
        listStateLabel: "回收站"
      }
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
    })
    .state("company", {
      url: "/company",
      templateUrl: "framework/homeview.html",
      controller: 'BoHomeViewController'
    })
    .state("profile", {
      url: "/profile",
      templateUrl: "framework/homeview.html",
      controller: 'BoHomeViewController',
      data: {
        boName: "Employee",
        boNamespace: "com.huoyun.sbo",
        title: "我的主页",
        subTitle: "主页",
        navs: [{
          label: "主页",
          state: "home"
        }, {
          label: "我的主页"
        }],
        loadBoDataService: function($injector) {
          return $injector.get("EmployeeService").getProfile();
        },
        buttons: {
          "delete": {
            visibility: false
          }
        }
      }
    })
});

huoyun.provider('DynamicState', function runtimeStates($stateProvider) {

  this.$get = function($q, $timeout, $state) {
    return {
      addState: function(name, state) {
        $stateProvider.state(name, state);
      }
    }
  }
});

huoyun.factory("StateHelper", ["$state", "DynamicState",
  function($state, DynamicStateProvider) {

    return {
      registerBoListState: function(stateName, params) {
        var listStateName = `${stateName}.list`;
        var detailStateName = `${stateName}.detail`;
        DynamicStateProvider.addState(stateName, {
          abstract: true,
          url: `/${stateName}`,
          templateUrl: "framework/general.html",
          data: {
            boNamespace: "com.huoyun.sbo",
            boName: "Customer"
          }
        });

        DynamicStateProvider.addState(listStateName, {
          url: "/list",
          templateUrl: "framework/listview.html",
          controller: 'BoListViewController',
          data: {
            title: stateName,
            queryExpr: params.queryExpr,
            detailStateName: detailStateName
          }
        });

        DynamicStateProvider.addState(detailStateName, {
          url: "/list/:boId",
          templateUrl: "framework/homeview.html",
          controller: 'BoHomeViewController',
          data: {
            listStateName: listStateName,
            listStateLabel: stateName
          }
        });
      },

      getCurrentStateName: function() {
        return $state.current.name;
      },

      getBoListState: function(boNamespace, boName, queryExpr) {
        if (!queryExpr) {
          return `boList({"boNamespace":"${boNamespace}","boName": "${boName}","queryExpr":""})`;
        } else {
          return `boList({"boNamespace":"${boNamespace}","boName": "${boName}","queryExpr": "${queryExpr}"})`;
        }

      },
      getBoEditState: function(boNamespace, boName, boId) {
        return `edit({"boNamespace":"${boNamespace}","boName": "${boName}"})/${boId}`;
      },

      getHome: function() {
        return "home";
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

      gotoBoDetail: function(boNamespace, boName, boId) {
        if ($state.current.data && $state.current.data.detailStateName) {
          $state.go($state.current.data.detailStateName, { boId: boId });
          return;
        }

        $state.go("boHome", {
          boId: boId,
          boName: boName,
          boNamespace: boNamespace
        });
      },

      gotoHome: function() {
        $state.go("home");
      }
    };
  }
]);