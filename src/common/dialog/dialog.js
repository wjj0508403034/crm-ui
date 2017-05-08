'use strict';

/*
 * https://github.com/likeastore/ngDialog
 */

huoyunWidget.config(["ngDialogProvider", function(ngDialogProvider) {
  ngDialogProvider.setDefaults({
    className: 'ngdialog-theme-default huoyun-dialog-container',
    showClose: false,
    closeByDocument: false,
    closeByEscape: false
  });
}]);

huoyunWidget.controller("ConfirmDialogController", ["$scope",
  function($scope) {
    $scope.onCancelButtonClicked = function() {
      if ($scope.ngDialogData && typeof $scope.ngDialogData.onCancelButtonClicked === "function") {
        $scope.ngDialogData.onCancelButtonClicked.apply(this);
      } else {
        $scope.closeThisDialog(['Cancel']);
      }
    };

    $scope.onConfirmButtonClicked = function() {
      if ($scope.ngDialogData && typeof $scope.ngDialogData.onConfirmButtonClicked === "function") {
        $scope.ngDialogData.onConfirmButtonClicked.apply(this);
      } else {
        $scope.closeThisDialog(['OK']);
      }
    };

  }
]);

huoyunWidget.factory("Dialog", ['$q', 'ngDialog', function($q, ngDialog) {

  return {
    showError: function(message) {
      this.showConfirm({
        title: "错误",
        content: message,
        cancel: {
          hidden: true
        },
        confirm: {
          text: "知道了"
        }
      });
    },
    showConfirm: function(options) {
      var dialogOptions = {
        template: "dialog/confirm.dialog.html",
        controller: "ConfirmDialogController",
        appendClassName: options.appendClassName || "",
        closeByDocument: !!options.closeByDocument,
        data: {
          title: options.title || "无标题",
          content: options.content,
          templateUrl: options.templateUrl,
          confirmButtonText: (options.confirm && options.confirm.text) || "确定",
          cancelButtonText: (options.cancel && options.cancel.text) || "取消",
          confirmButtonHidden: (options.confirm && options.confirm.hidden) || false,
          cancelButtonHidden: (options.cancel && options.cancel.hidden) || false,
          params: options.params
        }
      };

      ngDialog.open(dialogOptions)
        .closePromise.then(function(data) {
          if (data.value) {
            if (Array.isArray(data.value) && data.value.length > 0) {
              var key = data.value[0];
              if (key === 'OK' && options.confirm && typeof options.confirm.callback === "function") {
                return options.confirm.callback.apply(this, data.value);
              }

              if (key === "Cancel" && options.cancel && typeof options.cancel.callback === "function") {
                return options.cancel.callback.apply(this, data.value);
              }

              if (typeof options.closeCallback === "function") {
                return options.closeCallback.apply(this, data.value);
              }
            }

            if (typeof options.closeCallback === "function") {
              return options.closeCallback.apply(this, [data.value]);
            }
          }

          if (typeof options.closeCallback === "function") {
            return options.closeCallback.apply(this);
          }
        });
    }
  };
}]);