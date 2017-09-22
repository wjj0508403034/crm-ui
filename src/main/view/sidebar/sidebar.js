'use strict';

huoyun.controller("SidbarController", ["$scope", "$state", "HuoYunWidgets", "SidbarViewModel",
  function($scope, $state, HuoYunWidgets, SidbarViewModel) {
    var vm = new SidbarViewModel();
    vm.addMenu({
      name: "homepage",
      icon: "fa-home",
      label: "主页",
      stateName: "home"
    }).addMenu({
      name: "leads",
      icon: "fa-binoculars",
      label: "线索管理",
      items: [{
        icon: "fa-file-o",
        label: "所有线索",
        stateName: "leads.list"
      }]
    }).addMenu({
      name: "customer-management",
      icon: "fa-users",
      label: "客户管理",
      items: [{
        icon: "fa-file-o",
        label: "我的客户",
        stateName: "myCustomer.list"
      }, {
        icon: "fa-trash-o",
        label: "回收站",
        stateName: "trash.list"
      }]
    }).addMenu({
      name: "contract-management",
      icon: "fa-file-text-o",
      label: "合同",
      items: [{
        icon: "fa-file-o",
        label: "合同",
        stateName: "contract.list"
      }]
    }).addMenu({
      name: "user-management",
      icon: "fa-user",
      label: "用户中心",
      items: [{
        icon: "fa-file-o",
        label: "公司信息",
        stateName: "company.show"
      }, {
        icon: "fa-file-o",
        label: "部门列表",
        stateName: "department.list"
      }, {
        icon: "fa-file-o",
        label: "员工列表",
        stateName: "employee.list"
      }, {
        icon: "fa-random",
        label: "权限组",
        stateName: "permissionGroup.list"
      }]
    }).addMenu({
      name: "setting",
      icon: "fa-gear",
      label: "系统设置",
      items: [{
        icon: "fa-file-o",
        label: "线索状态配置",
        stateName: "leadsStatus.list"
      }, {
        icon: "fa-file-o",
        label: "支付方式配置",
        stateName: "paymentTerm.list"
      }, {
        icon: "fa-file-o",
        label: "设计状态配置",
        stateName: "customerStatus.list"
      }, {
        icon: "fa-file-o",
        label: "工程状态配置",
        stateName: "constructionStatus.list"
      }, {
        icon: "fa-file-o",
        label: "客户来源配置",
        stateName: "salesSource.list"
      }, {
        icon: "fa-file-o",
        label: "装修方式配置",
        stateName: "finishtype.list"
      }, {
        icon: "fa-file-o",
        label: "户型配置",
        stateName: "houseType.list"
      }, {
        icon: "fa-file-o",
        label: "楼盘配置",
        stateName: "houses.list"
      }, {
        icon: "fa-file-o",
        label: "职务配置",
        stateName: "employeeTitle.list"
      }]
    });

    $scope.sideBarOption = new HuoYunWidgets.SidebarPanelOption(vm);
  }
]);

huoyun.factory("SidbarViewModel", ["$state", "Permission", function($state, PermissionProvider) {
  function SidbarViewModel() {
    this.menus = [];
  }

  SidbarViewModel.prototype.addMenu = function(menu) {
    this.menus.push(new Menu(menu));
    return this;
  };

  SidbarViewModel.prototype.findMenu = function(name) {
    return this.menus.linq().first(function(menu) {
      return menu.name === name;
    });
  };

  function Menu(options) {
    const keys = ["name", "label", "icon", "stateName"];
    this.items = [];

    var that = this;
    keys.forEach(function(key) {
      that[key] = options[key];
    });

    if (Array.isArray(options.items)) {
      options.items.forEach(function(item) {
        that.items.push(new MenuItem(item));
      });
    }

    this.getOptions = function() {
      return options;
    };
  }

  Menu.prototype.insertMeunItems = function(index, menuitems) {
    if (Array.isArray(menuitems)) {
      var that = this;
      menuitems.forEach(function(item) {
        that.items.splice(index, 0, item);
      });
    }
  };

  Menu.prototype.onClick = function() {
    if (typeof this.getOptions().onClick === "function") {
      this.getOptions().onClick();
      return;
    }

    if (this.stateName) {
      $state.go(this.stateName, this.getOptions.stateParams);
    }
  };

  Menu.prototype.visibility = function() {
    if (this.stateName) {
      return PermissionProvider.allowAccess(this.stateName);
    }

    return this.items.linq().any(function(item) {
      return item.visibility();
    });
  };

  function MenuItem(options) {
    const keys = ["name", "label", "icon", "stateName"];

    var that = this;
    keys.forEach(function(key) {
      that[key] = options[key];
    });

    this.getOptions = function() {
      return options;
    };
  }

  MenuItem.prototype.onClick = function() {
    if (typeof this.getOptions().onClick === "function") {
      this.getOptions().onClick();
      return;
    }

    if (this.stateName) {
      $state.go(this.stateName, this.getOptions.stateParams);
    }
  }

  MenuItem.prototype.visibility = function() {
    if (this.stateName) {
      return PermissionProvider.allowAccess(this.stateName);
    }

    return true;
  };

  return SidbarViewModel;
}]);