'use strict';

huoyun.config(function($stateProvider) {
  $stateProvider
    .state("myCustomer", {
      abstract: true,
      url: "/myCustomer",
      templateUrl: "framework/general.html",
      data: {
        boNamespace: "com.huoyun.sbo",
        boName: "Customer"
      }
    })
    .state("myCustomer.list", {
      url: "/list",
      templateUrl: "framework/listview.html",
      controller: 'BoListViewController',
      data: {
        title: "我的客户",
        subTitle: "主页",
        navs: [{
          label: "主页",
          state: "home"
        }, {
          label: "我的客户"
        }],
        queryExpr: "deleted eq false",
        onRowClicked: function($injector, lineData, index) {
          $injector.get("$state").go("myCustomer.detail", {
            boId: lineData.id
          });
        }
      }
    })
    .state("myCustomer.detail", {
      url: "/list/:boId",
      templateUrl: "framework/homeview.html",
      controller: 'BoHomeViewController',
      data: {
        title: "客户详情",
        subTitle: "我的客户",
        navs: [{
          label: "主页",
          state: "home"
        }, {
          label: "我的客户",
          state: "myCustomer.list"
        }, {
          label: "客户详情"
        }],
        buttons: {
          "delete": {
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
                    });
                  }
                }
              };
              var dialog = $injector.get("Dialog").showConfirm(options);
            }
          },
          "edit": {
            onButtonClicked: function(button, $injector) {
              $injector.get("$state").go("myCustomer.edit", {
                boId: this.boData.id
              });
            }
          },
        }
      }
    })
    .state("myCustomer.edit", {
      url: "/list/:boId",
      templateUrl: "framework/edtionview.html",
      controller: 'BoEdtionViewController',
      data: {
        title: "客户详情",
        subTitle: "我的客户",
        navs: [{
          label: "主页",
          state: "home"
        }, {
          label: "我的客户",
          state: "myCustomer.list"
        }, {
          label: "客户详情"
        }],
        onSaveCallback: function($injector) {
          $injector.get("$state").go("myCustomer.list");
        },
        onCancelCallback: function($injector) {
          $injector.get("$state").go("myCustomer.list");
        }
      }
    });
});