'use strict';

huoyunWidget.controller('BoChooseFromDatePicker', ['$scope',
  function($scope) {

    $scope.options = [{
      name: "today",
      label: "今天"
    }, {
      name: "yestoday",
      label: "昨天"
    }, {
      name: "month",
      label: "这个月"
    }, {
      name: "year",
      label: "今年"
    }, {
      name: "custom",
      label: "自定义时间段",
      startDate: null,
      endDate: null
    }];

    $scope.onRadioChanged = function(option) {
      $scope.options.forEach(function(optionItem) {
        if (optionItem.name !== option.name) {
          optionItem.selected = false;
        }
      });
    };

    $scope.ngDialogData.onConfirmButtonClicked = function() {
      $scope.options.forEach(function(option, index) {
        if (option.selected) {
          $scope.closeThisDialog(['OK', option]);
        }
      });
    };
  }
]);