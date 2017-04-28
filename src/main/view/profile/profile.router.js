'use strict';

huoyun.config(function($stateProvider) {
  $stateProvider
    .state("profile", {
      abstract: true,
      url: "/profile",
      templateUrl: "framework/general.html",
      data: {
        boName: "Employee",
        boNamespace: "com.huoyun.sbo",
        title: "我的主页",
        subTitle: "主页",
        navs: [{
          label: "主页",
          state: "home"
        }, {
          label: "我的主页"
        }],
        loadBoDataService: function($injector) {
          return $injector.get("EmployeeService").getProfile();
        }
      }
    })
    .state("profile.show", {
      url: "/show",
      templateUrl: "framework/homeview.html",
      controller: 'BoHomeViewController',
      data: {
        buttons: {
          "delete": {
            visibility: false
          },
          "edit": {
            onButtonClicked: function(button, $injector) {
              $injector.get("$state").go("profile.update");
            }
          }
        }
      }
    })
    .state("profile.update", {
      url: "/edit",
      templateUrl: "framework/edtionview.html",
      controller: 'BoEdtionViewController',
      data: {
        onSave: function($injector, data, boMetadata) {
          return $injector.get("BoService").updateBo("com.huoyun.sbo", "Employee", data.id, data);
        },
        onSaveCallback: function($injector) {
          $injector.get("$state").go("profile.show");
        },
        onCancelCallback: function($injector) {
          $injector.get("$state").go("profile.show");
        }
      }
    });
});