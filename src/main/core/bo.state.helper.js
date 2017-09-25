'use strict';

huoyun.provider("NewBoTemplate", [function() {

  function BoTemplate(boNamespace, boName) {

    this.listPropTemplates = {};
  }


  BoTemplate.prototype.setListPropTemplates = function(options) {
    this.listPropTemplates = options;
    return this;
  };

  BoTemplate.prototype.getListPropTemplate = function(name) {
    var prop = this.listPropTemplates[name];
    return prop && prop.templateUrl;
  };

  BoTemplate.prototype.setDetailPropTemplates = function(options) {
    this.detailPropTemplates = options;
    return this;
  };


  const templates = {};

  this.getBoTemplate = function(boNamespace, boName) {
    var key = `${boNamespace}.${boName}`;
    if (!templates[key]) {
      templates[key] = new BoTemplate(boNamespace, boName);
    }

    return templates[key];
  };

  this.$get = function() {
    return this;
  };
}]);

huoyun.provider("BoStateParam", [function() {
  function BoListOption(options) {
    var that = this;
    Object.keys(options).forEach(function(key) {
      that[key] = options[key];
    });
  }

  BoListOption.prototype.setController = function(controller) {
    this.controller = controller;
  };

  BoListOption.prototype.getController = function() {
    return this.controller;
  };

  this.BoList = BoListOption;

  this.$get = function() {
    return this;
  };
}]);

huoyun.provider("NewBoState", ["$stateProvider", function($stateProvider) {

  const BoStateMap = {};

  this.configure = function(options) {
    if (!options.boName || !options.boNamespace) {
      throw new Error(`Arguments invalid. BoNamespace: ${options.boNamespace}, BoName: ${options.boName}`);
    }

    BoStateMap[`${options.boNamespace}.${options.boName}`] = new BoState(options);
  };

  function BoState(options) {
    const keys = ["boNamespace", "boName", "stateName"];

    var that = this;
    keys.forEach(function(key) {
      that[key] = options[key];
    });

    this.getOptions = function() {
      return options;
    };

    this.root = new BoRootStateOption(this);

    if (!options.list || options.list.visibility !== false) {
      this.list = new BoListStateOption(this, options.list);
    }

    ["root", "list"].forEach(function(key) {
      var stateOption = that[key];
      stateOption && $stateProvider.state(stateOption.getStateName(), stateOption);
    });
  }

  BoState.prototype.getBoNamespace = function() {
    return this.boNamespace;
  };

  BoState.prototype.getBoName = function() {
    return this.boName;
  };

  BoState.prototype.getStateName = function() {
    return this.stateName || this.boName.toLocaleLowerCase();
  };

  BoState.prototype.setBoListOption = function(options) {
    this.list = new BoListStateOption(this, options);
    return this;
  };

  BoState.prototype.setBoDetailOption = function(options) {
    return this;
  };

  BoState.prototype.setBoCreationOption = function(options) {
    return this;
  };

  BoState.prototype.setBoEditionOption = function(options) {
    return this;
  };


  function BoRootStateOption(boState) {
    this.abstract = true;
    this.url = boState.getOptions().url || `/${boState.getBoName()}`;
    this.templateUrl = boState.getOptions().templateUrl || `framework/general.html`;
    this.data = {
      boName: boState.getBoName(),
      boNamespace: boState.getBoNamespace()
    };

    this.getBoState = function() {
      return boState;
    };
  }

  BoRootStateOption.prototype.getStateName = function() {
    return this.getBoState().getStateName();
  };

  function BoListStateOption(boState, options) {
    this.url = options.url || "/list";
    this.templateUrl = options.templateUrl || "common/bo.list.view.html";
    this.controller = options.controller || "NewBoListViewController";

    this.getOptions = function() {
      return options;
    };

    this.getBoState = function() {
      return boState;
    };
  }

  BoListStateOption.prototype.setVariables = function(...variables) {
    this.variables = variables;
  };

  BoListStateOption.prototype.getStateName = function() {
    return `${this.getBoState().getStateName()}.list`;
  };

  BoListStateOption.prototype.getSearchText = function() {
    return this.getOptions().searchText;
  };

  BoListStateOption.prototype.getSelection = function() {
    return this.getOptions().selection;
  };

  BoListStateOption.prototype.getButtons = function() {
    return this.getOptions().buttons;
  };

  this.$get = function() {
    return this;
  };

}]);

huoyun.provider("BoState", ["$stateProvider", "BoTemplateProvider",
  function($stateProvider, BoTemplateProvider) {

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
              queryExpr: listOptions.queryExpr,
              navs: listOptions.navs || ListPageNavigation,
              disableSearch: listOptions.disableSearch,
              onCreate: listOptions.onCreate || gotoBoCreationPage,
              onRowClicked: listOptions.onCreate || gotoBoDetailPage,
              buttons: listOptions.buttons,
              selectionMode: listOptions.selectionMode
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
          templateUrl: BoTemplateProvider.getDetailTemplateUrl(boNamespace, boName) ||
            "framework/homeview.html",
          controller: detailOptions.controller || 'BoHomeViewController',
          data: {
            setPageTitle: detailOptions.setPageTitle,
            navs: detailOptions.navs || DetailPageNavigation,
            buttons: detailPageButtons
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
            },
            init: editOptions.init
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
  }
]);