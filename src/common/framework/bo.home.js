'use strict';

huoyunWidget.directive('widgetBoHome', function() {
  return {
    restrict: 'A',
    scope: {
      boMetadata: "=",
      boData: "=",
      refresh: "&"
    },
    templateUrl: 'framework/bo.home.html',
    link: function($scope, ele, attrs) {
      $scope.onFileUploadSuccessed = function(file, event) {
        $scope.refresh();
      };
      $scope.onFileRemoveSuccessed == function(image, boMeta, prop) {
        //删除服务
        console.log(arguments);
        //刷新
        // $scope.refresh();
      };
    }
  }
});