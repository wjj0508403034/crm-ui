'use strict';
huoyun.controller('NewBoListViewController', ["$scope", "$state", "HuoYunWidgets", "MetadataService",
  "BoService", "BoMeta",
  function($scope, $state, HuoYunWidgets, MetadataService, BoService, BoMeta) {
    var boListStateOption = $state.current;
    boListStateOption.getOptions().setController(this);

    var boName = boListStateOption.getBoState().getBoName();
    var boNamespace = boListStateOption.getBoState().getBoNamespace();
    var searchText = boListStateOption.getSearchText();

    MetadataService.getMetadata(boNamespace, boName)
      .then(function(boMeta) {
        $scope.searchOption = new SearchOption(boMeta);
        $scope.tableOption = new TableOption(boMeta);
      }).then(function() {
        BoService.query(boNamespace, boName, 0, searchText)
          .then(function(dataSource) {
            $scope.tableOption.setSource(dataSource);
          });
      });

    function TableOption(boMeta) {
      var columns = [];
      boMeta.listview.properties.forEach(function(prop) {
        columns.push(new TableColum(prop));
      });

      return new HuoYunWidgets.TableOption({
        selection: boListStateOption.getSelection(),
        header: new TableHeader(boMeta),
        columns: columns
      });
    }

    this.getScope = function() {
      return $scope;
    };

    this.getSelectedItem = function() {
      return $scope.tableOption && $scope.tableOption.getSelectedItem();
    };

    function SearchOption(boMeta) {
      var searchProps = [];

      Object.keys(boMeta.propMap).forEach(function(propName) {
        var prop = boMeta.propMap[propName];
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
            $scope.searchOption.clear();
          }
        }],
        onSearch: function(expr) {
          searchText = expr;
          BoSearch();
        }
      });
    }

    function BoSearch() {
      BoService.query(boNamespace, boName, 0, searchText)
        .then(function(dataSource) {
          $scope.tableOption.setSource(dataSource);
        });
    }

    function TableColum(prop) {
      const keys = ["name", "label", "type"];
      var that = this;
      keys.forEach(function(key) {
        that[key] = prop[key];
      });
    }

    function TableHeader(boMeta) {
      this.title = boMeta.label;
      this.buttons = [];

      if (Array.isArray(boListStateOption.getButtons())) {
        var that = this;
        boListStateOption.getButtons().forEach(function(button) {
          //var buttonOption =
          that.buttons.push(new HuoYunWidgets.ButtonOption(button));
        });
      }
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
  }
]);