'use strict';


huoyun.constant("BoListState", function() {

  function BoListState(boState, options) {
    this.url = options.url || "/list";
    this.templateUrl = options.templateUrl || "common/bo.list.view.html";
    this.controller = options.controller || "NewBoListViewController";

    this.getOptions = function() {
      return options;
    };

    this.getParent = function() {
      return boState;
    };
  }

  BoListState.prototype.getStateName = function() {
    return `${this.getParent().getStateName()}.list`;
  };

  BoListState.prototype.getBoNamespace = function() {
    return this.getParent().getBoNamespace();
  };

  BoListState.prototype.getBoName = function() {
    return this.getParent().getBoName();
  };

  BoListState.prototype.getSearchText = function() {
    return this.getOptions().searchText;
  };

  BoListState.prototype.getSelection = function() {
    return this.getOptions().selection;
  };

  BoListState.prototype.getButtons = function() {
    return this.getOptions().buttons;
  };

  return BoListState;
}());