'use strict';

huoyun.config(["BoStateProvider", "BoTemplateProvider",
  function(BoStateProvider, BoTemplateProvider) {
    BoTemplateProvider.registerBoPropertyDefaultImageUrl("com.huoyun.sbo", "Company", "logo", "/res/company.png");
  }
]);

huoyun.config(function($stateProvider) {
  $stateProvider
    .state("company", {
      abstract: true,
      url: "/company",
      templateUrl: "framework/general.html",
      data: {
        boName: "Company",
        boNamespace: "com.huoyun.sbo",
        title: "公司信息",
        subTitle: "主页",
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
});