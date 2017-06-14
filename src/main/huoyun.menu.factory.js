'use strict';


huoyun.factory("MenuService", ["$q", "CustomerStatusStateService",
  function($q, CustomerStatusStateService) {

    var defaultMenusMap = {
      "homepage": {
        icon: "fa-home",
        label: "主页",
        active: true,
        stateLink: "home"
      },
      "leads": {
        icon: "fa-binoculars",
        label: "线索管理",
        active: true,
        items: [{
          icon: "fa-file-o",
          label: "所有线索",
          stateLink: "leads.list"
        }]
      },
      "customer-management": {
        icon: "fa-users",
        label: "客户管理",
        items: [{
          icon: "fa-file-o",
          label: "我的客户",
          stateLink: "myCustomer.list"
        }, {
          icon: "fa-file-o",
          label: "回收站",
          stateLink: "trash.list"
        }],
        setItems: function(items) {
          items.forEach(function(item) {
            this.items.splice(this.items.length - 1, 0, item);
          }.bind(this));
        }
      },
      "design-management": {
        icon: "fa-desktop",
        label: "设计管理",
        items: [{
          icon: "fa-file-o",
          label: "设计阶段客户",
          stateLink: "designStageCustomer.list"
        }],
        setItems: function(items) {
          items.forEach(function(item) {
            this.items.splice(this.items.length, 0, item);
          }.bind(this));
        }
      },
      "project-management": {
        icon: "fa-bank",
        label: "工程管理",
        items: [{
          icon: "fa-file-o",
          label: "工程阶段客户",
          stateLink: "constructionStageCustomer.list"
        }],
        setItems: function(items) {
          items.forEach(function(item) {
            this.items.splice(this.items.length, 0, item);
          }.bind(this));
        }
      },
      "contract-management": {
        icon: "fa-file-text-o",
        label: "合同",
        items: [{
          icon: "fa-file-o",
          label: "合同",
          stateLink: "contract.list"
        }]
      },
      "user-management": {
        icon: "fa-user",
        label: "用户中心",
        items: [{
          icon: "fa-file-o",
          label: "公司信息",
          stateLink: "company.show"
        }, {
          icon: "fa-file-o",
          label: "部门列表",
          stateLink: "department.list"
        }, {
          icon: "fa-file-o",
          label: "员工列表",
          stateLink: "employee.list"
        }]
      },
      "settings": {
        icon: "fa-gear",
        label: "系统设置",
        items: [{
          icon: "fa-file-o",
          label: "线索状态配置",
          stateLink: "leadsStatus.list"
        }, {
          icon: "fa-file-o",
          label: "支付方式配置",
          stateLink: "paymentTerm.list"
        }, {
          icon: "fa-file-o",
          label: "跟踪状态配置",
          stateLink: "customerStatus.list"
        }, {
          icon: "fa-file-o",
          label: "工程状态配置",
          stateLink: "constructionStatus.list"
        }, {
          icon: "fa-file-o",
          label: "客户来源配置",
          stateLink: "salesSource.list"
        }, {
          icon: "fa-file-o",
          label: "装修方式配置",
          stateLink: "finishtype.list"
        }, {
          icon: "fa-file-o",
          label: "户型配置",
          stateLink: "houseType.list"
        }, {
          icon: "fa-file-o",
          label: "楼盘配置",
          stateLink: "houses.list"
        }, {
          icon: "fa-file-o",
          label: "作品列表配置",
          stateLink: "finishwork.list",
          visibility: false
        }, {
          icon: "fa-file-o",
          label: "职务配置",
          stateLink: "employeeTitle.list"
        }]
      }
    };

    function getMenuItems(menuMap) {
      var menus = [];
      Object.keys(menuMap).forEach(function(key) {
        var menuItem = menuMap[key];
        menuItem.name = key;
        menus.push(menuItem);
      });

      return menus;
    }

    return {
      getMenus: function() {

        return $q.all([CustomerStatusStateService.getCustomerStatusMenus(),
          CustomerStatusStateService.getConstractionMenus()
        ]).then(function(res) {
          var clonedMap = angular.copy(defaultMenusMap);
          clonedMap["design-management"].setItems(res[0]);
          clonedMap["project-management"].setItems(res[1]);
          return Promise.resolve(getMenuItems(clonedMap));
        }).catch(function() {
          return Promise.resolve(getMenuItems(defaultMenusMap));
        });
      }
    };
  }
]);