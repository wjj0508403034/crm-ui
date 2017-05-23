'use strict';

huoyunWidget.directive('widgetFormGroupBoLabel', ["Dialog", function(Dialog) {
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
          templateUrl: $scope.prop.chooseFromTemplateUrl || "framework/choosefromlistview.html",
          appendClassName: "bo-choose-from-list-dialog",
          params: {
            boName: $scope.prop.additionInfo.boName,
            boNamespace: $scope.prop.additionInfo.boNamespace
          },
          confirm: {
            hidden: true,
          },
          closeCallback: function(key, data) {
            if (key === "selected") {
              $scope.value = data;
            }

          }
        };
        var dialog = Dialog.showConfirm(options);
      };
    }
  }
}]);