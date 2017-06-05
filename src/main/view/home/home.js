'use strict';
huoyun.controller('HomeViewController', ["$scope", "$state", "$stateParams", "BoService",
  function($scope, $state, $stateParams, BoService) {
    $scope.setPageTitle("主页", "仪表盘");

    $scope.setNavInfos([{
      label: "主页"
    }]);

    $scope.tiles = [{
        icon: "fa-binoculars",
        text: "本月新增线索",
        stateLink: "customerReport.visit",
        number: "12",
        background: "bg-aqua"
      },
      {
        icon: "fa-users",
        text: "本月新增客户",
        stateLink: "customerReport.payDeposit",
        number: "12222",
        background: "bg-green"
      },
      {
        icon: "fa-rmb",
        text: "本月新增合同总金额",
        stateLink: "customerReport.contract",
        number: "12",
        background: "bg-yellow"
      },
      {
        icon: "fa-rmb",
        text: "本月收款总金额",
        stateLink: "boList({boName:'Customer',boNamespace:'com.huoyun.sbo'})",
        number: "122000",
        background: "bg-red"
      }
    ];

    $scope.tiles.forEach(function(tile, tileIndex) {
      if (typeof tile.service === "function") {
        tile.service();
      }
    });



    function countCustomerInCurrentMonth(propertyName) {
      var queryExpr = `payDepositDate between this_month()`;
      BoService.count("com.huoyun.sbo", "Customer", queryExpr)
        .then(function(data) {
          this.number = data;
          //this.stateLink = `boList({boName:'Customer',boNamespace:'com.huoyun.sbo',queryExpr:'${queryExpr}'})`
        }.bind(this))
    }
  }
]);