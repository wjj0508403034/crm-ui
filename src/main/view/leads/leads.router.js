'use strict';

huoyun.config(["BoStateProvider", "HuoyunWidgetConstant", "BoTemplateProvider", "NewBoStateProvider",
  function(BoStateProvider, HuoyunWidgetConstant, BoTemplateProvider, NewBoStateProvider) {

    function generateToCustomer(leadsId, $injector) {
      $injector.get("LeadsService").generateToCustomer(leadsId)
        .then(function(customer) {
          $injector.get("Tip").show("转换成客户成功！");
          $injector.get("$state").go("myCustomer.edit", {
            boId: customer.id
          });
        });
    }

    BoTemplateProvider.configure("com.huoyun.sbo", "Leads", {
      state: {
        name: "leads",
        label: "所有线索",
        group: {
          name: "leads-management",
          label: "线索管理"
        }
      },
      list: {
        propTemplates: {
          "name": {
            templateUrl: "customer/templates/list/property.name.html"
          },
          "status": {
            templateUrl: "leads/templates/list/leads.property.status.html"
          },
          "transform": {
            templateUrl: "leads/templates/list/leads.property.transform.html"
          }
        }
      },
      detail: {
        propTemplates: {
          "status": {
            templateUrl: "leads/templates/detail/leads.property.status.html"
          },
          "transform": {
            templateUrl: "leads/templates/detail/leads.property.transform.html"
          }
        }
      }
    });

    var boListOption = new BoListOption({
      searchText: "name like '1'",
      selection: {
        mode: "Single"
      },
      buttons: [{
        name: "generateToCustomer",
        label: "转换成客户",
        icon: "fa-users",
        visibility: function() {
          return !!boListOption.getController().getSelectedItem();
        },
      }]
    });

    NewBoStateProvider.configure({
      boNamespace: "com.huoyun.sbo",
      boName: "Leads",
      list: boListOption
    });

    function BoListOption(options) {
      var that = this;
      Object.keys(options).forEach(function(key) {
        that[key] = options[key];
      });
    }

    BoListOption.prototype.setController = function(controller) {
      this.controller = controller;
    };

    BoListOption.prototype.getController = function() {
      return this.controller;
    };

    // BoStateProvider.register("com.huoyun.sbo", "Leads", {
    //   state: "leads",
    //   url: "/leads",
    //   label: "线索",
    //   list: {
    //     selectionMode: HuoyunWidgetConstant.SelectionMode.Single,
    //     buttons: {
    //       "generateToCustomer": {
    //         text: "转换成客户",
    //         icon: "fa-users",
    //         visibility: function(button, $injector) {
    //           var selectedItem = this.getSelectionItem();
    //           return !!selectedItem;
    //         },
    //         disabled: function(button, $injector) {
    //           var selectedItem = this.getSelectionItem();
    //           if (selectedItem && !selectedItem.transform) {
    //             return false;
    //           }
    //           return true;
    //         },
    //         onButtonClicked: function(button, $injector) {
    //           var selectedLeads = this.getSelectionItem();
    //           if (selectedLeads) {
    //             generateToCustomer(selectedLeads.id, $injector);
    //           }
    //         }
    //       },
    //       "detail": {
    //         text: "详情",
    //         icon: "fa-file-text",
    //         visibility: function(button, $injector) {
    //           var selectedItem = this.getSelectionItem();
    //           return !!selectedItem;
    //         },
    //         onButtonClicked: function(button, $injector) {
    //           var selectedLeads = this.getSelectionItem();
    //           if (selectedLeads) {
    //             $injector.get("$state").go("leads.detail", {
    //               boId: selectedLeads.id
    //             });
    //           }
    //         }
    //       },
    //       "edit": {
    //         text: "编辑",
    //         icon: "fa-pencil",
    //         visibility: function(button, $injector) {
    //           var selectedItem = this.getSelectionItem();
    //           return !!selectedItem;
    //         },
    //         onButtonClicked: function(button, $injector) {
    //           var selectedLeads = this.getSelectionItem();
    //           if (selectedLeads) {
    //             $injector.get("$state").go("leads.edit", {
    //               boId: selectedLeads.id
    //             });
    //           }
    //         }
    //       },
    //       "delete": {
    //         text: "删除",
    //         icon: "fa-remove",
    //         visibility: function(button, $injector) {
    //           var selectedItem = this.getSelectionItem();
    //           return !!selectedItem;
    //         },
    //         onButtonClicked: function(button, $injector) {
    //           var selectedLeads = this.getSelectionItem();
    //           if (selectedLeads) {
    //             this.deleteBo(selectedLeads.id)
    //               .then(function() {
    //                 this.reload();
    //               }.bind(this));
    //           }
    //         }
    //       }
    //     }
    //   },
    //   detail: {
    //     buttons: {
    //       "generateToCustomer": {
    //         text: "转换成客户",
    //         visibility: function(button, $injector) {
    //           if (this.boData) {
    //             if (!this.boData.transform) {
    //               return true;
    //             }
    //           }
    //           return false;
    //         },
    //         onButtonClicked: function(button, $injector) {
    //           generateToCustomer(selectedLeads.id, $injector);
    //         }
    //       }
    //     }
    //   }
    // });
  }
]);