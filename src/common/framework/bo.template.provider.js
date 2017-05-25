'use strict';

huoyunWidget.provider("BoTemplate", function() {
  const templates = {};

  /*
   * options structure
   *   - select
   *     - single
   *        - templateUrl
   *     - multi
   */
  this.configure = function(boNamespace, boName, options) {
    var key = `${boNamespace}_${boName}`;
    if (!templates[key]) {
      templates[key] = options;
    }
  };

  this.getSingleSelectItemTemplateUrl = function(boNamespace, boName) {
    var template = templates[`${boNamespace}_${boName}`];
    if (template && template.select && template.select.single && template.select.single.templateUrl) {
      return template.select.single.templateUrl;
    }

    return null;
  };

  this.$get = function() {
    return this;
  };
});