'use strict';

huoyun.constant("ServiceContext", "");
huoyun.constant("DebugMode", true);

huoyun.config(["$httpProvider", "$logProvider", "HttpErrorHandlerProvider", "ServiceContext",
  function($httpProvider, $logProvider, HttpErrorHandlerProvider, ServiceContext) {

    $httpProvider.interceptors.push("HttpInterceptor");

    HttpErrorHandlerProvider.setHandler(function(res) {
      if (res && res.status) {
        var Dialog = HttpErrorHandlerProvider.getDialog();
        if (!Dialog) {
          return;
        }
        if ([401, 405].indexOf(res.status) !== -1) {
          Dialog.showConfirm({
            title: "提示",
            content: "当前会话已经过期，请重新登陆？",
            confirm: {
              callback: function() {
                window.location.href = `${ServiceContext}/saml2/sp/logout`;
              }
            }
          });
        } else {
          if (res.data && res.data.code) {
            Dialog.showError(res.data.message);
          } else {
            Dialog.showError("系统错误，请联系管理员。");
          }
        }
      }
    });
  }
]);