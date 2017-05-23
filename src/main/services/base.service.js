'use strict';

huoyun.factory("BaseService", ["$q", "DebugMode", "$http",
  function($q, DebugMode, $http) {
    return {
      getResponse: function(request) {
        var dtd = $q.defer();
        request.then(function(res) {
          dtd.resolve(res.data);
        }).catch(function(ex) {
          console.error(ex);
          dtd.reject(ex);
        });
        return dtd.promise;
      }
    };
  }
]);

huoyun.factory("BoService", ["$http", "ServiceContext", "BaseService", "MetadataService",
  function($http, ServiceContext, BaseService, MetadataService) {

    return {
      initBo: function(boNamespace, boName) {
        var url = `${ServiceContext}/bo(${boNamespace},${boName})/init`;
        return BaseService.getResponse($http.get(url));
      },

      createBo: function(boNamespace, boName, boData) {
        var url = `${ServiceContext}/bo(${boNamespace},${boName})/create`;
        return BaseService.getResponse($http.post(url, boData));
      },

      getBo: function(boNamespace, boName, boId) {
        var url = `${ServiceContext}/bo(${boNamespace},${boName})/${boId}`;
        return BaseService.getResponse($http.get(url));
      },

      deleteBo: function(boNamespace, boName, boId) {
        var url = `${ServiceContext}/bo(${boNamespace},${boName})/${boId}`;
        return BaseService.getResponse($http.delete(url));
      },

      updateBo: function(boNamespace, boName, boId, boData) {
        var url = `${ServiceContext}/bo(${boNamespace},${boName})/${boId}`;
        return BaseService.getResponse($http.patch(url, boData));
      },

      batchUpdate: function(boNamespace, boName, bolist) {
        var url = `${ServiceContext}/batch(${boNamespace},${boName})`;
        return BaseService.getResponse($http.post(url, bolist));
      },

      count: function(boNamespace, boName, queryExpr) {
        var url = `${ServiceContext}/bo(${boNamespace},${boName})/count`;
        var params = [];
        if (queryExpr) {
          params.push(`query=${queryExpr}`);
        }
        if (params.length > 0) {
          url = `${url}?${params.join("&")}`;
        }
        return BaseService.getResponse($http.get(url));
      },

      query: function(boNamespace, boName, pageIndex, queryExpr, orderBy) {
        var url = `${ServiceContext}/bo(${boNamespace},${boName})`;
        var params = [];
        if (pageIndex !== undefined && pageIndex !== null) {
          params.push(`pageIndex=${pageIndex}`);
        }
        if (queryExpr) {
          params.push(`query=${queryExpr}`);
        }

        if (orderBy) {
          params.push(`orderby=${orderBy}`);
        }

        if (params.length > 0) {
          url = `${url}?${params.join("&")}`;
        }

        return BaseService.getResponse($http.get(url));
      },

      queryAll: function(boNamespace, boName, queryExpr, orderBy) {
        var url = `${ServiceContext}/bo(${boNamespace},${boName})/queryAll`;
        var params = [];
        if (queryExpr) {
          params.push(`query=${queryExpr}`);
        }

        if (orderBy) {
          params.push(`orderby=${orderBy}`);
        }
        if (params.length > 0) {
          url = `${url}?${params.join("&")}`;
        }

        return BaseService.getResponse($http.get(url));
      },

      getMetadata: function(boNamespace, boName) {
        return MetadataService.getMetadata(boNamespace, boName);
      }
    };
  }
]);

huoyun.factory("MetadataService", ["$http", "ServiceContext", "BaseService", "MetadataHelper",
  function($http, ServiceContext, BaseService, MetadataHelper) {

    var boMetaCache = {};

    return {
      getMetadata: function(boNamespace, boName) {
        var metaKey = `${boNamespace}_${boName}`;
        if (boMetaCache[metaKey]) {
          return Promise.resolve(angular.copy(boMetaCache[metaKey]));
        }

        var url = `${ServiceContext}/ui-metadata/${boNamespace}/${boName}`;
        return BaseService.getResponse($http.get(url))
          .then(function(metadata) {
            var boMetadata = MetadataHelper.convertTo(metadata);
            boMetaCache[metaKey] = boMetadata;
            return Promise.resolve(boMetadata);
          });
      },

      updateTableColumns: function(boNamespace, boName, columns) {
        var url = `${ServiceContext}/ui-metadata/updateTableColumns`;
        return BaseService.getResponse($http.post(url, {
          "boNamespace": boNamespace,
          "boName": boName,
          "columns": columns
        }));
      },

      invalidMetaCache: function(boNamespace, boName) {
        var metaKey = `${boNamespace}_${boName}`;
        delete boMetaCache[metaKey];
      }

    };
  }
]);