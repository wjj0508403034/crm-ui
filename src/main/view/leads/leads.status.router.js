'use strict';

huoyun.config(["BoStateProvider", "BoTemplateProvider",
  function(BoStateProvider, BoTemplateProvider) {
    BoTemplateProvider.configure("com.huoyun.sbo", "LeadsStatus", {
      state: {
        name: "leadsStatus",
        label: "线索状态配置",
        group: {
          name: "settings",
          label: "系统设置"
        }
      },
      list: {
        propTemplates: {
          "background": {
            templateUrl: "leads/templates/list/leadsstatus.property.status.html"
          }
        }
      },
      detail: {
        propTemplates: {
          "background": {
            templateUrl: "leads/templates/detail/leadsstatus.property.status.html"
          }
        }
      }
    });

    BoStateProvider.register("com.huoyun.sbo", "LeadsStatus", {
      state: "leadsStatus",
      url: "/leads.status",
      label: "线索状态",
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