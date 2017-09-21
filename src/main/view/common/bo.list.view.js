'use strict';
huoyun.controller('NewBoListViewController', ["$scope", "HuoYunWidgets", "MetadataService", "BoService", "BoMeta",
  function($scope, HuoYunWidgets, MetadataService, BoService, BoMeta) {

    var boName = "Leads";
    var boNamespace = "com.huoyun.sbo";

    var searchText = null;

    MetadataService.getMetadata(boNamespace, boName)
      .then(function(boMeta) {
        $scope.searchOption = new SearchOption(boMeta);
        $scope.tableOption = new TableOption(boMeta);
      }).then(function() {
        BoService.query(boNamespace, boName)
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
        header: new TableHeader(boMeta),
        columns: columns
      });
    }

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