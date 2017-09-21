'use strict';

var huoyun = angular.module('huoyun', ["huoyun.widgets", "huoyun.widget", 'ui.router']);

huoyun.controller("appController", ["$scope", "Dialog", "HttpErrorHandler", "InitService", "BoState", "SideBar",
  "PermissionControl", "Session",
  function($scope, Dialog, HttpErrorHandlerProvider, InitService, BoStateProvider, SideBarProvider,
    PermissionControlProvider, SessionProvider) {

    HttpErrorHandlerProvider.setDialog(Dialog);
    $scope.navs = [];
    $scope.setPageTitle = function(title) {
      $scope.pageTitle = title;
    };

    $scope.setNavInfos = function(navs) {
      $scope.navs = navs;
    };

    InitService.getInitData()
      .then(function(initData) {
        initData.customerStatusList.forEach(function(state) {
          registerState(state, `status eq ${state.id} and deleted eq false`);
          const boListStateLink = `${state.name.replace(".","")}.list`;
          SideBarProvider.addMenuItemAtLastIndex("customer-management", {
            icon: "fa-file-o",
            label: state.name,
            stateLink: boListStateLink
          }, 1);
          PermissionControlProvider.addGroupItemAtLastIndex("customer-management", {
            name: boListStateLink,
            label: state.name
          }, 1);
        });

        initData.constructionStatusList.forEach(function(state) {
          registerState(state, `constructionStatus eq ${state.id} and deleted eq false`);
          const boListStateLink = `${state.name.replace(".","")}.list`;
          SideBarProvider.addMenuItemAtLastIndex("customer-management", {
            icon: "fa-file-o",
            label: state.name,
            stateLink: boListStateLink
          }, 1);
          PermissionControlProvider.addGroupItemAtLastIndex("customer-management", {
            name: boListStateLink,
            label: state.name
          }, 1);
        });

        initData.permissionGroups.forEach(function(group) {
          PermissionControlProvider.AddAllowAccessStates(group.states.split(","));
        });

        SideBarProvider.setMenuItemsVisibility(function() {
          return PermissionControlProvider.canAccess(this.stateLink);
        });

        SessionProvider.set("company", initData.company);
        SessionProvider.set("user", initData.employee);
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
          templateUrl: "customer/customer.detail.html",
          buttons: {
            "delete": {
              visibility: false
            }
          }
        }
      });
    }
  }
]);