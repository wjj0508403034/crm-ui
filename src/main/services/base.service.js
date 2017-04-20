'use strict';

huoyun.factory("BaseService", ["$q", function ($q) {

  return {
    getResponse: function (request) {
      var dtd = $q.defer();
      request.then(function (res) {
        dtd.resolve(res.data);
      }).catch(function (ex) {
        console.error(ex);
        dtd.reject(ex);
      });
      return dtd.promise;
    }
  };
}]);

huoyun.factory("HomepageService", ["$q", "$http", "BaseService", function ($q, $http, BaseService) {

  return {
    getMenus: function () {
      return new Promise(function (reslove, reject) {
        reslove([{
          text: "ceshi",
          id: 1
        }]);
      });
    }
  };
}]);

huoyun.factory("BoService", ["$http", "ServiceContext", "BaseService", function ($http, ServiceContext, BaseService) {

  return {
    createBo: function (boNamespace, boName, boData) {
      var url = `${ServiceContext}/bo(${boNamespace},${boName})/create`;
      return BaseService.getResponse($http.post(url, boData));
    },

    query: function (boNamespace, boName) {
      var url = `${ServiceContext}/bo(${boNamespace},${boName})`;
      return BaseService.getResponse($http.get(url));
    }
  };
}]);

huoyun.factory("MetadataService", ["$http", "ServiceContext", "BaseService", "MetadataHelper",
  function ($http, ServiceContext, BaseService, MetadataHelper) {

    var boMetaCache = {};

    return {
      getMetadata: function (boNamespace, boName) {
        var metaKey = `${boNamespace}_${boName}`;
        if (boMetaCache[metaKey]) {
          return Promise.resolve(boMetaCache[metaKey]);
        }

        var url = `${ServiceContext}/ui-metadata/${boNamespace}/${boName}`;
        return BaseService.getResponse($http.get(url))
          .then(function (metadata) {
            var boMetadata = MetadataHelper.convertTo(metadata);
            boMetaCache[metaKey] = boMetadata;
            return Promise.resolve(boMetadata);
          });
      }
    };
  }
]);