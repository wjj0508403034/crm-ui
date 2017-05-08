'use strict';
huoyun.controller('previewImageController', ['$scope', function($scope) {
  $scope.imageUrls = $scope.ngDialogData.params.imageUrls;
  $scope.CIndex = $scope.ngDialogData.params.CIndex - 0;
  /**图片切换 */
  $scope.changeImage = function(direc) {
    direc === 'pre' && $scope.CIndex > 0 && ($scope.CIndex--);
    direc === 'next' && ($scope.CIndex < $scope.imageUrls.length - 1) && ($scope.CIndex++);
  }
}]);