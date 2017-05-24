'use strict';

huoyun.config(["BoStateProvider", function(BoStateProvider) {
  BoStateProvider.register("com.huoyun.sbo", "FinishType", {
    state: "finishtype",
    url: "/finishtype",
    label: "装修方式",
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