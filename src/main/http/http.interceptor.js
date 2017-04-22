'use strict';

huoyun.factory("HttpInterceptor", ["$q", "$log", "HttpErrorHandler",
  function($q, $log, HttpErrorHandler) {
    return {
      "requestError": function(rejection) {
        $log.warn("http request has error ...");
        $log.warn(rejection);
        var handleFunc = HttpErrorHandler.getHandler();
        if (angular.isFunction(handleFunc)) {
          handleFunc(rejection);
        } else {
          return $q.reject(rejection);
        }
      },

      "responseError": function(rejection) {
        $log.warn("http response has error ...");
        $log.warn(rejection);
        var handleFunc = HttpErrorHandler.getHandler();
        if (angular.isFunction(handleFunc)) {
          handleFunc(rejection);
          return $q.reject(rejection);
        } else {
          return $q.reject(rejection);
        }
      }
    };
  }
]);