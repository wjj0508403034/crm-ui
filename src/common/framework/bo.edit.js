'use strict';

huoyunWidget.directive('widgetBoEdition', ["BoTemplate", "HuoyunWidgetConstant",
  function(BoTemplateProvider, HuoyunWidgetConstant) {
    return {
      restrict: 'A',
      scope: {
        boMetadata: "=",
        boData: "=",
        onSave: "&",
        onValid: "&",
        onCancel: "&"
      },
      templateUrl: 'framework/bo.edit.html',
      link: function($scope, ele, attrs) {

        $scope.onCancelButtonClicked = function() {
          $scope.onCancel();
        };

        $scope.getPropTemplateUrl = function(boMetadata, prop) {
          if (boMetadata && prop) {
            return BoTemplateProvider.getEditPagePropTemplateUrl(boMetadata.boNamespace, boMetadata.boName,
              prop.name);
          }
          return null;
        };

        $scope.$watch("boData", function(newVal, oldVal) {
          $scope.$broadcast(HuoyunWidgetConstant.Events.BoEvent.BoDataChanged, newVal);
        });

        $scope.$on(HuoyunWidgetConstant.Events.BoEvent.PropertyUpdate, function(event, propName, propValue) {
          if (!$scope.boData) {
            $scope.boData = {};
          }
          $scope.boData[propName] = propValue;
        });

        $scope.onSaveButtonClicked = function() {
          $scope.errors = {};
          var param = {
            data: $scope.boData,
            boMetadata: $scope.boMetadata
          };

          $scope.onValid(param)
            .then($scope.onSave.bind(this, param))
            .then(function() {
              console.log("Save Successfully.");
            }).catch(function(err) {
              console.warn("Save Failed.");
              console.warn(err);
              if (err.propMetadata) {
                $scope.errors[err.propMetadata.name] = err;
              }
            });
        };
      }
    }
  }
]);