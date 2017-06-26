'use strict';

huoyun.controller('CustomerPropertyNameListController', ["$scope",
  function($scope) {

    $scope.isToday = function(boData) {
      if (boData && boData.createTime) {
        var createTime = new Date(boData.createTime);
        return createTime.toDateString() === (new Date()).toDateString();
      }

      return false;
    };
  }
]);