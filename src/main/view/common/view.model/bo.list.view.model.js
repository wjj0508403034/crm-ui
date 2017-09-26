'use strict';
huoyun.factory("BoListViewModel", ["BoMeta", "HuoYunWidgets", "NewBoTemplate",
  function(BoMeta, HuoYunWidgets, NewBoTemplateProvider) {

    function SearchOption(vm) {
      var searchProps = [];

      var propMap = vm.getBoMeta().propMap;
      Object.keys(propMap).forEach(function(propName) {
        var prop = propMap[propName];
        if (prop.searchable === true) {
          searchProps.push(new SearchProperty(prop));
        }
      });

      return new HuoYunWidgets.SearchFormOption({
        title: "搜索",
        props: searchProps,
        buttons: [{
          icon: "fa-sun-o",
          label: "重置搜索条件",
          appendClass: "btn-default",
          onClick: function() {
            vm.getController().clearSearch();
          }
        }],
        onSearch: function(expr) {
          vm.getController().search(expr);
        }
      });
    }

    function SearchProperty(prop) {

      const keys = ["name", "label"];

      var that = this;
      keys.forEach(function(key) {
        that[key] = prop[key];
      });

      if (["Text", "String"].indexOf(prop.type) !== -1) {
        that.type = "String";
      } else if (["BoLabel"].indexOf(prop.type) !== -1) {
        that.type = "DataList";
        that.datalist = new BoMeta.Properties.BoLabel(prop);
      }
    }

    function TableOption(vm) {
      var boMeta = vm.getBoMeta();

      var columns = [];
      boMeta.listview.properties.forEach(function(prop) {
        var column = new TableColum(prop);
        var templateUrl = NewBoTemplateProvider
          .getBoTemplate(boMeta.boNamespace, boMeta.boName)
          .getListPropTemplate(prop.name);
        column.setTemplateUrl(templateUrl);
        columns.push(column);
      });

      return new HuoYunWidgets.TableOption({
        selection: vm.getController().getSelection(),
        header: new TableHeader(vm),
        columns: columns
      });
    }

    function TableColum(prop) {
      const keys = ["name", "label", "type"];
      var that = this;
      keys.forEach(function(key) {
        that[key] = prop[key];
      });

      if (this.type === "BoLabel") {
        this.valueField = prop.additionInfo.idField;
        this.labelField = prop.additionInfo.labelField;
        this.boName = prop.additionInfo.boName;
        this.boNamespace = prop.additionInfo.boNamespace;
        this.getValueText = function(val) {
          return val && val[this.labelField];
        };
      }
    }

    TableColum.prototype.setTemplateUrl = function(templateUrl) {
      this.templateUrl = templateUrl;
    };

    function TableHeader(vm) {
      this.title = vm.getBoMeta().label;
      this.buttons = [];

      var buttons = vm.getController().getTableButtons();
      if (Array.isArray(buttons)) {
        var that = this;
        buttons.forEach(function(button) {
          that.buttons.push(new HuoYunWidgets.ButtonOption(button));
        });
      }
    }

    function ViewModel(boMeta, controller) {

      this.getBoMeta = function() {
        return boMeta;
      };

      this.getController = function() {
        return controller;
      };


      this.search = new SearchOption(this);
      this.table = new TableOption(this);
    }

    ViewModel.prototype.getTable = function() {
      return this.table;
    };

    return ViewModel;
  }
]);