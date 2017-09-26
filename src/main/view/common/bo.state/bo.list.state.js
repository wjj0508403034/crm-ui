'use strict';


huoyun.constant("BoListState", function() {

  function BoListStateOption(boState, options) {
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

  BoListStateOption.prototype.getStateName = function() {
    return `${this.getParent().getStateName()}.list`;
  };

  BoListStateOption.prototype.getBoNamespace = function() {
    return this.getParent().getBoNamespace();
  };

  BoListStateOption.prototype.getBoName = function() {
    return this.getParent().getBoName();
  };

  BoListStateOption.prototype.getSearchText = function() {
    return this.getOptions().searchText;
  };

  BoListStateOption.prototype.getSelection = function() {
    return this.getOptions().selection;
  };

  BoListStateOption.prototype.getButtons = function() {
    return this.getOptions().buttons;
  };

  return BoListStateOption;
}());