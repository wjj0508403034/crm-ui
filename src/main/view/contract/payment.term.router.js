'use strict';

huoyun.config(["BoStateProvider", function(BoStateProvider) {
  BoStateProvider.register("com.huoyun.sbo", "PaymentTerm", {
    state: "paymentTerm",
    url: "/paymentTerms",
    label: "支付方式",
    list: {
      disableSearch: true
    }
  });
}]);