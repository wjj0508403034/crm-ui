'use strict';

huoyun.config(["NewBoTemplateProvider", "NewBoStateProvider",
  "BoStateParamProvider",
  function(NewBoTemplateProvider, NewBoStateProvider, BoStateParamProvider) {

    NewBoTemplateProvider.getBoTemplate("com.huoyun.sbo", "Leads")
      .setListPropTemplates({
        "name": {
          templateUrl: "customer/templates/list/property.name.html"
        },
        "status": {
          templateUrl: "leads/templates/list/leads.property.status.html"
        },
        "transform": {
          templateUrl: "leads/templates/list/leads.property.transform.html"
        }
      })
      .setDetailPropTemplates({
        "status": {
          templateUrl: "leads/templates/detail/leads.property.status.html"
        },
        "transform": {
          templateUrl: "leads/templates/detail/leads.property.transform.html"
        }
      });

    var boListOption = new BoStateParamProvider.BoList({
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
        disabled: function() {
          var selectedItem = boListOption.getController().getSelectedItem();
          if (selectedItem && !selectedItem.transform) {
            return false;
          }
          return true;
        },
        onClick: function() {
          var selectedItem = boListOption.getController().getSelectedItem();
          if (selectedItem) {
            generateToCustomer(selectedItem.id, $injector);
          }
        }
      }, {
        name: "detail",
        label: "详情",
        icon: "fa-file-text",
        visibility: function() {
          return !!boListOption.getController().getSelectedItem();
        },
        onClick: function() {
          boListOption.getController().getState().go("leads.detail", {
            boId: selectedLeads.id
          });
        }
      }, {
        name: "edit",
        label: "编辑",
        icon: "fa-pencil",
        visibility: function(button, $injector) {
          return !!boListOption.getController().getSelectedItem();
        },
        onClick: function() {
          boListOption.getController().getState().go("leads.edit", {
            boId: selectedLeads.id
          });
        }
      }, {
        name: "delete",
        label: "删除",
        icon: "fa-remove",
        visibility: function(button, $injector) {
          return !!boListOption.getController().getSelectedItem();
        },
        onClick: function() {
          var selectedItem = boListOption.getController().getSelectedItem();
          boListOption.getController().deleteBo(selectedItem);
        }
      }]
    });

    NewBoStateProvider.configure({
      boNamespace: "com.huoyun.sbo",
      boName: "Leads",
      list: boListOption
    });
  }
]);