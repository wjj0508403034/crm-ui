'use strict';

huoyun.config(["BoStateProvider", "BoTemplateProvider",
  function(BoStateProvider, BoTemplateProvider) {
    BoTemplateProvider.configure("com.huoyun.sbo", "PermissionGroup", {
      create: {
        propTemplates: {
          "states": {
            templateUrl: "permission/templates/create/permission.property.states.html"
          }
        }
      },
      edit: {
        propTemplates: {
          "states": {
            templateUrl: "permission/templates/create/permission.property.states.html"
          }
        }
      },
      detail: {
        partTemplates: [{
          templateUrl: "permission/templates/detail/permission.property.members.html",
          position: "bottom"
        }],
        propTemplates: {
          "states": {
            templateUrl: "permission/templates/detail/permission.property.states.html"
          }
        }
      }
    });

    BoTemplateProvider.configure("com.huoyun.sbo", "PermissionGroupMember", {
      list: {
        propTemplates: {
          "employee": {
            templateUrl: "permission/templates/list/permission.group.member.property.employee.html"
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