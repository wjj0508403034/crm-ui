'use strict';
huoyun.controller('ChooseBoItemDialogController', ["$scope", "$q", "MetadataService", "BoService", "SearchHelper",
  function($scope, $q, MetadataService, BoService, SearchHelper) {
    var boName = $scope.ngDialogData.params.boName;
    var boNamespace = $scope.ngDialogData.params.boNamespace;
    $scope.searchText = null;

    $scope.showLoading = true;
    $q.all([MetadataService.getMetadata(boNamespace, boName), BoService.query(boNamespace, boName)])
      .then(function(res) {
        $scope.showLoading = false;
        $scope.boMetadata = res[0];
        $scope.prop = $scope.boMetadata.propMap[$scope.boMetadata.businessKey];
        $scope.pageData = res[1];
      });

    $scope.onRowClicked = function(boItem) {
      $scope.closeThisDialog(['selected', boItem]);
    };

    $scope.onSearchBoxChanged = function() {
      $scope.showLoading = true;
      BoService.query(boNamespace, boName, null, getSearchExpr())
        .then(function(pageData) {
          $scope.showLoading = false;
          $scope.pageData = pageData;
        });
    };

    $scope.onRemoveSearchTextButtonClicked = function() {
      $scope.searchText = null;
      $scope.onSearchBoxChanged();
    };

    function getSearchExpr() {
      return SearchHelper.getStringSearchExpr($scope.prop, $scope.searchText);
    }
  }
]);