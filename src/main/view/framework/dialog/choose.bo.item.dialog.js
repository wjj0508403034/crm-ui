'use strict';
huoyun.controller('ChooseBoItemDialogController', ["$scope", "$q", "MetadataService", "BoService", "SearchHelper",
  function($scope, $q, MetadataService, BoService, SearchHelper) {
    var boName = $scope.ngDialogData.params.boName;
    var boNamespace = $scope.ngDialogData.params.boNamespace;
    $scope.pageIndex = 0;
    $scope.searchText = null;

    $scope.showLoading = true;
    $q.all([MetadataService.getMetadata(boNamespace, boName), BoService.query(boNamespace, boName, $scope.pageIndex)])
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
      $scope.pageIndex = 0;
      loadingMoreData();
    };

    $scope.onRemoveSearchTextButtonClicked = function() {
      $scope.searchText = null;
      $scope.onSearchBoxChanged();
    };

    $scope.onLoadMoreRowClicked = function() {
      $scope.pageIndex += 1;
      loadingMoreData(true);
    };

    function loadingMoreData(append) {
      $scope.showLoading = true;
      BoService.query(boNamespace, boName, $scope.pageIndex, getSearchExpr())
        .then(function(pageData) {
          $scope.showLoading = false;
          if (append) {
            pageData.content = $scope.pageData.content.concat(pageData.content);
          }
          $scope.pageData = pageData;
        });
    }

    function getSearchExpr() {
      return SearchHelper.getStringSearchExpr($scope.prop, $scope.searchText);
    }
  }
]);