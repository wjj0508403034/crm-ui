'use strict';

huoyun.factory("PermissionService", ["$http", "BaseService", "ServiceContext",
  function($http, BaseService, ServiceContext) {

    return {
      addGroupMembers: function(groupId, employeeIds) {
        var url = `${ServiceContext}/permission/${groupId}/addGroupMembers`;
        return BaseService.getResponse($http.post(url, employeeIds));
      },
      currentPermissionGroups: function() {
        var url = `${ServiceContext}/permission/currentPermissionGroups`;
        return BaseService.getResponse($http.get(url));
      }
    };
  }
]);