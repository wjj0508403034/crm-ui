'use strict';

huoyunWidget.directive('widgetSidebar', ['$http', function($http) {
  return {
    restrict: 'A',
    replace: true,
    scope: {
      items: "="
    },
    templateUrl: 'sidebar/sidebar.html',
    link: function(scope, ele, attrs) {
      // $http.get('')
    }
  }
}]);