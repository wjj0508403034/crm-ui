'use strict';


huoyun.constant("BoDetailState", function() {

  function BoDetailState(boState, options) {

    this.url = options.url || "/:boId/detail";
    this.templateUrl = options.templateUrl || "common/bo.detail.view.html";
    this.controller = options.controller || "NewBoDetailViewController";

    this.getOptions = function() {
      return options;
    };

    this.getParent = function() {
      return boState;
    };
  }

  BoDetailState.prototype.getBoNamespace = function() {
    return this.getParent().getBoNamespace();
  };

  BoDetailState.prototype.getBoName = function() {
    return this.getParent().getBoName();
  };

  BoDetailState.prototype.getStateName = function() {
    return `${this.getParent().getStateName()}.detail`;
  };

  BoDetailState.prototype.getButtons = function() {
    return this.getOptions().buttons;
  };

  return BoDetailState;
}());