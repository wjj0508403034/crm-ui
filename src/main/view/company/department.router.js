'use strict';

huoyun.config(["BoStateProvider", function(BoStateProvider) {
  BoStateProvider.register("com.huoyun.sbo", "Department", {
    state: "department",
    url: "/department",
    label: "部门",
    list: {
      disableSearch: true
    }
  });
}]);