'use strict';

huoyun.config(["BoStateProvider", "BoTemplateProvider",
  function(BoStateProvider, BoTemplateProvider) {

    BoTemplateProvider.configure("com.huoyun.sbo", "Employee", {
      select: {
        single: {
          templateUrl: "employee/templates/single.select.item.html"
        },
        multi: {
          templateUrl: "employee/templates/multi.select.item.html"
        }
      }
    });

    BoTemplateProvider.registerBoPropertyDefaultImageUrl("com.huoyun.sbo", "Employee", "avatar", "/res/avatar.png");

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
      }
    });
  }
]);