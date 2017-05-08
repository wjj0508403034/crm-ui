'use strict';

huoyunWidget.factory('Tip', ['$templateCache', '$compile', '$rootScope', '$timeout',
  function($templateCache, $compile, $rootScope, $timeout) {

    return {
      show: function(message) {
        var id = "tip-" + new Date().getTime();
        var $scope = $rootScope.$new();
        var template = $templateCache.get('tip/tip.html');
        $scope.message = message;
        var $tip = $compile(template)($scope);
        $tip.attr("id", id);
        $('body').append($tip);
        $tip.show();
        var timer = setTimeout(function() {
          $tip.fadeOut(300, function() {
            $tip.remove();
          });
          clearTimeout(timer);
        }, 1000);
      }
    }
  }
]);