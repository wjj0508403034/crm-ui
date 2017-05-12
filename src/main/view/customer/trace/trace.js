'use strict';

huoyun.controller('CustomerTraceRecordController', ["$scope", "CustomerTraceRecord", "$stateParams", "Tip",
  function($scope, CustomerTraceRecord, $stateParams, Tip) {
    var boId = $stateParams.boId;
    $scope.comment = null;

    refresh();

    $scope.postComment = function() {
      CustomerTraceRecord.postComment(boId, $scope.comment)
        .then(function() {
          Tip.show("添加跟踪记录成功！");
          $scope.comment = null;
          refresh();
        });
    }

    function refresh() {
      CustomerTraceRecord.getComments(boId)
        .then(function(data) {
          $scope.records = data;

          $scope.records.forEach(function(record) {
            if (record.owner.id === $scope.user.id) {
              record.$$self = true;
            }
          });
        });
    }
  }
]);