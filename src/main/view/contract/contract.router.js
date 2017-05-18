'use strict';

huoyun.config(["$stateProvider", "BoStateProvider",
  function($stateProvider, BoStateProvider) {
    BoStateProvider.register("com.huoyun.sbo", "Contract", {
      state: "contract",
      url: "/contract",
      label: "合同",
      detail: {
        templateUrl: "contract/contract.detail.html"
      }
    });
  }
]);