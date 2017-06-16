'use strict';

huoyunWidget.directive('widgetBoHome', ["$injector", "$log", "BoTemplate", "HuoyunWidgetConstant",
  function($injector, $log, BoTemplateProvider, HuoyunWidgetConstant) {

    function GetPartTemplates(boMetadata, position) {
      if (boMetadata) {
        var partTemplates = BoTemplateProvider.getDetailPagePartTemplates(boMetadata.boNamespace, boMetadata.boName);

        return partTemplates.filter(function(template) {
          return template.position === position;
        });
      }

      return [];
    }

    return {
      restrict: 'A',
      scope: {
        boMetadata: "=",
        boData: "=",
        refresh: "&",
        onImageRemoved: "&",
        buttons: "="
      },
      templateUrl: 'framework/bo.home.html',
      link: function($scope, ele, attrs) {

        $scope.getTopPartTemplates = function() {
          return GetPartTemplates($scope.boMetadata, "top");
        };

        $scope.getBottomPartTemplates = function() {
          return GetPartTemplates($scope.boMetadata, "bottom");
        };

        $scope.$watch("boData", function(newVal, oldVal) {
          $scope.$broadcast(HuoyunWidgetConstant.Events.BoEvent.BoDataChanged, newVal);
        });

        $scope.onFileUploadSuccessed = function(file, event) {
          $scope.refresh();
        };

        $scope.onImageRemovedHandler = function(image, boMeta, prop) {
          $scope.onImageRemoved({
            image: image,
            boMeta: boMeta,
            prop: prop
          });
        };

        $scope.isButtonVisibility = function(button) {
          if (!button.hasOwnProperty("visibility")) {
            return true;
          }

          if (typeof button.visibility === "boolean") {
            return button.visibility;
          }

          if (typeof button.visibility === "function") {
            return button.visibility.apply(button.$scope || $scope, [button, $injector])
          }

          return false;
        };

        $scope.getPropTemplateUrl = function(boMetadata, prop) {
          if (boMetadata && prop) {
            return BoTemplateProvider.getDetailPagePropTemplateUrl(boMetadata.boNamespace, boMetadata.boName,
              prop.name);
          }
          return null;
        };

        $scope.onButtonClicked = function(button) {
          if (typeof button.onButtonClicked === "function") {
            button.onButtonClicked.apply(button.$scope || $scope, [button, $injector]);
          } else {
            $log.warn("No button click handler for this button.", button);
          }
        };
      }
    }
  }
]);