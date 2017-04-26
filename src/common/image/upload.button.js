'use strict';

huoyunWidget.directive('widgetUploadButton', ["Upload",
  function(Upload) {
    return {
      restrict: 'A',
      scope: {
        text: "@",
        uploadUrl: "@",
        onFileUploadSuccessed: "&",
        onFileUploadFailed: "&",
        onFileUploadProgressChanged: "&"
      },
      replace: true,
      templateUrl: 'image/upload.button.html',
      link: function($scope, ele, attrs) {
        $scope.upload = function(file) {
          if (file) {
            Upload.upload({
              url: $scope.uploadUrl,
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
              $scope.onFileUploadFailed({
                file: file,
                event: failedResponse
              });
            }, function(event) {
              console.log(event);
              $scope.onFileUploadProgressChanged({
                file: file,
                event: event
              });
            });
          }
        };
      }
    }
  }
]);