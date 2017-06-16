'use strict';

huoyun.controller('PermissionPropertyMembersController', ["$scope", "BoService", "PermissionService", "Tip",
  "BoHelper", "HuoyunWidgetConstant",
  function($scope, BoService, PermissionService, Tip, BoHelper, HuoyunWidgetConstant) {
    var queryExpr = null;
    var currentPageIndex = null;

    $scope.tableOptions = {
      header: {
        visibility: false
      }
    };

    BoService.getMetadata("com.huoyun.sbo", "PermissionGroupMember")
      .then(function(boMeta) {
        $scope.boMeta = boMeta;
      });


    if ($scope.boData) {
      queryExpr = `group eq ${$scope.boData.id}`;
      query();
    }

    $scope.$on(HuoyunWidgetConstant.Events.BoEvent.BoDataChanged, function(event, boData) {
      if (boData) {
        queryExpr = `group eq ${boData.id}`;
      }
      boData && query();
    });



    $scope.onPagingChanged = function(pageIndex) {
      currentPageIndex = pageIndex;
      query();
    };


    $scope.buttons = [{
      name: "delete",
      text: "删除",
      icon: "fa-remove",
      visibility: function() {
        return !!getCurrentSelectItem();
      },
      onButtonClicked: function() {
        var selectItem = getCurrentSelectItem();
        if (selectItem) {
          BoService.deleteBo("com.huoyun.sbo", "PermissionGroupMember", selectItem.id)
            .then(function() {
              Tip.show("删除成功成功！");
              query();
            });
        }
      }
    }, {
      name: "add",
      text: "添加成员",
      icon: "fa-plus",
      appendClass: "btn-primary",
      onButtonClicked: function() {
        var members = getCurrentMembers();

        var options = {
          title: "添加成员",
          boNamespace: "com.huoyun.sbo",
          boName: "Employee",
          selectedItems: members,
          mode: HuoyunWidgetConstant.SelectionMode.Multiple
        };

        BoHelper.openChooseFromList(options)
          .then(function(dialogResult) {
            if (dialogResult.key === "OK") {
              var employeeIds = dialogResult.data.map(function(dataItem) {
                return dataItem.id;
              });
              PermissionService.addGroupMembers($scope.boData.id, employeeIds)
                .then(function() {
                  Tip.show("添加成功！");
                  query();
                });
            }
          });
      }
    }];

    function getCurrentSelectItem() {
      return $scope.pageData && BoHelper.getCurrentSelectItem($scope.pageData.content);
    }

    function getCurrentMembers() {
      return $scope.pageData.content.map(function(item) {
        return item.employee;
      });
    }

    function query() {
      return BoService.query("com.huoyun.sbo", "PermissionGroupMember", currentPageIndex, queryExpr)
        .then(function(pageData) {
          $scope.pageData = pageData;
        });
    }
  }
]);