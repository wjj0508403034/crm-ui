'use strict';

huoyun.config(function($stateProvider) {
  var boState = new huoyun.BoState("myCustomer");

  $stateProvider
    .state(boState.Root, {
      abstract: true,
      url: "/myCustomer",
      templateUrl: "framework/general.html",
      data: {
        boNamespace: "com.huoyun.sbo",
        boName: "Customer"
      }
    })
    .state(boState.List, {
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
          $injector.get("$state").go(boState.Detail, {
            boId: lineData.id
          });
        },
        onCreate: function($injector) {
          $injector.get("$state").go(boState.Create);
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
          state: boState.List
        }, {
          label: "客户详情"
        }],
        propTemplates: {
          "statusList": "customer/templates/detail/property.statusList.html"
        },
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
                      $injector.get("$state").go(boState.List);
                    });
                  }
                }
              };
              var dialog = $injector.get("Dialog").showConfirm(options);
            }
          },
          "edit": {
            onButtonClicked: function(button, $injector) {
              $injector.get("$state").go(boState.Edit, {
                boId: this.boData.id
              });
            }
          },
        }
      }
    })
    .state(boState.Edit, {
      url: "/eidt/:boId",
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
          state: boState.List
        }, {
          label: "客户详情"
        }],
        propTemplates: {
          "statusList": "customer/templates/edit/property.statusList.html"
        },
        onSaveCallback: function($injector) {
          $injector.get("Tip").show("创建成功！");
          $injector.get("$state").go(boState.List);
        },
        onCancelCallback: function($injector) {
          $injector.get("$state").go(boState.List);
        }
      }
    })
    .state(boState.Create, {
      url: "/create",
      templateUrl: "framework/ceationview.html",
      controller: 'BoCreationViewController',
      data: {
        navs: [{
          label: "主页",
          state: "home"
        }, {
          label: "我的客户",
          state: boState.List
        }, {
          label: "新建客户"
        }],
        propTemplates: {
          "statusList": "customer/templates/edit/property.statusList.html"
        },
        onSaveCallback: function($injector) {
          $injector.get("Tip").show("创建成功！");
          $injector.get("$state").go(boState.List);
        },
        onCancelCallback: function($injector) {
          $injector.get("$state").go(boState.List);
        }
      }
    });
});