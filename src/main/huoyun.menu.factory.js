'use strict';


huoyun.factory("MenuService", ["CustomerStatusStateService",
  function(CustomerStatusStateService) {

    var defaultMenusMap = {
      "leads": {
        icon: "fa-home",
        label: "线索",
        active: true,
        items: [{
          icon: "fa-file-o",
          label: "所有线索",
          stateLink: "leads.list"
        }, {
          icon: "fa-file-o",
          label: "线索状态",
          stateLink: "leadsStatus.list"
        }]
      },
      "customer-management": {
        icon: "fa-briefcase",
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
            this.items.splice(1, 0, item);
          }.bind(this));
        }
      },
      "contract-management": {
        icon: "fa-briefcase",
        label: "合同",
        items: [{
          icon: "fa-file-o",
          label: "合同",
          stateLink: "contract.list"
        }, {
          icon: "fa-file-o",
          label: "支付方式",
          stateLink: "paymentTerm.list"
        }]
      },
      "user-management": {
        icon: "fa-home",
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
        icon: "fa-home",
        label: "系统设置",
        items: [{
          icon: "fa-file-o",
          label: "客户状态",
          stateLink: "customerStatus.list"
        }, {
          icon: "fa-file-o",
          label: "客户来源",
          stateLink: "salesSource.list"
        }, {
          icon: "fa-file-o",
          label: "装修方式",
          stateLink: "finishtype.list"
        }, {
          icon: "fa-file-o",
          label: "户型",
          stateLink: "houseType.list"
        }, {
          icon: "fa-file-o",
          label: "楼盘",
          stateLink: "houses.list"
        }, {
          icon: "fa-file-o",
          label: "作品列表",
          stateLink: "finishwork.list",
          visibility: false
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
        return CustomerStatusStateService.getCustomerStatusMenus()
          .then(function(customerStatusStateList) {
            var clonedMap = angular.copy(defaultMenusMap);
            clonedMap["customer-management"].setItems(customerStatusStateList);
            return Promise.resolve(getMenuItems(clonedMap));
          }).catch(function() {
            return Promise.resolve(getMenuItems(defaultMenusMap));
          });
      }
    };
  }
]);