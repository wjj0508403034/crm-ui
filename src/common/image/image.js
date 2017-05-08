'use strict';

huoyunWidget.directive('widgetImage', function() {
  return {
    restrict: 'A',
    scope: {
      src: "@",
      onRemoveImage: '&'
    },
    replace: true,
    templateUrl: 'image/image.html',
    link: function($scope, ele, attrs) {
      /**图片删除 */
      $scope.removeImage = function(event) {
        //阻止冒泡
        event.stopPropagation();
        $scope.onRemoveImage();
      }
    }
  }
});