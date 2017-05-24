'use strict';

huoyun.BoState = function(name) {
  return {
    Root: name,
    List: `${name}.list`,
    Detail: `${name}.detail`,
    Create: `${name}.create`,
    Edit: `${name}.edit`
  };
};

huoyun.provider("BoState", ["$stateProvider", function($stateProvider) {

  function BoStateConstants(name) {
    this.Root = name;
    this.List = `${name}.list`;
    this.Detail = `${name}.detail`;
    this.Create = `${name}.create`;
    this.Edit = `${name}.edit`;
  }

  this.register = function(boNamespace, boName, options) {
    if (!boName || !boNamespace) {
      throw new Error(`Arguments invalid. BoNamespace: ${boNamespace}, BoName: ${boName}`);
    }

    var boState = new BoStateConstants(options.state || boName);

    $stateProvider
      .state(boState.Root, {
        abstract: true,
        url: options.url || `/${boName}`,
        templateUrl: "framework/general.html",
        data: {
          boName: boName,
          boNamespace: boNamespace
        }
      });

    if (!options.list || options.list.visibility !== false) {
      const ListPageNavigation = [{
        label: "主页",
        state: "home"
      }, {
        label: `${options.label || boName}列表`
      }];

      var listOptions = options.list || {};
      $stateProvider
        .state(boState.List, {
          url: listOptions.url || "/list",
          templateUrl: listOptions.templateUrl || "framework/listview.html",
          controller: listOptions.controller || "BoListViewController",
          data: {
            title: `${options.label}`,
            subTitle: "主页",
            queryExpr: listOptions.queryExpr,
            navs: listOptions.navs || ListPageNavigation,
            disableSearch: listOptions.disableSearch,
            onCreate: listOptions.onCreate || gotoBoCreationPage,
            onRowClicked: listOptions.onCreate || gotoBoDetailPage,
            buttons: listOptions.buttons
          }
        });
    }

    if (!options.detail || options.detail.visibility !== false) {
      const DetailPageNavigation = [{
        label: "主页",
        state: "home"
      }, {
        label: `${options.label || boName}列表`,
        state: boState.List
      }, {
        label: `${options.label || boName}详情`
      }];

      var detailOptions = options.detail || {};
      var detailPageButtons = {
        "edit": {
          onButtonClicked: function(button, $injector) {
            gotoBoEditionPage(this, $injector);
          }
        },
        "delete": {
          onDeleteCallback: function(button, $injector) {
            $injector.get("Tip").show("删除成功！");
            gotoBoListPage($injector);
          }
        }
      };

      if (detailOptions.buttons) {
        Object.keys(detailOptions.buttons).forEach(function(buttonKey) {
          if (["edit", "delete"].indexOf(buttonKey) != -1) {
            Object.keys(detailOptions.buttons[buttonKey]).forEach(function(objKey) {
              detailPageButtons[buttonKey][objKey] = detailOptions.buttons[buttonKey][objKey];
            });
          } else {
            detailPageButtons[buttonKey] = detailOptions.buttons[buttonKey];
          }
        });
      }

      $stateProvider.state(boState.Detail, {
        url: detailOptions.url || "/:boId/detail",
        templateUrl: detailOptions.templateUrl || "framework/homeview.html",
        controller: detailOptions.controller || 'BoHomeViewController',
        data: {
          setPageTitle: detailOptions.setPageTitle,
          navs: detailOptions.navs || DetailPageNavigation,
          buttons: detailPageButtons,
          propTemplates: detailOptions.propTemplates
        }
      });
    }

    if (!options.edit || options.edit.visibility !== false) {
      const EditionPageNavigation = [{
        label: "主页",
        state: "home"
      }, {
        label: `${options.label || boName}列表`,
        state: boState.List
      }, {
        label: `修改${options.label || boName}`
      }];

      var editOptions = options.edit || {};
      $stateProvider.state(boState.Edit, {
        url: editOptions.url || "/:boId/edit",
        templateUrl: editOptions.templateUrl || "framework/edtionview.html",
        controller: editOptions.controller || 'BoEdtionViewController',
        data: {
          navs: editOptions.navs || EditionPageNavigation,
          setPageTitle: editOptions.setPageTitle,
          dynamicMeta: editOptions.dynamicMeta,
          onSaveCallback: editOptions.onSaveCallback || function($injector) {
            $injector.get("Tip").show("保存成功！");
            gotoBoListPage($injector);
          },
          onCancelCallback: editOptions.onCancelCallback || function($injector) {
            gotoBoListPage($injector);
          }
        }
      })
    }

    if (!options.create || options.create.visibility !== false) {
      var creationOptions = options.create || {};
      const CreationPageNavigation = [{
        label: "主页",
        state: "home"
      }, {
        label: `${options.label || boName}列表`,
        state: boState.List
      }, {
        label: `新建${options.label || boName}`
      }];

      $stateProvider.state(boState.Create, {
        url: creationOptions.url || "/create",
        templateUrl: creationOptions.templateUrl || "framework/ceationview.html",
        controller: creationOptions.controller || 'BoCreationViewController',
        data: {
          navs: creationOptions.navs || CreationPageNavigation,
          initBoDataService: creationOptions.initBoDataService,
          beforeSave: creationOptions.beforeSave,
          setPageTitle: creationOptions.setPageTitle,
          dynamicMeta: creationOptions.dynamicMeta,
          onSaveCallback: creationOptions.onSaveCallback || function($injector) {
            $injector.get("Tip").show("创建成功！");
            gotoBoListPage($injector);
          },
          onCancelCallback: creationOptions.onCancelCallback || function($injector) {
            gotoBoListPage($injector);
          }
        }
      })
    }

    function gotoBoEditionPage($scope, $injector) {
      $injector.get("$state").go(boState.Edit, {
        boId: $scope.boData.id
      });
    }

    function gotoBoCreationPage($injector) {
      $injector.get("$state").go(boState.Create);
    }

    function gotoBoListPage($injector) {
      $injector.get("$state").go(boState.List);
    }

    function gotoBoDetailPage($injector, lineData, index) {
      $injector.get("$state").go(boState.Detail, {
        boId: lineData.id
      });
    }
  };

  this.$get = function() {
    return this;
  };
}]);