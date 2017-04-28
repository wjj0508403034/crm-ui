'use strict';

huoyun.factory("EmployeeService", ["$http", "BaseService", "ServiceContext",
  function($http, BaseService, ServiceContext) {

    return {
      getProfile: function() {
        var url = `${ServiceContext}/profile`;
        return BaseService.getResponse($http.get(url));
      }
    };
  }
]);