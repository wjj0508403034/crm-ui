'use strict';

huoyunWidget.directive('widgetFormGroupImageList', ["$filter", "$timeout", "Upload", "Dialog", "Tip",
  function($filter, $timeout, Upload, Dialog, Tip) {
    return {
      restrict: 'A',
      scope: {
        prop: "=",
        boMetadata: "=",
        images: "=ngModel",
        boId: "=",
        onFileUploadSuccessed: "&",
        onImageRemovedHandler: '&'
      },
      replace: true,
      templateUrl: 'form-group/imagelist/imagelist.html',
      link: function($scope, ele, attrs) {
        $scope.upload = function(file) {
          var uploadUrl = `upload/${$scope.boMetadata.boNamespace}/${$scope.boMetadata.boName}/${$scope.boId}/${$scope.prop.name}/imagelist`;
          if (file) {
            Upload.upload({
              url: uploadUrl,
              data: {
                file: file
              }
            }).then(function(successResponse) {
              Tip.show("上传成功！");
              console.log(successResponse);
              $scope.onFileUploadSuccessed({
                file: file,
                event: successResponse
              });
            }, function(failedResponse) {
              console.log(failedResponse);
              // $scope.onFileUploadFailed({
              //   file: file,
              //   event: failedResponse
              // });
            }, function(event) {
              console.log(event);
              // $scope.onFileUploadProgressChanged({
              //   file: file,
              //   event: event
              // });
            });
          }
        };

        /**
         * 图片删除
         */
        $scope.onImageRemoved = function(image) {
          $scope.onImageRemovedHandler({
            image: image,
            boMeta: $scope.boMetadata,
            prop: $scope.prop
          });
        };

        /**图片预览 */
        $scope.previewImage = function(currentImageIndex) {
          console.log($scope.images);
          //获取当前页面所有图片的Urls
          var ImageUrls = [];
          for (var i = 0; i < $scope.images.length; i++) {
            ImageUrls.push({ id: i, url: $filter('ImageList')($scope.images[i]['id'], $scope.boMetadata, $scope.prop) });
          }
          var options = {
            title: ``,
            closeByEscape: false,
            templateUrl: "framework/previewImage.html",
            appendClassName: "preview-image-dialog",
            params: {
              CIndex: currentImageIndex,
              imageUrls: ImageUrls
            },
            confirm: {
              hidden: true,
            },
            closeCallback: function(key, data) {
              if (key === "selected") {
                $scope.value = data;
              }

            }
          };
          var dialog = Dialog.showConfirm(options);
        }
      }
    }
  }
]);