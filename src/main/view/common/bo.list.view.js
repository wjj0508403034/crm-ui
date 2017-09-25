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

'use strict';
huoyun.controller('NewBoListViewController', ["$scope", "$state", "$log", "HuoYunWidgets", "MetadataService",
  "BoService", "BoMeta", "NewBoTemplate", "BoListViewModel",
  function($scope, $state, $log, HuoYunWidgets, MetadataService, BoService, BoMeta, NewBoTemplateProvider,
    BoListViewModel) {
    var boListStateOption = $state.current;
    var boName = boListStateOption.getBoState().getBoName();
    var boNamespace = boListStateOption.getBoState().getBoNamespace();
    var searchText = boListStateOption.getSearchText();

    var controller = {
      getScope: function() {
        return $scope;
      },

      getState: function() {
        return $state;
      },

      getSelectedItem: function() {
        return $scope.vm.getTable() && $scope.vm.getTable().getSelectedItem();
      },

      getSelection: function() {
        return boListStateOption.getSelection();
      },

      getTableButtons: function() {
        return boListStateOption.getOptions().buttons;
      },

      search: function(expr) {
        searchText = expr;
        BoSearch();
      },

      clearSearch: function() {
        $scope.vm.search.clear();
      },

      getBoNamespace: function() {
        return boNamespace;
      },

      getBoName: function() {
        return boName;
      },

      deleteBo: function(bo) {
        var options = {
          title: "提示",
          content: "确定要删除本条信息吗? 一旦删除，数据将不可恢复？",
          confirm: {
            callback: function() {
              BoService.deleteBo(boNamespace, boName, bo.id)
                .then(function() {
                  Tip.show("删除成功！");
                }).catch(function(err) {
                  $log.warn("删除失败！", err);
                });
            }
          }
        };
        var dialog = HuoYunWidgets.Dialog.showConfirm(options);
      }
    };


    boListStateOption.getOptions().setController(controller);

    MetadataService.getMetadata(boNamespace, boName)
      .then(function(boMeta) {
        $scope.vm = new BoListViewModel(boMeta, controller);
      }).then(function() {
        BoSearch();
      });

    function BoSearch() {
      BoService.query(boNamespace, boName, 0, searchText)
        .then(function(dataSource) {
          $scope.vm.getTable().setSource(dataSource);
        });
    }
  }
]);