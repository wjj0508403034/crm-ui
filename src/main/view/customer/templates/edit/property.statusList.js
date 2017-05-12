'use strict';

huoyun.controller('CustomerPropertyStatusListController', ["$scope", "BoService",
  function($scope, BoService) {

    BoService.query("com.huoyun.sbo", "CustomerStatus")
      .then(function(pageData) {
        $scope.items = [];
        pageData.content.forEach(function(item) {
          item.$$selected = false;
          $scope.items.push(item);
        });
        initCheckBoxStatus();
      });

    $scope.$on("BoDataLoaded", function(boData) {
      initCheckBoxStatus();
    });

    function initCheckBoxStatus() {
      if ($scope.boData && $scope.items) {
        var selectedCustomerStatusIds = [];
        ($scope.boData["statusList"] || []).forEach(function(statusItem, statusItemIndex) {
          selectedCustomerStatusIds.push(statusItem.customerStatus.id);
        });

        $scope.items.forEach(function(customerStatus, customerStatusIndex) {
          if (selectedCustomerStatusIds.indexOf(customerStatus.id) !== -1) {
            customerStatus.$$selected = true;
          }
        });
      }
    }

    $scope.onCheckBoxValueChanged = function(value, item) {
      if (value !== item.$$selected) {
        if (value) {
          $scope.boData["statusList"].push({
            customerStatus: item
          });
        } else {
          for (var index = 0; index < $scope.boData["statusList"].length; index++) {
            if (item.id === $scope.boData["statusList"][index]["customerStatus"]["id"]) {
              $scope.boData["statusList"].splice(index, 1);
              break;
            }
          }
        }
      }
    };
  }
]);