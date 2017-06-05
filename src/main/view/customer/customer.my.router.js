'use strict';

huoyun.config(["BoStateProvider", "BoTemplateProvider",
  function(BoStateProvider, BoTemplateProvider) {
    BoTemplateProvider.configure("com.huoyun.sbo", "Customer", {
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
          "designStage": {
            text: "转到设计阶段",
            icon: "fa-desktop",
            visibility: function(button, $injector) {
              return this.boData && !this.boData.stage;
            },
            onButtonClicked: function(button, $injector) {
              var boId = this.getBoId();
              this.updateBo({ stage: "design" })
                .then(function() {
                  $injector.get("Tip").show("已成功转到设计阶段！");
                  $injector.get("$state").go("designStageCustomer.edit", {
                    boId: boId
                  });
                });
            }
          },
          "constractionStage": {
            text: "转到工程阶段",
            icon: "fa-bank",
            visibility: function(button, $injector) {
              return this.boData && this.boData.stage !== 'construction';
            },
            onButtonClicked: function(button, $injector) {
              var boId = this.getBoId();
              this.updateBo({ stage: "construction" })
                .then(function() {
                  $injector.get("Tip").show("已成功转到工程阶段！");
                  $injector.get("$state").go("constructionStageCustomer.edit", {
                    boId: boId
                  });
                });
            }
          },
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

huoyun.config(["BoStateProvider", function(BoStateProvider) {
  BoStateProvider.register("com.huoyun.sbo", "Customer", {
    state: "designStageCustomer",
    url: "/designStageCustomer",
    label: "设计阶段客户",
    list: {
      queryExpr: "stage eq 'design' and deleted eq false",
    },
    detail: {
      buttons: {
        "constractionStage": {
          text: "转到工程阶段",
          icon: "fa-bank",
          onButtonClicked: function(button, $injector) {
            var boId = this.getBoId();
            this.updateBo({ stage: "construction" })
              .then(function() {
                $injector.get("Tip").show("已成功转到工程阶段！");
                $injector.get("$state").go("constructionStageCustomer.edit", {
                  boId: boId
                });
              });
          }
        }
      }
    }
  });
}]);

huoyun.config(["BoStateProvider", function(BoStateProvider) {
  BoStateProvider.register("com.huoyun.sbo", "Customer", {
    state: "constructionStageCustomer",
    url: "/constructionStageCustomer",
    label: "工程阶段客户",
    list: {
      queryExpr: "stage eq 'construction' and deleted eq false",
    }
  });
}]);

huoyun.factory("CustomerStatusStateService", ["BoService", "BoState",
  function(BoService, BoStateProvider) {

    function registerState(customerStatus, queryExpr) {
      BoStateProvider.register("com.huoyun.sbo", "Customer", {
        state: customerStatus.name,
        url: `/${customerStatus.name}`,
        label: customerStatus.name,
        list: {
          queryExpr: queryExpr,
          buttons: {
            "create": {
              visibility: false
            }
          }
        },
        detail: {
          templateUrl: "customer/customer.detail.html"
        }
      });
    }

    return {
      getCustomerStatusMenus: function() {

        var states = [];
        return BoService.queryAll("com.huoyun.sbo", "CustomerStatus", null, "orderNo")
          .then(function(listData) {
            listData.forEach(function(status) {
              registerState(status, `status eq ${status.id} and deleted eq false`);
              states.push({
                icon: "fa-file-o",
                label: status.name,
                stateLink: `${status.name.replace(".","")}.list`
              });
            });

            return Promise.resolve(states);
          });
      },

      getConstractionMenus: function() {
        var states = [];
        return BoService.queryAll("com.huoyun.sbo", "ConstructionStatus", null, "orderNo")
          .then(function(listData) {
            listData.forEach(function(status) {
              registerState(status, `constructionStatus eq ${status.id} and deleted eq false`);
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