'use strict';

huoyun.factory("CustomerTraceRecord", ["$http", "BaseService", "ServiceContext",
  function($http, BaseService, ServiceContext) {

    return {
      postComment: function(customerId, comment) {
        var url = `${ServiceContext}/customer/${customerId}/postComment`;
        return BaseService.getResponse($http.post(url, comment));
      },

      getComments: function(customerId) {
        var url = `${ServiceContext}/customer/${customerId}/comments`;
        return BaseService.getResponse($http.get(url));
      }
    };
  }
]);