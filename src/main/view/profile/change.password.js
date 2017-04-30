'use strict';

huoyunWidget.controller('ChangePasswordController', ['$scope', "EmployeeService",
  function($scope, EmployeeService) {
    $scope.oldPassword = {
      hasError: false,
      value: null,
      errorMessage: null
    };

    $scope.newPassword = {
      hasError: false,
      value: null,
      errorMessage: null
    };

    $scope.repeatNewPassword = {
      hasError: false,
      value: null,
      errorMessage: null
    };

    $scope.ngDialogData.onConfirmButtonClicked = function() {
      if (isFieldEmpty($scope.oldPassword, "当前密码不能为空")) {
        return;
      }

      if (isFieldEmpty($scope.newPassword, "新密码不能为空")) {
        return;
      }

      if (isFieldEmpty($scope.repeatNewPassword, "重复新密码不能为空")) {
        return;
      }

      $scope.repeatNewPassword.hasError = false;
      if ($scope.newPassword.value !== $scope.repeatNewPassword.value) {
        $scope.repeatNewPassword.hasError = true;
        $scope.repeatNewPassword.errorMessage = "两次密码不一样，请重新输入！";
        return;
      }

      EmployeeService.changePassword($scope.oldPassword.value, $scope.newPassword.value, $scope.repeatNewPassword.value)
        .then(function() {
          $scope.closeThisDialog(['OK']);
        });

    };

    function isFieldEmpty(field, errorMessage) {
      field.hasError = false;
      if (!field.value) {
        field.hasError = true;
        field.errorMessage = errorMessage;
        return true;
      }

      return false;
    }


  }
]);