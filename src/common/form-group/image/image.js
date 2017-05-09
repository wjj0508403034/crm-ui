'use strict';

huoyunWidget.directive('widgetFormGroupImage', ["$filter", "$timeout", "Tip",
  function($filter, $timeout, Tip) {
    return {
      restrict: 'A',
      scope: {
        prop: "=",
        boMetadata: "=",
        value: "=ngModel"
      },
      replace: true,
      templateUrl: 'form-group/image/image.html',
      link: function($scope, ele, attrs) {

        $scope.$watch("value", function(newValue, oldValue, scope) {
          if (newValue) {
            $scope.imageUrl = getImageUrl();
          } else {
            $scope.imageUrl = null;
          }
        });

        $scope.onFileUploadSuccessed = function(file, event) {
          Tip.show("上传成功！");
          $scope.imageUrl = null;
          $timeout(function() {
            $scope.imageUrl = getImageUrl();
          });
        };

        function getImageUrl() {
          return $filter('UploadURL')($scope.value, $scope.boMetadata, $scope.prop);
        }
      }
    }
  }
]);