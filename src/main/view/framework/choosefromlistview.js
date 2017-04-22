'use strict';
huoyun.controller('BoChooseFromListController', ["$scope", "$state", "MetadataService", "BoService", "BoDataHelper",
  function ($scope, $state, MetadataService, BoService, BoDataHelper) {
    var boName = null;
    var boNamespace = null;
    if ($scope.ngDialogData && $scope.ngDialogData.params) {
      boName = $scope.ngDialogData.params.boName;
      boNamespace = $scope.ngDialogData.params.boNamespace;
    }

    if (!boName || !boNamespace) {

    }


    MetadataService.getMetadata(boNamespace, boName)
      .then(function (boMeta) {
        $scope.boMetadata = boMeta;
      });

    BoService.query(boNamespace, boName)
      .then(function (pageData) {
        $scope.pageData = pageData;
      });

    $scope.onRowClicked = function (lineData, index) {
      $scope.closeThisDialog(['selected',lineData]);
    };

    $scope.onPagingChanged = function (pageIndex) {
      BoService.query(boNamespace, boName, pageIndex)
        .then(function (pageData) {
          $scope.pageData = pageData;
        });
    };



  }
]);