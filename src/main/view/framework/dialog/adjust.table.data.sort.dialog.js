'use strict';
huoyunWidget.controller('AdjustTableDataSortDialogController', ['$scope', "BoService",
  function($scope, BoService) {
    var boMetadata = $scope.ngDialogData.params.boMetadata;
    $scope.pageData = $scope.ngDialogData.params.pageData.slice(0);
    /**
     * 单击tr，标记当前行号，设置选中样式
     */
    $scope.clickRow = function(index) {
      $scope.sIndex = index;
      //上移按钮状态
      if (index === 0) {
        $scope.isMoveUpDisabled = true;
      } else {
        $scope.isMoveUpDisabled = false;
      }
      //下移按钮状态
      if (index === $scope.pageData.length - 1) {
        $scope.isMoveDownDisabled = true;
      } else {
        $scope.isMoveDownDisabled = false;
      }
    };
    /**
     * 上移，下移操作
     */
    $scope.onMoveButtonClicked = function(direction) {
      if (direction === 'up') {
        if ($scope.sIndex === 0) {
          return;
        }
        var temp = $scope.pageData[$scope.sIndex - 1];
        $scope.pageData[$scope.sIndex - 1] = $scope.pageData[$scope.sIndex];
        $scope.pageData[$scope.sIndex] = temp;
        //设置当前移动项被选中，方便继续移动
        $scope.clickRow($scope.sIndex - 1);
      } else {
        var length = $scope.pageData.length;
        if ($scope.sIndex === length - 1) {
          return;
        }
        var temp = $scope.pageData[$scope.sIndex + 1];
        $scope.pageData[$scope.sIndex + 1] = $scope.pageData[$scope.sIndex];
        $scope.pageData[$scope.sIndex] = temp;
        //设置当前移动项被选中，方便继续移动
        $scope.clickRow($scope.sIndex + 1);
      }
    };

    $scope.ngDialogData.onConfirmButtonClicked = function() {
      $scope.pageData.forEach(function(bo, index) {
        bo[boMetadata.listview.sortProperty] = index;
      });

      BoService.batchUpdate(boMetadata.boNamespace, boMetadata.boName, $scope.pageData)
        .then(function() {
          $scope.closeThisDialog(['OK', $scope.pageData]);
        });
    };
  }
]);