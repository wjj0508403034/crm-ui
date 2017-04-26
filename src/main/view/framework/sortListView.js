'use strict';

huoyunWidget.controller('SortListViewController', ['$scope', "BoService",
  function($scope, BoService) {
    var boMetadata = $scope.ngDialogData.params.boMetadata;
    $scope.pageData = $scope.ngDialogData.params.pageData.slice(0);
    $scope.onMoveRow = function(direction, index) {
      if (direction === 'up') {
        if (index === 0) {
          return;
        }
        var temp = $scope.pageData[index - 1];
        $scope.pageData[index - 1] = $scope.pageData[index];
        $scope.pageData[index] = temp;
      } else {
        var length = $scope.pageData.length;
        if (index === length - 1) {
          return;
        }
        var temp = $scope.pageData[index + 1];
        $scope.pageData[index + 1] = $scope.pageData[index];
        $scope.pageData[index] = temp;
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