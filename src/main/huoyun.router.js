'use strict';
angular.module('huoyun').config(function ($stateProvider, $urlRouterProvider) {
     $urlRouterProvider.when("", "home");
     $stateProvider
        .state("home", {
            url: "/home",
            templateUrl: "./dist/view/home/home.html",
            controller:'HomeController'
        })
});