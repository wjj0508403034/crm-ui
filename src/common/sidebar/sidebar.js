'use strict';

huoyunWidget.directive('widgetSidebar', ["SideBar",
  function(SideBarProvider) {
    return {
      restrict: 'A',
      replace: true,
      scope: {},
      templateUrl: 'sidebar/sidebar.html',
      link: function($scope, ele, attrs) {
        $scope.items = SideBarProvider.getGroups();


        $scope.isGroupVisibility = function(menu) {
          if (menu.stateLink) {
            return true;
          }

          if (menu.items && menu.items.length > 0) {
            for (var index = 0; index < menu.items.length; index++) {
              if ($scope.isMenuVisibility(menu.items[index])) {
                return true;
              }
            }
            return false;
          }
          return false;
        };

        $scope.isMenuVisibility = function(menuItem) {
          if (!menuItem.hasOwnProperty("visibility")) {
            return true;
          }

          if (menuItem.visibility === undefined || menuItem.visibility === null) {
            return true;
          }

          if (typeof menuItem.visibility === "boolean") {
            return menuItem.visibility;
          }

          if (typeof menuItem.visibility === "function") {
            return menuItem.visibility.apply(menuItem, []);
          }

          return false;
        };
      }
    }
  }
]);