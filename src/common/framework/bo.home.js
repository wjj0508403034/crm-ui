'use strict';

huoyunWidget.directive('widgetBoHome', ["$injector", "$log", "BoTemplate",
  function($injector, $log, BoTemplateProvider) {
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
            return BoTemplateProvider.getDetailPagePropTemplateUrl(boMetadata.boNamespace, boMetadata.boName, prop.name);
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