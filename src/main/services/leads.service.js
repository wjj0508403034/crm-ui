'use strict';

huoyun.factory("LeadsService", ["$http", "BaseService", "ServiceContext",
  function($http, BaseService, ServiceContext) {

    return {
      generateToCustomer: function(leadsId) {
        var url = `${ServiceContext}/leads/${leadsId}/generateToCustomer`;
        return BaseService.getResponse($http.post(url));
      }
    };
  }
]);