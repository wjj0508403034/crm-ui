'use strict';

huoyunWidget.provider("BoTemplate", function() {
  const templates = {};
  const defaultPropertiesImageUrls = {};

  /*
   * options structure
   *   - list
   *      - templateUrl
   *      - propTemplates
   *        - propName
   *          - templateUrl
   *   - detail
   *      - templateUrl
   *      - propTemplates
   *        - propName
   *           - templateUrl
   *   - create
   *      - templateUrl
   *      - propTemplates
   *        - propName
   *           - templateUrl
   *   - edit
   *      - templateUrl
   *      - propTemplates
   *        - propName
   *           - templateUrl
   *   - select
   *     - single
   *        - templateUrl
   *     - multi
   *        - templateUrl
   */
  this.configure = function(boNamespace, boName, options) {
    var key = `${boNamespace}_${boName}`;
    if (!templates[key]) {
      templates[key] = options;
    }
  };

  this.registerBoPropertyDefaultImageUrl = function(boNamespace, boName, propertyName, url) {
    var key = `${boNamespace}_${boName}_${propertyName}`;
    if (!defaultPropertiesImageUrls[key]) {
      defaultPropertiesImageUrls[key] = url;
    }
  };

  this.getBoPropertyDefaultImageUrl = function(boNamespace, boName, propertyName) {
    return defaultPropertiesImageUrls[`${boNamespace}_${boName}_${propertyName}`];
  };

  this.getSingleSelectItemTemplateUrl = function(boNamespace, boName) {
    var template = templates[`${boNamespace}_${boName}`];
    if (template && template.select && template.select.single && template.select.single.templateUrl) {
      return template.select.single.templateUrl;
    }

    return null;
  };

  this.getMultiSelectItemTemplateUrl = function(boNamespace, boName) {
    var template = templates[`${boNamespace}_${boName}`];
    if (template && template.select && template.select.multi && template.select.multi.templateUrl) {
      return template.select.multi.templateUrl;
    }

    return null;
  };

  this.getDetailPagePropTemplateUrl = function(boNamespace, boName, propName) {
    var template = templates[`${boNamespace}_${boName}`];
    if (template && template.detail && template.detail.propTemplates && template.detail.propTemplates[propName]) {
      return template.detail.propTemplates[propName].templateUrl;
    }

    return null;
  };

  this.getEditPagePropTemplateUrl = function(boNamespace, boName, propName) {
    var template = templates[`${boNamespace}_${boName}`];
    if (template && template.edit && template.edit.propTemplates && template.edit.propTemplates[propName]) {
      return template.edit.propTemplates[propName].templateUrl;
    }

    return null;
  };

  this.getDetailTemplateUrl = function(boNamespace, boName) {
    var template = templates[`${boNamespace}_${boName}`];
    if (template && template.detail) {
      return template.detail.templateUrl;
    }

    return null;
  };

  this.getListPagePropTemplateUrl = function(boNamespace, boName, propName) {
    var template = templates[`${boNamespace}_${boName}`];
    if (template && template.list && template.list.propTemplates && template.list.propTemplates[propName]) {
      return template.list.propTemplates[propName].templateUrl;
    }

    return null;
  };

  this.$get = function() {
    return this;
  };
});