'use strict';

huoyun.provider("NewBoState", ["$stateProvider", "BoBaseState", "BoListState", "BoDetailState", "BoEditState",
  "BoCreateState",
  function($stateProvider, BoBaseState, BoListState, BoDetailState, BoEditState, BoCreateState) {

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

      if (!options.edit || options.edit.visibility !== false) {
        this.edit = new BoEditState(this, options.edit || {});
      }

      if (!options.create || options.create.visibility !== false) {
        this.edit = new BoCreateState(this, options.create || {});
      }

      ["base", "list", "detail", "edit", "create"].forEach(function(key) {
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

    this.$get = function() {
      return this;
    };

  }
]);