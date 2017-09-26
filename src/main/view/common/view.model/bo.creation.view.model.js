'use strict';

huoyun.factory("BoCreationViewModel", ["BoFormViewModel",
  function(BoFormViewModel) {

    function BoCreationViewModel(boMeta) {
      this.forms = [];
      this.data = {};

      var that = this;
      boMeta.sections.forEach(function(section) {
        var form = new HuoYunWidgets.FormOption(new BoFormViewModel(section))
          .setData(that.data);
        that.forms.push(form);
      });
    }

    BoCreationViewModel.prototype.getData = function() {
      return this.data;
    };

    return BoCreationViewModel;
  }
]);