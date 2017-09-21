'use strict';

huoyun.factory("BoCreationViewModel", ["BoMeta", "HuoYunWidgets",
  function(BoMeta, HuoYunWidgets) {

    function FormSection(section) {
      this.groups = [];
      this.header = new FormHeader(section)

      var that = this;
      section.properties.forEach(function(prop) {
        if (!prop.readonly) {
          that.groups.push(new FormProperty(prop));
        }
      });
    }

    function FormHeader(section) {
      this.title = section.label;
    }

    function FormProperty(prop) {
      var that = this;
      var keys = ["name", "label", "type", "mandatory"];
      keys.forEach(function(key) {
        that[key] = prop[key];
      });

      this.appendClass = "col-sm-4";
      this.placeholder = `请输入${this.label}`;

      if (this.type === "BoLabel") {
        this.type = "DataList";
        this.placeholder = `请选择${this.label}`;
        this.datalist = new BoMeta.Properties.BoLabel(prop);
      }
    }

    function BoCreationViewModel(boMeta) {
      this.forms = [];
      this.data = {};

      var that = this;
      boMeta.sections.forEach(function(section) {
        var formOption = new HuoYunWidgets.FormOption(new FormSection(section));
        formOption.setData(that.data);
        that.forms.push(formOption);
      });
    }

    BoCreationViewModel.prototype.getData = function() {
      return this.data;
    };

    return BoCreationViewModel;
  }
]);


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