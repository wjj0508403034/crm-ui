'use strict';
huoyun.controller('BoCreationViewController', ["$scope", "$state", "MetadataService", "MetadataHelper", "BoService", "BoDataHelper",
  function ($scope, $state, MetadataService, MetadataHelper, BoService, BoDataHelper) {
    var boName = $state.current.data.boName;
    var boNamespace = $state.current.data.boNamespace;

    MetadataService.getMetadata(boNamespace, boName)
      .then(function (boMeta) {
        $scope.boMetadata = MetadataHelper.convertTo(boMeta);
      });


    $scope.onSave = function (data, boMetadata) {
      return new Promise(function (reslove, reject) {
        reslove("Save Successfully");
      });
    };

    $scope.onValid = function (data, boMetadata) {
      return BoDataHelper.validator(data, boMetadata);
    };
  }]);