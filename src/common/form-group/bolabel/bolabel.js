'use strict';

huoyunWidget.directive('widgetFormGroupBoLabel', ["BoDialogFactory",
  function(BoDialogFactory) {
    return {
      restrict: 'A',
      scope: {
        value: "=ngModel",
        prop: "=",
        errorMessage: "="
      },
      replace: true,
      templateUrl: 'form-group/bolabel/bolabel.html',
      link: function($scope, ele, attrs) {

        $scope.onButtonClicked = function() {
          var options = {
            title: `选择${$scope.prop.label}`,
            boName: $scope.prop.additionInfo.boName,
            boNamespace: $scope.prop.additionInfo.boNamespace
          };

          BoDialogFactory.openChooseFromList(options)
            .then(function(dialogResult) {
              if (dialogResult.key === "selected") {
                $scope.value = dialogResult.data;
              }
            });
        };
      }
    }
  }
]);