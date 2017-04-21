'use strict';

var huoyunWidget = angular.module('huoyun.widget', ['ngDialog']);

huoyunWidget.filter("ValidValueLabel", function () {

  return function (input, propMeta) {
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

huoyunWidget.filter("BoLabel", function () {

  return function (input, propMeta) {
    if (input && propMeta && propMeta.additionInfo && propMeta.additionInfo.labelField) {
      return input[propMeta.additionInfo.labelField];
    }
    return input;
  };
});

huoyunWidget.filter("joda", function () {
  return function (input) {
    if (typeof input === "number") {
      return new Date(input);
    }

    return input;
  };
});