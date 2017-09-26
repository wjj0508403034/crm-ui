'use strict';

huoyun.controller('NewBoCreationViewController', ["$scope", "HuoYunWidgets", "MetadataService", "BoService",
  "BoCreationViewModel",
  function($scope, HuoYunWidgets, MetadataService, BoService, BoCreationViewModel) {

    MetadataService.getMetadata("com.huoyun.sbo", "Leads")
      .then(function(boMeta) {
        $scope.vm = new BoCreationViewModel(boMeta);
      });

    $scope.buttons = [];
    $scope.buttons.push(new HuoYunWidgets.ButtonOption({
      name: "save",
      label: "保存",
      appendClass: "btn-primary",
      onClick: function() {
        console.log($scope.vm.getData())
      }
    }));

    $scope.buttons.push(new HuoYunWidgets.ButtonOption({
      name: "cancel",
      label: "取消",
      appendClass: "btn-default",
      onClick: function() {

      }
    }));


  }
]);