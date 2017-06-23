'use strict';

huoyun.constant("ServiceContext", "");
huoyun.constant("DebugMode", true);

huoyun.config(["$httpProvider", "$logProvider", "HttpErrorHandlerProvider", "ServiceContext",
  function($httpProvider, $logProvider, HttpErrorHandlerProvider, ServiceContext) {

    $httpProvider.interceptors.push("HttpInterceptor");

    HttpErrorHandlerProvider.setHandler(function(res) {
      if (res && res.status) {
        var Dialog = HttpErrorHandlerProvider.getDialog();
        if (!Dialog) {
          return;
        }
        if ([401, 405].indexOf(res.status) !== -1) {
          Dialog.showConfirm({
            title: "提示",
            content: "当前会话已经过期，请重新登陆？",
            confirm: {
              callback: function() {
                window.location.href = `${ServiceContext}/saml2/sp/logout`;
              }
            }
          });
        } else {
          if (res.data && res.data.code) {
            Dialog.showError(res.data.message);
          } else {
            Dialog.showError("系统错误，请联系管理员。");
          }
        }
      }
    });
  }
]);

huoyun.config(["PermissionControlProvider", function(PermissionControlProvider) {
  PermissionControlProvider.setWhiteList(["home", "leads.list", "permissionGroup.list"]);
}]);

huoyun.config(["SideBarProvider", function(SideBarProvider) {
  SideBarProvider.addGroups([{
    name: "homepage",
    icon: "fa-home",
    label: "主页",
    active: true,
    stateLink: "home"
  }, {
    name: "leads",
    icon: "fa-binoculars",
    label: "线索管理",
    items: [{
      icon: "fa-file-o",
      label: "所有线索",
      stateLink: "leads.list"
    }]
  }, {
    name: "customer-management",
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
    }]
  }, {
    name: "design-management",
    icon: "fa-desktop",
    label: "设计管理",
    items: [{
      icon: "fa-file-o",
      label: "设计阶段客户",
      stateLink: "designStageCustomer.list"
    }]
  }, {
    name: "project-management",
    icon: "fa-bank",
    label: "工程管理",
    items: [{
      icon: "fa-file-o",
      label: "工程阶段客户",
      stateLink: "constructionStageCustomer.list"
    }]
  }, {
    name: "contract-management",
    icon: "fa-file-text-o",
    label: "合同",
    items: [{
      icon: "fa-file-o",
      label: "合同",
      stateLink: "contract.list"
    }]
  }, {
    name: "user-management",
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
    }, {
      icon: "fa-random",
      label: "权限组",
      stateLink: "permissionGroup.list"
    }]
  }, {
    name: "setting",
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
  }]);
}]);

huoyun.config(["PermissionControlProvider",
  function(PermissionControlProvider) {
    PermissionControlProvider.configure({
      "leads-management": {
        label: "线索管理",
        items: [{
          name: "leads.list",
          label: "所有线索"
        }]
      },
      "customer-management": {
        label: "客户管理",
        items: [{
          name: "myCustomer.list",
          label: "我的客户"
        }, {
          name: "trash.list",
          label: "回收站"
        }]
      },
      "contract-management": {
        label: "合同",
        items: [{
          name: "contract.list",
          label: "合同"
        }]
      },
      "user-management": {
        label: "用户中心",
        items: [{
          name: "company.show",
          label: "公司信息"
        }, {
          name: "department.list",
          label: "部门列表"
        }, {
          name: "employee.list",
          label: "员工列表"
        }, {
          name: "permissionGroup",
          label: "权限组"
        }]
      },
      "settings": {
        label: "系统设置",
        items: [{
          name: "leadsStatus.list",
          label: "线索状态配置"
        }, {
          name: "paymentTerm.list",
          label: "支付方式配置"
        }, {
          name: "customerStatus.list",
          label: "跟踪状态配置"
        }, {
          name: "constructionStatus.list",
          label: "工程状态配置"
        }, {
          name: "salesSource.list",
          label: "客户来源配置"
        }, {
          name: "finishtype.list",
          label: "装修方式配置"
        }, {
          name: "houseType.list",
          label: "户型配置"
        }, {
          name: "houses.list",
          label: "楼盘配置"
        }, {
          name: "employeeTitle.list",
          label: "职务配置"
        }]
      }
    });
  }
]);