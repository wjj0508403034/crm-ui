'use strict';

huoyun.config(["BoStateProvider", "BoTemplateProvider", "SessionProvider", "HuoyunWidgetConstant",
  function(BoStateProvider, BoTemplateProvider, SessionProvider, HuoyunWidgetConstant) {

    BoTemplateProvider.configure("com.huoyun.sbo", "Employee", {
      defaultImageUrls: {
        avatar: "/res/avatar.png"
      },
      select: {
        single: {
          templateUrl: "employee/templates/single.select.item.html"
        },
        multi: {
          templateUrl: "employee/templates/multi.select.item.html"
        }
      }
    });

    BoStateProvider.register("com.huoyun.sbo", "Employee", {
      state: "employee",
      url: "/employee",
      label: "员工",
      edit: {
        init: function() {
          this.$on(HuoyunWidgetConstant.Events.SaveSuccess, function(event, boData) {
            var currentUser = SessionProvider.get("user");
            if (currentUser.id === boData.id) {
              SessionProvider.set("user", boData);
            }
          });
        },
        dynamicMeta: {
          "email": {
            readonly: true
          }
        }
      },
      detail: {
        init: function() {
          this.$on(HuoyunWidgetConstant.Events.BoReloadData, function(event) {

          });
        },
        buttons: {
          "delete": {
            visibility: false
          }
        }
      }
    });
  }
]);