'use strict';

huoyun.service("$stateHistory", ["$rootScope", "$state", function($rootScope, $state) {
  function StateHistory() {
    var records = [];

    this.getRecords = function() {
      return records;
    };
  }

  StateHistory.prototype.push = function(state) {
    if (!this.isBack()) {
      this.getRecords().push(state);
    }
    this.backing = false;
  };

  StateHistory.prototype.pop = function(state) {
    if (this.getRecords().length > 0) {
      var data = this.getRecords().splice(this.getRecords().length - 1, 1);
      return data && data.length > 0 && data[0];
    }
  };

  StateHistory.prototype.back = function() {
    this.backing = true;
    var last = this.pop();
    last && $state.go(last.state, last.params);
  };

  StateHistory.prototype.isBack = function() {
    return !!this.backing;
  };

  StateHistory.prototype.clear = function() {
    this.backing = false;
    this.getRecords().splice(0, this.getRecords().length - 1);
  };

  var history = new StateHistory();

  $rootScope.$on('$stateChangeSuccess',
    function(event, toState, toParams, fromState, fromParams) {
      console.log("Is Back:" + history.isBack())
      history.push({
        state: toState,
        params: toParams
      });
    });

  return history;
}]);

huoyun.run(["$stateHistory", function($stateHistory) {

}]);

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
      //console.log(arguments);
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
    .state("newBoList", {
      url: "/listview",
      templateUrl: "common/bo.list.view.html",
      controller: 'NewBoListViewController'
    })
    .state("newBoCreation", {
      url: "/creationview",
      templateUrl: "common/bo.creation.view.html",
      controller: 'NewBoCreationViewController'
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