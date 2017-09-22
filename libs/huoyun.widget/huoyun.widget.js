'use strict';

angular.module('huoyun.widget', ['ngDialog']);

angular.module('huoyun.widget').provider("display", function () {

  this.date = "yyyy-MM-dd";
  this.datetime = "yyyy-MM-dd HH:mm";

  /**
   * options
   *  - date
   *  - datetime
   */
  this.config = function (options) {
    var that = this;
    ["date", "datetime"].forEach(function (prop) {
      if (options[prop]) {
        that[prop] = options[prop];
      }
    });
  };

  this.$get = function () {
    return this;
  };
});

angular.module('huoyun.widget').factory("HuoYunWidgets", ["TableOption", "Dialog", "Tip", "SidebarOption", "NavOption", "BreadCrumbOption", "FormOption", "CheckBoxOption", "SearchFormOption", "ButtonOption", "SidebarPanelOption", function (TableOption, Dialog, Tip, SidebarOption, NavOption, BreadCrumbOption, FormOption, CheckBoxOption, SearchFormOption, ButtonOption, SidebarPanelOption) {

  return {
    Dialog: Dialog,
    TableOption: TableOption,
    SidebarOption: SidebarOption,
    NavOption: NavOption,
    BreadCrumbOption: BreadCrumbOption,
    Tip: Tip,
    FormOption: FormOption,
    CheckBoxOption: CheckBoxOption,
    SearchFormOption: SearchFormOption,
    ButtonOption: ButtonOption,
    SidebarPanelOption: SidebarPanelOption
  };
}]);
'use strict';

angular.module('huoyun.widget').factory("ButtonOption", ["widgetsHelper", "$log", function (widgetsHelper, $log) {

  var props = ["name", "icon", "label", "visibility", "disabled", "appendClass", "style", "onClick"];

  function ButtonOption(options) {
    var that = this;
    props.forEach(function (prop) {
      that[prop] = options[prop];
    });
  }

  ButtonOption.prototype.$$visibility = function () {
    return widgetsHelper.visibility(this);
  };

  ButtonOption.prototype.$$disabled = function () {
    return widgetsHelper.disabled(this);
  };

  ButtonOption.prototype.$$style = function () {
    return widgetsHelper.style(this);
  };

  ButtonOption.prototype.$$click = function () {
    if (!this.$$disabled()) {
      if (typeof this.onClick === "function") {
        this.onClick.apply(this);
      } else {
        $log.warn("Button no click handler.", this);
      }
    }
  };

  return ButtonOption;
}]);
'use strict';

angular.module('huoyun.widget').directive('widgetsCheckBox', [function () {
  return {
    restrict: 'A',
    scope: {
      options: "="
    },
    templateUrl: 'checkbox/checkbox.html',
    link: function link($scope, ele, attrs) {}
  };
}]);
'use strict';

angular.module('huoyun.widget').factory("CheckBoxOption", ["widgetsHelper", function (CheckBoxOption) {

  var props = ["value", "label", "disabled", "appendClass"];

  function CheckBoxOption(options) {
    var that = this;
    props.forEach(function (prop) {
      that[prop] = options[prop];
    });

    if (typeof options.onChecked === "function") {
      this.onChecked = options.onChecked;
    }

    if (typeof options.onUnchecked === "function") {
      this.onUnchecked = options.onUnchecked;
    }

    if (typeof options.onCheckChanged === "function") {
      this.onCheckChanged = options.onCheckChanged;
    }
  }

  CheckBoxOption.prototype.$$onClicked = function (event) {
    var oldValue = this.value;
    this.value = !oldValue;
    this.onCheckChanged && this.onCheckChanged(event, oldValue, this.value);
    if (this.value) {
      this.onChecked && this.onChecked(event);
    } else {
      this.onUnchecked && this.onUnchecked(event);
    }
  };

  CheckBoxOption.prototype.isChecked = function () {
    return this.value === true;
  };

  return CheckBoxOption;
}]);
'use strict';

angular.module('huoyun.widget').directive('widgetsBreadCrumb', ["$log", "widgetsHelper", function ($log, widgetsHelper) {
  return {
    restrict: 'A',
    scope: {
      options: "="
    },
    templateUrl: 'breadcrumb/breadcrumb.html',
    link: function link($scope, ele, attrs) {

      $scope.itemStyle = function (item) {
        return widgetsHelper.style(item);
      };

      $scope.onItemClicked = function (item, index) {
        if ($scope.options.items.length - 1 !== index) {
          if (typeof item.onClick === "function") {
            item.onClick.apply(item);
          } else {
            $log.warn("Nav item no click handler.", item);
          }
        }
      };
    }
  };
}]);
'use strict';

angular.module('huoyun.widget').factory("BreadCrumbOption", ["BreadCrumbItemOption", function (BreadCrumbItemOption) {

  function BreadCrumbOption(options) {
    this.items = [];
    if (Array.isArray(options.items)) {
      var that = this;
      options.items.forEach(function (item) {
        that.items.push(new BreadCrumbItemOption(item));
      });
    }
  }

  return BreadCrumbOption;
}]);

angular.module('huoyun.widget').factory("BreadCrumbItemOption", [function () {

  var props = ["name", "label", "onClick", "style", "icon"];

  function BreadCrumbItemOption(options) {
    var that = this;
    props.forEach(function (prop) {
      that[prop] = options[prop];
    });
  }

  return BreadCrumbItemOption;
}]);
'use strict';

function Linq(array) {

  this.getArray = function () {
    return array;
  };
}

Linq.prototype.join = function (cb, separator) {
  if (typeof cb === "function") {
    var res = [];
    this.getArray().forEach(function (item) {
      var temp = cb(item);
      if (temp !== null && temp !== undefined && temp !== "") {
        res.push(temp);
      }
    });

    return res.join(separator);
  }

  return this.getArray().join(separator);
};

Linq.prototype.first = function (cb) {
  if (typeof cb !== "function") {
    throw new Error("cb is not function");
  }

  var array = this.getArray();
  for (var index = 0; index < array.length; index++) {
    if (cb(array[index], index)) {
      return array[index];
    }
  }
};

Linq.prototype.exists = function (item, cb) {
  if (!cb) {
    return this.getArray().indexOf(item) !== -1;
  }

  if (typeof cb !== "function") {
    throw new Error("cb is not function");
  }

  var array = this.getArray();
  for (var index = 0; index < array.length; index++) {
    if (cb(array[index], index)) {
      return true;
    }
  }
};

Linq.prototype.any = function (cb) {
  if (typeof cb !== "function") {
    throw new Error("cb is not function");
  }

  var array = this.getArray();
  for (var index = 0; index < array.length; index++) {
    if (cb(array[index], index)) {
      return true;
    }
  }

  return false;
};

Linq.prototype.all = function (cb) {
  if (typeof cb !== "function") {
    throw new Error("cb is not function");
  }

  var array = this.getArray();
  for (var index = 0; index < array.length; index++) {
    if (!cb(array[index], index)) {
      return false;
    }
  }

  return true;
};

Array.prototype.linq = function () {
  return new Linq(this);
};
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

angular.module('huoyun.widget').factory("HuoyunPromise", ["$q", function ($q) {

  return {
    resolve: function resolve(val) {
      if (val instanceof Promise || val instanceof $q) {
        return val;
      }

      var deferred = $q.defer();
      deferred.resolve(val);
      return deferred.promise;
    }
  };
}]);

angular.module('huoyun.widget').factory("widgetsHelper", function () {

  String.prototype.pad = function (width) {
    var temp = this.split(".");
    if (temp[0].length < width) {
      temp[0] = new Array(width - temp[0].length + 1).join("0") + temp[0];
    }

    return temp.join(".");
  };

  return {

    visibility: function visibility(obj) {
      if (typeof obj.visibility === "boolean") {
        return obj.visibility;
      }

      if (typeof obj.visibility === "function") {
        return obj.visibility.apply(obj);
      }

      return true;
    },

    disabled: function disabled(obj) {
      if (typeof obj.disabled === "boolean") {
        return obj.disabled;
      }

      if (typeof obj.disabled === "function") {
        return obj.disabled.apply(obj);
      }

      return false;
    },

    readonly: function readonly(obj) {
      if (typeof obj.readonly === "boolean") {
        return obj.readonly;
      }

      if (typeof obj.readonly === "function") {
        return obj.readonly.apply(obj);
      }

      return false;
    },

    style: function style(obj) {
      if (obj) {
        if (_typeof(obj.style) === "object") {
          return obj.style;
        }

        if (typeof obj.style === "function") {
          return obj.style.apply(obj);
        }
      }
    },

    durationFormat: function durationFormat(time) {
      var hour = 0;
      var minuter = 0;
      var second = 0;

      if (time) {
        if (time < 60) {
          second = time;
        } else {
          second = time % 60;
          var temp = time / 60;
          if (temp < 60) {
            minuter = temp;
          } else {
            hour = temp / 60;
            minuter = temp % 60;
          }
        }
      }

      return hour.toFixed(0).pad(2) + ':' + minuter.toFixed(0).pad(2) + ':' + second.toFixed(3).pad(2);
    }
  };
});
'use strict';

/*
 * https://github.com/likeastore/ngDialog
 */

angular.module('huoyun.widget').config(["ngDialogProvider", function (ngDialogProvider) {
  ngDialogProvider.setDefaults({
    className: 'ngdialog-theme-default huoyun-dialog-container',
    showClose: false,
    closeByDocument: false,
    closeByEscape: false
  });
}]);

angular.module('huoyun.widget').controller("ConfirmDialogController", ["$scope", function ($scope) {
  $scope.onCancelButtonClicked = function () {
    if ($scope.ngDialogData && typeof $scope.ngDialogData.onCancelButtonClicked === "function") {
      $scope.ngDialogData.onCancelButtonClicked.apply(this);
    } else {
      $scope.closeThisDialog('Cancel');
    }
  };

  $scope.onConfirmButtonClicked = function () {
    if ($scope.ngDialogData && typeof $scope.ngDialogData.onConfirmButtonClicked === "function") {
      $scope.ngDialogData.onConfirmButtonClicked.apply(this);
    } else {
      $scope.closeThisDialog('OK');
    }
  };

  $scope.confirmClose = function () {
    $scope.closeThisDialog('OK');
  };

  $scope.cancelClose = function () {
    $scope.closeThisDialog('Cancel');
  };
}]);

angular.module('huoyun.widget').factory("Dialog", ['$q', 'ngDialog', function ($q, ngDialog) {

  return {
    showError: function showError(message) {
      return this.showConfirm({
        title: "错误",
        content: message,
        cancel: {
          visibility: false
        },
        confirm: {
          text: "知道了"
        }
      });
    },

    showConfirm: function showConfirm(options) {
      var dialogOptions = {
        template: "dialog/dialog.html",
        controller: "ConfirmDialogController",
        appendClassName: options.appendClassName || "",
        closeByDocument: !!options.closeByDocument,
        data: {
          title: options.title || "无标题",
          content: options.content,
          templateUrl: options.templateUrl,
          confirmButtonText: options.confirm && options.confirm.text || "确定",
          cancelButtonText: options.cancel && options.cancel.text || "取消",
          confirmButtonVisibility: !(options.confirm && options.confirm.visibility === false),
          cancelButtonVisibility: !(options.cancel && options.cancel.visibility === false),
          params: options.params
        }
      };

      ngDialog.open(dialogOptions).closePromise.then(function (data) {
        if (data.value) {
          if (Array.isArray(data.value) && data.value.length > 0) {
            var key = data.value[0];
            if (key === 'OK' && options.confirm && typeof options.confirm.callback === "function") {
              return options.confirm.callback.apply(this, data.value);
            }

            if (key === "Cancel" && options.cancel && typeof options.cancel.callback === "function") {
              return options.cancel.callback.apply(this, data.value);
            }

            if (typeof options.closeCallback === "function") {
              return options.closeCallback.apply(this, data.value);
            }
          }

          if (typeof options.closeCallback === "function") {
            return options.closeCallback.apply(this, [data.value]);
          }
        }

        if (typeof options.closeCallback === "function") {
          return options.closeCallback.apply(this);
        }
      });
    }
  };
}]);
'use strict';

/**
 * options:
 *  title:
 *  titleStyle
 *  onTitleClicked
 */

angular.module('huoyun.widget').directive('widgetsHead', ["$log", "widgetsHelper", function ($log, widgetsHelper) {
  return {
    restrict: 'A',
    scope: {
      options: "="
    },
    templateUrl: 'head/head.html',
    link: function link($scope, ele, attrs) {

      $scope.titleStyle = function (style) {
        return widgetsHelper.style({
          style: style
        });
      };

      $scope.onTitleClick = function () {
        if (typeof $scope.options.onTitleClicked === "function") {
          $scope.options.onTitleClicked.apply(null);
        }
      };
    }
  };
}]);
'use strict';

angular.module('huoyun.widget').factory("Cube", ["Point", "Line", "Rect", "draw", "Timeline", "Quadrilateral", function (Point, Line, Rect, drawProvider, Timeline, Quadrilateral) {

  function Cube() {
    this.timeline = new Timeline();
    this.svgGroup = null;
    this.polyline = null;

    /**
     * 立方体6个面，分别定义为1,2,3,4,5,6
     */
    this.surface1 = null;
    this.surface2 = null;
    this.surface3 = null;
    this.surface4 = null;
    this.surface5 = null;
    this.surface6 = null;

    /**
     * 车尾矩形框
     */
    this.rect1 = null;

    /**
     * 整车矩形框
     */
    this.rect2 = null;

    /**
     * 车轮边线，辅助线1
     */
    this.guideline1 = null;

    /**
     * 辅助线2
     */
    this.guideline2 = null;

    this.verticalGuideline = null;
    this.horizontalGuideline = null;

    /**
     * 水平消失线
     */
    this.horizontalLine = null;

    /**
     * 水平消失线与车轮边线交点
     */
    this.horizontalLineCrossingPoint = null;

    /**
     * 第一条辅助线与整车矩形框交点
     */
    this.point9 = null;

    this.point10 = null;
    this.point11 = null;
  }

  Cube.prototype.setHorizontalLine = function (line) {
    this.horizontalLine = line;
    return this;
  };

  Cube.prototype.disableDrawing = function () {
    if (!this.svg) {
      throw new Error("Cube not set story board");
    }

    this.svg.off("mousedown");
    this.svg.off("mousemove");

    return this;
  };

  Cube.prototype.enableDrawing = function () {
    if (!this.svg) {
      throw new Error("Cube not set story board");
    }
    var that = this;
    this.svg.on("mousedown", function (event) {
      var point = new Point(event.offsetX, event.offsetY);
      if (!that.drawing) {
        that.drawing = "rect1";
        that.rect1 = new Rect();
        that.rect1.setSvg(that.svg).setStartPoint(point);
      } else {
        if (that.drawing === "rect1") {
          that.drawRect1(point, true);
        } else if (that.drawing === "rect2") {
          that.drawRect2(point, true);
        } else if (that.drawing === "guideline1") {
          that.drawGuideline1(point, true);
        }
      }
    });

    this.svg.on("mousemove", function (event) {
      var point = new Point(event.offsetX, event.offsetY);
      if (that.drawing === "rect1") {
        that.drawRect1(point, false);
        return;
      }

      if (that.drawing === "rect2") {
        that.drawRect2(point, false);
        return;
      }

      if (that.drawing === "guideline1") {
        that.drawGuideline1(point, false);
      }
    });
    return this;
  };

  Cube.prototype.add = function (obj) {
    if (obj && typeof obj.getSvgObj === "function") {
      this.svgGroup.add(obj.getSvgObj());
    }
  };

  Cube.prototype.setSvg = function (svg) {
    this.svg = svg;
    var parentBox = this.svg.rbox();
    this.svgGroup = this.svg.group();
    this.svgGroup.path('M0,0L' + parentBox.width + ',' + parentBox.height);
    this.polyline = this.svg.polyline().fill(drawProvider.randomColor()).stroke(drawProvider.line.stroke);
    this.svgGroup.add(this.polyline);

    var that = this;
    [1, 2, 3, 4, 5, 6].forEach(function (index) {
      var color = drawProvider.randomColor();
      var propName = 'surface' + index;
      that[propName] = new Quadrilateral();
      that[propName].setSvg(that.svg).setFillColor(color);
      that.add(that[propName]);
    });
    return this;
  };

  Cube.prototype.setTime = function (time) {
    this.timeline.setCurrentTime(time);

    if (!this.timeline.beforeEndTime(time)) {
      return;
    }

    var endPoints = this.timeline.getEndPoints();
    console.log(time, endPoints);
    var data = null;
    if (endPoints.min === endPoints.max) {
      data = this.timeline.getDataAtTime(time);
    } else if (!endPoints.max) {
      data = this.timeline.getDataAtTime(endPoints.min);
    } else if (endPoints.min) {
      data = this.deviationCalculation(endPoints, time);
    }

    if (data) {
      var that = this;
      [1, 2, 3, 4, 5, 6].forEach(function (index) {
        that['surface' + index].setPointArray(data[index - 1]);
      });
    }

    return this;
  };

  Cube.prototype.deviationCalculation = function (endPoints, time) {
    var minData = this.timeline.getDataAtTime(endPoints.min);
    var maxData = this.timeline.getDataAtTime(endPoints.max);
    var k = (time - endPoints.min) * 1.0 / (endPoints.max - endPoints.min);
    var data = [];
    var that = this;
    [1, 2, 3, 4, 5, 6].forEach(function (index) {
      var maxQuadrilateralPoints = maxData[index - 1];
      var minQuadrilateralPoints = minData[index - 1];
      var quadrilateralPoints = [];
      [1, 2, 3, 4].forEach(function (subIndex) {
        var minPoint = minQuadrilateralPoints[subIndex - 1];
        var maxPoint = maxQuadrilateralPoints[subIndex - 1];
        var point = Point.DeviationCalculation(minPoint, maxPoint, k);
        quadrilateralPoints.push(point);
      });

      data.push(quadrilateralPoints);
    });

    return data;
  };

  Cube.prototype.drawRect1 = function (point, isEnd) {
    this.rect1.setEndPoint(point).draw();
    if (isEnd) {
      this.drawing = "rect2";
      this.rect2 = new Rect();
      this.rect2.setSvg(this.svg).setStartPoint(this.rect1.startPoint);
    }
  };

  Cube.prototype.drawRect2 = function (point, isEnd) {
    this.rect2.setEndPoint(point).draw();
    if (isEnd) {
      this.drawing = "guideline1";
      this.guideline1 = new Line();
      this.guideline1.setSvg(this.svg).setStartPoint(this.rect1.getPoint2());
    }
  };

  Cube.prototype.drawGuideline1 = function (point, isEnd) {
    this.horizontalLineCrossingPoint = this.guideline1.setEndPoint(point).crossingPoint(this.horizontalLine);
    if (this.horizontalLineCrossingPoint) {
      this.guideline1.setEndPoint(this.horizontalLineCrossingPoint).draw();
      if (isEnd) {
        this.drawing = "end";
        this.drawGuideline2();
        this.drawHorizontalGuideline();
        this.drawVerticalGuideline();
        this.setSurfaceData();
        this.draw();
        this.removeGuideLinesAndPoints();
        this.disableDrawing();
      }
    } else if (!isEnd) {
      this.guideline1.draw();
    }
  };

  Cube.prototype.drawGuideline2 = function () {
    this.guideline2 = new Line(this.rect1.startPoint, this.horizontalLineCrossingPoint);
    this.guideline2.setSvg(this.svg).draw();
  };

  Cube.prototype.drawHorizontalGuideline = function () {
    var line2_of_rect2 = this.rect2.getLine2();
    this.point9 = line2_of_rect2.crossingPoint(this.guideline1);
    this.horizontalGuideline = Line.HorizontalLine(this.point9).setSvg(this.svg);
    this.point10 = this.horizontalGuideline.crossingPoint(this.guideline2);
    this.horizontalGuideline.setEndPoint(this.point10).draw();
  };

  Cube.prototype.drawVerticalGuideline = function () {
    var line2_of_rect2 = this.rect2.getLine3();
    this.verticalGuideline = Line.VerticalLine(this.point10).setSvg(this.svg);
    this.point11 = this.verticalGuideline.crossingPoint(line2_of_rect2);
    this.verticalGuideline.setEndPoint(this.point11).draw();
  };

  Cube.prototype.getQuadrilateralPoints = function () {
    var data = [];

    var that = this;
    [1, 2, 3, 4, 5, 6].forEach(function (index) {
      var points = that['surface' + index].getPoints();
      data.push(angular.copy(points));
    });

    return data;
  };

  Cube.prototype.setSurfaceData = function () {
    this.surface1.setPoints(this.rect1.getPoint1(), this.rect1.getPoint2(), this.rect1.getPoint3(), this.rect1.getPoint4());

    this.surface2.setPoints(this.rect1.getPoint1(), this.point10, this.point11, this.rect1.getPoint4());

    this.surface3.setPoints(this.rect1.getPoint4(), this.rect1.getPoint3(), this.rect2.getPoint3(), this.point11);

    this.surface4.setPoints(this.point10, this.point9, this.rect2.getPoint3(), this.point11);

    this.surface5.setPoints(this.rect1.getPoint2(), this.point9, this.rect2.getPoint3(), this.rect1.getPoint3());

    this.surface6.setPoints(this.rect1.getPoint1(), this.rect1.getPoint2(), this.point9, this.point10);

    this.timeline.setData(this.getQuadrilateralPoints());
    console.log(this);
  };

  Cube.prototype.draw = function () {
    var that = this;
    [1, 2, 3, 4, 5, 6].forEach(function (index) {
      that['surface' + index].draw();
    });
  };

  Cube.prototype.removeGuideLinesAndPoints = function () {
    this.rect1.remove();
    this.rect2.remove();
    this.guideline1.remove();
    this.guideline2.remove();
    this.verticalGuideline.remove();
    this.horizontalGuideline.remove();
  };

  return Cube;
}]);
'use strict';

angular.module('huoyun.widget').provider("draw", function () {

  this.line = {
    stroke: {
      color: '#f06',
      width: 1,
      linecap: 'round'
    }
  };

  this.fill = "rgba(109, 33, 33, 0.25)";

  this.text = {
    font: {
      size: 18,
      family: 'Verdana'
    },
    fill: "#f06"
  };

  this.fillColors = ["rgba(109, 33, 33, 0.25)", "rgba(46, 109, 164, 0.25)", "rgba(169, 68, 66, 0.25)", "rgba(0, 188, 212, 0.25)", "rgba(255, 152, 0, 0.25)", "rgba(255, 87, 34, 0.25)", "rgba(255, 235, 59, 0.25)", "rgba(76, 175, 80, 0.25)", "rgba(0, 150, 136, 0.25)", "rgba(121, 85, 72, 0.25)", "rgba(63, 81, 181, 0.25)", "rgba(156, 39, 176, 0.25)"];

  this.randomColor = function () {
    var randomIndex = Math.round(Math.random() * (Object.keys(this.fillColors).length - 1));
    return this.fillColors[Object.keys(this.fillColors)[randomIndex]];
  };

  this.$get = function () {
    return this;
  };
});
'use strict';

angular.module('huoyun.widget').factory("Draw", ["Point", "Line", "Cube", "Quadrilateral", function (Point, Line, Cube, Quadrilateral) {

  return {
    Point: Point,
    Line: Line,
    Cube: Cube,
    Quadrilateral: Quadrilateral
  };
}]);
'use strict';

angular.module('huoyun.widget').factory("Line", ["Point", "draw", function (Point, drawProvider) {

  function Line(startPoint, endPoint) {
    this.startPoint = null;
    this.endPoint = null;
    this.k = null;
    this.svgline = null;

    if (startPoint) {
      this.setStartPoint(startPoint);
    }

    if (endPoint) {
      this.setEndPoint(endPoint);
    }
  }

  Line.prototype.setStartPoint = function (point) {
    this.startPoint = point;
    return this;
  };

  Line.prototype.setSvg = function (svg) {
    this.svg = svg;
    this.svgline = this.svg.line().stroke(drawProvider.line.stroke);
    return this;
  };

  Line.prototype.style = function (style) {
    if (!this.svg) {
      throw new Error("Line not set story board");
    }

    this.svgline.style(style);
    return this;
  };

  Line.prototype.setEndPoint = function (point) {
    if (!this.startPoint) {
      throw new Error("Must set line start point first.");
    }
    this.endPoint = point;
    this.k = 0;
    if (this.startPoint.x !== this.endPoint.x) {
      this.k = (this.endPoint.y - this.startPoint.y) * 1.0 / (this.endPoint.x - this.startPoint.x);
    } else {
      this.k = Infinity;
    }
    this.b = this.startPoint.y - this.k * this.startPoint.x;
    return this;
  };

  Line.prototype.valid = function () {
    if (!this.startPoint) {
      throw new Error("Line not set start point");
    }

    if (!this.endPoint) {
      throw new Error("Line not set end point");
    }

    if (!this.svg) {
      throw new Error("Line not set story board");
    }

    return this;
  };

  Line.prototype.draw = function () {
    this.valid().svgline.plot(this.value());
    return this;
  };

  Line.prototype.text = function (text) {
    this.valid();
    var textPosition = this.startPoint.add(0, -10).getData();
    this.svg.plain(text).font(drawProvider.text.font).fill(drawProvider.text.fill).attr(textPosition);
    return this;
  };

  Line.prototype.formula = function () {
    return 'y=' + this.k + 'x+' + this.b;
  };

  Line.prototype.remove = function () {
    if (this.svgline) {
      this.svgline.remove();
    }
  };

  Line.prototype.inline = function (point) {
    return (this.endPoint.y - this.startPoint.y) * (point.x - this.startPoint.x) === (this.endPoint.x - this.startPoint.x) * (point.y - this.startPoint.y);
  };

  Line.prototype.crossingPoint = function (line2) {
    if (this.k === line2.k) {
      return;
    }
    var x = null;
    var y = null;
    if (this.k === Infinity) {
      x = this.startPoint.x;
      y = line2.k * x + line2.b;
      return new Point(x, y);
    }

    if (line2.k === Infinity) {
      x = line2.startPoint.x;
      y = this.k * x + this.b;
      return new Point(x, y);
    }

    x = (line2.b - this.b) * 1.0 / (this.k - line2.k);
    y = (this.k * line2.b - line2.k * this.b) * 1.0 / (this.k - line2.k);
    return new Point(x, y);
  };

  Line.prototype.value = function () {
    return [this.startPoint.value(), this.endPoint.value()];
  };

  Line.HorizontalLine = function (point) {
    return new Line(point, point.add(10, 0));
  };

  Line.VerticalLine = function (point) {
    return new Line(point, point.add(0, 10));
  };

  return Line;
}]);
'use strict';

angular.module('huoyun.widget').factory("Point", [function () {

  function Point(x, y) {
    this.x = x;
    this.y = y;
  }

  Point.prototype.value = function () {
    return [this.x, this.y];
  };

  Point.prototype.getData = function () {
    return {
      x: this.x,
      y: this.y
    };
  };

  Point.prototype.add = function (x, y) {
    return new Point(this.x + x, this.y + y);
  };

  Point.DeviationCalculation = function (point1, point2, k) {
    var x = point1.x + k * (point2.x - point1.x);
    var y = point1.y + k * (point2.y - point1.y);
    return new Point(x, y);
  };

  return Point;
}]);
'use strict';

/**
 * 四边形，不一定是矩形
 */

angular.module('huoyun.widget').factory("Quadrilateral", ["draw", function (drawProvider) {

  function Quadrilateral() {
    this.polyline = null;
  }

  Quadrilateral.prototype.setPoints = function (point1, point2, point3, point4) {
    var that = this;
    var points = arguments;
    [1, 2, 3, 4].forEach(function (index) {
      that['point' + index] = points[index - 1];
    });
    return this;
  };

  Quadrilateral.prototype.setPointArray = function (points) {
    var that = this;
    [1, 2, 3, 4].forEach(function (index) {
      that['point' + index] = points[index - 1];
    });
    return this;
  };

  Quadrilateral.prototype.getPoints = function () {
    var points = [];
    var that = this;
    [1, 2, 3, 4].forEach(function (index) {
      points.push(that['point' + index]);
    });
    return points;
  };

  Quadrilateral.prototype.setSvg = function (svg) {
    this.svg = svg;
    this.polyline = this.svg.polyline().fill(drawProvider.fill).stroke(drawProvider.line.stroke);
    return this;
  };

  Quadrilateral.prototype.setFillColor = function (color) {
    this.polyline.fill(color);
    return this;
  };

  Quadrilateral.prototype.getSvgObj = function () {
    return this.polyline;
  };

  Quadrilateral.prototype.draw = function () {
    var that = this;
    var points = [];
    [1, 2, 3, 4, 1].forEach(function (index) {
      points.push(that['point' + index].value());
    });
    this.polyline.plot(points);
    return this;
  };

  Quadrilateral.prototype.getData = function () {
    var data = [];

    var that = this;
    [1, 2, 3, 4].forEach(function (index) {
      data.push(that['point' + index].getData());
    });

    return data;
  };

  return Quadrilateral;
}]);
'use strict';

angular.module('huoyun.widget').factory("Rect", ["Point", "draw", "Line", function (Point, drawProvider, Line) {

  /**
   * 矩形
   *   point3(endPoint) line3        point4
   *           ==========================
   *           =                        =
   *           =                        =
   *   line2   =                        =  line4
   *           =                        =
   *           ==========================
   *        point2        line1        point1(startPoint)
   */
  function Rect() {
    this.startPoint = null;
    this.endPoint = null;
    this.polyline = null;
  }

  Rect.prototype.setSvg = function (svg) {
    this.svg = svg;
    this.polyline = this.svg.polyline().fill(drawProvider.fill).stroke(drawProvider.line.stroke);
    return this;
  };

  Rect.prototype.style = function (style) {
    if (!this.polyline) {
      throw new Error("Line not set story board");
    }

    this.polyline.style(style);
    return this;
  };

  Rect.prototype.remove = function () {
    if (this.polyline) {
      this.polyline.remove();
    }
  };

  Rect.prototype.setStartPoint = function (point) {
    this.startPoint = point;
    return this;
  };

  Rect.prototype.setEndPoint = function (point) {
    this.endPoint = point;
    return this;
  };

  Rect.prototype.draw = function () {
    var points = [];
    points.push(this.getPoint1().value());
    points.push(this.getPoint2().value());
    points.push(this.getPoint3().value());
    points.push(this.getPoint4().value());
    points.push(this.getPoint1().value());
    this.polyline.plot(points);
    return this;
  };

  Rect.prototype.getPoint1 = function () {
    return this.startPoint;
  };

  Rect.prototype.getPoint2 = function () {
    return new Point(this.endPoint.x, this.startPoint.y);
  };

  Rect.prototype.getPoint3 = function () {
    return this.endPoint;
  };

  Rect.prototype.getPoint4 = function () {
    return new Point(this.startPoint.x, this.endPoint.y);
  };

  Rect.prototype.getLine2 = function () {
    return new Line(this.getPoint2(), this.getPoint3());
  };

  Rect.prototype.getLine3 = function () {
    return new Line(this.getPoint3(), this.getPoint4());
  };

  return Rect;
}]);
'use strict';

angular.module('huoyun.widget').directive("widgetsStoryBoard", ["$log", "svgHelper", "Draw", function ($log, svgHelper, Draw) {
  return {
    restrict: "A",
    scope: {
      svgOptions: "=",
      frameIndex: "="
    },
    link: function link($scope, elem, attrs) {
      var svg = svgHelper.generateSVG(elem);

      $scope.$watch("frameIndex", function (newVal, oldValue) {
        if (newVal !== undefined && $scope.svgOptions && $scope.svgOptions.objects) {
          $scope.svgOptions.objects.forEach(function (object) {
            if (!object.svg) {
              object.setSvg(svg).setHorizontalLine($scope.svgOptions.line);
            }
            object.setTime(newVal).draw();
          });
        }
      });

      var deregisterWatch = $scope.$watch("svgOptions", function (newVal, oldValue) {
        if (newVal) {
          deregisterWatch();
          if (typeof $scope.svgOptions.afterSvgInit === "function") {
            $scope.svgOptions.afterSvgInit(svg);
          }

          if (typeof $scope.svgOptions.registerObjectCreate === "function") {
            $scope.svgOptions.registerObjectCreate(ObjectCreateHandler);
          }
        }
      });

      function ObjectCreateHandler(object) {
        object.setSvg(svg).setTime($scope.frameIndex).enableDrawing();
      }

      //$scope.svgOptions.line.setSvg(svg).draw().text("水平消失线");
      // svg.rect(177, 177, 8, 8).fill("#4F80FF").stroke({
      //   color: "rgba(0,0,0,0)"
      // }).style({
      //   cursor: "nw-resize"
      // }).attr({
      //   "pointer-events": "all"
      // })
      //var cube = new Draw.Cube();
      //cube.setHorizontalLine($scope.svgOptions.line).setSvg(svg).enableDrawing();

    }
  };
}]);
'use strict';

angular.module('huoyun.widget').factory("svgHelper", ["draw", function (drawProvider) {
  return {
    generateSVG: function generateSVG(elem) {
      var svgId = 'svg' + new Date().getTime();
      var storyBoardContainer = angular.element("<div class='svg-story-board-container'></div>").attr("id", svgId);
      storyBoardContainer.css("height", "100%").css("width", "100%");
      elem.append(storyBoardContainer);
      var svg = SVG(svgId);
      svg.size("100%", "100%");
      return svg;
    },

    drawLine: function drawLine(svg, line) {
      svg.line(line.value()).stroke(drawProvider.line.stroke);
    },

    updateLine: function updateLine(line, point1, point2) {
      return line.plot([point1.value(), point2.value()]);
    },

    drawLineByPoints: function drawLineByPoints(svg, point1, point2) {
      return svg.line([point1.value(), point2.value()]).stroke(drawProvider.line.stroke);
    }
  };
}]);
'use strict';

angular.module('huoyun.widget').factory("Timeline", [function () {

  function Timeline() {
    this.timeline = {};
    this.currentTime = null;
  }

  Timeline.prototype.getTimes = function () {
    return Object.keys(this.timeline);
  };

  Timeline.prototype.setEndTime = function (time) {
    this.endTime = time;
  };

  Timeline.prototype.beforeEndTime = function (time) {
    if (this.endTime === null || this.endTime === undefined) {
      return true;
    }

    return time <= this.endTime;
  };

  Timeline.prototype.setCurrentTime = function (time) {
    this.currentTime = time;
    return this;
  };

  Timeline.prototype.setData = function (data) {
    this.timeline[this.currentTime] = data;
    return this;
  };

  Timeline.prototype.getDataAtTime = function (time) {
    return this.timeline[time];
  };

  Timeline.prototype.getEndPoints = function () {
    if (this.timeline[this.currentTime]) {
      return {
        min: this.currentTime,
        max: this.currentTime
      };
    }

    var times = this.getTimes();
    var min = null;
    var max = null;
    for (var index = 0; index < times.length; index++) {
      var cur = parseFloat(times[index]);
      if (max === null && cur > this.currentTime) {
        max = times[index];
        if (index > 0) {
          min = times[index - 1];
        }

        break;
      }
    }

    return {
      min: min,
      max: max
    };
  };

  return Timeline;
}]);
'use strict';

angular.module('huoyun.widget').directive('widgetsForm', ["$log", function ($log) {
  return {
    restrict: 'A',
    scope: {
      options: "=",
      data: "="
    },
    templateUrl: 'form/form.html',
    link: function link($scope, ele, attrs) {}
  };
}]);
'use strict';

angular.module('huoyun.widget').factory("FormHeaderOption", ["ButtonOption", "widgetsHelper", function (ButtonOption, widgetsHelper) {

  function FormHeaderOption(options) {
    this.title = options.title;
    this.buttons = [];

    var that = this;
    if (Array.isArray(options.buttons)) {
      options.buttons.forEach(function (buttonOption) {
        that.buttons.push(new ButtonOption(buttonOption));
      });
    }
  }

  FormHeaderOption.prototype.$$visibility = function () {
    return widgetsHelper.visibility(this);
  };

  return FormHeaderOption;
}]);

angular.module('huoyun.widget').factory("FormFooterOption", ["ButtonOption", "widgetsHelper", function (ButtonOption, widgetsHelper) {

  function FormFooterOption(options) {
    this.visibility = options.visibility;

    this.buttons = [];

    var that = this;
    if (Array.isArray(options.buttons)) {
      options.buttons.forEach(function (buttonOption) {
        that.buttons.push(new ButtonOption(buttonOption));
      });
    }
  }

  FormFooterOption.prototype.$$visibility = function () {
    return widgetsHelper.visibility(this);
  };

  return FormFooterOption;
}]);

angular.module('huoyun.widget').factory("FormGroupDataListSelection", [function () {
  var Modes = {
    Single: "Single",
    Multiple: "Multiple"
  };

  function FormGroupDataListSelection(options) {
    this.mode = Modes.Single;

    if (options && typeof options.mode === "string") {
      if (options.mode.toLowerCase() === "single") {
        this.mode = TableSelection.Single;
      } else if (options.mode.toLowerCase() === "multiple") {
        this.mode = TableSelection.Multiple;
      }
    }
  }

  FormGroupDataListSelection.prototype.isSingle = function () {
    return this.mode === Modes.Single;
  };

  return FormGroupDataListSelection;
}]);

angular.module('huoyun.widget').factory("FormGroupDataListOption", ["HuoyunPromise", "FormGroupDataListSelection", function (HuoyunPromise, FormGroupDataListSelection) {

  var props = ["valueField", "labelField", "itemTemplateUrl"];

  function FormGroupDataListOption(options) {
    var that = this;
    props.forEach(function (prop) {
      that[prop] = options[prop];
    });

    this.selection = new FormGroupDataListSelection(options.selection);

    this.getOptions = function () {
      return options;
    };
  }

  FormGroupDataListOption.prototype.$$getDataSource = function () {
    return HuoyunPromise.resolve(this.getOptions().getDataSource());
  };

  FormGroupDataListOption.prototype.$$search = function (val) {
    return HuoyunPromise.resolve(this.getOptions().search(val));
  };

  FormGroupDataListOption.prototype.$$loadMore = function (loadCount, searchText) {
    return HuoyunPromise.resolve(this.getOptions().loadMore(loadCount, searchText));
  };

  FormGroupDataListOption.prototype.$$loadVisibility = function () {
    return this.getOptions().loadVisibility === true;
  };

  FormGroupDataListOption.prototype.$$searchVisibility = function () {
    return this.getOptions().searchVisibility === true;
  };

  FormGroupDataListOption.prototype.$$getItemValueLabel = function (item) {
    return item && item[this.labelField];
  };

  FormGroupDataListOption.prototype.$$getItemsValueLabel = function (items) {
    if (Array.isArray(items)) {
      var that = this;

      return items.linq().join(function (item) {
        return item[that.labelField];
      }, ", ");
    }

    return items;
  };

  FormGroupDataListOption.prototype.$$getValueLabel = function (val) {
    if (this.selection.isSingle()) {
      return this.$$getItemValueLabel(val);
    }

    return this.$$getItemsValueLabel(val);
  };

  return FormGroupDataListOption;
}]);

angular.module('huoyun.widget').factory("FormGroupOption", ["widgetsHelper", "Form", "FormOrientation", "FormValidators", "FormGroupDataListOption", function (widgetsHelper, FormProvider, FormOrientation, FormValidators, FormGroupDataListOption) {

  var props = ["name", "label", "mandatory", "type", "readonly", "visibility", "disabled", "templateUrl", "appendLabelClass", "appendControlClass", "placeholder", "appendClass"];

  function FormGroupOption(options) {
    this.validators = [];
    var that = this;
    props.forEach(function (prop) {
      that[prop] = options[prop];
    });

    if (this.type === "DataList") {
      if (!options.datalist) {
        throw new Error("Not found property datalist");
      }
      that.datalist = new FormGroupDataListOption(options.datalist);
    }
  }

  FormGroupOption.prototype.setFormOption = function (formOption) {
    this.formOption = formOption;
  };

  FormGroupOption.prototype.setValue = function (val) {
    this.formOption.setPropertyValue(this.name, val);
  };

  FormGroupOption.prototype.getValue = function () {
    return this.formOption.getPropertyValue(this.name);
  };

  FormGroupOption.prototype.$$getValueLabel = function () {
    if (this.type === "DataList") {
      return this.datalist.$$getValueLabel(this.getValue());
    }

    return this.value;
  };

  FormGroupOption.prototype.$$visibility = function () {
    return widgetsHelper.visibility(this);
  };

  FormGroupOption.prototype.$$disabled = function () {
    return widgetsHelper.disabled(this);
  };

  FormGroupOption.prototype.$$readonly = function () {
    return widgetsHelper.readonly(this);
  };

  FormGroupOption.prototype.$$appendLabelClass = function () {
    if (this.formOption.$$readonly() || this.formOption.getFormOrientation() === FormOrientation.Horizontal) {
      return this.appendLabelClass || FormProvider.getLabelClass();
    }
  };

  FormGroupOption.prototype.$$appendControlClass = function () {
    if (this.formOption.$$readonly() || this.formOption.getFormOrientation() === FormOrientation.Horizontal) {
      return this.appendControlClass || FormProvider.getControlClass();
    }
  };

  FormGroupOption.prototype.addValidator = function (validator) {
    this.validators.push(new validator(this));
  };

  FormGroupOption.prototype.getValidators = function () {
    var validators = this.validators.concat([]);
    if (this.mandatory === true) {
      validators.push(new FormValidators.Mandatory(this));
    }

    if (this.type === "email") {
      validators.push(new FormValidators.Email(this));
    }

    return validators;
  };

  FormGroupOption.prototype.validator = function (val) {
    var promises = [];
    this.getValidators().forEach(function (validator) {
      promises.push(validator.onValid(val));
    });
    return Promise.all(promises);
  };

  FormGroupOption.prototype.setError = function (errorMessage) {
    this.hasError = true;
    if (errorMessage) {
      this.errorMessage = errorMessage;
    }
  };

  FormGroupOption.prototype.clearError = function () {
    this.hasError = false;
    this.errorMessage = null;
  };

  return FormGroupOption;
}]);

angular.module('huoyun.widget').constant("FormOrientation", {
  Horizontal: "horizontal",
  Vertical: "vertical"
});

angular.module('huoyun.widget').provider("Form", ["FormOrientation", function () {
  this.orientation = "horizontal";
  this.labelClass = "col-sm-2";
  this.controlClass = "col-sm-10";

  this.config = function (options) {
    if (options.orientation) {
      if (typeof options.orientation === "string") {
        if ([FormOrientation.Horizontal, FormOrientation.Vertical].indexOf(options.orientation.toLocaleLowerCase()) !== -1) {
          this.orientation = options.orientation;
        } else {
          throw new Error('Form orientation value must be "horizontal" or "vertical"');
        }
      } else {
        throw new Error('Form orientation value must be "horizontal" or "vertical"');
      }
    }

    this.labelClass = options.labelClass;
    this.controlClass = options.controlClass;
  };

  this.getOrientation = function () {
    return this.orientation;
  };

  this.getLabelClass = function () {
    return this.labelClass;
  };

  this.getControlClass = function () {
    return this.controlClass;
  };

  this.$get = function () {
    return this;
  };
}]);

angular.module('huoyun.widget').factory("FormOption", ["$q", "FormHeaderOption", "FormGroupOption", "FormFooterOption", "FormOrientation", "Form", function ($q, FormHeaderOption, FormGroupOption, FormFooterOption, FormOrientation, FormProvider) {
  this.data = {};

  function FormOption(options) {

    if (options.orientation) {
      if ([FormOrientation.Horizontal, FormOrientation.Vertical].indexOf(options.orientation.toLocaleLowerCase()) !== -1) {
        this.orientation = options.orientation;
      } else {
        throw new Error('Form orientation value must be "horizontal" or "vertical"');
      }
    }

    if (options.header) {
      this.header = new FormHeaderOption(options.header);
    }

    if (options.footer) {
      this.footer = new FormFooterOption(options.footer);
    }

    this.readonly = options.readonly;

    this.groups = [];

    var that = this;

    if (Array.isArray(options.groups)) {
      options.groups.forEach(function (groupOption) {
        var formGroupOption = new FormGroupOption(groupOption);
        formGroupOption.setFormOption(that);
        that.groups.push(formGroupOption);
      });
    }
  }

  FormOption.prototype.getFormOrientation = function () {
    if (this.orientation) {
      return this.orientation;
    }
    return FormProvider.getOrientation();
  };

  FormOption.prototype.$$formOrientationClass = function () {
    if (this.getFormOrientation() === FormOrientation.Horizontal) {
      return "form-horizontal";
    }
  };

  FormOption.prototype.$$readonly = function () {
    if (typeof this.readonly === "boolean") {
      return this.readonly;
    }

    return false;
  };

  FormOption.prototype.setData = function (data) {
    this.data = data;
  };

  FormOption.prototype.getData = function () {
    return this.data;
  };

  FormOption.prototype.setPropertyValue = function (name, val) {
    if (!this.data) {
      this.data = {};
    }

    this.data[name] = val;
  };

  FormOption.prototype.getPropertyValue = function (name) {
    return this.data && this.data[name];
  };

  FormOption.prototype.validator = function () {
    var that = this;

    var promises = [];
    this.groups.forEach(function (group) {
      promises.push(group.validator(that.data[group.name]));
    });

    var dtd = $q.defer();
    Promise.all(promises).then(function () {
      dtd.resolve();
    }).catch(function (ex) {
      dtd.reject(ex);
    });

    return dtd.promise;
  };

  return FormOption;
}]);

angular.module('huoyun.widget').factory("FormValidators", ["MandatoryValidator", "EmailValidator", function (MandatoryValidator, EmailValidator) {
  return {
    Mandatory: MandatoryValidator,
    Email: EmailValidator
  };
}]);
'use strict';

/**
 * options:
 *  items:
 *    label
 *    icon
 *    visibility
 *    style
 */

angular.module('huoyun.widget').directive('widgetsSideBar', ["$log", "widgetsHelper", function ($log, widgetsHelper) {
  return {
    restrict: 'A',
    scope: {
      options: "="
    },
    templateUrl: 'sidebar/sidebar.html',
    link: function link($scope, ele, attrs) {

      $scope.groupVisibility = function (group) {
        return widgetsHelper.visibility(group);
      };

      $scope.itemVisibility = function (item) {
        return widgetsHelper.visibility(item);
      };

      $scope.itemStyle = function (item) {
        return widgetsHelper.style(item);
      };

      $scope.onGroupItemClicked = function (group, groupItem) {
        if (typeof groupItem.onClick === "function") {
          groupItem.onClick.apply(null, [group, groupItem]);
        } else {
          $log.warn("Side bar no click handler.", group, groupItem);
        }
      };
    }
  };
}]);
'use strict';

angular.module('huoyun.widget').factory("SidebarOption", ["SidebarGroupOption", function (SidebarGroupOption) {

  function SidebarOption(options) {
    this.groups = [];
    if (Array.isArray(options.groups)) {
      var that = this;
      options.groups.forEach(function (group) {
        that.groups.push(new SidebarGroupOption(group));
      });
    }
  }

  SidebarOption.prototype.setGroupItemSelected = function (groupName, groupItemName) {
    var that = this;
    this.groups.forEach(function (group) {
      if (group.name === groupName) {
        group.setGroupItemSelected(groupItemName);
      } else {
        group.unselectedAll();
      }
    });
  };

  return SidebarOption;
}]);

angular.module('huoyun.widget').factory("SidebarGroupOption", ["SidebarGroupItemOption", function (SidebarGroupItemOption) {

  var props = ["name", "label", "icon"];

  function SidebarGroupOption(options) {
    var that = this;
    props.forEach(function (prop) {
      that[prop] = options[prop];
    });

    this.items = [];
    if (Array.isArray(options.items)) {
      options.items.forEach(function (item) {
        that.items.push(new SidebarGroupItemOption(item));
      });
    }
  }

  SidebarGroupOption.prototype.unselectedAll = function () {
    this.items.forEach(function (groupItem) {
      groupItem.setUnselected();
    });
  };

  SidebarGroupOption.prototype.setGroupItemSelected = function (groupItemName) {
    this.items.forEach(function ($groupItem) {
      if ($groupItem.name === groupItemName) {
        $groupItem.setSelected();
      } else {
        $groupItem.setUnselected();
      }
    });
  };

  return SidebarGroupOption;
}]);

angular.module('huoyun.widget').factory("SidebarGroupItemOption", [function () {

  var props = ["name", "label", "onClick", "selected"];

  function SidebarGroupItemOption(options) {
    var that = this;
    props.forEach(function (prop) {
      that[prop] = options[prop];
    });
  }

  SidebarGroupItemOption.prototype.setSelected = function () {
    this.selected = true;
  };

  SidebarGroupItemOption.prototype.setUnselected = function () {
    this.selected = false;
  };

  return SidebarGroupItemOption;
}]);
'use strict';

angular.module('huoyun.widget').run(['$templateCache', function ($templateCache) {
  $templateCache.put('checkbox/checkbox.html', '<div class="widgets-checkbox" ng-click="options.$$onClicked($event)"><i class="fa fa-check-square-o" aria-hidden="true" ng-class="{true: \'fa-check-square-o\', false: \'fa-square-o\'}[options.isChecked()]"></i> <span class="widgets-checkbox-content" ng-bind="options.label"></span></div>');
  $templateCache.put('breadcrumb/breadcrumb.html', '<div class="widgets-breadcrumb"><ol class="breadcrumb"><li ng-repeat="item in options.items" ng-click="onItemClicked(item,$index)" ng-style="itemStyle(item)"><i class="fa" ng-class="item.icon" aria-hidden="true"></i> <span ng-bind="item.label"></span></li></ol></div>');
  $templateCache.put('dialog/dialog.html', '<div class="box box-primary huoyun-dialog-content-container animated bounceInDown"><div class="box-header with-border"><h3 class="box-title"><i class="fa fa-info" aria-hidden="true"></i> <span ng-bind="ngDialogData.title"></span></h3></div><div class="box-body"><div ng-if="!ngDialogData.templateUrl" ng-bind="ngDialogData.content"></div><div ng-if="ngDialogData.templateUrl" ng-include="ngDialogData.templateUrl"></div></div><div class="box-footer"><button type="submit" ng-if="ngDialogData.cancelButtonVisibility" class="btn btn-default pull-right" ng-click="onCancelButtonClicked()" ng-bind="ngDialogData.cancelButtonText"></button> <button type="submit" ng-if="ngDialogData.confirmButtonVisibility" class="btn btn-primary pull-right" ng-click="onConfirmButtonClicked()" ng-bind="ngDialogData.confirmButtonText"></button></div></div>');
  $templateCache.put('head/head.html', '<div class="row widgets-head"><div class="col-md-8 widgets-head-title-container"><div ng-bind="options.title" ng-style="titleStyle(options.titleStyle)" ng-click="onTitleClick()"></div></div><div class="col-md-4 widgets-head-tools"><div ng-if="options.rightTemplateUrl" ng-include="options.rightTemplateUrl"></div></div></div>');
  $templateCache.put('form/form.html', '<div class="box widgets-form" form-readonly="{{options.$$readonly()}}"><div class="box-header" ng-if="options.header.$$visibility()"><h3 class="box-title" ng-bind="options.header.title"></h3><div class="box-tools pull-right"><div class="input-group input-group-sm"><button name="{{button.name}}" type="button" class="btn" ng-repeat="button in options.header.buttons" ng-class="button.appendClass" ng-if="button.$$visibility()" ng-disabled="button.$$disabled()" ng-style="button.$$style()" ng-click="button.$$click()"><i class="fa" aria-hidden="true" ng-if="button.icon" ng-class="button.icon"></i> <span ng-bind="button.label"></span></button></div></div></div><form ng-class="options.$$formOrientationClass()"><div class="box-body" ng-if="!options.$$readonly()"><div ng-repeat="formGroup in options.groups" prop-name="{{formGroup.name}}" prop-type="{{formGroup.type}}" ng-show="formGroup.$$visibility()"><div ng-if="formGroup.templateUrl"><div ng-include="formGroup.templateUrl"></div></div><div ng-if="!formGroup.templateUrl" ng-switch="formGroup.type"><div ng-switch-when="DataList" widgets-form-group-data-list="" options="formGroup" ng-model="options.data[formGroup.name]"></div><div ng-switch-when="email" widgets-form-group-email="" options="formGroup" ng-model="options.data[formGroup.name]"></div><div ng-switch-default="" widgets-form-group-string="" options="formGroup" ng-model="options.data[formGroup.name]"></div></div></div></div><div class="box-body" ng-if="options.$$readonly()"><div ng-repeat="formGroup in options.groups" prop-name="{{formGroup.name}}" prop-type="{{formGroup.type}}" ng-show="formGroup.$$visibility()"><div ng-if="formGroup.templateUrl"><div ng-include="formGroup.templateUrl"></div></div><div ng-if="!formGroup.templateUrl" ng-switch="formGroup.type"><div ng-switch-when="DataList" widgets-form-group-data-list="" options="formGroup" ng-model="options.data[formGroup.name]"></div><div ng-switch-when="email" widgets-form-group-label-email="" options="formGroup" ng-model="options.data[formGroup.name]"></div><div ng-switch-default="" widgets-form-group-label-string="" options="formGroup" ng-model="options.data[formGroup.name]"></div></div></div></div><div class="box-footer" ng-if="options.footer.$$visibility()"><button name="{{button.name}}" type="button" class="btn" ng-repeat="button in options.footer.buttons" ng-class="button.appendClass" ng-if="button.$$visibility()" ng-disabled="button.$$disabled()" ng-style="button.$$style()" ng-click="button.$$click()"><i class="fa" aria-hidden="true" ng-if="button.icon" ng-class="button.icon"></i> <span ng-bind="button.label"></span></button></div></form></div>');
  $templateCache.put('sidebar/sidebar.html', '<div class="widgets-side-bar"><aside><div ng-repeat="group in options.groups" ng-if="groupVisibility(group)"><div class="side-bar-group-header"><i class="fa" ng-class="group.icon" aria-hidden="true"></i> <span ng-bind="group.label"></span></div><ul class="side-bar-group-items-container"><li ng-repeat="groupItem in group.items" ng-bind="groupItem.label" ng-class="{true: \'selected\', false: \'\'}[groupItem.selected]" ng-click="onGroupItemClicked(group,groupItem)"></li></ul></div></aside></div>');
  $templateCache.put('nav/nav.html', '<div class="row widgets-nav"><nav><ul><li ng-repeat="item in options.items" ng-bind="item.label" ng-show="itemVisibility(item)" ng-style="itemStyle(item)" ng-click="onItemClicked(item)" ng-class="{true: \'selected\', false: \'\'}[item.selected]"></li></ul></nav></div>');
  $templateCache.put('search/search.form.html', '<div class="box bo-search-area"><div class="box-header with-border"><h3 class="box-title"><i class="fa" aria-hidden="true" ng-class="options.icon" ng-if="options.icon"></i> <span ng-bind="options.title"></span></h3><div class="box-tools"><div class="input-group input-group-sm"><button class="btn" ng-repeat="button in options.buttons" ng-class="button.appendClass" ng-if="button.$$visibility()" ng-disabled="button.$$disabled()" ng-style="button.$$style()" ng-click="button.$$click()"><i class="fa" aria-hidden="true" ng-class="button.icon" ng-if="button.icon"></i> <span ng-bind="button.label"></span></button></div></div></div><form class="form-horizontal" role="form"><div class="box-body"><div class="form-group col-md-4 bo-property-form-group" ng-repeat="prop in options.props" ng-switch="prop.type"><label for="{{prop.name}}" class="col-sm-3 control-label" ng-bind="prop.label"></label><div class="col-sm-9"><div ng-switch-when="Integer" widgets-search-form-number="" options="prop"></div><div ng-switch-when="DataList" widgets-search-form-data-list="" options="prop"></div><div ng-switch-default="" widgets-search-form-string="" options="prop"></div></div></div></div></form></div>');
  $templateCache.put('table/pagination.html', '<ul class="pagination pagination-sm no-margin pull-right widgets-pagination"><li ng-disabled="pageData.first"><span ng-click="onPagingClicked(pageData.number - 1)">\xAB</span></li><li ng-repeat="number in numbers" ng-class="{true: \'active\', false: \'\'}[number === pageData.number]"><span ng-bind="number + 1" ng-click="onPagingClicked(number)"></span></li><li ng-disabled="pageData.last"><span ng-click="onPagingClicked(pageData.number + 1)">\xBB</span></li></ul>');
  $templateCache.put('table/table.html', '<div class="box widgets-table"><div class="box-header" ng-style="options.header.$$style()"><h3 class="box-title"><i class="fa" aria-hidden="true" ng-class="options.header.icon" ng-if="options.header.icon"></i> <span ng-bind="options.header.title"></span></h3><div class="box-tools"><div class="input-group input-group-sm"><button class="btn" ng-repeat="button in options.header.buttons" ng-class="button.appendClass" ng-if="button.$$visibility()" ng-disabled="button.$$disabled()" ng-style="button.$$style()" ng-click="button.$$click()"><i class="fa" aria-hidden="true" ng-class="button.icon" ng-if="button.icon"></i> <span ng-bind="button.label"></span></button></div></div></div><div class="box-body table-responsive no-padding"><table class="table table-hover table-bordered" highlight="{{options.selection.isHighLight()}}"><tbody><tr class="no-hover"><th class="check-box-column" ng-if="options.$$showCheckBox()"><div widgets-check-box="" options="options.$$selectedAllOption"></div></th><th ng-repeat="column in options.columns" ng-show="column.$$visibility()" column-name="{{column.name}}" column-type="{{column.type}}" ng-style="column.$$style()"><div ng-if="column.headerTemplateUrl" ng-include="column.headerTemplateUrl"></div><div ng-if="!column.headerTemplateUrl" ng-bind="column.label"></div></th></tr><tr ng-show="options.isEmpty()"><td class="empty-table" colspan="{{options.$$columnCount()}}"><div ng-if="options.mask.templateUrl" ng-include="column.headerTemplateUrl"></div><div ng-if="!options.mask.templateUrl"><i class="fa" aria-hidden="true" ng-class="options.mask.icon" ng-if="options.mask.icon"></i> <span ng-bind="options.mask.text"></span></div></td></tr><tr ng-show="!options.isEmpty()" ng-repeat="line in options.source.lines" ng-click="options.$$onLineClicked(line,$index)" ng-class="{true: \'selected\', false: \'\'}[line.isSelected()]"><td class="check-box-column" ng-if="options.$$showCheckBox()"><div widgets-check-box="" options="line.checkboxOption"></div></td><td class="table-column" column-name="{{column.name}}" column-type="{{column.type}}" ng-repeat="column in options.columns" ng-show="column.$$visibility()" ng-style="column.$$style()"><div ng-if="column.templateUrl" ng-include="column.templateUrl"></div><div ng-if="!column.templateUrl" ng-switch="column.type"><span ng-switch-when="date" ng-bind="line.data[column.name] | date: getDateFilter()"></span> <span ng-switch-default="" ng-bind="line.data[column.name]"></span></div></td></tr></tbody></table></div><div class="box-footer clearfix"><div class="pull-left table-footer-total"></div><div widgets-pagination="" ng-show="options.source.totalPages" page-data="options.source" on-paging-changed="onPagingChangedHandler(pageIndex)"></div></div></div>');
  $templateCache.put('sidebar-panel/sidebar.panel.html', '<div class="widgets-side-bar-panel"><aside class="main-sidebar"><section class="sidebar"><ul class="sidebar-menu"><li class="treeview" ng-repeat="menu in options.getMenus()" ng-if="menu.isVisibility()" ng-class="menu.getAppendClass()"><a ng-click="menu.onClick()"><i class="fa" ng-class="menu.getIcon()"></i> <span ng-bind="menu.getLabel()"></span> <span class="pull-right-container" ng-if="options.getMenus().length !== 0"><i class="fa fa-angle-left pull-right"></i></span><div class="tri-angle" ng-if="options.getMenus().length !== 0"></div></a><ul class="treeview-menu"><li ng-repeat="menuitem in menu.getItems()" ng-if="menuitem.isVisibility()"><a ng-click="menuitem.onClick()"><i class="fa" ng-class="menuitem.getIcon()"></i> <span ng-bind="menuitem.getLabel()"></span></a></li></ul></li></ul></section></aside></div>');
  $templateCache.put('video/video.control.bar.html', '<div class="widgets-video-control-bar"><div widgets-video-progress-bar="" video="video"></div><div class="widgets-video-control-bar-panel"><button class="btn" ng-click="onPlayButtonClicked()" ng-disabled="playButtonDisabled()" ng-show="playButtonVisibility()"><i class="fa" aria-hidden="true" ng-class="button.icon"></i> <span>\u64AD\u653E</span></button> <button class="btn" ng-click="onPauseButtonClicked()" ng-disabled="pauseButtonDisabled()" ng-show="!playButtonVisibility()"><i class="fa" aria-hidden="true" ng-class="button.icon"></i> <span>\u6682\u505C</span></button> <button class="btn" ng-click="onFastBackwardButtonClicked()"><i class="fa" aria-hidden="true" ng-class="button.icon"></i> <span>\u5FEB\u9000</span></button> <button class="btn" ng-click="onFastForwardButtonClicked()"><i class="fa" aria-hidden="true" ng-class="button.icon"></i> <span>\u5FEB\u8FDB</span></button> <button class="btn" ng-click="onRateButtonClicked(1)" ng-disabled="onRateButtonDisabled(1)"><i class="fa" aria-hidden="true" ng-class="button.icon"></i> <span>\u6B63\u5E38\u901F\u7387</span></button> <button class="btn" ng-click="onRateButtonClicked(2)" ng-disabled="onRateButtonDisabled(2)"><i class="fa" aria-hidden="true" ng-class="button.icon"></i> <span>2\u500D\u901F\u7387</span></button> <button class="btn" ng-click="onRateButtonClicked(4)" ng-disabled="onRateButtonDisabled(4)"><i class="fa" aria-hidden="true" ng-class="button.icon"></i> <span>4\u500D\u901F\u7387</span></button> <button class="btn" ng-click="onRateButtonClicked(8)" ng-disabled="onRateButtonDisabled(8)"><i class="fa" aria-hidden="true" ng-class="button.icon"></i> <span>8\u500D\u901F\u7387</span></button> <button class="btn" ng-click="onPerviousFrameButtonClicked()"><i class="fa" aria-hidden="true" ng-class="button.icon"></i> <span>\u4E0A\u4E00\u5E27</span></button> <button class="btn" ng-click="onNextFrameButtonClicked()"><i class="fa" aria-hidden="true" ng-class="button.icon"></i> <span>\u4E0B\u4E00\u5E27</span></button><div class="pull-right"><span class="marign-right-100" ng-bind="getTimeInfo()"></span> <span ng-bind="getFrameInfo()"></span></div></div></div>');
  $templateCache.put('video/video.player.html', '<div class="box widgets-video-player"><div class="box-header"><h3 class="box-title"><i class="fa fa-server" aria-hidden="true"></i> <span ng-bind="options.title"></span></h3><div class="box-tools"><div class="input-group input-group-sm"><button class="btn" ng-repeat="button in options.buttons" ng-show="buttonVisibility(button)" ng-click="onButtonClicked(button)" ng-style="buttonStyle(button)" ng-class="buttonClass(button)" ng-disabled="buttonDisabled(button)"><i ng-show="button.icon" class="fa" aria-hidden="true" ng-class="button.icon"></i> <span ng-bind="button.label"></span></button></div></div></div><div class="box-body no-padding" widgets-story-board="" svg-options="svgOptions" frame-index="video.currentFrame"><video preload="metadata"><source type="video/mp4" ng-src="{{src}}"></video></div><div class="box-footer clearfix"><div widgets-video-control-bar="" video="video"></div></div></div>');
  $templateCache.put('video/video.progress.bar.html', '<div class="widgets-video-progress-bar" drag="{{inDraging}}"><div class="progress progress-xxs" ng-click="onProgressBarClicked($event)"><div class="progress-bar progress-bar-success" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" ng-style="progressStyle()"><span class="sr-only" ng-style="radioButtonStyle()"><div class="sr-only-inner progress-bar-success" ng-mousedown="onDragRadioButtonDown($event)"></div></span></div></div></div>');
  $templateCache.put('tip/tip.html', '<div class="alert alert-success alert-dismissible widget-tip"><span ng-bind="message"></span></div>');
  $templateCache.put('form/formgroup/formgroup.datalist.dialog.html', '<div class="widgets-form-group-data-list-dialog" ng-controller="FormGroupDataListController"><div class="input-group search-box" ng-if="searchVisibility()"><span class="input-group-addon"><i class="fa fa-search" aria-hidden="true"></i></span> <input class="form-control" type="text" ng-model="$parent.searchText" ng-change="onSearchTextChanged()"> <span class="input-group-addon search-box-remove-icon" ng-show="searchText" ng-click="onSearchTextCleared()"><i class="fa fa-remove" aria-hidden="true"></i></span></div><div class="single-selection-panel" ng-if="isSingle()"><div class="item-template" ng-repeat="dataItem in dataSource" ng-click="onItemClicked(dataItem)"><div ng-if="itemTemplateUrl" ng-include="itemTemplateUrl"></div><div ng-if="!itemTemplateUrl" ng-bind="getValueLabel(dataItem)"></div></div></div><div class="multi-selection-panel" ng-if="!isSingle()"><div class="item-template"><div widgets-check-box="" options="selectedAllOption"></div></div><div class="item-template" ng-repeat="dataItem in dataSource"><div widgets-check-box="" options="dataItem.checkboxOption"></div></div></div><div class="item-template load-more" ng-click="loadMore()" ng-if="loadVisibility()"><div>\u52A0\u8F7D\u66F4\u591A...</div></div></div>');
  $templateCache.put('form/formgroup/formgroup.datalist.html', '<div class="form-group widgets-form-group-data-list" mandatory="{{options.mandatory}}" ng-class="options.appendClass" has-error="{{options.hasError}}"><label for="{{options.name}}" class="control-label" ng-bind="options.label" ng-class="options.$$appendLabelClass()"></label><div ng-if="!options.$$readonly()" ng-class="options.$$appendControlClass()"><div class="input-group" ng-click="onButtonClicked()"><span class="input-group-addon"><i class="fa fa-link"></i></span> <input type="text" class="form-control" id="{{options.name}}" readonly="" placeholder="{{options.placeholder}}" ng-value="options.$$getValueLabel()" ng-disabled="options.$$disabled()"></div><span class="help-block" ng-bind="options.errorMessage"></span></div><div ng-if="options.$$readonly()" ng-class="options.$$appendControlClass()"><div class="form-control" ng-bind="$parent.value" readonly=""></div></div></div>');
  $templateCache.put('form/formgroup/formgroup.email.html', '<div class="form-group widgets-form-group-email" mandatory="{{options.mandatory}}" ng-class="options.appendClass" has-error="{{options.hasError}}"><label for="{{options.name}}" class="control-label" ng-bind="options.label" ng-class="options.$$appendLabelClass()"></label><div ng-if="!options.$$readonly()" ng-class="options.$$appendControlClass()"><div class="input-group"><span class="input-group-addon"><i class="fa fa-envelope"></i></span> <input type="email" class="form-control" id="{{options.name}}" placeholder="{{options.placeholder}}" ng-model="$parent.value" ng-disabled="options.$$disabled()"></div><span class="help-block" ng-bind="options.errorMessage"></span></div><div ng-if="options.$$readonly()" ng-class="options.$$appendControlClass()"><div class="form-control" ng-bind="$parent.value" readonly=""></div></div></div>');
  $templateCache.put('form/formgroup/formgroup.string.html', '<div class="form-group widgets-form-group-string" mandatory="{{options.mandatory}}" ng-class="options.appendClass" has-error="{{options.hasError}}"><label for="{{options.name}}" class="control-label" ng-bind="options.label" ng-class="options.$$appendLabelClass()"></label><div ng-if="!options.$$readonly()" ng-class="options.$$appendControlClass()"><input type="text" class="form-control" id="{{options.name}}" placeholder="{{options.placeholder}}" ng-model="$parent.value" ng-disabled="options.$$disabled()"> <span class="help-block" ng-bind="options.errorMessage"></span></div><div ng-if="options.$$readonly()" ng-class="options.$$appendControlClass()"><div class="form-control" ng-bind="$parent.value" readonly=""></div></div></div>');
  $templateCache.put('form/formgrouplabel/formgrouplabel.email.html', '<div class="form-group widgets-form-group-label-email" ng-class="options.appendClass"><label for="{{options.name}}" class="control-label" ng-bind="options.label" ng-class="options.$$appendLabelClass()"></label><div ng-class="options.$$appendControlClass()"><div class="value-label"><a ng-href="{{value | EmailLink}}" ng-if="value" ng-bind="value"></a></div></div></div>');
  $templateCache.put('form/formgrouplabel/formgrouplabel.string.html', '<div class="form-group widgets-form-group-label-string" ng-class="options.appendClass"><label for="{{options.name}}" class="control-label" ng-bind="options.label" ng-class="options.$$appendLabelClass()"></label><div ng-class="options.$$appendControlClass()"><div class="value-label" ng-bind="value"></div></div></div>');
  $templateCache.put('search/datalist/search.form.datalist.dialog.html', '<div class="widgets-search-form-data-list-dialog" ng-controller="SearchFormDataListController"><div class="input-group search-box" ng-if="searchVisibility()"><span class="input-group-addon"><i class="fa fa-search" aria-hidden="true"></i></span> <input class="form-control" type="text" ng-model="$parent.searchText" ng-change="onSearchTextChanged()"> <span class="input-group-addon search-box-remove-icon" ng-show="searchText" ng-click="onSearchTextCleared()"><i class="fa fa-remove" aria-hidden="true"></i></span></div><div class="item-template"><div widgets-check-box="" options="selectedAllOption"></div></div><div class="item-template" ng-repeat="dataItem in dataSource"><div widgets-check-box="" options="dataItem.checkboxOption"></div></div><div class="item-template load-more" ng-click="loadMore()" ng-if="loadVisibility()"><div>\u52A0\u8F7D\u66F4\u591A...</div></div></div>');
  $templateCache.put('search/datalist/search.form.datalist.html', '<div class="input-group"><input type="text" class="form-control" ng-value="options.$$getValueExpr()" readonly="" placeholder="{{options.placeholder}}"> <span class="input-group-addon"><i class="fa fa-filter" ng-click="onButtonClicked()"></i></span></div>');
  $templateCache.put('search/number/search.form.number.dialog.html', '<div class="search-form-number-dialog" ng-controller="SearchFormNumberDialog"><div class="box-body"><div class="form-group"><label for="rule">\u89C4\u5219</label><select id="rule" class="form-control" ng-model="condition.op" ng-options="cond.name as cond.label for cond in conditions"></select></div><div class="form-group" ng-if="condition.op !== \'between\'"><label for="value">\u503C</label> <input id="value" class="form-control" type="number" ng-model="$parent.condition.value"></div><div class="form-group" ng-if="condition.op === \'between\'"><label for="from">\u4ECE</label> <input id="from" class="form-control" type="number" ng-model="$parent.condition.left"></div><div class="form-group" ng-if="condition.op === \'between\'"><label for="to">\u5230</label> <input id="to" class="form-control" type="number" ng-model="$parent.condition.right"></div></div></div>');
  $templateCache.put('search/number/search.form.number.html', '<div class="input-group"><input type="text" class="form-control" ng-value="options.$$getValueExpr()" readonly="" placeholder="{{options.placeholder}}"> <span class="input-group-addon"><i class="fa fa-filter" ng-click="onButtonClicked()"></i></span></div>');
  $templateCache.put('search/string/search.form.string.html', '<input type="text" ng-model="options.value" ng-change="options.$$onChanged(options.value)" placeholder="{{options.placeholder}}" class="form-control">');
}]);
'use strict';

/**
 * options:
 *  items:
 *    label
 *    visibility
 *    style
 */

angular.module('huoyun.widget').directive('widgetsNav', ["$log", "widgetsHelper", function ($log, widgetsHelper) {
  return {
    restrict: 'A',
    scope: {
      options: "="
    },
    templateUrl: 'nav/nav.html',
    link: function link($scope, ele, attrs) {

      $scope.itemVisibility = function (item) {
        return widgetsHelper.visibility(item);
      };

      $scope.itemStyle = function (item) {
        return widgetsHelper.style(item);
      };

      $scope.onItemClicked = function (item) {
        if (typeof item.onClick === "function") {
          item.onClick.apply(item);
        } else {
          $log.warn("Nav item no click handler.", item);
        }
      };
    }
  };
}]);
'use strict';

angular.module('huoyun.widget').factory("NavOption", ["NavItemOption", function (NavItemOption) {

  function NavOption(options) {
    this.items = [];
    if (Array.isArray(options.items)) {
      var that = this;
      options.items.forEach(function (item) {
        that.items.push(new NavItemOption(item));
      });
    }
  }

  NavOption.prototype.setSelected = function (name) {
    this.items.forEach(function (item) {
      if (item.name === name) {
        item.setSelected();
      } else {
        item.setUnSelected();
      }
    });
  };

  return NavOption;
}]);

angular.module('huoyun.widget').factory("NavItemOption", [function () {

  var props = ["name", "label", "onClick", "visibility", "style", "selected"];

  function NavItemOption(options) {
    var that = this;
    props.forEach(function (prop) {
      that[prop] = options[prop];
    });
  }

  NavItemOption.prototype.setSelected = function () {
    this.selected = true;
  };

  NavItemOption.prototype.setUnSelected = function () {
    this.selected = false;
  };

  return NavItemOption;
}]);
'use strict';

angular.module('huoyun.widget').provider("SearchExpr", function () {

  var CompareOps = ["eq", "ne", "gt", "ge", "lt", "le"];

  function SearchExpr() {}

  SearchExpr.prototype.getStringExpr = function (prop) {
    return prop.value && prop.name + ' like \'' + prop.value + '\'';
  };

  SearchExpr.prototype.getNumberExpr = function (prop) {
    if (prop.value) {
      if (CompareOps.indexOf(prop.value.op) !== -1) {
        return prop.name + ' ' + prop.value.op + ' ' + prop.value.value;
      }

      if (prop.value.op === "between") {
        return prop.name + ' between (' + prop.value.left + ' , ' + prop.value.right + ')';
      }
    }
  };

  SearchExpr.prototype.getDataListExpr = function (prop) {
    if (Array.isArray(prop.value) && prop.value.length > 0) {
      var res = [];
      prop.value.forEach(function (item) {
        res.push(item[prop.datalist.valueField]);
      });

      return prop.name + ' in ( ' + res.join(", ") + ' )';
    }
  };

  SearchExpr.prototype.getExpr = function (prop) {
    if (typeof prop.type !== "string") {
      throw new Error('Unkonwn property type.', prop);
    }

    if (prop.type.toLocaleLowerCase() === "string") {
      return this.getStringExpr(prop);
    }

    if (prop.type.toLocaleLowerCase() === "integer") {
      return this.getNumberExpr(prop);
    }

    if (prop.type.toLocaleLowerCase() === "datalist") {
      return this.getDataListExpr(prop);
    }
  };

  var expr = new SearchExpr();

  this.config = function (options) {
    ["String"].forEach(function (type) {
      if (typeof options[type] === "function") {
        SearchExpr.prototype['get' + type + 'Expr'] = options[type];
      }
    });
  };

  this.$get = function () {
    return expr;
  };
});
'use strict';

angular.module('huoyun.widget').directive('widgetsSearchForm', [function () {
  return {
    restrict: 'A',
    scope: {
      options: "="
    },
    templateUrl: 'search/search.form.html',
    link: function link($scope, elem, attrs) {}
  };
}]);
'use strict';

angular.module('huoyun.widget').factory("SearchConditions", [function () {

  return [{
    name: "eq",
    label: "等于",
    op: "="
  }, {
    name: "ne",
    label: "不等于",
    op: "<>"
  }, {
    name: "gt",
    label: "大于",
    op: ">"
  }, {
    name: "ge",
    label: "大于等于",
    op: ">="
  }, {
    name: "lt",
    label: "小于",
    op: "<"
  }, {
    name: "le",
    label: "小于等于",
    op: "<="
  }, {
    name: "between",
    label: "在范围内"
  }];
}]);

angular.module('huoyun.widget').factory("SearchConditionValue", ["SearchConditions", function (SearchConditions) {

  var props = ["op", "value", "left", "right"];

  function SearchConditionValue(options) {
    var that = this;
    props.forEach(function (prop) {
      that[prop] = options[prop];
    });
  };

  SearchConditionValue.prototype.$$getValueExpr = function () {
    if (this.op === "between") {
      return '[ ' + this.left + ' , ' + this.right + ' ]';
    }

    for (var index = 0; index < SearchConditions.length; index++) {
      if (SearchConditions[index].name === this.op) {
        return SearchConditions[index].label + ' ' + this.value;
      }
    }
  };

  return SearchConditionValue;
}]);

angular.module('huoyun.widget').factory("SearchPropertyDataListOption", ["HuoyunPromise", function (HuoyunPromise) {

  var props = ["valueField", "labelField", "itemTemplateUrl", "searchVisibility", "loadVisibility"];

  function SearchPropertyDataListOption(options) {
    var that = this;
    props.forEach(function (prop) {
      that[prop] = options[prop];
    });

    this.getOptions = function () {
      return options;
    };
  };

  SearchPropertyDataListOption.prototype.$$getDataSource = function () {
    return HuoyunPromise.resolve(this.getOptions().getDataSource());
  };

  SearchPropertyDataListOption.prototype.$$search = function (val) {
    return HuoyunPromise.resolve(this.getOptions().search(val));
  };

  SearchPropertyDataListOption.prototype.$$loadMore = function (loadCount, searchText) {
    return HuoyunPromise.resolve(this.getOptions().loadMore(loadCount, searchText));
  };

  SearchPropertyDataListOption.prototype.$$loadVisibility = function () {
    return this.loadVisibility === true;
  };

  SearchPropertyDataListOption.prototype.$$searchVisibility = function () {
    return this.searchVisibility === true;
  };

  SearchPropertyDataListOption.prototype.$$getValueExpr = function (values) {
    if (Array.isArray(values)) {
      var that = this;

      return values.linq().join(function (value) {
        return value[that.labelField];
      }, ", ");
    }
  };

  return SearchPropertyDataListOption;
}]);

angular.module('huoyun.widget').factory("SearchPropertyOption", ["SearchExpr", "SearchPropertyDataListOption", "SearchConditionValue", function (SearchExprProvider, SearchPropertyDataListOption, SearchConditionValue) {

  var props = ["name", "label", "type", "value", "getSearchExpr", "getValueExpr"];

  function SearchPropertyOption(options) {
    var that = this;
    props.forEach(function (prop) {
      that[prop] = options[prop];
    });

    if (that.type === "DataList") {
      if (!options.datalist) {
        throw new Error("Not found property datalist");
      }
      that.datalist = new SearchPropertyDataListOption(options.datalist);
    }
  }

  SearchPropertyOption.prototype.$$onChanged = function (val) {
    this.form.search();
  };

  SearchPropertyOption.prototype.setForm = function (form) {
    this.form = form;
  };

  SearchPropertyOption.prototype.setValue = function (val) {
    this.value = val;
  };

  SearchPropertyOption.prototype.clear = function () {
    this.value = null;
  };

  SearchPropertyOption.prototype.$$getValueExpr = function () {
    if (typeof this.getValueExpr === "function") {
      return this.getValueExpr(this);
    }

    if (this.type === "DataList") {
      return this.datalist && this.datalist.$$getValueExpr(this.value);
    }

    if (this.value instanceof SearchConditionValue) {
      return this.value.$$getValueExpr();
    }
  };

  SearchPropertyOption.prototype.$$getSearchExpr = function () {
    if (typeof this.getSearchExpr === "function") {
      return this.getSearchExpr(this);
    }

    return SearchExprProvider.getExpr(this);
  };

  return SearchPropertyOption;
}]);

angular.module('huoyun.widget').factory("SearchFormOption", ["ButtonOption", "widgetsHelper", "SearchPropertyOption", function (ButtonOption, widgetsHelper, SearchPropertyOption) {

  var props = ["title", "icon"];
  var eventHandlers = ["onSearch"];

  function SearchFormOption(options) {
    var that = this;

    props.forEach(function (prop) {
      that[prop] = options[prop];
    });

    eventHandlers.forEach(function (eventHandler) {
      if (options[eventHandler] && typeof options[eventHandler] === "function") {
        that[eventHandler] = options[eventHandler];
      }
    });

    that.props = [];
    if (Array.isArray(options.props)) {
      options.props.forEach(function (prop) {
        var propOption = new SearchPropertyOption(prop);
        propOption.setForm(that);
        that.props.push(propOption);
      });
    }

    that.buttons = [];
    if (Array.isArray(options.buttons)) {
      options.buttons.forEach(function (button) {
        that.buttons.push(new ButtonOption(button));
      });
    }
  }

  SearchFormOption.prototype.search = function () {
    if (this.onSearch) {
      var that = this;
      var expr = that.props.linq().join(function (prop) {
        return prop.$$getSearchExpr();
      }, " and ");
      this.onSearch(expr);
    }
  };

  SearchFormOption.prototype.clear = function () {
    var that = this;
    that.props.forEach(function (prop) {
      prop.clear();
    });
    this.onSearch && this.onSearch();
  };

  return SearchFormOption;
}]);
'use strict';

angular.module('huoyun.widget').directive('widgetsPagination', function () {
  return {
    restrict: 'A',
    scope: {
      pageData: "=",
      onPagingChanged: "&"
    },
    templateUrl: 'table/pagination.html',
    link: function link($scope, ele, attrs) {
      var MAXNumberCount = 5;
      $scope.numbers = [];

      $scope.$watch("pageData", function (newValue, oldValue) {
        if (newValue) {
          refresh(newValue);
        } else {
          $scope.numbers = [];
        }
      });

      $scope.onPagingClicked = function (pageIndex) {
        $scope.onPagingChanged({
          pageIndex: pageIndex
        });
      };

      function refresh(pageData) {
        $scope.numbers = [];
        var startIndex = parseInt(pageData.number / MAXNumberCount) * MAXNumberCount;
        var endIndex = startIndex + MAXNumberCount;
        if (endIndex > pageData.totalPages) {
          endIndex = pageData.totalPages;
        }
        for (var index = startIndex; index < endIndex; index++) {
          $scope.numbers.push(index);
        }
      }
    }
  };
});
'use strict';

angular.module('huoyun.widget').directive('widgetsTable', ["display", function (displayProvider) {
  return {
    restrict: 'A',
    scope: {
      options: "=",
      source: "=",
      onRowClicked: "&",
      onPagingChanged: "&"
    },
    templateUrl: 'table/table.html',
    link: function link($scope, elem, attrs) {

      $scope.getDateFilter = function () {
        return displayProvider.date;
      };
    }
  };
}]);
'use strict';

angular.module('huoyun.widget').factory("TableSelection", function () {
  var Modes = {
    None: "None",
    Single: "Single",
    Multiple: "Multiple"
  };

  return Modes;
});

angular.module('huoyun.widget').factory("TableSelectionOption", ["TableSelection", function (TableSelection) {

  var props = ["checkbox", "hightlight"];

  function TableSelectionOption(options) {
    var that = this;
    props.forEach(function (prop) {
      that[prop] = options[prop];
    });

    this.mode = TableSelection.None;

    if (typeof options.mode === "string") {
      if (options.mode.toLowerCase() === "single") {
        this.mode = TableSelection.Single;
      } else if (options.mode.toLowerCase() === "multiple") {
        this.mode = TableSelection.Multiple;
      }
    }
  }

  TableSelectionOption.prototype.checkBoxVisibility = function () {
    return this.checkbox === true;
  };

  TableSelectionOption.prototype.isHighLight = function () {
    return this.hightlight !== false;
  };

  return TableSelectionOption;
}]);

angular.module('huoyun.widget').factory("TableMaskLayerOption", [function () {

  var props = ["icon", "text", "templateUrl", "style"];

  function TableMaskLayerOption() {
    var that = this;
    props.forEach(function (prop) {
      that[prop] = options[prop];
    });
  }

  return TableMaskLayerOption;
}]);

angular.module('huoyun.widget').factory("TableHeaderOption", ["ButtonOption", "widgetsHelper", function (ButtonOption, widgetsHelper) {

  var props = ["style", "title", "icon"];

  function TableHeaderOption(options) {
    var that = this;
    props.forEach(function (prop) {
      that[prop] = options[prop];
    });

    that.buttons = [];

    if (Array.isArray(options.buttons)) {
      options.buttons.forEach(function (buttonOption) {
        that.buttons.push(new ButtonOption(buttonOption));
      });
    }
  }

  TableHeaderOption.prototype.$$style = function () {
    return widgetsHelper.style(this);
  };

  return TableHeaderOption;
}]);

angular.module('huoyun.widget').factory("TableColumnOption", ["widgetsHelper", function (widgetsHelper) {

  var props = ["name", "label", "type", "visibility", "headerTemplateUrl", "templateUrl", "style"];

  function TableColumnOption(options) {
    var that = this;
    props.forEach(function (prop) {
      that[prop] = options[prop];
    });
  }

  TableColumnOption.prototype.$$style = function () {
    return widgetsHelper.style(this);
  };

  TableColumnOption.prototype.$$visibility = function () {
    return widgetsHelper.visibility(this);
  };

  return TableColumnOption;
}]);

angular.module('huoyun.widget').factory("TableLineData", ["CheckBoxOption", function (CheckBoxOption) {

  function TableLineData(data) {
    this.data = data;
    this.$$selected = false;
    this.checkboxOption = new CheckBoxOption({ value: false });
  }

  TableLineData.prototype.selected = function () {
    this.$$selected = true;
    this.checkboxOption.value = true;
  };

  TableLineData.prototype.unselected = function () {
    this.$$selected = false;
    this.checkboxOption.value = false;
  };

  TableLineData.prototype.isSelected = function () {
    return this.$$selected;
  };

  return TableLineData;
}]);

angular.module('huoyun.widget').factory("TableSource", ["TableLineData", function (TableLineData) {

  var props = ["first", "last", "number", "numberOfElements", "size", "sort", "totalElements", "totalPages"];

  function TableSource(options) {
    var that = this;
    props.forEach(function (prop) {
      that[prop] = options[prop];
    });

    that.lines = [];
    if (Array.isArray(options.content)) {
      options.content.forEach(function (item) {
        that.lines.push(new TableLineData(item));
      });
    }
  }

  TableSource.prototype.count = function () {
    return this.lines.length;
  };

  TableSource.prototype.selectedAll = function () {
    this.lines.forEach(function (line) {
      line.selected();
    });
  };

  TableSource.prototype.unselectedAll = function () {
    this.lines.forEach(function (line) {
      line.unselected();
    });
  };

  TableSource.prototype.selected = function ($line) {
    var that = this;
    that.lines.forEach(function (line) {
      if (line === $line) {
        line.selected();
      } else {
        line.unselected();
      }
    });
  };

  TableSource.prototype.addSelected = function ($line) {
    $line.selected();
  };

  TableSource.prototype.removeSelected = function ($line) {
    $line.unselected();
  };

  TableSource.prototype.getSelectedItems = function () {
    var that = this;
    var items = [];
    that.lines.forEach(function (line) {
      if (line.isSelected()) {
        items.push(line);
      }
    });

    return items;
  };

  TableSource.prototype.getSelectedItem = function () {
    for (var index = 0; index < this.lines.length; index++) {
      if (this.lines[index].isSelected()) {
        return this.lines[index];
      }
    }
  };

  return TableSource;
}]);

angular.module('huoyun.widget').factory("TableOption", ["TableSelection", "TableColumnOption", "TableSource", "TableHeaderOption", "TableMaskLayerOption", "TableSelectionOption", "CheckBoxOption", function (TableSelection, TableColumnOption, TableSource, TableHeaderOption, TableMaskLayerOption, TableSelectionOption, CheckBoxOption) {

  var eventHandlers = ["onSelectChanged"];

  function TableOption(options) {
    this.title = options.title;
    this.buttons = [];
    this.columns = [];
    this.source = null;

    if (options.selection) {
      this.selection = new TableSelectionOption(options.selection);
    }

    if (options.header) {
      this.header = new TableHeaderOption(options.header);
    }

    if (options.mask) {
      this.mask = new TableMaskLayerOption(options.mask);
    }

    var that = this;
    if (Array.isArray(options.columns)) {
      options.columns.forEach(function (columnOption) {
        that.columns.push(new TableColumnOption(columnOption));
      });
    }

    eventHandlers.forEach(function (eventHandler) {
      if (options[eventHandler] && typeof options[eventHandler] === "function") {
        that[eventHandler] = options[eventHandler];
      }
    });

    that.$$selectedAllOption = new CheckBoxOption({
      value: false,
      onCheckChanged: function onCheckChanged(event, oldVal, newVal) {
        if (newVal) {
          that.source && that.source.selectedAll();
        } else {
          that.source && that.source.unselectedAll();
        }
      }
    });
  }

  TableOption.prototype.getSelectionMode = function () {
    if (this.selection) {
      return this.selection.mode;
    }

    return TableSelection.None;
  };

  TableOption.prototype.getSelectedItem = function () {
    if (this.source && this.getSelectionMode() === TableSelection.Single) {
      return this.source.getSelectedItem();
    }
  };

  TableOption.prototype.$$showCheckBox = function () {
    if (this.getSelectionMode() === TableSelection.Multiple) {
      return this.selection.checkBoxVisibility();
    }

    return false;
  };

  TableOption.prototype.setSource = function (source) {
    this.source = new TableSource(source);
  };

  TableOption.prototype.isEmpty = function () {
    return this.source && this.source.count() === 0;
  };

  TableOption.prototype.$$columnCount = function () {
    if (this.source) {
      return this.source.count();
    }

    return 0;
  };

  TableOption.prototype.$$onLineClicked = function (lineData, index) {
    if (this.getSelectionMode() === TableSelection.Single) {
      if (!lineData.isSelected()) {
        this.source.selected(lineData);
        this.onSelectChanged && this.onSelectChanged(this.source.getSelectedItem());
      }
    } else if (this.getSelectionMode() === TableSelection.Multiple) {
      if (!lineData.isSelected()) {
        this.source.addSelected(lineData);
      } else {
        this.source.removeSelected(lineData);
      }
      this.onSelectChanged && this.onSelectChanged(this.source.getSelectedItems());
    }
  };

  return TableOption;
}]);
'use strict';

angular.module('huoyun.widget').directive('widgetsSideBarPanel', [function () {
  return {
    restrict: 'A',
    scope: {
      options: "="
    },
    templateUrl: 'sidebar-panel/sidebar.panel.html',
    link: function link($scope, elem, attrs) {}
  };
}]);
'use strict';

angular.module('huoyun.widget').factory("SidebarPanelOption", ["SidebarMenuOption", function (SidebarMenuOption) {

  function SidebarPanelOption(options) {

    this.menus = [];

    if (Array.isArray(options.menus)) {
      var that = this;
      options.menus.forEach(function (menu) {
        var menuOption = new SidebarMenuOption(menu);
        that.menus.push(menuOption);
      });
    }

    this.getOptions = function () {
      return options;
    };
  }

  SidebarPanelOption.prototype.getMenus = function () {
    return this.menus;
  };

  return SidebarPanelOption;
}]);

angular.module('huoyun.widget').factory("SidebarMenuOption", ["SidebarMenuItemOption", "widgetsHelper", function (SidebarMenuItemOption, widgetsHelper) {

  function SidebarMenuOption(options) {

    this.items = [];
    if (Array.isArray(options.items)) {
      var that = this;
      options.items.forEach(function (item) {
        var menuItem = new SidebarMenuItemOption(item);
        menuItem.setMenu(that);
        that.items.push(menuItem);
      });
    }

    this.getOptions = function () {
      return options;
    };
  }

  SidebarMenuOption.prototype.getItems = function () {
    return this.items;
  };

  SidebarMenuOption.prototype.isVisibility = function () {
    return widgetsHelper.visibility(this.getOptions());
  };

  SidebarMenuOption.prototype.getLabel = function () {
    return this.getOptions().label;
  };

  SidebarMenuOption.prototype.getIcon = function () {
    return this.getOptions().icon;
  };

  SidebarMenuOption.prototype.onClick = function () {
    if (this.getItems().length > 0) {
      if (this.isExpand()) {
        this.collapse();
      } else {
        this.expand();
      }

      return;
    }

    var options = this.getOptions();
    if (typeof options.onClick === "function") {
      options.onClick(this);
    }
  };

  SidebarMenuOption.prototype.isExpand = function () {
    return this.$$activeClass === "active";
  };

  SidebarMenuOption.prototype.expand = function () {
    this.$$activeClass = "active";
  };

  SidebarMenuOption.prototype.collapse = function () {
    this.$$activeClass = "";
  };

  SidebarMenuOption.prototype.getAppendClass = function () {
    return this.$$activeClass + this.getOptions().appendClass;
  };

  return SidebarMenuOption;
}]);

angular.module('huoyun.widget').factory("SidebarMenuItemOption", ["widgetsHelper", function (widgetsHelper) {

  function SidebarMenuItemOption(options) {
    this.getOptions = function () {
      return options;
    };
  }

  SidebarMenuItemOption.prototype.setMenu = function (menu) {
    this.menu = menu;
  };

  SidebarMenuItemOption.prototype.isVisibility = function () {
    return widgetsHelper.visibility(this.getOptions());
  };

  SidebarMenuItemOption.prototype.onClick = function () {
    var options = this.getOptions();
    if (typeof options.onClick === "function") {
      options.onClick(this);
    }
  };

  SidebarMenuItemOption.prototype.getLabel = function () {
    return this.getOptions().label;
  };

  SidebarMenuItemOption.prototype.getIcon = function () {
    return this.getOptions().icon;
  };

  return SidebarMenuItemOption;
}]);
'use strict';

angular.module('huoyun.widget').directive('widgetsVideoControlBar', ["$log", "widgetsHelper", function ($log, widgetsHelper) {
  return {
    restrict: 'A',
    scope: {
      video: "="
    },
    templateUrl: 'video/video.control.bar.html',
    link: function link($scope, ele, attrs) {

      $scope.playButtonDisabled = function () {
        if (!$scope.video) {
          return true;
        }
        return false;
      };

      $scope.playButtonVisibility = function () {
        if ($scope.video && $scope.video.status === "play") {
          return false;
        }

        return true;
      };

      $scope.onPlayButtonClicked = function () {
        if ($scope.video) {
          $scope.video.play();
        } else {
          $log.warn("current video is undefined.");
        }
      };

      $scope.pauseButtonDisabled = function () {
        if (!$scope.video) {
          return true;
        }
        return false;
      };

      $scope.onPauseButtonClicked = function () {
        if ($scope.video) {
          $scope.video.pause();
        } else {
          $log.warn("current video is undefined.");
        }
      };

      $scope.onFastForwardButtonClicked = function () {
        if ($scope.video) {
          $scope.video.fastForward();
        } else {
          $log.warn("current video is undefined.");
        }
      };

      $scope.onFastBackwardButtonClicked = function () {
        if ($scope.video) {
          $scope.video.fastBackward();
        } else {
          $log.warn("current video is undefined.");
        }
      };

      $scope.onPerviousFrameButtonClicked = function () {
        if ($scope.video) {
          $scope.video.previousFrame();
        } else {
          $log.warn("current video is undefined.");
        }
      };

      $scope.onNextFrameButtonClicked = function () {
        if ($scope.video) {
          $scope.video.nextFrame();
        } else {
          $log.warn("current video is undefined.");
        }
      };

      $scope.onRateButtonClicked = function (rate) {
        if ($scope.video) {
          $scope.video.changeRate(rate);
        } else {
          $log.warn("current video is undefined.");
        }
      };

      $scope.onRateButtonDisabled = function (rate) {
        if ($scope.video) {
          return $scope.video.defaultPlaybackRate * rate === $scope.video.getPlaybackRate();
        }
      };

      $scope.getFrameInfo = function () {
        if ($scope.video) {
          return '\u7B2C' + $scope.video.currentFrame + '\u5E27/\u5171' + $scope.video.totalFrames + '\u5E27';
        }
      };

      $scope.getTimeInfo = function () {
        if ($scope.video) {
          var time = widgetsHelper.durationFormat($scope.video.currentTime);
          var total = widgetsHelper.durationFormat($scope.video.duration);
          return time + '/' + total;
        }
      };

      $scope.progressStyle = function () {
        var width = 0;
        if ($scope.video) {
          width = (100.0 * $scope.video.currentTime / $scope.video.duration).toFixed(2) + "%";
        }
        return {
          width: width
        };
      };
    }
  };
}]);
'use strict';

angular.module('huoyun.widget').factory("Video", ["$timeout", "$log", "video", function ($timeout, $log, videoProvider) {

  function Video(elem, fps) {
    this.elem = elem;
    this.duration = elem.duration;
    this.height = elem.videoHeight;
    this.width = elem.videoWidth;
    this.fps = fps || 15;
    this.defaultPlaybackRate = elem.defaultPlaybackRate;
    this.currentTime = elem.currentTime;
    this.percentage = 0;
    this.totalFrames = parseInt((this.fps * this.duration).toFixed(0));
    this.currentFrame = 0;
    this.status = "loaded";

    var timer = null;
    var timer_interval = 8;

    this.setTimerInterval = function (val) {
      timer_interval = val;
    };

    this.startTimer = function () {
      if (this.status === "play") {
        var that = this;
        timer = setInterval(function () {
          $timeout(function () {
            that.setCurrentTime(that.elem.currentTime);
          });
        }, timer_interval / that.getPlaybackRate());
      } else {
        this.stopTimer();
      }
    };

    this.stopTimer = function () {
      clearInterval(timer);
      timer = null;
    };
  }

  Video.prototype.setFps = function (fps) {
    this.fps = fps;
  };

  Video.prototype.play = function () {
    this.elem.play();
    this.status = "play";
    this.startTimer();
  };

  Video.prototype.pause = function () {
    this.status = "pause";
    this.elem.pause();
    this.stopTimer();
  };

  Video.prototype.getPlaybackRate = function () {
    return this.elem.playbackRate;
  };

  Video.prototype.changeRate = function (rate) {
    this.elem.playbackRate = rate;
  };

  Video.prototype.changeTime = function (time) {
    if (time < 0) {
      this.elem.currentTime = 0;
      this.setCurrentTime(0);
      return;
    }

    if (time > this.duration) {
      this.elem.currentTime = this.duration;
      this.setCurrentTime(this.duration);
      return;
    }

    this.elem.currentTime = time;
    this.setCurrentTime(time);
  };

  Video.prototype.setCurrentTime = function (currentTime) {
    this.currentTime = currentTime;
    this.percentage = this.currentTime / this.duration;
    this.currentFrame = parseInt((this.fps * currentTime).toFixed(0));
  };

  Video.prototype.previousFrame = function () {
    if (this.currentFrame > 0) {
      this.changeTime((this.currentFrame - 1) * 1.0 / this.fps);
    }
  };

  Video.prototype.nextFrame = function () {
    if (this.currentFrame < this.totalFrames) {
      this.changeTime((this.currentFrame + 1) * 1.0 / this.fps);
    }
  };

  Video.prototype.fastForward = function () {
    var time = this.currentTime + videoProvider.step * this.getPlaybackRate();
    this.changeTime(time);
  };

  Video.prototype.fastBackward = function () {
    var time = this.currentTime - videoProvider.step * this.getPlaybackRate();
    this.changeTime(time);
  };

  Video.prototype.setPrecent = function (precent) {
    if (precent < 0) {
      precent = 0;
    } else if (precent > 1) {
      precent = 1;
    }
    this.changeTime(this.duration * precent);
  };

  return Video;
}]);
'use strict';

/**
 * options
 *  - fps
 */

angular.module('huoyun.widget').directive('widgetsVideoPlayer', ["$log", "Video", "$timeout", "widgetsHelper", function ($log, Video, $timeout, widgetsHelper) {
  return {
    restrict: 'A',
    scope: {
      svgOptions: "=",
      options: "=",
      src: "="
    },
    templateUrl: 'video/video.player.html',
    link: function link($scope, elem, attrs) {

      var videoElement = elem.find("video")[0];

      videoElement.onloadedmetadata = function (e) {
        e.preventDefault();
        $log.info("Video metadata is loaded", e);
        $timeout(function () {
          $scope.video = new Video(videoElement, $scope.options.fps);
        });
      };

      $scope.buttonVisibility = function (button) {
        return widgetsHelper.visibility(button);
      };

      $scope.buttonDisabled = function (button) {
        return widgetsHelper.disabled(button);
      };

      $scope.buttonStyle = function (button) {
        return widgetsHelper.style(button);
      };

      $scope.buttonClass = function (button) {
        return button.appendClass || "btn-default";
      };

      $scope.onButtonClicked = function (button) {
        if (typeof button.onClick === "function") {
          button.onClick.apply(button);
        } else {
          $log.warn("Button no click handler.", button);
        }
      };
    }
  };
}]);
'use strict';

angular.module('huoyun.widget').directive('widgetsVideoProgressBar', ["$log", "$timeout", function ($log, $timeout) {
  return {
    restrict: 'A',
    scope: {
      video: "="
    },
    templateUrl: 'video/video.progress.bar.html',
    link: function link($scope, elem, attrs) {

      $scope.dragProcent = 0;
      $scope.inDraging = false;

      function getProcent() {
        if ($scope.inDraging) {
          return (100 * $scope.dragProcent).toFixed(2) + "%";
        }

        return getVideoProcent();
      }

      function getVideoProcent() {
        if ($scope.video) {
          return (100.0 * $scope.video.currentTime / $scope.video.duration).toFixed(2) + "%";
        }

        return 0;
      }

      $scope.progressStyle = function () {
        return {
          width: getProcent()
        };
      };

      $scope.radioButtonStyle = function () {
        return {
          left: getProcent()
        };
      };

      $scope.onProgressBarClicked = function (event) {
        event.stopPropagation();
        if ($scope.video) {
          var precent = event.offsetX / elem.width();
          $scope.video.setPrecent(precent);
        }
      };

      var delta = 0;
      $scope.onDragRadioButtonDown = function (event) {
        event.stopPropagation();
        if ($scope.video) {
          delta = event.clientX - event.offsetX;
          console.log("Mouse Down Delta", event, elem.clientX());
          $scope.dragProcent = $scope.video.currentTime / $scope.video.duration;
          $scope.inDraging = true;
          $(document).on("mousemove", onMouseMoveHandler);
          $(document).on("mouseup", onMouseUpHandler);
        }
      };

      function onMouseUpHandler(event) {
        event.stopPropagation();
        $(document).off("mousemove", onMouseMoveHandler);
        $(document).off("mouseup", onMouseUpHandler);
        $timeout(function () {
          $scope.inDraging = false;
        });
      };

      function onMouseMoveHandler(event) {
        event.stopPropagation();
        $timeout(function () {
          console.log("Delta", delta, event.clientX);
          $scope.dragProcent = 1.0 * (event.clientX - delta) / elem.width();
          $scope.video.setPrecent($scope.dragProcent);
        });
      }
    }
  };
}]);
'use strict';

angular.module('huoyun.widget').provider("video", function () {

  this.step = 5;
  this.fastStep = this.step * 2;

  /**
   * options
   *  - step
   *  - fastSteps
   */
  this.config = function (options) {
    var that = this;
    ["step", "fastStep"].forEach(function (prop) {
      if (options[prop]) {
        that[prop] = options[prop];
      }
    });
  };

  this.$get = function () {
    return this;
  };
});
'use strict';

angular.module('huoyun.widget').factory('Tip', ['$templateCache', '$compile', '$rootScope', '$timeout', function ($templateCache, $compile, $rootScope, $timeout) {

  return {
    show: function show(message) {
      var id = "tip-" + new Date().getTime();
      var $scope = $rootScope.$new();
      var template = $templateCache.get('tip/tip.html');
      $scope.message = message;
      var $tip = $compile(template)($scope);
      $tip.attr("id", id);
      $('body').append($tip);
      $tip.show();
      var timer = setTimeout(function () {
        $tip.fadeOut(300, function () {
          $tip.remove();
        });
        clearTimeout(timer);
      }, 1000);
    }
  };
}]);
'use strict';

angular.module('huoyun.widget').controller('FormGroupDataListController', ["$scope", "CheckBoxOption", "$log", function ($scope, CheckBoxOption, $log) {

  var propOption = $scope.ngDialogData.params.options;
  var loadCount = 0;

  $scope.searchText = null;
  $scope.dataSource = [];

  $scope.isSingle = function () {
    return propOption.datalist.selection.isSingle();
  };

  $scope.searchVisibility = function () {
    return propOption.datalist.$$searchVisibility();
  };

  $scope.loadVisibility = function () {
    return propOption.datalist.$$loadVisibility();
  };

  $scope.getValueLabel = function (data) {
    return propOption.datalist.$$getItemValueLabel(data);
  };

  $scope.onItemClicked = function (item) {
    if ($scope.isSingle()) {
      $scope.closeThisDialog(['OK', item]);
    } else {
      $log.warn("Current selection mode isn't single.");
    }
  };

  $scope.onSearchTextChanged = function () {
    loadCount = 0;
    propOption.datalist.$$search($scope.searchText).then(function (result) {
      setDataSource(result);
    });
  };

  $scope.onSearchTextCleared = function () {
    $scope.searchText = null;
    $scope.onSearchTextChanged();
  };

  $scope.loadMore = function () {
    loadCount = loadCount + 1;
    propOption.datalist.$$loadMore(loadCount, $scope.searchText).then(function (result) {
      var selectedItems = null;
      if (!$scope.isSingle()) {
        selectedItems = getSelectedItems();
      }
      addDataSource(selectedItems, result);
    });
  };

  $scope.selectedAllOption = new CheckBoxOption({
    value: false,
    label: "全选",
    onCheckChanged: function onCheckChanged(event, oldVal, newVal) {
      if (newVal) {
        selectedAll();
      } else {
        unselectedAll();
      }
    }
  });

  propOption.datalist.$$getDataSource().then(function (result) {
    setDataSource(result);
  });

  $scope.ngDialogData.onConfirmButtonClicked = function () {
    $scope.closeThisDialog(['OK', getSelectedItems()]);
  };

  function setDataSource(result) {
    var selectedItems = null;
    if (!$scope.isSingle()) {
      selectedItems = getSelectedItems();
    }
    $scope.dataSource = [];
    addDataSource(selectedItems, result);
  }

  function addDataSource(selectedItems, result) {
    if (Array.isArray(result)) {
      result.forEach(function ($dataItem) {
        if ($scope.isSingle()) {
          $scope.dataSource.push($dataItem);
        } else {
          $scope.dataSource.push({
            checkboxOption: getCheckBoxOption(selectedItems, $dataItem),
            data: $dataItem
          });
        }
      });
    } else {
      $log.warn("Datasource is not array", result);
    }
  }

  function getCheckBoxOption(selectedItems, dataItem) {
    var option = new CheckBoxOption({
      value: false,
      label: dataItem[propOption.datalist.labelField]
    });

    for (var index = 0; index < selectedItems.length; index++) {
      if (selectedItems[index] === dataItem) {
        option.value = true;
        break;
      }
    }

    return option;
  }

  function selectedAll() {
    $scope.dataSource.forEach(function ($dataItem) {
      $dataItem.checkboxOption.value = true;
    });
  }

  function unselectedAll() {
    $scope.dataSource.forEach(function ($dataItem) {
      $dataItem.checkboxOption.value = false;
    });
  }

  function getSelectedItems() {
    var items = [];
    $scope.dataSource.forEach(function ($dataItem) {
      if ($dataItem.checkboxOption.isChecked()) {
        items.push($dataItem.data);
      }
    });
    return items;
  }
}]);
'use strict';

angular.module('huoyun.widget').directive('widgetsFormGroupDataList', ["Dialog", function (Dialog) {
  return {
    restrict: 'A',
    scope: {
      options: "="
    },
    templateUrl: 'form/formgroup/formgroup.datalist.html',
    link: function link($scope, ele, attrs) {

      $scope.onButtonClicked = function () {
        var options = {
          title: '\u9009\u62E9' + $scope.options.label,
          templateUrl: "form/formgroup/formgroup.datalist.dialog.html",
          params: {
            options: $scope.options
          },
          closeCallback: function closeCallback(key, data) {
            if (key === "OK") {
              $scope.options.setValue(data);
            }
          }
        };
        var dialog = Dialog.showConfirm(options);
      };
    }
  };
}]);
'use strict';

angular.module('huoyun.widget').directive('widgetsFormGroupEmail', ["$log", "display", "widgetsHelper", function ($log, displayProvider, widgetsHelper) {
  return {
    restrict: 'A',
    scope: {
      options: "=",
      value: "=ngModel"
    },
    templateUrl: 'form/formgroup/formgroup.email.html',
    link: function link($scope, ele, attrs) {}
  };
}]);
'use strict';

angular.module('huoyun.widget').directive('widgetsFormGroupString', ["$log", "display", "widgetsHelper", function ($log, displayProvider, widgetsHelper) {
  return {
    restrict: 'A',
    scope: {
      options: "=",
      value: "=ngModel"
    },
    templateUrl: 'form/formgroup/formgroup.string.html',
    link: function link($scope, ele, attrs) {}
  };
}]);
'use strict';

angular.module('huoyun.widget').directive('widgetsFormGroupLabelEmail', [function () {
  return {
    restrict: 'A',
    scope: {
      options: "=",
      value: "=ngModel"
    },
    templateUrl: 'form/formgrouplabel/formgrouplabel.email.html',
    link: function link($scope, ele, attrs) {

      $scope.emailLink = function (value) {
        return 'mailto:' + value;
      };
    }
  };
}]);

angular.module('huoyun.widget').filter("EmailLink", function () {

  return function (input) {
    return input && 'mailto:' + input;
  };
});
'use strict';

angular.module('huoyun.widget').directive('widgetsFormGroupLabelString', [function () {
  return {
    restrict: 'A',
    scope: {
      options: "=",
      value: "=ngModel"
    },
    templateUrl: 'form/formgrouplabel/formgrouplabel.string.html',
    link: function link($scope, ele, attrs) {}
  };
}]);
'use strict';

angular.module('huoyun.widget').factory("EmailValidator", function () {

  var PATTERN = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

  function EmailValidator(formGroupOption) {
    this.formGroupOption = formGroupOption;
  }

  EmailValidator.prototype.onValid = function (value) {
    if (PATTERN.test(value)) {
      return Promise.resolve();
    }

    this.formGroupOption.errorMessage = '\u90AE\u7BB1\u5730\u5740\u683C\u5F0F\u4E0D\u6B63\u786E';
    return Promise.reject(this.formGroupOption);
  };

  return EmailValidator;
});
'use strict';

angular.module('huoyun.widget').factory("MandatoryValidator", function () {

  function MandatoryValidator(formGroupOption) {
    this.formGroupOption = formGroupOption;
  }

  MandatoryValidator.prototype.onValid = function (value) {
    if (value === null || value === undefined) {
      this.formGroupOption.errorMessage = '\u5B57\u6BB5' + this.formGroupOption.label + '\u4E0D\u80FD\u4E3A\u7A7A';
      return Promise.reject(this.formGroupOption);
    }

    if (typeof value === "string") {
      if (value.trim() === "") {
        this.formGroupOption.errorMessage = '\u5B57\u6BB5' + this.formGroupOption.label + '\u4E0D\u80FD\u4E3A\u7A7A';
        return Promise.reject(this.formGroupOption);
      }
    }

    return Promise.resolve();
  };

  return MandatoryValidator;
});
'use strict';

angular.module('huoyun.widget').controller('SearchFormDataListController', ["$scope", "CheckBoxOption", function ($scope, CheckBoxOption) {

  var propOption = $scope.ngDialogData.params.options;
  var loadCount = 0;

  $scope.searchText = null;
  $scope.dataSource = [];

  $scope.searchVisibility = function () {
    return propOption.datalist.$$searchVisibility();
  };

  $scope.loadVisibility = function () {
    return propOption.datalist.$$loadVisibility();
  };

  $scope.onSearchTextChanged = function () {
    loadCount = 0;
    propOption.datalist.$$search($scope.searchText).then(function (result) {
      setDataSource(result);
    });
  };

  $scope.onSearchTextCleared = function () {
    $scope.searchText = null;
    $scope.onSearchTextChanged();
  };

  $scope.loadMore = function () {
    loadCount = loadCount + 1;
    propOption.datalist.$$loadMore(loadCount, $scope.searchText).then(function (result) {
      var selectedItems = getSelectedItems();
      addDataSource(selectedItems, result);
    });
  };

  $scope.selectedAllOption = new CheckBoxOption({
    value: false,
    label: "全选",
    onCheckChanged: function onCheckChanged(event, oldVal, newVal) {
      if (newVal) {
        selectedAll();
      } else {
        unselectedAll();
      }
    }
  });

  propOption.datalist.$$getDataSource().then(function (result) {
    setDataSource(result);
  });

  $scope.ngDialogData.onConfirmButtonClicked = function () {
    $scope.closeThisDialog(['OK', getSelectedItems()]);
  };

  function setDataSource(result) {
    var selectedItems = getSelectedItems();
    $scope.dataSource = [];
    addDataSource(selectedItems, result);
  }

  function addDataSource(selectedItems, result) {
    if (Array.isArray(result)) {
      result.forEach(function ($dataItem) {
        $scope.dataSource.push({
          checkboxOption: getCheckBoxOption(selectedItems, $dataItem),
          data: $dataItem
        });
      });
    }
  }

  function getCheckBoxOption(selectedItems, dataItem) {
    var option = new CheckBoxOption({
      value: false,
      label: dataItem[propOption.datalist.labelField]
    });

    for (var index = 0; index < selectedItems.length; index++) {
      if (selectedItems[index] === dataItem) {
        option.value = true;
        break;
      }
    }

    return option;
  }

  function selectedAll() {
    $scope.dataSource.forEach(function ($dataItem) {
      $dataItem.checkboxOption.value = true;
    });
  }

  function unselectedAll() {
    $scope.dataSource.forEach(function ($dataItem) {
      $dataItem.checkboxOption.value = false;
    });
  }

  function getSelectedItems() {
    var items = [];
    $scope.dataSource.forEach(function ($dataItem) {
      if ($dataItem.checkboxOption.isChecked()) {
        items.push($dataItem.data);
      }
    });
    return items;
  }
}]);
'use strict';

angular.module('huoyun.widget').directive('widgetsSearchFormDataList', ["Dialog", function (Dialog) {
  return {
    restrict: 'A',
    scope: {
      options: "="
    },
    templateUrl: 'search/datalist/search.form.datalist.html',
    link: function link($scope, elem, attrs) {

      $scope.onButtonClicked = function () {
        var options = {
          title: '\u8BBE\u7F6E\u641C\u7D22\u6761\u4EF6',
          templateUrl: "search/datalist/search.form.datalist.dialog.html",
          params: {
            options: $scope.options
          },
          closeCallback: function closeCallback(key, data) {
            if (key === "OK") {
              $scope.options.setValue(data);
              $scope.options.$$onChanged(data);
            }
          }
        };
        var dialog = Dialog.showConfirm(options);
      };
    }
  };
}]);
'use strict';

angular.module('huoyun.widget').controller('SearchFormNumberDialog', ["$scope", "SearchConditions", "SearchConditionValue", function ($scope, SearchConditions, SearchConditionValue) {
  $scope.conditions = SearchConditions;

  $scope.condition = angular.copy($scope.ngDialogData.params.options.value || new SearchConditionValue({
    op: "eq"
  }));

  $scope.ngDialogData.onConfirmButtonClicked = function () {
    $scope.closeThisDialog(['OK', $scope.condition]);
  };
}]);
'use strict';

angular.module('huoyun.widget').directive('widgetsSearchFormNumber', ["Dialog", function (Dialog) {
  return {
    restrict: 'A',
    scope: {
      options: "="
    },
    templateUrl: 'search/number/search.form.number.html',
    link: function link($scope, elem, attrs) {

      $scope.onButtonClicked = function () {
        var options = {
          title: '\u8BBE\u7F6E\u641C\u7D22\u6761\u4EF6',
          templateUrl: "search/number/search.form.number.dialog.html",
          params: {
            options: $scope.options
          },
          closeCallback: function closeCallback(key, data) {
            if (key === "OK") {
              $scope.options.setValue(data);
              $scope.options.$$onChanged(data);
            }
          }
        };
        var dialog = Dialog.showConfirm(options);
      };
    }
  };
}]);
'use strict';

angular.module('huoyun.widget').directive('widgetsSearchFormString', [function () {
  return {
    restrict: 'A',
    scope: {
      options: "="
    },
    templateUrl: 'search/string/search.form.string.html',
    link: function link($scope, elem, attrs) {}
  };
}]);