'use strict';

huoyun.config(["BoStateProvider", function(BoStateProvider) {
  BoStateProvider.register("com.huoyun.sbo", "ConstructionStatus", {
    state: "constructionStatus",
    url: "/construction.status",
    label: "工程状态",
    list: {
      disableSearch: true,
      buttons: {
        "adjustTableColumn": {
          visibility: false
        },
        "adjustTableDataSort": {
          visibility: true
        }
      }
    }
  });
}]);