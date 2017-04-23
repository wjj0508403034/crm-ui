'use strict';

huoyunWidget.directive('widgetSearchDateTimeLabel', ["Dialog", function (Dialog) {
  return {
    restrict: 'A',
    scope: {
      value: "=ngModel",
      prop: "="
    },
    templateUrl: 'search/datetime/datetime.label.html',
    link: function ($scope, ele, attrs) {
      var defaultValues=[
        {label:'today',name:'today'},
        {label:'yestoday',name:'yestoday'},
        {label:'month',name:'month'},
        {label:'year',name:'year'},
        {label:'custom Range',name:'custom Range',startDate:'',endDate:''},
      ];
      $scope.prop.validvalues=defaultValues;
      $scope.onButtonClicked = function () {
        var options = {
          title: `设置搜索条件`,
          templateUrl: "choose.from.list/search/datetime/datetime.html",
          appendClassName: "general-choose-from-list-dialog",
          params: {
            prop: $scope.prop
          },
          closeCallback: function (key, data) {
            if (key === "OK") {
              console.log(data)
              data[0].label!='custom Range'&&($scope.value = $scope.prop.name +" eq " + data[0].name);
              data[0].label==='custom Range'&&($scope.value = $scope.prop.name +" between "+ data[0].startDate +" and "+ data[0].endDate );
              var labels = [];
              (data || []).forEach(function (validvalue, index) {
                labels.push(validvalue.name==='custom Range'?(validvalue.startDate+","+validvalue.endDate):validvalue.label);
              });
              $scope.text = labels.join(" , ");
            }
          }
        };
        var dialog = Dialog.showConfirm(options);
      };

    }
  }
}]);