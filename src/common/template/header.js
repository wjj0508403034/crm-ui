'use strict';

huoyunWidget.directive('header', function () {
  return {
    restrict: 'A',
    scope: {},
    templateUrl: 'template/header.html',
    link: function (scope, ele, attrs) {
      alert()
    }
  }
});