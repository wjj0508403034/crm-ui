'use strict';

huoyun.config(["BoStateProvider", function(BoStateProvider) {
  BoStateProvider.register("com.huoyun.sbo", "LeadsStatus", {
    state: "leadsStatus",
    url: "/leads.status",
    label: "线索状态"
  });
}]);