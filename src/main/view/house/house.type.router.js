'use strict';

huoyun.config(["BoStateProvider", "BoTemplateProvider",
  function(BoStateProvider, BoTemplateProvider) {
    BoTemplateProvider.configure("com.huoyun.sbo", "HouseType", {
      state: {
        name: "houseType",
        label: "户型配置",
        group: {
          name: "settings",
          label: "系统设置"
        }
      }
    });
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