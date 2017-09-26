'use strict';

huoyun.factory("BoEditionViewModel", ["BoFormViewModel", "HuoYunWidgets",
  function(BoFormViewModel, HuoYunWidgets) {

    function ViewModel(boMeta, controller) {
      this.getController = function() {
        return controller;
      };

      this.buttons = [];
      this.forms = [];
      this.data = {};

      var that = this;
      boMeta.sections.forEach(function(section) {
        var form = new HuoYunWidgets.FormOption(new BoFormViewModel(section))
          .setData(that.data);
        that.forms.push(form);
      });

      var buttons = controller.getButtons();
      if (Array.isArray(buttons)) {
        buttons.forEach(function(button) {
          that.buttons.push(new HuoYunWidgets.ButtonOption(button));
        });
      }
    }

    ViewModel.prototype.getData = function() {
      return this.data;
    };

    ViewModel.prototype.setData = function(data) {
      this.data = data;

      this.forms.forEach(function(form) {
        form.setData(data);
      });

      return this;
    };

    return ViewModel;
  }
]);