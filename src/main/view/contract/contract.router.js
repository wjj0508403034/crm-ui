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

    $stateProvider.state("contract.detail.createPayment", {
      url: "/createPayment",
      templateUrl: "framework/ceationview.html",
      controller: 'BoCreationViewController',
      data: {
        boName: "Payment",
        boNamespace: "com.huoyun.sbo",
        navs: [],
        onSaveCallback: function($injector) {
          $injector.get("Tip").show("创建成功！");
          gotoBoListPage($injector);
        },
        onCancelCallback: function($injector) {
          gotoBoListPage($injector);
        }
      }
    });
  }
]);