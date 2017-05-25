'use strict';

huoyun.config(["$stateProvider", "BoStateProvider", "BoTemplateProvider",
  function($stateProvider, BoStateProvider, BoTemplateProvider) {

    BoTemplateProvider.configure("com.huoyun.sbo", "Employee", {
      select: {
        single: {
          templateUrl: "employee/templates/single.select.item.html"
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
      }
    });
  }
]);