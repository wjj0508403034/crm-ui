'use strict';

huoyun.config(function($stateProvider) {
  $stateProvider
    .state("customerReport", {
      abstract: true,
      url: "/customerReport",
      templateUrl: "framework/general.html",
      data: {
        boName: "Customer",
        boNamespace: "com.huoyun.sbo",
        disableSearch: true,
        disableCreate: true,
        subTitle: "主页",
        onRowClicked: function($injector, lineData, index) {}
      }
    })
    .state("customerReport.visit", {
      url: "/visit",
      templateUrl: "framework/listview.html",
      controller: 'BoListViewController',
      data: {
        title: "公司本月到店客户",
        navs: [{
          label: "主页",
          state: "home"
        }, {
          label: "公司本月到店客户"
        }],
        queryExpr: `visitDate between currentMonth()`
      }
    })
    .state("customerReport.payDeposit", {
      url: "/payDeposit",
      templateUrl: "framework/listview.html",
      controller: 'BoListViewController',
      data: {
        title: "公司本月定金",
        navs: [{
          label: "主页",
          state: "home"
        }, {
          label: "公司本月定金"
        }],
        queryExpr: `payDepositDate between currentMonth()`
      }
    })
    .state("customerReport.contract", {
      url: "/contract",
      templateUrl: "framework/listview.html",
      controller: 'BoListViewController',
      data: {
        title: "公司本月合同",
        navs: [{
          label: "主页",
          state: "home"
        }, {
          label: "公司本月合同"
        }],
        queryExpr: `contractDate between currentMonth()`
      }
    });

});