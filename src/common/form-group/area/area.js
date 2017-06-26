'use strict';

huoyunWidget.filter("AreaUnit", function() {

  return function(input) {
    if (input !== null && input !== undefined) {
      return `${input} ㎡`;
    }
  };
});