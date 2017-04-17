'use strict';
huoyun.controller('HomeViewController', ["$scope", "$state", "$stateParams",
  function ($scope, $state, $stateParams) {
    $scope.setPageTitle("主页");

    $scope.setNavInfos([{
      label: "主页"
    }]);
  }
]);