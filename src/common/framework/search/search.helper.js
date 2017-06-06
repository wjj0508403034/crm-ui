'use strict';

huoyunWidget.constant("SearchEvent", {
  Changed: "HuoYun.SearchEvent.Changed",
  Reset: "HuoYun.SearchEvent.Reset"
});

huoyunWidget.factory("GeneralCondition", [function() {

  return {
    getRules: function() {
      return [{
        name: "eq",
        label: "等于",
        op: "="
      }, {
        name: "ne",
        label: "不等于",
        op: "<>"
      }, {
        name: "gt",
        label: "大于",
        op: ">"
      }, {
        name: "ge",
        label: "大于等于",
        op: ">="
      }, {
        name: "lt",
        label: "小于",
        op: "<"
      }, {
        name: "le",
        label: "小于等于",
        op: "<="
      }, {
        name: "between",
        label: "在范围内"
      }];
    }
  };
}]);

huoyunWidget.factory("SearchHelper", ["GeneralCondition",
  function(GeneralCondition) {

    return {
      getGeneralSearchExpr: function(prop, value) {
        if (prop.type === "String") {
          return this.getStringSearchExpr(prop, value);
        }
      },
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
      },
      getBoLabelSearchExpr: function(prop, data) {
        if (data && Array.isArray(data) && data.length > 0) {
          var names = [];
          data.forEach(function(bo, index) {
            names.push(`${bo[prop.additionInfo.idField]}`);
          });

          return `${prop.name} in (${names.join(",")})`;
        }
      },
      getNumberSearchExpr: function(prop, data) {
        if (data) {
          if (data.rule === "between") {
            return `${prop.name} between (${data.from} , ${data.to})`;
          }

          var rules = GeneralCondition.getRules();
          for (var index = 0; index < rules.length; index++) {
            if (rules[index].name === data.rule) {
              return `${prop.name} ${data.rule} ${data.value}`;
            }
          }
        }
      },
      getDataSearchExpr: function(prop, data) {

        if (data.name === "today") {
          return `${prop.name} eq today()`;
        }

        if (data.name === "yesterday") {
          return `${prop.name} eq yesterday()`;
        }

        if (data.name === "yesterday") {
          return `${prop.name} eq yesterday()`;
        }

        if (data.name === "last_7_days") {
          return `${prop.name} ge last_7_days()`;
        }

        if (data.name === "last_30_days") {
          return `${prop.name} ge last_30_days()`;
        }

        if (data.name === "this_month") {
          return `${prop.name} between this_month()`;
        }

        if (data.name === "last_month") {
          return `${prop.name} between last_month()`;
        }

        if (data.name === "custom") {
          return `${prop.name} between (${data.startDate},${data.endDate})`;
        }
      }

    };

  }
]);