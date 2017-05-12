'use strict';


huoyunWidget.filter("CustomerStatusListLabel", function() {
  return function(input) {
    if (Array.isArray(input)) {
      var statusListNames = [];
      input.forEach(function(status, statusIndex) {
        if (status.customerStatus) {
          statusListNames.push(status.customerStatus.name);
        }
      });

      return statusListNames.join(",");
    }
    return input;
  };
});