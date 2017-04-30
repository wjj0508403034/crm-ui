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
        }
      }
    })
    .state("houses.show", {
      url: "/show",
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
          }
        }
      }
    })
    .state("houses.edit", {
      url: "/edit",
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
          $injector.get("$state").go("houses.list");
        },
        onCancelCallback: function($injector) {
          $injector.get("$state").go("houses.list");
        }
      }
    });
});