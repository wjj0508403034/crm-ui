'use strict';

huoyun.config(function($stateProvider) {

  function removePhotosSection(boMeta) {
    for (var index = 0; index < boMeta.sections.length; index++) {
      if (boMeta.sections[index].label === "作品图册") {
        boMeta.sections.splice(index, 1);
        break;
      }
    }
    return Promise.resolve(boMeta);
  }

  $stateProvider
    .state("finishwork", {
      abstract: true,
      url: "/finishwork",
      templateUrl: "framework/general.html",
      data: {
        boName: "FinishWork",
        boNamespace: "com.huoyun.sbo"
      }
    })
    .state("finishwork.list", {
      url: "/list",
      templateUrl: "framework/listview.html",
      controller: 'BoListViewController',
      data: {
        onCreate: function($injector) {
          $injector.get("$state").go("finishwork.create");
        },
        onRowClicked: function($injector, lineData, index) {
          $injector.get("$state").go("finishwork.detail", {
            boId: lineData.id
          });
        }
      }
    })
    .state("finishwork.detail", {
      url: "/show/:boId",
      templateUrl: "framework/homeview.html",
      controller: 'BoHomeViewController',
      data: {
        navs: [{
          label: "主页",
          state: "home"
        }, {
          label: "作品列表",
          state: "finishwork.list"
        }, {
          label: "作品详情"
        }],
        buttons: {
          "edit": {
            onButtonClicked: function(button, $injector) {
              $injector.get("$state").go("finishwork.edit", {
                boId: this.boData.id
              });
            }
          }
        }
      }
    })
    .state("finishwork.edit", {
      url: "/edit/:boId",
      templateUrl: "framework/edtionview.html",
      controller: 'BoEdtionViewController',
      data: {
        navs: [{
          label: "主页",
          state: "home"
        }, {
          label: "作品列表",
          state: "finishwork.list"
        }, {
          label: "作品详情"
        }],
        onSaveCallback: function($injector, boNamespace, boName, boId) {
          $injector.get("$state").go("finishwork.detail", {
            boId: boId
          });
        },
        onCancelCallback: function($injector, boNamespace, boName, boId) {
          $injector.get("$state").go("finishwork.detail", {
            boId: boId
          });
        },
        loadBoMetadataCallback: function($injector, boMeta) {
          return removePhotosSection(boMeta);
        }
      }
    })
    .state("finishwork.create", {
      url: "/create",
      templateUrl: "framework/ceationview.html",
      controller: 'BoCreationViewController',
      data: {
        navs: [{
          label: "主页",
          state: "home"
        }, {
          label: "作品列表",
          state: "finishwork.list"
        }, {
          label: "作品详情"
        }],
        onSaveCallback: function($injector) {
          $injector.get("$state").go("finishwork.list");
        },
        onCancelCallback: function($injector) {
          $injector.get("$state").go("finishwork.list");
        },
        loadBoMetadataCallback: function($injector, boMeta) {
          return removePhotosSection(boMeta);
        }
      }
    });
});