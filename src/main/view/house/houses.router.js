'use strict';

huoyun.config(["BoStateProvider", function(BoStateProvider) {
  BoStateProvider.register("com.huoyun.sbo", "Houses", {
    state: "houses",
    url: "/houses",
    label: "楼盘",
    list: {
      disableSearch: true
    }
  });
}]);