'use strict';


huoyun.constant("BoCreateState", function() {

  function BoCreateState(boState, options) {

    this.url = options.url || "/create";
    this.templateUrl = options.templateUrl || "common/bo.creation.view.html";
    this.controller = options.controller || "NewBoCreationViewController";

    this.getOptions = function() {
      return options;
    };

    this.getParent = function() {
      return boState;
    };
  }

  BoCreateState.prototype.getBoNamespace = function() {
    return this.getParent().getBoNamespace();
  };

  BoCreateState.prototype.getBoName = function() {
    return this.getParent().getBoName();
  };

  BoCreateState.prototype.getStateName = function() {
    return `${this.getParent().getStateName()}.create`;
  };

  BoCreateState.prototype.getButtons = function() {
    return this.getOptions().buttons;
  };

  return BoCreateState;
}());