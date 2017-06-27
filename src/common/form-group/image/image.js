'use strict';

huoyunWidget.directive('widgetFormGroupImage', ["$filter", "$timeout", "Tip", "HuoyunWidgetConstant",
  function($filter, $timeout, Tip, HuoyunWidgetConstant) {
    return {
      restrict: 'A',
      scope: {
        prop: "=",
        boMetadata: "=",
        boData: "=",
        value: "=ngModel"
      },
      replace: true,
      templateUrl: 'form-group/image/image.html',
      link: function($scope, ele, attrs) {

        $scope.$watch("value", function(newValue, oldValue, scope) {
          $scope.imageUrl = getImageUrl();
        });

        $scope.onFileUploadSuccessed = function(file, event) {
          Tip.show("上传成功！");
          $scope.$emit(HuoyunWidgetConstant.Events.BoReloadData);
          $scope.imageUrl = null;
          $timeout(function() {
            $scope.imageUrl = getImageUrl();
          });
        };

        function getImageUrl() {
          return $filter('BoImageUrl')($scope.boData, $scope.boMetadata.boNamespace, $scope.boMetadata.boName,
            $scope.prop.name);
        }
      }
    }
  }
]);