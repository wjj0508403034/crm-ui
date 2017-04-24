'use strict';

huoyun.factory("HomepageService", ["$q", "$http", "BaseService", "StateHelper",
  function($q, $http, BaseService, StateHelper) {

    return {
      getMenus: function() {
        var menus = [{
          icon: "fa-home",
          label: "基本信息"
        }, {
          icon: "fa-briefcase",
          label: "客户管理",
          items: [{
            icon: "fa-file-o",
            label: "我的客户",
            stateLink: StateHelper.getBoListState('com.huoyun.sbo', 'Customer')
          }, {
            icon: "fa-file-o",
            label: "添加客户",
            stateLink: ""
          }]
        }, {
          icon: "fa-home",
          label: "工程管理",
          items: [{
            icon: "fa-file-o",
            label: "已开工程客户",
            stateLink: StateHelper.getBoListState('com.huoyun.sbo', 'Customer')
          }]
        }, {
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
        }, {
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
        }];

        return Promise.resolve(menus);
      }
    };
  }
]);