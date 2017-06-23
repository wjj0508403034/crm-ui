'use strict';

huoyun.factory("InitService", ["$http", "BaseService", "ServiceContext",
  function($http, BaseService, ServiceContext) {

    return {
      getInitData: function() {
        var url = `${ServiceContext}/initService/getInitData`;
        return BaseService.getResponse($http.get(url));
      }
    };
  }
]);