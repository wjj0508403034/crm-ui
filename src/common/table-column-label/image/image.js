'use strict';

huoyunWidget.directive('widgetTableColumnLabelImage', ["BoTemplate", "$filter",
  function(BoTemplateProvider, $filter) {
    return {
      restrict: 'A',
      scope: {
        prop: "=",
        lineData: "=",
        boMetadata: "="
      },
      replace: true,
      templateUrl: 'table-column-label/image/image.html',
      link: function($scope, ele, attrs) {}
    }
  }
]);