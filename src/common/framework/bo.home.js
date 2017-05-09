'use strict';

huoyunWidget.directive('widgetBoHome', function() {
  return {
    restrict: 'A',
    scope: {
      boMetadata: "=",
      boData: "=",
      refresh: "&",
      onImageRemoved: "&"
    },
    templateUrl: 'framework/bo.home.html',
    link: function($scope, ele, attrs) {
      $scope.onFileUploadSuccessed = function(file, event) {
        $scope.refresh();
      };

      $scope.onImageRemovedHandler = function(image, boMeta, prop) {
        $scope.onImageRemoved({
          image: image,
          boMeta: boMeta,
          prop: prop
        });
      };
    }
  }
});