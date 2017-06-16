'use strict';

huoyunWidget.factory("BoDialogFactory", ["$q", "Dialog", "HuoyunWidgetConstant",
  function($q, Dialog, HuoyunWidgetConstant) {

    function OpenMultipleChooseFromList(options) {
      var dtd = $q.defer();
      var dialogOptions = {
        title: options.title || '无标题',
        templateUrl: "framework/dialog/choose.multi.bo.items.dialog.html",
        appendClassName: options.appendClassName || "choose-multi-bo-items-dialog",
        params: {
          boName: options.boName,
          boNamespace: options.boNamespace,
          selectedBos: options.selectedItems || []
        },
        closeCallback: function(key, data) {
          dtd.resolve({
            key: key,
            data: data
          });
        }
      };
      var dialog = Dialog.showConfirm(dialogOptions);

      return dtd.promise;
    }

    function OpenSingleChooseFromList(options) {
      var dtd = $q.defer();
      var dialogOptions = {
        title: options.title || '无标题',
        templateUrl: "framework/dialog/choose.bo.item.dialog.html",
        appendClassName: "choose-bo-item-dialog",
        params: {
          boName: options.boName,
          boNamespace: options.boNamespace,
        },
        confirm: {
          hidden: true,
        },
        closeCallback: function(key, data) {
          dtd.resolve({
            key: key,
            data: data
          });
        }
      };
      var dialog = Dialog.showConfirm(dialogOptions);

      return dtd.promise;
    }

    return {

      /**
       * options:
       *  - title
       *  - boNamespace
       *  - boName
       *  - selectedItems
       *  - appendClassName
       *  - mode: ["Single","Multiple"] // Default is Single
       */
      openChooseFromList: function(options) {
        if (options.mode === HuoyunWidgetConstant.SelectionMode.Multiple) {
          return OpenMultipleChooseFromList(options);
        }

        return OpenSingleChooseFromList(options);
      }
    }
  }
]);