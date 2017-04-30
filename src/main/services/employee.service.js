'use strict';

huoyun.factory("EmployeeService", ["$http", "BaseService", "ServiceContext",
  function($http, BaseService, ServiceContext) {

    return {
      getProfile: function() {
        var url = `${ServiceContext}/profile`;
        return BaseService.getResponse($http.get(url));
      },

      changePassword: function(oldPassword, newPassword, repeatNewPassword) {
        var url = `${ServiceContext}/changePassword`;
        return BaseService.getResponse($http.post(url, {
          oldPassword: oldPassword,
          newPassword: newPassword,
          repeatNewPassword: repeatNewPassword
        }));
      }
    };
  }
]);