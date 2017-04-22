'use strict';

huoyunWidget.directive('widgetBoSearch', ["Dialog", function (Dialog) {
  return {
    restrict: 'A',
    scope: {
      ngModel: "=",
      prop: "="
    },
    templateUrl: 'bosearch/bosearch.html',
    link: function ($scope, ele, attrs) {
        $scope.onButtonClicked = function () {
            var options = {
            title: `选择${$scope.prop.label}`,
            templateUrl: $scope.prop.chooseFromTemplateUrl || "framework/choosefromcheckbox.html",
            appendClassName: "bo-choose-from-list-dialog",
            params: {
                boList: $scope.prop.validvalues
            },
            closeCallback: function (data) {
                console.log(data);
                // $scope.value = data;
            },
            };
            var dialog = Dialog.showConfirm(options);
        };
      
    }
  }
}]);