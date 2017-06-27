'use strict';

huoyun.config(["BoStateProvider",
  function(BoStateProvider) {
    BoStateProvider.register("com.huoyun.sbo", "HouseType", {
      state: "houseType",
      url: "/houseType",
      label: "户型",
      list: {
        disableSearch: true,
        buttons: {
          "adjustTableColumn": {
            visibility: false
          }
        }
      }
    });
  }
]);