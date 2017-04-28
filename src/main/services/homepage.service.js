'use strict';

huoyun.factory("HomepageService", ["$q", "$http", "BaseService", "StateHelper", "BoService",
  function($q, $http, BaseService, StateHelper, BoService) {
    var cachedMenu = null;

    function getMenuItems(menuMap) {
      var menus = [];
      Object.keys(menuMap).forEach(function(key) {
        var menuItem = menuMap[key];
        menuItem.name = key;
        menus.push(menuItem);
      });

      return menus;
    }

    function addTrashMenuForCustomer(customerManagement) {
      const stateName = "trash.list";
      customerManagement.items.push({
        icon: "fa-file-o",
        label: "回收站",
        stateLink: stateName
      });
    }

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
              stateLink: "myCustomer.list"
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
              stateLink: "company.show"
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
              var stateName = customerStatus.name;
              StateHelper.registerBoListState(stateName, {
                boNamespace: "com.huoyun.sbo",
                boName: "Customer",
                title: customerStatus.name,
                queryExpr: `status%20eq%20${customerStatus.id}%20and%20deleted%20eq%20false`
              });
              menuMap["customerManagement"].items.push({
                icon: "fa-file-o",
                label: customerStatus.name,
                stateLink: `${stateName}.list`
              });
            });

            addTrashMenuForCustomer(menuMap["customerManagement"]);
            cachedMenu = getMenuItems(menuMap);
            return Promise.resolve(cachedMenu);
          }).catch(function(err) {
            addTrashMenuForCustomer(menuMap["customerManagement"]);
            return Promise.resolve(getMenuItems(menuMap));
          });
      }
    };
  }
]);