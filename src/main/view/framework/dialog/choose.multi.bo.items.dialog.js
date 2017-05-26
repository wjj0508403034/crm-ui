'use strict';
huoyun.controller('ChooseMultiBoItemsDialogController', ["$scope", "$q", "BoTemplate", "MetadataService", "BoService",
  "SearchHelper",
  function($scope, $q, BoTemplateProvider, MetadataService, BoService, SearchHelper) {
    var boName = $scope.ngDialogData.params.boName;
    var boNamespace = $scope.ngDialogData.params.boNamespace;
    var selectedMap = {};
    $scope.templateUrl = BoTemplateProvider.getMultiSelectItemTemplateUrl(boNamespace, boName);
    $scope.pageIndex = 0;
    $scope.searchText = null;
    $scope.selectedAll = false;

    if ($scope.ngDialogData.params.selectedBos && Array.isArray($scope.ngDialogData.params.selectedBos)) {
      $scope.ngDialogData.params.selectedBos.forEach(function(bo) {
        selectedMap[bo.id] = bo;
      });
    }

    $scope.showLoading = true;
    $q.all([MetadataService.getMetadata(boNamespace, boName), BoService.query(boNamespace, boName, $scope.pageIndex)])
      .then(function(res) {
        $scope.showLoading = false;
        $scope.boMetadata = res[0];
        $scope.prop = $scope.boMetadata.propMap[$scope.boMetadata.businessKey];
        setBoItemsSelectState(res[1]);
        $scope.pageData = res[1];
      });

    $scope.ngDialogData.onConfirmButtonClicked = function() {
      var res = [];
      Object.keys(selectedMap).forEach(function(key) {
        res.push(selectedMap[key]);
      });

      $scope.closeThisDialog(['OK', res]);
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

    $scope.onCheckboxValueChanged = function(checked, boItem) {
      if (checked) {
        selectedMap[boItem.id] = boItem;
      } else {
        delete selectedMap[boItem.id];
        $scope.selectedAll = false;
      }
    };

    $scope.onSelectedAllValueChanged = function(checked) {
      $scope.pageData.content.forEach(function(item) {
        item.$$selected = checked;
        if (checked) {
          selectedMap[item.id] = item;
        } else {
          delete selectedMap[item.id];
        }
      });

      //$scope.$apply();
    };

    function loadingMoreData(append) {
      $scope.showLoading = true;
      BoService.query(boNamespace, boName, $scope.pageIndex, getSearchExpr())
        .then(function(pageData) {
          $scope.showLoading = false;
          if (append) {
            pageData.content = $scope.pageData.content.concat(pageData.content);
          }

          setBoItemsSelectState(pageData);

          $scope.pageData = pageData;
        });
    }

    function getSearchExpr() {
      return SearchHelper.getStringSearchExpr($scope.prop, $scope.searchText);
    }

    function setBoItemsSelectState(pageData) {
      pageData.content.forEach(function(item) {
        if ($scope.selectedAll) {
          item.$$selected = true;
          selectedMap[item.id] = item;
        } else {
          item.$$selected = !!selectedMap[item.id];
        }
      });
    }
  }
]);