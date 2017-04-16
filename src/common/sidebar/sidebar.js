'use strict';

huoyunWidget.directive('widgetSidebar', ['$http',function ($http) {
  return {
    restrict: 'A',
    scope: {},
    templateUrl: 'sidebar/sidebar.html',
    link: function (scope, ele, attrs) {
      // $http.get('')
    }
  }
}]);