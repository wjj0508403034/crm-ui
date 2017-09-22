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

// huoyun.config(["PermissionControlProvider", function(PermissionControlProvider) {
//   PermissionControlProvider.setWhiteList(["home", "leads.list", "permissionGroup.list"]);
// }]);

huoyun.provider("NewSession", function() {

  function Session() {

  }

  Session.prototype.setUser = function(user) {
    this.user = user;
  };

  Session.prototype.setCompany = function(company) {
    this.company = company;
  };

  var session = new Session();
  this.$get = function() {
    return session;
  };
});

huoyun.provider("Permission", function() {

  function Permission() {
    this.items = [];
  };

  Permission.prototype.setWhiteList = function(items) {
    this.addItems(items);
    return this;
  };

  Permission.prototype.addItems = function(items) {
    if (Array.isArray(items)) {
      var that = this;
      items.forEach(function(item) {
        if (!that.items.linq().exists(item)) {
          that.items.push(item);
        }
      });
    }
    return this;
  };

  Permission.prototype.allowAccess = function(item) {
    return this.items.linq().exists(item);
  };


  var permission = new Permission();
  this.$get = function() {
    return permission;
  };
});

huoyun.config(["PermissionProvider", function(PermissionProvider) {
  PermissionProvider.$get().setWhiteList(["home", "leads.list", "permissionGroup.list"]);
}]);



// huoyun.config(["PermissionControlProvider",
//   function(PermissionControlProvider) {
//     PermissionControlProvider.addGroups([{
//         name: "leads-management",
//         label: "线索管理",
//         items: [{
//           name: "leads.list",
//           label: "所有线索"
//         }]
//       }, {
//         name: "customer-management",
//         label: "客户管理",
//         items: [{
//           name: "myCustomer.list",
//           label: "我的客户"
//         }, {
//           name: "trash.list",
//           label: "回收站"
//         }]
//       }, {
//         name: "contract-management",
//         label: "合同",
//         items: [{
//           name: "contract.list",
//           label: "合同"
//         }]
//       },
//       {
//         name: "user-management",
//         label: "用户中心",
//         items: [{
//           name: "company.show",
//           label: "公司信息"
//         }, {
//           name: "department.list",
//           label: "部门列表"
//         }, {
//           name: "employee.list",
//           label: "员工列表"
//         }, {
//           name: "permissionGroup",
//           label: "权限组"
//         }]
//       }, {
//         name: "settings",
//         label: "系统设置",
//         items: [{
//           name: "leadsStatus.list",
//           label: "线索状态配置"
//         }, {
//           name: "paymentTerm.list",
//           label: "支付方式配置"
//         }, {
//           name: "customerStatus.list",
//           label: "跟踪状态配置"
//         }, {
//           name: "constructionStatus.list",
//           label: "工程状态配置"
//         }, {
//           name: "salesSource.list",
//           label: "客户来源配置"
//         }, {
//           name: "finishtype.list",
//           label: "装修方式配置"
//         }, {
//           name: "houseType.list",
//           label: "户型配置"
//         }, {
//           name: "houses.list",
//           label: "楼盘配置"
//         }, {
//           name: "employeeTitle.list",
//           label: "职务配置"
//         }]
//       }
//     ]);
//   }
// ]);