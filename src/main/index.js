'use strict';

var huoyun = angular.module('huoyun', ["huoyun.widget", 'ui.router']);

huoyun.controller("appController", ["$scope", "Dialog", "HttpErrorHandler", "InitService", "BoState", "SideBar", "PermissionControl",
  function($scope, Dialog, HttpErrorHandlerProvider, InitService, BoStateProvider, SideBarProvider, PermissionControlProvider) {

    HttpErrorHandlerProvider.setDialog(Dialog);
    $scope.title = "火云CRM";
    $scope.navs = [];
    $scope.setPageTitle = function(title, subTitle) {
      $scope.pageTitle = title;
      $scope.pageSubTitle = subTitle;
    };

    $scope.setNavInfos = function(navs) {
      $scope.navs = navs;
    };

    InitService.getInitData()
      .then(function(initData) {
        initData.customerStatusList.forEach(function(state) {
          registerState(state, `status eq ${state.id} and deleted eq false`);
          SideBarProvider.addMenuItemAtLastIndex("design-management", {
            icon: "fa-file-o",
            label: state.name,
            stateLink: `${state.name.replace(".","")}.list`
          }, 0);
        });

        initData.constructionStatusList.forEach(function(state) {
          registerState(state, `constructionStatus eq ${state.id} and deleted eq false`);
          SideBarProvider.addMenuItemAtLastIndex("project-management", {
            icon: "fa-file-o",
            label: state.name,
            stateLink: `${state.name.replace(".","")}.list`
          }, 0);
        });

        initData.permissionGroups.forEach(function(group) {
          PermissionControlProvider.AddAllowAccessStates(group.states.split(","));
        });

        SideBarProvider.setMenuItemsVisibility(function() {
          return PermissionControlProvider.canAccess(this.stateLink);
        });

        $scope.company = initData.company;
        $scope.user = initData.employee;
      });

    function registerState(customerStatus, queryExpr) {
      BoStateProvider.register("com.huoyun.sbo", "Customer", {
        state: customerStatus.name,
        url: `/${customerStatus.name}`,
        label: customerStatus.name,
        list: {
          queryExpr: queryExpr,
          buttons: {
            "create": {
              visibility: false
            }
          }
        },
        detail: {
          templateUrl: "customer/customer.detail.html"
        }
      });
    }
  }
]);