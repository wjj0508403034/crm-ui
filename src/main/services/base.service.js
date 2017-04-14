'use strict';

huoyun.factory("BaseService", function () {

  return {
    baseUrl: "http://localhost:8080/"
  };
});

huoyun.factory("HomepageService", ["$q", "$http", "BaseService", function ($q, $http, BaseService) {

  return {
    getMenus: function () {
      return new Promise(function (reslove, reject) {
        console.log(BaseService.baseUrl);
        reslove([{
          text: "ceshi",
          id: 1
        }]);
      });
    }
  };
}]);