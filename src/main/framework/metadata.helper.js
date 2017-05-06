'use strict';

huoyun.factory("MetadataHelper", [function() {

  return {
    convertTo: function(boMeta) {
      var result = {};
      result.boName = boMeta.boName;
      result.boNamespace = boMeta.boNamespace;
      result.label = boMeta.label;
      result.businessKey = boMeta.businessKey;
      result.primaryKey = boMeta.primaryKey;
      result.propMap = {};

      boMeta.properties.forEach(function(prop, index) {
        if (prop.validvalues && prop.validvalues.length > 0) {
          prop.type = "ValidValues";
        }
        result.propMap[prop.name] = prop;
      });

      result.sections = [];
      boMeta.sections.forEach(function(section, sectionIndex) {
        var item = {
          label: section.label,
          properties: []
        };
        section.properties.forEach(function(propName, propIndex) {
          if (result.propMap[propName]) {
            item.properties.push(result.propMap[propName]);
          } else {
            console.warn(`Can't find property ${propName}. BoNamespace: ${result.boNamespace}, BoName: ${result.boName}`);
          }
        });

        result.sections.push(item);
      });

      result.listview = {
        orderBy: boMeta.listview.orderby || "id",
        enableSort: boMeta.listview.enableSort,
        sortProperty: boMeta.listview.sortProperty,
        properties: []
      };

      boMeta.listview.properties.forEach(function(propName, index) {
        if (result.propMap[propName]) {
          result.listview.properties.push(result.propMap[propName]);
        } else {
          console.warn(`Can't find property ${propName}. BoNamespace: ${result.boNamespace}, BoName: ${result.boName}`);
        }
      });

      result.nodeTypes = {};

      boMeta.nodeTypes.forEach(function(nodeType, nodeTypeIndex) {
        result.nodeTypes[`${nodeType.boNamespace}@${nodeType.boName}`] = this.convertTo(nodeType);
      }.bind(this));

      return result;
    }
  };
}]);