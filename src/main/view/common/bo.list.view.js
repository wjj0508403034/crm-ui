'use strict';
huoyun.controller('NewBoListViewController', ["$scope", "$state", "$log", "HuoYunWidgets", "MetadataService",
  "BoService", "BoListViewModel",
  function($scope, $state, $log, HuoYunWidgets, MetadataService, BoService, BoListViewModel) {
    var boListState = $state.current;
    var boName = boListState.getBoName();
    var boNamespace = boListState.getBoNamespace();
    var searchText = boListState.getSearchText();

    var controller = {
      getSelectedItem: function() {
        var line = $scope.vm.getTable() && $scope.vm.getTable().getSelectedItem();
        return line && line.getData();
      },

      getSelection: function() {
        return boListState.getSelection();
      },

      getTableButtons: function() {
        return boListState.getOptions().buttons;
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
                  HuoYunWidgets.Tip.show("删除成功！");
                }).catch(function(err) {
                  $log.warn("删除失败！", err);
                });
            }
          }
        };
        var dialog = HuoYunWidgets.Dialog.showConfirm(options);
      },

      gotoDetailView: function(boId) {
        $state.go(boListState.getParent().getDetailStateName(), {
          boId: boId
        });
      }
    };


    boListState.getOptions().setController(controller);

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