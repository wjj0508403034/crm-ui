'use strict';


huoyun.constant("BoEditState", function() {

  function BoEditState(boState, options) {

    this.url = options.url || "/:boId/edit";
    this.templateUrl = options.templateUrl || "common/bo.edition.view.html";
    this.controller = options.controller || "NewBoEditionViewController";

    this.getOptions = function() {
      return options;
    };

    this.getParent = function() {
      return boState;
    };
  }

  BoEditState.prototype.getBoNamespace = function() {
    return this.getParent().getBoNamespace();
  };

  BoEditState.prototype.getBoName = function() {
    return this.getParent().getBoName();
  };

  BoEditState.prototype.getStateName = function() {
    return `${this.getParent().getStateName()}.edit`;
  };

  BoEditState.prototype.getButtons = function() {
    return this.getOptions().buttons;
  };

  return BoEditState;
}());