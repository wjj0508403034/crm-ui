'use strict';

huoyunWidget.controller('BoChooseFromDatePicker', ['$scope',
  function($scope) {

    $scope.options = [{
      name: "today",
      label: "今天"
    }, {
      name: "yesterday",
      label: "昨天"
    }, {
      name: "last_7_days",
      label: "过去7天内"
    }, {
      name: "last_30_days",
      label: "过去30天内"
    }, {
      name: "this_month",
      label: "这个月内"
    }, {
      name: "last_month",
      label: "上个月"
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
      for (var index = 0; index < $scope.options.length; index++) {
        if ($scope.options[index].selected) {
          $scope.closeThisDialog(['OK', $scope.options[index]]);
          return;
        }
      }
    };
  }
]);