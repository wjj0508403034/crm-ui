'use strict';

huoyun.filter("LeadsStatusStyle", function() {

  return function(input) {
    if (input) {
      return {
        color: input
      }
    }
  };
});