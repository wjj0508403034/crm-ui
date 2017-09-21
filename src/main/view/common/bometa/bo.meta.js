'use strict';


huoyun.factory("BoMeta", ["BoLabelOption",
  function(BoLabelOption) {

    return {
      Properties: {
        BoLabel: BoLabelOption
      }
    };
  }
]);