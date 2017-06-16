'use strict';

huoyunWidget.factory("BoHelper", ["BoDialogFactory",
  function(BoDialogFactory) {

    return {
      openChooseFromList: function(options) {
        return BoDialogFactory.openChooseFromList(options);
      },

      /**
       * Get Current Select Item Of List View
       */
      getCurrentSelectItem: function(listData) {
        if (listData && Array.isArray(listData)) {
          for (var index = 0; index < listData.length; index++) {
            if (listData[index].$$selected) {
              return listData[index];
            }
          }
        }
      }
    };
  }
]);