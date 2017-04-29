'use strict';
huoyun.controller('HomeViewController', ["$scope", "$state", "$stateParams", "BoService",
  function($scope, $state, $stateParams, BoService) {
    $scope.setPageTitle("主页", "仪表盘");

    $scope.setNavInfos([{
      label: "主页"
    }]);

    $scope.tiles = [{
        icon: "on-person-add",
        text: "公司本月到店客户",
        stateLink: "customerReport.visit",
        number: "--",
        service: function() {
          countCustomerInCurrentMonth.bind(this)("visitDate");
        }
      },
      {
        icon: "on-person-add",
        text: "公司本月定金",
        stateLink: "customerReport.payDeposit",
        number: "--",
        service: function() {
          countCustomerInCurrentMonth.bind(this)("payDepositDate");
        }
      },
      {
        icon: "on-person-add",
        text: "公司本月合同",
        stateLink: "customerReport.contract",
        number: "--",
        service: function() {
          countCustomerInCurrentMonth.bind(this)("contractDate");
        }
      },
      {
        icon: "on-person-add",
        text: "公司本月签单率",
        stateLink: "boList({boName:'Customer',boNamespace:'com.huoyun.sbo'})",
        number: "--"
      }
    ];

    $scope.tiles.forEach(function(tile, tileIndex) {
      if (typeof tile.service === "function") {
        tile.service();
      }
    });



    function countCustomerInCurrentMonth(propertyName) {
      var queryExpr = `payDepositDate%20between%20currentMonth()`;
      BoService.count("com.huoyun.sbo", "Customer", queryExpr)
        .then(function(data) {
          this.number = data;
          //this.stateLink = `boList({boName:'Customer',boNamespace:'com.huoyun.sbo',queryExpr:'${queryExpr}'})`
        }.bind(this))
    }
  }
]);