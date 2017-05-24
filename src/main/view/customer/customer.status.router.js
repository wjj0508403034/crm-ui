'use strict';

huoyun.config(["BoStateProvider", function(BoStateProvider) {
  BoStateProvider.register("com.huoyun.sbo", "CustomerStatus", {
    state: "customerStatus",
    url: "/customer.status",
    label: "客户状态",
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