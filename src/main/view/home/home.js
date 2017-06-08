'use strict';


huoyun.controller('HomeViewController', ["$scope", "BoService", "HuoyunWidgetConstant", "ReportService",
  function($scope, BoService, HuoyunWidgetConstant, ReportService) {
    $scope.setPageTitle("主页", "仪表盘");

    $scope.setNavInfos([{
      label: "主页"
    }]);

    $scope.charts = [{
      title: "年度收入实时统计",
      appendClass: "box-success",
      labels: HuoyunWidgetConstant.Months.FullYear,
      query: function() {
        return ReportService.perMonthContractTotalAmountOfThisYear();
      },
      finally: function(result) {
        var totalAmountItem = {
          label: "合同金额",
          data: []
        };

        var payedAmountItem = {
          label: "已收款金额",
          data: []
        };

        var yearMap = {};
        result.forEach(function(item) {
          yearMap[item[0]] = item;
        });

        for (var index = 1; index <= 12; index++) {
          var totalAmount = 0;
          var payAmount = 0;
          if (yearMap[index]) {
            totalAmount = yearMap[index][1];
            payAmount = yearMap[index][2];
          }
          totalAmountItem.data.push(totalAmount);
          payedAmountItem.data.push(payAmount);
        }
        return [totalAmountItem, payedAmountItem];
      }
    }, {
      title: "年度合同数量统计",
      appendClass: "box-success",
      labels: HuoyunWidgetConstant.Months.FullYear,
      query: function() {
        return ReportService.contractsOfThisYear();
      },
      finally: function(result) {
        var dataItem = {
          label: "合同数量",
          data: []
        };

        var countOfYear = {};
        result.forEach(function(item) {
          countOfYear[item[0]] = item[1];
        });

        for (var index = 1; index <= 12; index++) {
          dataItem.data.push(countOfYear[index] || 0);
        }

        return [dataItem];
      }
    }, {
      title: "Top5业务员统计-当月",
      appendClass: "box-primary",
      labels: [],
      query: function() {
        return ReportService.top5Sales();
      },
      finally: function(dataSource) {
        return formatDataToChartData(this, dataSource);
      }
    }, {
      title: "Top5设计师统计-当月",
      appendClass: "box-danger",
      labels: [],
      query: function() {
        return ReportService.top5Designers();
      },
      finally: function(dataSource) {
        return formatDataToChartData(this, dataSource);
      }
    }];

    function formatDataToChartData(chartOptions, dataSource) {
      var dataItem = {
        label: "客户数",
        data: []
      };
      dataSource.forEach(function(item) {
        chartOptions.labels.push(item[1]);
        dataItem.data.push(item[0]);
      }.bind(this));

      return [dataItem];
    }

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