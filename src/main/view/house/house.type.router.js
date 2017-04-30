'use strict';

huoyun.config(function($stateProvider) {
  $stateProvider
    .state("houseType", {
      abstract: true,
      url: "/houseType",
      templateUrl: "framework/general.html",
      data: {
        boName: "HouseType",
        boNamespace: "com.huoyun.sbo"
      }
    })
    .state("houseType.list", {
      url: "/list",
      templateUrl: "framework/listview.html",
      controller: 'BoListViewController',
      data: {
        onCreate: function($injector) {
          $injector.get("$state").go("houseType.create");
        }
      }
    })
    .state("houseType.show", {
      url: "/show",
      templateUrl: "framework/homeview.html",
      controller: 'BoHomeViewController',
      data: {
        navs: [{
          label: "主页",
          state: "home"
        }, {
          label: "户型列表",
          state: "houseType.list"
        }, {
          label: "户型详情"
        }],
        buttons: {
          "edit": {
            onButtonClicked: function(button, $injector) {
              $injector.get("$state").go("houseType.edit", {
                boId: this.boData.id
              });
            }
          }
        }
      }
    })
    .state("houseType.edit", {
      url: "/edit",
      templateUrl: "framework/edtionview.html",
      controller: 'BoEdtionViewController',
      data: {
        navs: [{
          label: "主页",
          state: "home"
        }, {
          label: "户型列表",
          state: "houseType.list"
        }, {
          label: "户型详情"
        }],
        onSaveCallback: function($injector) {
          $injector.get("$state").go("houseType.list");
        },
        onCancelCallback: function($injector) {
          $injector.get("$state").go("houseType.list");
        }
      }
    })
    .state("houseType.create", {
      url: "/create",
      templateUrl: "framework/ceationview.html",
      controller: 'BoCreationViewController',
      data: {
        navs: [{
          label: "主页",
          state: "home"
        }, {
          label: "户型列表",
          state: "houseType.list"
        }, {
          label: "新建户型"
        }],
        onSaveCallback: function($injector) {
          $injector.get("$state").go("houseType.list");
        },
        onCancelCallback: function($injector) {
          $injector.get("$state").go("houseType.list");
        }
      }
    });
});