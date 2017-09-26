'use strict';

huoyun.provider("NewBoState", ["$stateProvider", "BoBaseState", "BoListState", "BoDetailState",
  function($stateProvider, BoBaseState, BoListState, BoDetailState) {

    const BoStateMap = {};

    this.configure = function(options) {
      if (!options.boName || !options.boNamespace) {
        throw new Error(`Arguments invalid. BoNamespace: ${options.boNamespace}, BoName: ${options.boName}`);
      }

      BoStateMap[`${options.boNamespace}.${options.boName}`] = new BoState(options);
    };

    function BoState(options) {
      const keys = ["boNamespace", "boName", "stateName"];

      var that = this;
      keys.forEach(function(key) {
        that[key] = options[key];
      });

      this.getOptions = function() {
        return options;
      };

      this.base = new BoBaseState(this);

      if (!options.list || options.list.visibility !== false) {
        this.list = new BoListState(this, options.list);
      }

      if (!options.detail || options.detail.visibility !== false) {
        this.detail = new BoDetailState(this, options.detail || {});
      }

      ["base", "list", "detail"].forEach(function(key) {
        var stateOption = that[key];
        stateOption && $stateProvider.state(stateOption.getStateName(), stateOption);
      });
    }

    BoState.prototype.getBoNamespace = function() {
      return this.boNamespace;
    };

    BoState.prototype.getBoName = function() {
      return this.boName;
    };

    BoState.prototype.getStateName = function() {
      return this.stateName || this.boName.toLocaleLowerCase();
    };

    BoState.prototype.getDetailStateName = function() {
      return this.detail && this.detail.getStateName();
    };

    BoState.prototype.getEditStateName = function() {
      return this.edit && this.edit.getStateName();
    };

    BoState.prototype.setBoListOption = function(options) {
      this.list = new BoListState(this, options);
      return this;
    };

    BoState.prototype.setBoDetailOption = function(options) {
      return this;
    };

    BoState.prototype.setBoCreationOption = function(options) {
      return this;
    };

    BoState.prototype.setBoEditionOption = function(options) {
      return this;
    };

    this.$get = function() {
      return this;
    };

  }
]);