'use strict';

huoyunWidget.factory("ColorFactory", ["HuoyunWidgetConstant", function(HuoyunWidgetConstant) {
  return {
    transparentize: function(color, opacity) {
      var alpha = opacity === undefined ? 0.5 : 1 - opacity;
      return Chart.helpers.color(color).alpha(alpha).rgbString();
    },
    randomColor: function(opacity) {
      var colors = HuoyunWidgetConstant.Colors;
      var randomIndex = Math.round(Math.random() * (Object.keys(colors).length - 1));
      var color = colors[Object.keys(colors)[randomIndex]];
      if (opacity) {
        return this.transparentize(color, opacity);
      }
      return color;
    }
  };
}]);

huoyunWidget.factory("ChartOptionsFactory", ["ColorFactory", function(ColorFactory) {
  const defaultOptions = {
    title: {
      display: false
    },
    legend: {
      position: 'top',
    },
    responsive: true,
    scales: {
      yAxes: [{
        gridLines: {
          display: true,
          color: ColorFactory.randomColor(0.2)
        }
      }],
      xAxes: [{
        gridLines: {
          display: false
        }
      }]
    }
  };
  return {
    merge: function(options, datasets) {
      var result = angular.copy(defaultOptions);
      if (options) {
        if (options.autoTicks) {
          result.scales.yAxes.forEach(function(yAx) {
            var ticks = this.ticks(datasets);
            if (ticks) {
              yAx.ticks = ticks;
            }
          }.bind(this));
        }
      }

      return result;
    },

    ticks: function(datasets) {
      if (Array.isArray(datasets) && datasets.length > 0) {
        var data = [];
        datasets.forEach(function(datasetItem) {
          data = data.concat(datasetItem.data);
        });
        var ticks = {};
        var max = Math.max.apply(this, data);
        var min = Math.min.apply(this, data);
        var step = Math.round((max - min) / 10);
        ticks.stepSize = step;
        if (min / step > 1) {
          ticks.min = (parseInt(min / step) - 1) * step;
        }

        ticks.max = (parseInt(max / step) + 1) * step;
        return ticks;
      }
    }
  };
}]);


/**
 * http://www.chartjs.org/docs/latest/charts/bar.html
 * http://www.chartjs.org/samples/latest/
 */
huoyunWidget.directive('widgetChart', ["$q", "ColorFactory", "ChartOptionsFactory",
  function($q, ColorFactory, ChartOptionsFactory) {
    return {
      restrict: 'A',
      scope: {
        options: '='
      },
      replace: true,
      templateUrl: 'chart/chart.html',
      link: function($scope, elem, attrs) {
        var canvas = elem.find("canvas")[0];
        var context = canvas.getContext("2d");

        var options = {
          title: {
            display: false
          },
          legend: {
            position: 'top',
          },
          responsive: true,
          scales: {
            yAxes: [{
              gridLines: {
                display: true,
                color: ColorFactory.randomColor(0.2)
              }
            }],
            xAxes: [{
              gridLines: {
                display: false
              }
            }]
          }
        };


        $scope.datasets = [];
        var chart = null;

        $scope.$watch("datasets", function(newVal, oldVal) {
          var data = {
            labels: $scope.options.labels,
            datasets: []
          };

          var colors = [];

          (newVal || []).forEach(function(item) {
            var borderColor = ColorFactory.randomColor();
            /**
             * Make sure color not duplicate
             */
            while (colors.indexOf(borderColor) !== -1) {
              borderColor = ColorFactory.randomColor();
            }
            colors.push(borderColor);

            item.borderWidth = 1;
            item.borderColor = borderColor;
            item.backgroundColor = ColorFactory.transparentize(borderColor, 0.5);
            data.datasets.push(item);
          });

          chart = new Chart(context, {
            type: 'bar',
            data: data,
            options: ChartOptionsFactory.merge($scope.options, data.datasets)
          });
        });

        $scope.reload = function() {
          if (!$scope.options) {
            return;
          }
          if (typeof $scope.options.query === "function") {
            var result = $scope.options.query.apply($scope.options, []);
            if (result instanceof Promise || result instanceof $q) {
              result.then(function(data) {
                afterQuery(data);
              });
            } else {
              afterQuery(result);
            }
          } else {
            afterQuery($scope.options.query);
          }
        };

        function afterQuery(queryResult) {
          if (typeof $scope.options.finally === "function") {
            var result = $scope.options.finally.apply($scope.options, [queryResult]);
            $scope.datasets = result;
          } else {
            $scope.datasets = queryResult;
          }
        }


        $scope.$watch("options", function(newVal, oldVal) {
          if (newVal) {
            $scope.reload();
          }
        });
      }
    }
  }
]);