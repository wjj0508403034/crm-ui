'use strict';

huoyun.config(["HuoyunWidgetConstant", "$stateProvider", "SessionProvider",
  function(HuoyunWidgetConstant, $stateProvider, SessionProvider) {
    $stateProvider
      .state("profile", {
        abstract: true,
        url: "/profile",
        templateUrl: "framework/general.html",
        data: {
          boName: "Employee",
          boNamespace: "com.huoyun.sbo",
          title: "我的主页",
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
            },
            "changePassword": {
              text: "修改密码",
              onButtonClicked: function(button, $injector) {
                var $scope = this;
                var options = {
                  title: "修改密码",
                  templateUrl: "profile/change.password.html"
                };
                var dialog = $injector.get("Dialog").showConfirm(options);
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
          dynamicMeta: {
            "email": {
              readonly: true
            }
          },
          init: function($injector) {
            this.$on(HuoyunWidgetConstant.Events.SaveSuccess, function(event, boData) {
              SessionProvider.set("user", boData);
            });
          },
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
  }
]);