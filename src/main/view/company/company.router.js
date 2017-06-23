'use strict';

huoyun.config(["BoTemplateProvider", "$stateProvider", "HuoyunWidgetConstant", "SessionProvider",
  function(BoTemplateProvider, $stateProvider, HuoyunWidgetConstant, SessionProvider) {
    BoTemplateProvider.configure("com.huoyun.sbo", "Company", {
      defaultImageUrls: {
        logo: "/res/company.png"
      }
    });

    $stateProvider
      .state("company", {
        abstract: true,
        url: "/company",
        templateUrl: "framework/general.html",
        data: {
          boName: "Company",
          boNamespace: "com.huoyun.sbo",
          title: "公司信息",
          navs: [{
            label: "主页",
            state: "home"
          }, {
            label: "公司信息"
          }],
          loadBoDataService: function($injector) {
            return $injector.get("CompanyService").getCompanyInfo();
          }
        }
      })
      .state("company.show", {
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
                $injector.get("$state").go("company.update");
              }
            }
          }
        }
      })
      .state("company.update", {
        url: "/edit",
        templateUrl: "framework/edtionview.html",
        controller: 'BoEdtionViewController',
        data: {
          init: function($injector) {
            this.$on(HuoyunWidgetConstant.Events.SaveSuccess, function(event, boData) {
              SessionProvider.set("company", boData);
            });
          },
          onSave: function($injector, data, boMetadata) {
            return $injector.get("BoService").updateBo("com.huoyun.sbo", "Company", data.id, data);
          },
          onSaveCallback: function($injector) {
            $injector.get("Tip").show("保存成功！");
            $injector.get("$state").go("company.show");
          },
          onCancelCallback: function($injector) {
            $injector.get("$state").go("company.show");
          }
        }
      });
  }
]);