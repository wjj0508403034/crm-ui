'use strict';

huoyun.factory("HomepageService", ["$q", "$http", "BaseService", "StateHelper", "BoService",
  function($q, $http, BaseService, StateHelper, BoService) {

    function getMenuItems(menuMap) {
      var menus = [];
      Object.keys(menuMap).forEach(function(key) {
        var menuItem = menuMap[key];
        menuItem.name = key;
        menus.push(menuItem);
      });

      return menus;
    }

    var cachedMenu = null;

    return {
      reloadMenus: function() {
        cachedMenu = null;
        return this.getMenus();
      },

      getMenus: function() {
        if (cachedMenu) {
          return Promise.resolve(cachedMenu);
        }

        var menuMap = {
          "home": {
            icon: "fa-home",
            label: "基本信息",
            stateLink: "home",
            active: true
          },
          "customerManagement": {
            icon: "fa-briefcase",
            label: "客户管理",
            items: [{
              icon: "fa-file-o",
              label: "我的客户",
              stateLink: StateHelper.getBoListState('com.huoyun.sbo', 'Customer')
            }]
          },
          "projectManagement": {
            icon: "fa-briefcase",
            label: "客户管理",
            items: [{
              icon: "fa-file-o",
              label: "已开工程客户",
              stateLink: StateHelper.getBoListState('com.huoyun.sbo', 'Customer')
            }]
          },
          "userManagement": {
            icon: "fa-home",
            label: "用户中心",
            items: [{
              icon: "fa-file-o",
              label: "公司信息",
              stateLink: "company"
            }, {
              icon: "fa-file-o",
              label: "部门列表",
              stateLink: StateHelper.getBoListState('com.huoyun.sbo', 'Department')
            }, {
              icon: "fa-file-o",
              label: "员工列表",
              stateLink: StateHelper.getBoListState('com.huoyun.sbo', 'Employee')
            }]
          },
          "settings": {
            icon: "fa-home",
            label: "系统设置",
            items: [{
              icon: "fa-file-o",
              label: "客户状态",
              stateLink: StateHelper.getBoListState('com.huoyun.sbo', 'CustomerStatus')
            }, {
              icon: "fa-file-o",
              label: "客户来源",
              stateLink: StateHelper.getBoListState('com.huoyun.sbo', 'SalesSource')
            }, {
              icon: "fa-file-o",
              label: "装修方式",
              stateLink: StateHelper.getBoListState('com.huoyun.sbo', 'FinishType')
            }]
          }
        };



        return BoService.query("com.huoyun.sbo", "CustomerStatus")
          .then(function(data) {
            data.content.forEach(function(customerStatus, index) {
              menuMap["customerManagement"].items.push({
                icon: "fa-file-o",
                label: customerStatus.name,
                stateLink: StateHelper.getBoListState('com.huoyun.sbo', 'Customer', `status%20eq%20${customerStatus.id}`)
              });
            });

            cachedMenu = getMenuItems(menuMap);
            return Promise.resolve(cachedMenu);
          }).catch(function(err) {
            return Promise.resolve(getMenuItems(menuMap));
          });
      }
    };
  }
]);