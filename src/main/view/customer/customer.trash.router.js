'use strict';

huoyun.config(function($stateProvider) {
  $stateProvider
    .state("trash", {
      abstract: true,
      url: "/trash",
      templateUrl: "framework/general.html",
      data: {
        boNamespace: "com.huoyun.sbo",
        boName: "Customer"
      }
    })
    .state("trash.list", {
      url: "/list",
      templateUrl: "framework/listview.html",
      controller: 'BoListViewController',
      data: {
        title: "回收站",
        subTitle: "主页",
        queryExpr: "deleted eq true",
        navs: [{
          label: "主页",
          state: "home"
        }, {
          label: "回收站"
        }],
        onRowClicked: function($injector, lineData, index) {
          $injector.get("$state").go("trash.detail", {
            boId: lineData.id
          });
        },
        disableCreate: true
      }
    })
    .state("trash.detail", {
      url: "/list/:boId",
      templateUrl: "framework/homeview.html",
      controller: 'BoHomeViewController',
      data: {
        title: "客户详情",
        subTitle: "回收站",
        navs: [{
          label: "主页",
          state: "home"
        }, {
          label: "回收站",
          state: "trash.list"
        }, {
          label: "客户详情"
        }],
        buttons: {
          "edit": {
            visibility: false
          },
          "restore": {
            text: "恢复",
            onButtonClicked: function(button, $injector) {
              var $scope = this;
              $injector.get("BoService").updateBo("com.huoyun.sbo", "Customer", $scope.boData.id, {
                deleted: false
              }).then(function() {
                $injector.get("$state").go("trash.list");
              });
            }
          },
          "delete": {
            onDeleteCallback: function(button, $injector) {
              $injector.get("$state").go("trash.list");
            }
          }
        }
      }
    });
});