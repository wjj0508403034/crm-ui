'use strict';

huoyunWidget.config(["ngDialogProvider", function (ngDialogProvider) {
  ngDialogProvider.setDefaults({
    className: 'ngdialog-theme-default huoyun-dialog-container',
    showClose: false,
    closeByDocument: false,
    closeByEscape: false
  });
}]);

huoyunWidget.controller("ConfirmDialogController", ["$scope",
  function ($scope) {

  }]);

huoyunWidget.factory("Dialog", ['$q', 'ngDialog', function ($q, ngDialog) {

  return {
    showConfirm: function (options) {
      var dialogOptions = {
        template: "dialog/confirm.dialog.html",
        controller: "ConfirmDialogController",
        appendClassName: options.appendClassName || "",
        data: {
          title: options.title || "无标题",
          content: options.content,
          templateUrl: options.templateUrl,
          confirmButtonText: (options.confirm && options.confirm.text) || "确定",
          cancelButtonText: (options.cancel && options.cancel.text) || "取消",
          params: options.params
        }
      };

      ngDialog.open(dialogOptions)
        .closePromise.then(function (data) {
          console.log(data);

          if (data.value === 'OK' && options.confirm && typeof options.confirm.callback === "function") {
            options.confirm.callback.apply(this, [data.value])
          } else if (data.value === 'Cancel' && options.cancel && typeof options.cancel.callback === "function") {
            options.cancel.callback.apply(this, [data.value])
          } else if (typeof options.closeCallback === "function") {
            options.closeCallback.apply(this, [data.value]);
          }
        });
    }
  };
}]);