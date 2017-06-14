'use strict';

huoyun.controller('PermissionPropertyMembersController', ["$scope", "BoStateCache", "BoEvent", "MetadataService",
  "BoService", "Dialog",
  function($scope, BoStateCachePrivoder, BoEvent, MetadataService, BoService, Dialog) {

    MetadataService.getMetadata("com.huoyun.sbo", "PermissionGroupMember")
      .then(function(boMeta) {
        $scope.boMeta = boMeta;
      });

    BoService.query("com.huoyun.sbo", "PermissionGroupMember")
      .then(function(pageData) {
        $scope.pageData = pageData;
      });


    $scope.buttons = [{
      name: "add",
      text: "添加成员",
      appendClass: "pull-right btn-default",
      onButtonClicked: function() {
        var options = {
          title: `添加成员`,
          templateUrl: "framework/dialog/choose.multi.bo.items.dialog.html",
          appendClassName: "choose-multi-bo-items-dialog",
          params: {
            boName: "Employee",
            boNamespace: "com.huoyun.sbo",
            selectedBos: []
          },
          closeCallback: function(key, data) {
            if (key === "OK" && Array.isArray(data) && data.length > 0) {
              data.forEach(function(employee) {
                BoService.createBo("com.huoyun.sbo", "PermissionGroupMember", {
                  employee: employee,
                  group: $scope.boData
                });
              });

            }
          }
        };
        var dialog = Dialog.showConfirm(options);
      }
    }];

  }
]);