'use strict';

var huoyunWidget = angular.module('huoyun.widget', ['ngDialog', 'ngFileUpload']);

huoyunWidget.value("DateFormat", "yyyy-MM-dd");
huoyunWidget.value("DateTimeFormat", "yyyy-MM-dd HH:mm");

huoyunWidget.constant("HuoyunWidgetConstant", {
  Colors: {
    Red: "rgb(255, 99, 132)",
    Orange: "rgb(255, 159, 64)",
    Yellow: "rgb(255, 205, 86)",
    Green: "rgb(75, 192, 192)",
    Blue: "rgb(54, 162, 235)",
    Purple: "rgb(153, 102, 255)",
    Grey: "rgb(201, 203, 207)"
  },
  Months: {
    FullYear: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
    FirstHalfYear: ["一月", "二月", "三月", "四月", "五月", "六月"],
    NextHalfYear: ["七月", "八月", "九月", "十月", "十一月", "十二月"]
  },
  SelectionMode: {
    None: "None",
    Single: "Single",
    Multiple: "Multiple"
  },
  Events: {
    BoEvent: {
      BoDataChanged: "HuoYun.BoEvent.BoDataChanged",
      PropertyUpdate: "HuoYun.BoEvent.PropertyUpdate",
      SaveSuccess: "HuoYun.BoEvent.SaveSuccess"
    }
  }
});

huoyunWidget.filter("EmptyDataPlaceHolder", function() {
  return function(input) {
    if (typeof input === "string") {
      if (!input.trim()) {
        return "-暂无-"
      }
    }

    if (input === undefined || input === null) {
      return "-暂无-"
    }
    return input;
  };
});

huoyunWidget.filter("EmptyColumnPlaceHolder", function() {
  return function(input) {
    if (typeof input === "string") {
      if (!input.trim()) {
        return "--"
      }
    }

    if (input === undefined || input === null) {
      return "--"
    }
    return input;
  };
});

huoyunWidget.filter("ValidValueLabel", function() {

  return function(input, propMeta) {
    if (propMeta && propMeta.validvalues && propMeta.validvalues.length > 0) {
      for (var index = 0; index < propMeta.validvalues.length; index++) {
        var validValue = propMeta.validvalues[index];
        if (validValue.name === input) {
          return validValue.label;
        }
      }
    }
    return input;
  };
});

huoyunWidget.filter("BooleanText", function() {

  return function(input) {
    if (typeof input === "boolean") {
      return input ? "是" : "否";
    }
    return input;
  };
});

huoyunWidget.filter("BoLabel", function() {

  return function(input, propMeta) {
    if (input && propMeta && propMeta.additionInfo && propMeta.additionInfo.labelField) {
      return input[propMeta.additionInfo.labelField];
    }
    return input;
  };
});

huoyunWidget.filter("joda", function() {
  return function(input) {
    if (typeof input === "number") {
      return new Date(input);
    }

    return input;
  };
});

huoyunWidget.filter("UploadURL", function() {
  return function(input, boMetadata, propMeta) {
    if (typeof input === "number") {
      return `/upload/${boMetadata.boNamespace}/${boMetadata.boName}/${input}/${propMeta.name}`;
    }

    return input;
  };
});

huoyunWidget.filter("BoImageUrl", ["BoTemplate",
  function(BoTemplateProvider) {

    return function(bo, boNamespace, boName, propName) {
      if (bo && typeof bo.id === "number" && bo[propName]) {
        return `/upload/${boNamespace}/${boName}/${bo.id}/${propName}`;
      }
      return BoTemplateProvider.getBoPropertyDefaultImageUrl(boNamespace, boName, propName);
    };
  }
]);

huoyunWidget.filter("UserIcon", function() {
  return function(input) {
    if (typeof input === "number") {
      return `/upload/com.huoyun.sbo/Employee/${input}/avatar`;
    }

    return input;
  };
});

huoyunWidget.filter("ImageList", function() {
  return function(input, boMetadata, propMeta) {
    if (typeof input === "number" && propMeta.additionInfo) {
      var nodeMeta = boMetadata.nodeTypes[`${propMeta.additionInfo.boNamespace}@${propMeta.additionInfo.boName}`];
      if (nodeMeta) {
        var keys = Object.keys(nodeMeta.propMap);
        for (var index = 0; index < keys.length; index++) {
          var prop = nodeMeta.propMap[keys[index]];
          if (prop.type === "Image") {
            return `/upload/${nodeMeta.boNamespace}/${nodeMeta.boName}/${input}/${prop.name}`;
          }
        }
      }
    }

    return input;
  };
});

huoyunWidget.filter("TableDataFooter", function() {
  return function(input) {
    if (input) {
      return `第${input.number + 1}页／共${input.totalPages}页 共${input.totalElements}条数据`;
    }
    return input;
  };
});

huoyunWidget.filter("ConditionLabel", ["GeneralCondition",
  function(GeneralCondition) {

    return function(input) {
      if (input) {
        if (input.rule === "between") {
          return `[ ${input.from} , ${input.to} ]`
        }
        var rules = GeneralCondition.getRules();
        for (var index = 0; index < rules.length; index++) {
          if (rules[index].name === input.rule) {
            return `${rules[index].label} ${input.value}`;
          }
        }

      }
    };
  }
]);