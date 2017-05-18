'use strict';

huoyun.controller('ContractDetailController', ["$scope", "BoService", "$state",
  function($scope, BoService, $state) {

    BoService.getMetadata("com.huoyun.sbo", "Payment")
      .then(function(boMeta) {
        $scope.paymentMeta = boMeta;
      });

    BoService.query("com.huoyun.sbo", "Payment")
      .then(function(pageData) {
        $scope.paymentPageData = pageData;
      });

    $scope.onCreatePaymentButtonClicked = function() {
      $state.go("contract.detail.createPayment", {
        boId: 1
      });
    };
  }
]);