'use strict';

huoyunWidget.directive('widgetPropertySetting', ['$filter', 'Dialog', function($filter, Dialog) {
  return {
    restrict: 'A',
    scope: {
      boMetadata: "=",
      callback: "&"
    },
    link: function($scope, element, attrs) {

      element.on('click', function() {
        $scope.initDialog();
      });
      /**
       * 初始化弹出框
       */
      $scope.initDialog = function() {
        //获取所有属性列表
        var allProperties = [];
        for (var key in $scope.boMetadata.propMap) {
          allProperties.push($scope.boMetadata.propMap[key]);
        }
        //获取已经选取的属性列表
        var selectProperties = Array.prototype.slice.call($scope.boMetadata.listview.properties);

        var options = {
          title: `配置列`,
          templateUrl: "framework/property-setting.html",
          appendClassName: "bo-property-setting-dialog",
          params: {
            allProperties: allProperties,
            selectProperties: selectProperties
          },
          confirm: {
            hidden: false,
          },
          closeCallback: function(key, data) {
            if (key === "OK") {
              //获取选择数据，更新列属性
              console.log(data)
            }
          }
        };
        var dialog = Dialog.showConfirm(options);
      };
    }
  }
}]);