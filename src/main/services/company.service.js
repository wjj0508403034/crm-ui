'use strict';

huoyun.factory("CompanyService", ["$http", "BaseService", "ServiceContext",
  function($http, BaseService, ServiceContext) {

    return {
      getCompanyInfo: function() {
        var url = `${ServiceContext}/companyInfo`;
        return BaseService.getResponse($http.get(url));
      }
    };
  }
]);