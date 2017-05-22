'use strict';

huoyun.config(["BoStateProvider", function(BoStateProvider) {
  BoStateProvider.register("com.huoyun.sbo", "SalesSource", {
    state: "salesSource",
    url: "/customer.source",
    label: "客户来源",
    list: {
      disableSearch: true
    }
  });
}]);