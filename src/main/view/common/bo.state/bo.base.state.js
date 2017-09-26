'use strict';


huoyun.constant("BoBaseState", function() {

  function BoBaseState(boState) {
    this.abstract = true;
    this.url = boState.getOptions().url || `/${boState.getBoName()}`;
    this.templateUrl = boState.getOptions().templateUrl || `framework/general.html`;
    this.data = {
      boName: boState.getBoName(),
      boNamespace: boState.getBoNamespace()
    };

    this.getBoState = function() {
      return boState;
    };
  }

  BoBaseState.prototype.getStateName = function() {
    return this.getBoState().getStateName();
  };

  return BoBaseState;
}());