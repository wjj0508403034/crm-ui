'use strict';

huoyunWidget.config(["ngDialogProvider", function (ngDialogProvider) {
  ngDialogProvider.setDefaults({
    className: 'ngdialog-theme-default huoyun-dialog-container',
    showClose: false,
    closeByDocument: false,
    closeByEscape: false
  });
}]);

huoyunWidget.controller("ConfirmDialogController", ["$scope", function ($scope) {

}]);

huoyunWidget.factory("Dialog", ['$q', 'ngDialog', function ($q, ngDialog) {
  function openDialog() {

  }

  //  function openDialog(templateUrl, options) {
  //   var dtd = $q.defer();
  //   ngDialog.open({
  //     template: templateUrl,
  //     controller: "dialogController",
  //     data: options
  //   }).closePromise.then(function(data) {
  //     $log.debug("Closed dialog " + data.id);
  //     if (angular.isFunction(options.confirm)) {
  //       dtd.resolve(options.confirm.call(this));
  //     }else{
  //       dtd.resolve();
  //     }
  //   });
  //   return dtd.promise;
  // };


  return {
    showConfirm: function (options) {
      var dialogOptions = {
        template: "dialog/confirm.dialog.html",
        controller: "ConfirmDialogController",
        data: {
          title: options.title || "无标题",
          content: options.content,
          confirmButtonText: (options.confirm && options.confirm.text) || "确定",
          cancelButtonText: (options.cancel && options.cancel.text) || "取消",
        }
      };

      ngDialog.open(dialogOptions)
        .closePromise.then(function (data) {
          console.log(data);

          if (data.value === 'OK' && options.confirm && typeof options.confirm.callback === "function") {
            options.confirm.callback.apply(this, [data])
          }

          if (data.value === 'Cancel' && options.cancel && typeof options.cancel.callback === "function") {
            options.cancel.callback.apply(this, [data])
          }
        });
    }
  };
}]);