'use strict';

var huoyunWidget = angular.module('huoyun.widget',[]);


angular.module('huoyun.widget').config(function ($stateProvider, $urlRouterProvider) {
     $urlRouterProvider.when("", "/index");
     $stateProvider
        .state("index", {
            url: "/index",
            templateUrl: "PageTab.html"
        })
});