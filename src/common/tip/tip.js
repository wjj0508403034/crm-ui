'use strict';

huoyunWidget.factory('widgetTip', ['$templateCache', '$compile', '$rootScope', '$timeout', function($templateCache, $compile, $rootScope, $timeout) {
  var $scope = $rootScope.$new();

  function showTip(message) {
    var tplStr = $templateCache.get('tip/tip.html');
    $scope.message = message;
    $scope.showTip = true;
    $scope.tipAnimate = false;
    if (!$('body #tip-dialog').get(0)) {
      $('body').append($compile(tplStr)($scope));
    } else {
      $compile(tplStr)($scope);
    }
    window.clearTimeout();
    $('body #tip-dialog').show();
    setTimeout(function() {
      $('body #tip-dialog').hide(2000);
    }, 2000);
  }
  return {
    showTip: showTip
  }
}]);