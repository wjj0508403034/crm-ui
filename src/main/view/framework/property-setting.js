'use strict';
huoyun.controller('BoPropertySettingController', ["$scope", "$timeout",

  function($scope, $timeout) {
    /**
     * 全选
     */
    $scope.selectAll = {
      label: '全选',
      selected: $scope.ngDialogData.params.allProperties.length === $scope.ngDialogData.params.selectProperties.length,
      onCheckboxValueChanged: function(checked) {
        $timeout(function() {
          allProperties.forEach(function(item) {
            item.selected = checked;
          });
        });
      }
    };

    /**
     * 更新全选按钮状态
     */
    $scope.updateSelectAllChecked = function() {
      $timeout(function() {
        $scope.selectAll.selected = allProperties.every(function(item) {
          return item.selected;
        });
      });
    };

    /**
     * 对数组深复制，为了在弹出框非确认状态下关闭，再打开，数据恢复初始化
     */
    var allProperties = $.extend(true, [], $scope.ngDialogData.params.allProperties); //复制所有属性数组
    var selectProperties = $.extend(true, [], $scope.ngDialogData.params.selectProperties); //复制选中项数组

    /**
     * 标记选中的属性列
     */
    (function signSelectedProperty() {
      for (var i = 0; i < allProperties.length; i++) {
        for (var j = 0; j < selectProperties.length; j++) {
          if (allProperties[i]['name'] === selectProperties[j]['name']) {
            allProperties[i].selected = true;
            break;
          }
        }
      }
    })();

    /**
     * 属性关键词搜索
     */
    $scope.searchKey = '';
    $scope.onFilterProperties = function() {
      if ($.trim($scope.searchKey) === '') {
        $scope.filterProperties = allProperties;
      };
      $scope.filterProperties = allProperties.filter(function(property) {
        return (property.label.indexOf($scope.searchKey) > -1);
      });
    };
    $scope.onFilterProperties();
    /**
     * 更新属性列表，全选状态
     */
    $scope.onCheckboxValueChanged = function(checked, index) {
      $scope.filterProperties[index]['selected'] = checked;
      $scope.updateSelectAllChecked();
    };

    /**
     * 弹出框确定按钮，回传选择的列属性数组
     */
    $scope.ngDialogData.onConfirmButtonClicked = function() {
      //取出选中属性
      selectProperties = allProperties.filter(function(item) {
        return item.selected;
      });
      $scope.closeThisDialog(['OK', selectProperties]);
    };
  }
]);