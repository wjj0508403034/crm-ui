'use strict';

huoyun.config(["BoStateProvider", function(BoStateProvider) {
  BoStateProvider.register("com.huoyun.sbo", "Title", {
    state: "employeeTitle",
    url: "/employee.title",
    label: "职务",
    list: {
      disableSearch: true,
      buttons: {
        "adjustTableColumn": {
          visibility: false
        }
      }
    }
  });
}]);