'use strict';

huoyun.factory("UploadService", ["$http", "BaseService", "ServiceContext",
  function($http, BaseService, ServiceContext) {

    return {
      deleteImageForImageList: function(boNamespace, boName, boId, propertyName) {
        var url = `${ServiceContext}/upload/${boNamespace}/${boName}/${boId}/${propertyName}/imagelist`;
        return BaseService.getResponse($http.delete(url));
      }
    };
  }
]);