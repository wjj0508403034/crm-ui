'use strict';

huoyun.config(["BoStateProvider", "BoTemplateProvider",
  function(BoStateProvider, BoTemplateProvider) {
    BoTemplateProvider.configure("com.huoyun.sbo", "PermissionGroup", {
      edit: {
        propTemplates: {
          "states": {
            templateUrl: "permission/templates/create/permission.property.states.html"
          }
        }
      },
      detail: {
        propTemplates: {
          "members": {
            templateUrl: "permission/templates/detail/permission.property.members.html"
          }
        }
      }
    });

    BoStateProvider.register("com.huoyun.sbo", "PermissionGroup", {
      state: "permissionGroup",
      url: "/PermissionGroup",
      label: "权限组",
      list: {
        disableSearch: true,
        buttons: {
          "adjustTableColumn": {
            visibility: false
          }
        }
      }
    });
  }
]);