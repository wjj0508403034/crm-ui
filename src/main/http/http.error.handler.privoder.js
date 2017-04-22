'use strict';

huoyun.provider("HttpErrorHandler", function() {
  var handleFunc = null;
  var $dialog = null;

  this.setHandler = function(handle) {
    handleFunc = handle;
  };

  this.getHandler = function() {
    return handleFunc;
  };

  this.setDialog = function(dialog) {
    $dialog = dialog;
  };

  this.getDialog = function() {
    return $dialog;
  }

  this.$get = function() {
    return this;
  };
});