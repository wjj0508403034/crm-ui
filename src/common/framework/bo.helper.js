'use strict';

huoyunWidget.factory("BoHelper", ["$q", "BoDialogFactory", "HuoyunWidgetConstant",
  function($q, BoDialogFactory, HuoyunWidgetConstant) {

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
      },

      getBoData: function($scope) {
        var dtd = $q.defer();
        if ($scope.boData) {
          dtd.resolve($scope.boData);
        } else {
          $scope.$on(HuoyunWidgetConstant.Events.BoEvent.BoDataChanged, function(event, boData) {
            boData && dtd.resolve(boData);
          });
        }

        return dtd.promise;
      },

      setPropertyValue: function($scope, propName, propValue) {
        $scope.$emit(HuoyunWidgetConstant.Events.BoEvent.PropertyUpdate, propName, propValue);
      }
    };
  }
]);