'use strict';

huoyun.config(["BoTemplateProvider", "BoStateProvider",
  function(BoTemplateProvider, BoStateProvider) {
    BoTemplateProvider.configure("com.huoyun.sbo", "Contract", {
      detail: {
        templateUrl: "contract/contract.detail.html",
      }
    });

    BoStateProvider.register("com.huoyun.sbo", "Contract", {
      state: "contract",
      url: "/contract",
      label: "合同"
    });
  }
]);