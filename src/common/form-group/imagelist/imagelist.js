'use strict';

huoyunWidget.directive('widgetFormGroupImageList', ["$filter", "$timeout", "Upload",
  function($filter, $timeout, Upload) {
    return {
      restrict: 'A',
      scope: {
        prop: "=",
        boMetadata: "=",
        images: "=ngModel",
        boId: "=",
        onFileUploadSuccessed: "&"
      },
      replace: true,
      templateUrl: 'form-group/imagelist/imagelist.html',
      link: function($scope, ele, attrs) {
        $scope.upload = function(file) {
          var uploadUrl = `upload/${$scope.boMetadata.boNamespace}/${$scope.boMetadata.boName}/${$scope.boId}/${$scope.prop.name}/imagelist`;
          if (file) {
            Upload.upload({
              url: uploadUrl,
              data: {
                file: file
              }
            }).then(function(successResponse) {
              console.log(successResponse);
              $scope.onFileUploadSuccessed({
                file: file,
                event: successResponse
              });
            }, function(failedResponse) {
              console.log(failedResponse);
              // $scope.onFileUploadFailed({
              //   file: file,
              //   event: failedResponse
              // });
            }, function(event) {
              console.log(event);
              // $scope.onFileUploadProgressChanged({
              //   file: file,
              //   event: event
              // });
            });
          }
        };
      }
    }
  }
]);