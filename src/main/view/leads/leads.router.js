'use strict';

huoyun.config(["BoStateProvider", "TableSelectionMode", "BoTemplateProvider",
  function(BoStateProvider, TableSelectionMode, BoTemplateProvider) {

    function generateToCustomer(leadsId, $injector) {
      $injector.get("LeadsService").generateToCustomer(leadsId)
        .then(function(customer) {
          $injector.get("Tip").show("转换成客户成功！");
          $injector.get("$state").go("myCustomer.create");
          $injector.get("$rootScope").$on('$stateChangeSuccess',
            function(event, toState, toParams, fromState, fromParams) {
              if (fromState.name === "leads.detail" && toState.name === "myCustomer.create") {
                toState.data.initBoDataService = function() {
                  return Promise.resolve(customer);
                };
              }
            });
        });
    }

    BoTemplateProvider.configure("com.huoyun.sbo", "Leads", {
      list: {
        propTemplates: {
          "status": {
            templateUrl: "leads/templates/list/property.status.html"
          }
        }
      }
    });

    BoStateProvider.register("com.huoyun.sbo", "Leads", {
      state: "leads",
      url: "/leads",
      label: "线索",
      list: {
        selectionMode: TableSelectionMode.Single,
        buttons: {
          "generateToCustomer": {
            text: "转换成客户",
            onButtonClicked: function(button, $injector) {
              var selectedLeads = this.getSelectionItem();
              if (selectedLeads) {
                generateToCustomer(selectedLeads.id, $injector);
              }
            }
          }
        }
      },
      detail: {
        buttons: {
          "generateToCustomer": {
            text: "转换成客户",
            visibility: function(button, $injector) {
              if (this.boData) {
                if (!this.boData.transform) {
                  return true;
                }
              }
              return false;
            },
            onButtonClicked: function(button, $injector) {
              generateToCustomer(selectedLeads.id, $injector);
            }
          }
        }
      }
    });
  }
]);