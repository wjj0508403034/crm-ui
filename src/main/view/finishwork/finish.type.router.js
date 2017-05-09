'use strict';

huoyun.config(function($stateProvider) {

  const RootStateName = "finishtype";
  const ListStateName = `${RootStateName}.list`;
  const DetailStateName = `${RootStateName}.detail`;
  const CreateStateName = `${RootStateName}.create`;
  const EditStateName = `${RootStateName}.edit`;

  $stateProvider
    .state(RootStateName, {
      abstract: true,
      url: "/finishtype",
      templateUrl: "framework/general.html",
      data: {
        boName: "FinishType",
        boNamespace: "com.huoyun.sbo"
      }
    })
    .state(ListStateName, {
      url: "/list",
      templateUrl: "framework/listview.html",
      controller: 'BoListViewController',
      data: {
        disableAdvanceSearch: true,
        onCreate: function($injector) {
          $injector.get("$state").go(CreateStateName);
        },
        onRowClicked: function($injector, lineData, index) {
          $injector.get("$state").go(DetailStateName, {
            boId: lineData.id
          });
        }
      }
    })
    .state(DetailStateName, {
      url: "/detail/:boId",
      templateUrl: "framework/homeview.html",
      controller: 'BoHomeViewController',
      data: {
        navs: [{
          label: "主页",
          state: "home"
        }, {
          label: "装修方式列表",
          state: ListStateName
        }, {
          label: "装修方式详情"
        }],
        buttons: {
          "edit": {
            onButtonClicked: function(button, $injector) {
              $injector.get("$state").go(EditStateName, {
                boId: this.boData.id
              });
            }
          },
          "delete": {
            onDeleteCallback: function(button, $injector) {
              $injector.get("$state").go(ListStateName);
            }
          }
        }
      }
    })
    .state(EditStateName, {
      url: "/edit/:boId",
      templateUrl: "framework/edtionview.html",
      controller: 'BoEdtionViewController',
      data: {
        navs: [{
          label: "主页",
          state: "home"
        }, {
          label: "装修方式列表",
          state: ListStateName
        }, {
          label: "编辑装修方式"
        }],
        onSaveCallback: function($injector, boNamespace, boName, boId) {
          $injector.get("Tip").show("保存成功！");
          $injector.get("$state").go(DetailStateName, {
            boId: boId
          });
        },
        onCancelCallback: function($injector, boNamespace, boName, boId) {
          $injector.get("$state").go(DetailStateName, {
            boId: boId
          });
        }
      }
    })
    .state(CreateStateName, {
      url: "/create",
      templateUrl: "framework/ceationview.html",
      controller: 'BoCreationViewController',
      data: {
        navs: [{
          label: "主页",
          state: "home"
        }, {
          label: "装修方式列表",
          state: ListStateName
        }, {
          label: "新建装修方式"
        }],
        onSaveCallback: function($injector) {
          $injector.get("Tip").show("创建成功！");
          $injector.get("$state").go(ListStateName);
        },
        onCancelCallback: function($injector) {
          $injector.get("$state").go(ListStateName);
        }
      }
    });
});