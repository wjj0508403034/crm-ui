'use strict';

huoyun.factory("BoHomeHelper", ["$injector", "BoService", "StateHelper",
  function($injector, BoService, StateHelper) {

    return {
      loadBoData: function(boNamespace, boName, boId) {
        if (boNamespace === 'com.huoyun.sbo' && boName === "Company") {
          return $injector.get("CompanyService").getCompanyInfo();
        }

        return BoService.getBo(boNamespace, boName, boId);
      },

      setTitleAndNav: function($scope, boMeta, $state) {
        if ($state.current.name === "company") {
          $scope.setPageTitle(`${boMeta.label}详情`, `主页`);
          $scope.setNavInfos([{
            label: "主页",
            state: "home"
          }, {
            label: `${boMeta.label}详情`
          }]);
        } else {
          $scope.setPageTitle(`${boMeta.label}详情`, `${boMeta.label}列表`);
          $scope.setNavInfos([{
            label: "主页",
            state: "home"
          }, {
            label: `${boMeta.label}列表`,
            state: StateHelper.getBoListState(boMeta.boNamespace, boMeta.boName)
          }, {
            label: `${boMeta.label}详情`
          }]);
        }

      }
    };
  }
]);