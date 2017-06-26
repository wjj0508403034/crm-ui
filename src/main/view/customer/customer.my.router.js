'use strict';

huoyun.config(["BoStateProvider", "BoTemplateProvider",
  function(BoStateProvider, BoTemplateProvider) {
    BoTemplateProvider.configure("com.huoyun.sbo", "Customer", {
      list: {
        propTemplates: {
          "name": {
            templateUrl: "customer/templates/list/property.name.html"
          },
          "status": {
            templateUrl: "customer/templates/list/property.status.html"
          },
          "constructionStatus": {
            templateUrl: "customer/templates/list/property.status.html"
          }
        }
      },
      detail: {
        templateUrl: "customer/customer.detail.html",
        propTemplates: {
          "status": {
            templateUrl: "customer/templates/detail/property.status.html"
          },
          "constructionStatus": {
            templateUrl: "customer/templates/detail/property.status.html"
          }
        }
      }
    });

    BoStateProvider.register("com.huoyun.sbo", "Customer", {
      state: "myCustomer",
      url: "/myCustomer",
      label: "我的客户",
      list: {
        queryExpr: "deleted eq false",
      },
      detail: {
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
  }
]);