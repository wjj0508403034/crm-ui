'use strict';

huoyun.factory("MetadataHelper", [function () {

  return {
    convertTo: function (boMeta) {
      var result = {};
      result.boName = boMeta.boName;
      result.boNamespace = boMeta.boNamespace;
      result.label = boMeta.label;
      result.propMap = {};

      boMeta.properties.forEach(function (prop, index) {
        result.propMap[prop.name] = prop;
      });

      result.sections = [];
      boMeta.sections.forEach(function (section, index) {
        var item = {
          label: section.label,
          properties: []
        };
        section.properties.forEach(function (propName, index) {
          if (result.propMap[propName]) {
            item.properties.push(result.propMap[propName]);
          } else {
            console.warn(`Can't find property ${propName}. BoNamespace: ${result.boNamespace}, BoName: ${result.boName}`);
          }
        });

        result.sections.push(item);
      });

      result.listview = {
        properties: []
      };

      boMeta.listview.properties.forEach(function (propName, index) {
        if (result.propMap[propName]) {
          result.listview.properties.push(result.propMap[propName]);
        } else {
          console.warn(`Can't find property ${propName}. BoNamespace: ${result.boNamespace}, BoName: ${result.boName}`);
        }
      });

      return result;
    }
  };
}]);