'use strict';


huoyun.factory("BoFormViewModel", ["BoMeta", "HuoYunWidgets",
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

    return FormSection;
  }
]);