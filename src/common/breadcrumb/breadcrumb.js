'use strict';

huoyunWidget.directive('widgetBreadCrumb', function () {
  return {
    restrict: 'A',
    scope: {
      navs: "=",
      title: "@",
      subTitle: "@"
    },
    templateUrl: 'breadcrumb/breadcrumb.html',
    link: function ($scope, ele, attrs) {

    }
  }
});