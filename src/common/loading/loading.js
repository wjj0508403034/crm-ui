'use strict';

huoyunWidget.directive('widgetLoading', function () {
  return {
    restrict: 'A',
    scope: {},
    replace: true,
    templateUrl: 'loading/loading.html',
    link: function ($scope, ele, attrs) {

    }
  }
});