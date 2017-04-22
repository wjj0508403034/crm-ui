'use strict';
huoyun.controller('HomeViewController', ["$scope", "$state", "$stateParams", "BoService",
  function($scope, $state, $stateParams, BoService) {
    $scope.setPageTitle("主页", "仪表盘");

    $scope.setNavInfos([{
      label: "主页"
    }]);

    $scope.tiles = [{
      icon: "on-person-add",
      text: "公司本月到店客户",
      stateLink: "boList({boName:'Customer',boNamespace:'com.huoyun.sbo'})",
      number: "--"
    }, {
      icon: "on-person-add",
      text: "公司本月到店客户",
      stateLink: "boList({boName:'Customer',boNamespace:'com.huoyun.sbo'})",
      number: "--"
    }, {
      icon: "on-person-add",
      text: "公司本月到店客户",
      stateLink: "boList({boName:'Customer',boNamespace:'com.huoyun.sbo'})",
      number: "--"
    }, {
      icon: "on-person-add",
      text: "公司本月到店客户",
      stateLink: "boList({boName:'Customer',boNamespace:'com.huoyun.sbo'})",
      number: "--"
    }];

    $scope.tiles.forEach(function(tile, tileIndex) {

    });
  }
]);