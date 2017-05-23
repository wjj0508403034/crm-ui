'use strict';

huoyun.controller('AdjustTableColumnsDialogController', ['$scope', "MetadataService", "Tip",
  function($scope, MetadataService, Tip) {
    $scope.leftSelected = null;
    $scope.rightSelected = null;

    $scope.selectedProps = [];
    var selectedPropMap = {};
    $scope.ngDialogData.params.boMetadata.listview.properties.forEach(function(prop) {
      $scope.selectedProps.push(angular.copy(prop));
      selectedPropMap[prop.name] = prop;
    });

    $scope.unSelectedProps = [];
    Object.keys($scope.ngDialogData.params.boMetadata.propMap).forEach(function(propName) {
      if (!selectedPropMap[propName]) {
        $scope.unSelectedProps.push($scope.ngDialogData.params.boMetadata.propMap[propName]);
      }
    });

    $scope.onRightRowClicked = function(prop, props, index) {
      $scope.rightSelected = prop;
      onRowClicked(prop, props);
    };

    $scope.onLeftRowClicked = function(prop, props, index) {
      $scope.leftSelected = prop;
      onRowClicked(prop, props);
    };

    $scope.onMoveDownButtonClicked = function() {
      if ($scope.rightSelected) {
        var index = indexOf($scope.rightSelected, $scope.selectedProps);
        if (index < $scope.selectedProps.length - 1) {
          $scope.selectedProps.splice(index + 2, 0, $scope.rightSelected);
          $scope.selectedProps.splice(index, 1);
        }
      }
    };

    $scope.onMoveUpButtonClicked = function() {
      if ($scope.rightSelected) {
        var index = indexOf($scope.rightSelected, $scope.selectedProps);
        if (index > 0) {
          $scope.selectedProps.splice(index - 1, 0, $scope.rightSelected);
          $scope.selectedProps.splice(index + 1, 1);
        }
      }
    };

    $scope.onMoveLeftButtonClicked = function() {
      if ($scope.rightSelected) {
        delete $scope.rightSelected.$$selected;
        $scope.unSelectedProps.push($scope.rightSelected);
        removeProp($scope.rightSelected, $scope.selectedProps);
        $scope.rightSelected = null;
      }
    };

    $scope.onMoveRightButtonClicked = function() {
      if ($scope.leftSelected) {
        delete $scope.leftSelected.$$selected;
        $scope.selectedProps.push($scope.leftSelected);
        removeProp($scope.leftSelected, $scope.unSelectedProps);
        $scope.leftSelected = null;
      }
    };

    $scope.isMoveUpDisabled = function() {
      if (!$scope.rightSelected) {
        return true;
      }

      var index = indexOf($scope.rightSelected, $scope.selectedProps);
      if (index <= 0) {
        return true;
      }

      return false;
    };

    $scope.isMoveDownDisabled = function() {
      if (!$scope.rightSelected) {
        return true;
      }

      var index = indexOf($scope.rightSelected, $scope.selectedProps);
      if (index >= $scope.selectedProps.length - 1) {
        return true;
      }

      return false;
    };

    $scope.ngDialogData.onConfirmButtonClicked = function() {
      var boName = $scope.ngDialogData.params.boMetadata.boName;
      var boNamespace = $scope.ngDialogData.params.boMetadata.boNamespace;
      var columns = $scope.selectedProps.map(function(prop) {
        return prop.name;
      }).join(",");

      MetadataService.updateTableColumns(boNamespace, boName, columns)
        .then(function() {
          MetadataService.invalidMetaCache(boNamespace, boName);
          $scope.closeThisDialog(['OK', $scope.selectedProps]);
          Tip.show("保存成功！")
        });
    };

    function removeProp(prop, props) {
      var index = indexOf(prop, props);
      props.splice(index, 1);
    }

    function indexOf(prop, props) {
      for (var index = 0; index < props.length; index++) {
        if (prop.name === props[index].name) {
          return index;
        }
      }

      return -1;
    }

    function onRowClicked(prop, props) {
      if (prop.$$selected !== true) {
        prop.$$selected = true;
        props.forEach(function(propItem) {
          if (propItem.name !== prop.name) {
            propItem.$$selected = false;
          }
        });
      }
    }

  }
]);