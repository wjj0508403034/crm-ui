'use strict';


huoyun.controller('HomeViewController', ["$scope", "$state", "$stateParams", "BoService", "HuoyunWidgetConstant",
  function($scope, $state, $stateParams, BoService, HuoyunWidgetConstant) {
    $scope.setPageTitle("主页", "仪表盘");

    $scope.setNavInfos([{
      label: "主页"
    }]);

    $scope.charts = [{
      title: "金额实时统计",
      appendClass: "box-success",
      labels: HuoyunWidgetConstant.Months.FullYear,
      dataSource: function() {
        return [{
          label: 'Dataset 1',
          data: [65, 59, 90, 81, 56, 55, 40, 65, 59, 90, 81, 56, 55, 40]
        }, {
          label: 'Dataset 2',
          data: [78, 48, 40, 19, 96, 27, 100, 78, 48, 40, 19, 96, 27, 100]
        }];
      }
    }, {
      title: "合同实时统计",
      labels: ["January", "February", "March", "April", "May", "June", "July"],
      dataSource: function() {

      }
    }, {
      title: "Top5业务员统计-当月",
      labels: ["January", "February", "March", "April", "May", "June", "July"],
      dataSource: function() {

      }
    }, {
      title: "Top5设计师统计-当月",
      labels: ["January", "February", "March", "April", "May", "June", "July"],
      dataSource: function() {

      }
    }];

    $scope.tiles = [{
        icon: "fa-binoculars",
        text: "本月新增线索",
        number: function() {
          return BoService.count("com.huoyun.sbo", "Leads", this.queryExpr);
        },
        background: "bg-aqua",
        queryExpr: "createTime between this_month()"
      },
      {
        icon: "fa-users",
        text: "本月新增客户",
        number: function() {
          return BoService.count("com.huoyun.sbo", "Customer", this.queryExpr);
        },
        background: "bg-green",
        queryExpr: "createTime between this_month()"
      },
      {
        icon: "fa-rmb",
        text: "本月新增合同总金额",
        number: function() {
          return BoService.sum("com.huoyun.sbo", "Contract", "amount", this.queryExpr);
        },
        background: "bg-yellow",
        queryExpr: "contractDate between this_month()"
      },
      {
        icon: "fa-rmb",
        text: "本月收款总金额",
        number: function() {
          return BoService.sum("com.huoyun.sbo", "Payment", "amount", this.queryExpr);
        },
        background: "bg-red",
        queryExpr: "paymentDate between this_month()"
      }
    ];
  }
]);