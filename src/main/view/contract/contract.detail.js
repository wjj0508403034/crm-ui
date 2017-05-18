'use strict';

huoyun.controller('ContractDetailController', ["$scope", "$stateParams", "BoService", "$state", "SearchHelper",
  function($scope, $stateParams, BoService, $state, SearchHelper) {

    BoService.getMetadata("com.huoyun.sbo", "Payment")
      .then(function(boMeta) {
        $scope.paymentMeta = boMeta;
      });

    BoService.query("com.huoyun.sbo", "Payment", null, `contract eq ${$stateParams.boId}`)
      .then(function(pageData) {
        $scope.paymentPageData = pageData;
      });

    $scope.onCreatePaymentButtonClicked = function() {
      $state.go("payment.create", {
        contractId: $stateParams.boId
      });
    };

    $scope.onRowClicked = function(lineData, lineIndex) {
      $state.go("payment.detail", {
        contractId: $stateParams.boId,
        boId: lineData.id
      });
    };
  }
]);