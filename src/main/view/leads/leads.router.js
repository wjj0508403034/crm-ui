'use strict';

huoyun.config(["BoStateProvider", function(BoStateProvider) {
  BoStateProvider.register("com.huoyun.sbo", "Leads", {
    state: "leads",
    url: "/leads",
    label: "线索",
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
            $injector.get("LeadsService").generateToCustomer(this.getBoId())
              .then(function(customer) {
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
        }
      }
    }
  });
}]);