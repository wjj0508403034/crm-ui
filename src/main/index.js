'use strict';

var huoyun = angular.module('huoyun',["huoyun.widget",'ui-router']);

huoyun.controller("appController", ["$scope", function ($scope) {
  $scope.title = "火云CRM";
}]);