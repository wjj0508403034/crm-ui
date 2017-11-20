'use strict';

var huoyun = angular.module('huoyun', ["huoyun.widget", 'ui.router']);


huoyun.controller("appController", ["$scope", "HuoYunWidgets", function($scope, HuoYunWidgets) {
  $scope.controller = {
    sidebar: new HuoYunWidgets.Controls.SideBar({
      items: [{
        text: "任务",
        items: [{
          text: "我的任务"
        }, {
          text: "任务管理",
          selected: true
        }, {
          text: "任务审核"
        }]
      }, {
        text: "视频",
        items: [{
          text: "上传视频"
        }, {
          text: "视频管理"
        }]
      }, {
        text: "用户",
        items: [{
          text: "个人信息"
        }, {
          text: "重设密码"
        }, {
          text: "用户管理"
        }]
      }]
    })
  };

}]);