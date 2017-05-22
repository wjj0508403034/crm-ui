'use strict';

huoyun.config(["$stateProvider", "BoStateProvider",
  function($stateProvider, BoStateProvider) {
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