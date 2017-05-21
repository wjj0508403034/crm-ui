'use strict';

huoyun.controller('CustomerPropertyStatusDetailController', ["$scope", "BoService",
  function($scope, BoService) {

    BoService.queryAll("com.huoyun.sbo", "CustomerStatus", null, "orderNo")
      .then(function(listData) {
        $scope.statusItems = [];
        listData.forEach(function(statusItem) {
          statusItem.$$disable = true;
          $scope.statusItems.push(statusItem);
        });
        initStatus();
      });

    $scope.$on("BoDataLoaded", function(boData) {
      initStatus();
    });

    function initStatus() {
      if (!$scope.boData["status"]) {
        return;
      }

      var index = -1;
      if ($scope.boData && $scope.statusItems) {

        $scope.statusItems.forEach(function(statusItem, statusIndex) {
          if ($scope.boData["status"].id === statusItem.id) {
            index = statusIndex;
          }
        });

        $scope.statusItems.forEach(function(statusItem, statusIndex) {
          if (index >= statusIndex) {
            statusItem.$$disable = false;
          }
        });

      }
    }
  }
]);