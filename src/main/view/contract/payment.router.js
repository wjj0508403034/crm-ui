'use strict';

huoyun.config(["BoStateProvider", function(BoStateProvider) {
  function backToParent($injector) {
    $injector.get("$state").go("contract.detail", {
      boId: $injector.get("$stateParams").contractId
    });
  }

  function getNavsInfo($injector, lastNavText) {
    var contractId = $injector.get("$stateParams").contractId;
    return [{
      label: "主页",
      state: "home"
    }, {
      label: "合同列表",
      state: "contract.list"
    }, {
      label: "合同详情",
      state: `contract.detail({"boId":${contractId}})`
    }, {
      label: lastNavText,
    }];
  }

  BoStateProvider.register("com.huoyun.sbo", "Payment", {
    state: "payment",
    url: "/contract/:contractId/payment",
    label: "支付方式",
    list: {
      visibility: false
    },
    create: {
      dynamicMeta: {
        "contract": {
          visibility: false
        },
        "paymentNo": {
          visibility: false
        }
      },
      navs: function($injector) {
        return getNavsInfo($injector, "新建收款记录");
      },
      setPageTitle: function($injector) {
        this.setPageTitle("新建收款记录", "合同详情");
      },
      beforeSave: function($injector, data, boMetadata) {
        data.contract = {
          id: $injector.get("$stateParams").contractId
        };

        return Promise.resolve(data);
      },
      onSaveCallback: function($injector) {
        $injector.get("Tip").show("创建成功！");
        backToParent($injector);
      },
      onCancelCallback: function($injector) {
        backToParent($injector);
      }
    },
    edit: {
      navs: function($injector) {
        return getNavsInfo($injector, "修改收款记录");
      },
      setPageTitle: function($injector) {
        this.setPageTitle("修改收款记录", "合同详情");
      },
      onSaveCallback: function($injector) {
        $injector.get("Tip").show("创建成功！");
        backToParent($injector);
      },
      onCancelCallback: function($injector) {
        backToParent($injector);
      }
    },
    detail: {
      navs: function($injector) {
        return getNavsInfo($injector, "收款记录详情");
      },
      setPageTitle: function($injector) {
        this.setPageTitle("收款记录详情", "合同详情");
      },
      buttons: {
        "delete": {
          onDeleteCallback: function(button, $injector) {
            $injector.get("Tip").show("删除成功！");
            backToParent($injector);
          }
        }
      }
    }
  });
}]);