'use strict';

huoyun.config(["BoStateProvider", function(BoStateProvider) {
  BoStateProvider.register("com.huoyun.sbo", "Customer", {
    state: "trash",
    url: "/trash",
    label: "回收站",
    list: {
      queryExpr: "deleted eq true",
      buttons: {
        "create": {
          visibility: false
        }
      }
    },
    detail: {
      templateUrl: "customer/customer.detail.html",
      propTemplates: {
        "stage": "customer/templates/detail/property.stage.html",
        "status": "customer/templates/detail/property.status.html"
      },
      buttons: {
        "restore": {
          text: "恢复",
          onButtonClicked: function(button, $injector) {
            var $scope = this;
            $injector.get("BoService").updateBo("com.huoyun.sbo", "Customer", $scope.boData.id, {
              deleted: false
            }).then(function() {
              $injector.get("$state").go("trash.list");
              $injector.get("Tip").show("恢复成功！");
            });
          }
        }
      }
    }
  });
}]);