'use strict';

huoyunWidget.factory("SearchHelper", [function() {

  return {
    getValidValueSearchExpr: function(prop, data) {
      if (data && Array.isArray(data) && data.length > 0) {
        var names = [];
        data.forEach(function(validvalue, index) {
          names.push(`'${validvalue.name}'`);
        });

        return `${prop.name} in (${names.join(",")})`;
      }
    },
    getStringSearchExpr: function(prop, data) {
      if (data && typeof data === "string") {
        return `${prop.name} like '${data}'`;
      }
    }

  };

}]);