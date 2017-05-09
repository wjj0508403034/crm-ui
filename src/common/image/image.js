'use strict';

huoyunWidget.directive('widgetImage', function() {
  return {
    restrict: 'A',
    scope: {
      src: "@",
      onRemoved: '&'
    },
    replace: true,
    templateUrl: 'image/image.html',
    link: function($scope, ele, attrs) {
      /**图片删除 */
      $scope.onRemoveButtonClicked = function(event) {
        //阻止冒泡
        event.stopPropagation();
        $scope.onRemoved();
      }
    }
  }
});