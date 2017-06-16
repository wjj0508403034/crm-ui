'use strict';

huoyun.config(["BoStateProvider", "BoTemplateProvider",
  function(BoStateProvider, BoTemplateProvider) {

    BoTemplateProvider.configure("com.huoyun.sbo", "Employee", {
      defaultImageUrls: {
        avatar: "/res/avatar.png"
      },
      select: {
        single: {
          templateUrl: "employee/templates/single.select.item.html"
        },
        multi: {
          templateUrl: "employee/templates/multi.select.item.html"
        }
      }
    });

    BoStateProvider.register("com.huoyun.sbo", "Employee", {
      state: "employee",
      url: "/employee",
      label: "员工",
      edit: {
        dynamicMeta: {
          "email": {
            readonly: true
          }
        }
      },
      detail: {
        buttons: {
          "delete": {
            visibility: false
          }
        }
      }
    });
  }
]);