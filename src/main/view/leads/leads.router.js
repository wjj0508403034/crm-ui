'use strict';

huoyun.config(["NewBoTemplateProvider", "NewBoStateProvider",
  "BoStateParam",
  function(NewBoTemplateProvider, NewBoStateProvider, BoStateParam) {

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

    var boList = new BoStateParam({
      searchText: "name like '1'",
      selection: {
        mode: "Single"
      },
      buttons: [{
        name: "generateToCustomer",
        label: "转换成客户",
        icon: "fa-users",
        visibility: function() {
          return !!boList.getController().getSelectedItem();
        },
        disabled: function() {
          var selectedItem = boList.getController().getSelectedItem();
          if (selectedItem && !selectedItem.transform) {
            return false;
          }
          return true;
        },
        onClick: function() {
          var selectedItem = boList.getController().getSelectedItem();
          if (selectedItem) {
            generateToCustomer(selectedItem.id, $injector);
          }
        }
      }, {
        name: "detail",
        label: "详情",
        icon: "fa-file-text",
        visibility: function() {
          return !!boList.getController().getSelectedItem();
        },
        onClick: function() {
          var selectedItem = boList.getController().getSelectedItem();
          boList.getController().gotoDetailView(selectedItem.id);
        }
      }, {
        name: "edit",
        label: "编辑",
        icon: "fa-pencil",
        visibility: function(button, $injector) {
          return !!boList.getController().getSelectedItem();
        },
        onClick: function() {
          boList.getController().getState().go("leads.edit", {
            boId: selectedLeads.id
          });
        }
      }, {
        name: "delete",
        label: "删除",
        icon: "fa-remove",
        visibility: function(button, $injector) {
          return !!boList.getController().getSelectedItem();
        },
        onClick: function() {
          var selectedItem = boList.getController().getSelectedItem();
          boList.getController().deleteBo(selectedItem);
        }
      }]
    });

    var boDetail = new BoStateParam({
      buttons: [{
        name: "remove",
        visibility: false
      }]
    });

    NewBoStateProvider.configure({
      boNamespace: "com.huoyun.sbo",
      boName: "Leads",
      list: boList,
      detail: boDetail
    });
  }
]);