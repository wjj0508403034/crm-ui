'use strict';

huoyun.config(function($stateProvider) {
  $stateProvider
    .state("houses", {
      abstract: true,
      url: "/houses",
      templateUrl: "framework/general.html",
      data: {
        boName: "Houses",
        boNamespace: "com.huoyun.sbo"
      }
    })
    .state("houses.list", {
      url: "/list",
      templateUrl: "framework/listview.html",
      controller: 'BoListViewController',
      data: {
        onCreate: function($injector) {
          $injector.get("$state").go("houses.create");
        },
        onRowClicked: function($injector, lineData, index) {
          $injector.get("$state").go("houses.detail", {
            boId: lineData.id
          });
        }
      }
    })
    .state("houses.detail", {
      url: "/detail/:boId",
      templateUrl: "framework/homeview.html",
      controller: 'BoHomeViewController',
      data: {
        navs: [{
          label: "主页",
          state: "home"
        }, {
          label: "楼盘列表",
          state: "houses.list"
        }, {
          label: "楼盘详情"
        }],
        buttons: {
          "edit": {
            onButtonClicked: function(button, $injector) {
              $injector.get("$state").go("houses.edit", {
                boId: this.boData.id
              });
            }
          },
          "delete": {
            onDeleteCallback: function(button, $injector) {
              $injector.get("Tip").show("删除成功！");
              $injector.get("$state").go("houses.list");
            }
          }
        }
      }
    })
    .state("houses.edit", {
      url: "/edit/:boId",
      templateUrl: "framework/edtionview.html",
      controller: 'BoEdtionViewController',
      data: {
        navs: [{
          label: "主页",
          state: "home"
        }, {
          label: "楼盘列表",
          state: "houses.list"
        }, {
          label: "楼盘详情"
        }],
        onSaveCallback: function($injector) {
          $injector.get("Tip").show("保存成功！");
          $injector.get("$state").go("houses.list");
        },
        onCancelCallback: function($injector) {
          $injector.get("$state").go("houses.list");
        }
      }
    })
    .state("houses.create", {
      url: "/create",
      templateUrl: "framework/ceationview.html",
      controller: 'BoCreationViewController',
      data: {
        navs: [{
          label: "主页",
          state: "home"
        }, {
          label: "楼盘列表",
          state: "houses.list"
        }, {
          label: "楼盘详情"
        }],
        onSaveCallback: function($injector) {
          $injector.get("Tip").show("创建成功！");
          $injector.get("$state").go("houses.list");
        },
        onCancelCallback: function($injector) {
          $injector.get("$state").go("houses.list");
        }
      }
    });
});