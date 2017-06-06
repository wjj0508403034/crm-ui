'use strict';

huoyun.factory("BoViewHelper", [function() {

  return {
    mergeButtonsFromState: function(defaultMap, $state, $scope) {
      if ($state.current.data && $state.current.data.buttons) {
        Object.keys($state.current.data.buttons).forEach(function(buttonKey, index) {
          if (defaultMap[buttonKey]) {
            angular.extend(defaultMap[buttonKey], $state.current.data.buttons[buttonKey]);
          } else {
            defaultMap[buttonKey] = $state.current.data.buttons[buttonKey];
          }
        });
      }


      var buttons = [];
      Object.keys(defaultMap).forEach(function(key, index) {
        defaultMap[key].name = key;
        defaultMap[key].$scope = $scope;
        buttons.push(defaultMap[key]);
      });

      return buttons;
    }
  };
}]);