'use strict';

huoyunWidget.provider("BoStateCache", function() {
  const StateCache = {};

  this.configure = function(state, options) {
    StateCache[state] = options;
  };

  this.getAllStates = function() {
    return StateCache;
  };

  this.$get = function() {
    return this;
  };
});