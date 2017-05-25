'use strict';

huoyun.config(["BoStateProvider", function(BoStateProvider) {
  BoStateProvider.register("com.huoyun.sbo", "Customer", {
    state: "myCustomer",
    url: "/myCustomer",
    label: "我的客户",
    list: {
      queryExpr: "deleted eq false",
    },
    detail: {
      propTemplates: {
        "stage": "customer/templates/detail/property.stage.html",
        "status": "customer/templates/detail/property.status.html"
      },
      buttons: {
        "delete": {
          text: "移到回收站",
          icon: "fa-trash-o",
          onButtonClicked: function(button, $injector) {
            var $scope = this;
            var options = {
              title: "提示",
              content: "确定要删除本条信息吗? 删除后可在『回收站』恢复!",
              confirm: {
                callback: function() {
                  $injector.get("BoService").updateBo("com.huoyun.sbo", "Customer", $scope.boData.id, {
                    deleted: true
                  }).then(function() {
                    $injector.get("$state").go("myCustomer.list");
                    $injector.get("Tip").show("已成功移到回收站！");
                  });
                }
              }
            };
            var dialog = $injector.get("Dialog").showConfirm(options);
          }
        }
      }
    }
  });
}]);

huoyun.factory("CustomerStatusStateService", ["BoService", "BoState",
  function(BoService, BoStateProvider) {

    function registerState(customerStatus) {
      BoStateProvider.register("com.huoyun.sbo", "Customer", {
        state: customerStatus.name,
        url: `/${customerStatus.name}`,
        label: customerStatus.name,
        list: {
          queryExpr: `status eq ${customerStatus.id} and deleted eq false`,
          buttons: {
            "create": {
              visibility: false
            }
          }
        },
        detail: {
          propTemplates: {
            "stage": "customer/templates/detail/property.stage.html",
            "status": "customer/templates/detail/property.status.html"
          }
        }
      });
    }

    return {
      getCustomerStatusMenus: function() {

        var states = [];
        return BoService.queryAll("com.huoyun.sbo", "CustomerStatus", null, "orderNo")
          .then(function(listData) {
            listData.forEach(function(status) {
              registerState(status);
              states.push({
                icon: "fa-file-o",
                label: status.name,
                stateLink: `${status.name.replace(".","")}.list`
              });
            });

            return Promise.resolve(states);
          });
      }
    };
  }
]);