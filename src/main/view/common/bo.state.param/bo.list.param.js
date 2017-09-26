'use strict';

huoyun.constant("BoStateParam", function() {

  function BoStateParam(options) {
    var that = this;
    Object.keys(options).forEach(function(key) {
      that[key] = options[key];
    });
  }

  BoStateParam.prototype.setController = function(controller) {
    this.controller = controller;
  };

  BoStateParam.prototype.getController = function() {
    return this.controller;
  };

  return BoStateParam;
}());