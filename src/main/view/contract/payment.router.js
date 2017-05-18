'use strict';

huoyun.config(["BoStateProvider", function(BoStateProvider) {
  BoStateProvider.register("com.huoyun.sbo", "Payment", {
    state: "payment",
    url: "/payment",
    label: "支付方式"
  });
}]);