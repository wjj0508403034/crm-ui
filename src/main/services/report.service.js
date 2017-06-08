'use strict';

huoyun.factory("ReportService", ["$http", "BaseService", "ServiceContext",
  function($http, BaseService, ServiceContext) {

    return {
      top5Sales: function() {
        var url = `${ServiceContext}/reports/top5Sales`;
        return BaseService.getResponse($http.get(url));
      },

      top5Designers: function() {
        var url = `${ServiceContext}/reports/top5Designers`;
        return BaseService.getResponse($http.get(url));
      },

      contractsOfThisYear: function() {
        var url = `${ServiceContext}/reports/contractsOfThisYear`;
        return BaseService.getResponse($http.get(url));
      },

      perMonthContractTotalAmountOfThisYear: function() {
        var url = `${ServiceContext}/reports/perMonthContractTotalAmountOfThisYear`;
        return BaseService.getResponse($http.get(url));
      }
    };
  }
]);