'use strict';

huoyun.controller('CustomerPropertyStatusDetailController', ["$scope", "BoService", "BoHelper", "$q",
  function($scope, BoService, BoHelper, $q) {


    $q.all([BoHelper.getBoData($scope), queryDesignStatus()])
      .then(function(res) {
        initDesignStatus(res[1]);
        initCustomerDesignStatus(res[0]);
      });

    function initDesignStatus(status) {
      $scope.statusItems = [];
      status.forEach(function(statusItem) {
        statusItem.$$disable = true;
        $scope.statusItems.push(statusItem);
      });
    }

    function initCustomerDesignStatus(boData) {
      if (!boData || !boData[$scope.prop.name]) {
        return;
      }

      var index = -1;
      if (boData && $scope.statusItems) {
        $scope.statusItems.forEach(function(statusItem, statusIndex) {
          if (boData[$scope.prop.name].id === statusItem.id) {
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

    function queryDesignStatus() {
      return BoService.queryAll($scope.prop.additionInfo.boNamespace, $scope.prop.additionInfo.boName,
        null, "orderNo");
    }
  }
]);