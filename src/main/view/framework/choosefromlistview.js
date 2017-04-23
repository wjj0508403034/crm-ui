'use strict';
huoyun.controller('BoChooseFromListController', ["$scope", "$state", "MetadataService", "BoService", "BoDataHelper", "Dialog",
  function($scope, $state, MetadataService, BoService, BoDataHelper, Dialog) {
    var boName = null;
    var boNamespace = null;
    var selectedBoMap = {};
    $scope.multiSelected = false;
    if ($scope.ngDialogData && $scope.ngDialogData.params) {
      boName = $scope.ngDialogData.params.boName;
      boNamespace = $scope.ngDialogData.params.boNamespace;

      $scope.multiSelected = $scope.ngDialogData.params.multiSelected || false;
      if ($scope.ngDialogData.params.selectedBos && Array.isArray($scope.ngDialogData.params.selectedBos)) {
        $scope.ngDialogData.params.selectedBos.forEach(function(bo) {
          selectedBoMap[bo.id] = bo;
        });
      }
    }

    if (!boName || !boNamespace) {
      Dialog.showError("参数错误！");
    }


    MetadataService.getMetadata(boNamespace, boName)
      .then(function(boMeta) {
        $scope.boMetadata = boMeta;
      });

    BoService.query(boNamespace, boName)
      .then(function(pageData) {
        $scope.pageData = pageData;
        setBoSelectedStatus($scope.pageData);
      });

    $scope.onResetButtonClicked = function() {
      $scope.pageData.content.forEach(function(bo) {
        bo.selected = false;
      });
      selectedBoMap = {};
    };

    $scope.onRowClicked = function(lineData, index) {
      if (!$scope.multiSelected) {
        $scope.closeThisDialog(['selected', lineData]);
      } else {
        lineData.selected = !lineData.selected;
        if (lineData.selected) {
          selectedBoMap[lineData.id] = lineData;
        } else {
          delete selectedBoMap[lineData.id];
        }
      }
    };

    $scope.onPagingChanged = function(pageIndex) {
      BoService.query(boNamespace, boName, pageIndex)
        .then(function(pageData) {
          $scope.pageData = pageData;
          setBoSelectedStatus($scope.pageData);
        });
    };

    $scope.onBoSelectChanged = function(bo, selected) {
      if (selected) {
        selectedBoMap[bo.id] = bo;
      } else {
        delete selectedBoMap[bo.id];
      }
    };

    $scope.ngDialogData.onConfirmButtonClicked = function() {
      if ($scope.multiSelected) {
        var res = [];
        Object.keys(selectedBoMap).forEach(function(key) {
          res.push(selectedBoMap[key]);
        });

        $scope.closeThisDialog(['OK', res]);
      }
    };

    function setBoSelectedStatus(pageData) {
      $scope.pageData.content.forEach(function(bo) {
        if (selectedBoMap[bo.id]) {
          bo.selected = true;
        }
      });
    }

  }
]);