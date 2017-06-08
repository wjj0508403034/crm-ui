'use strict';

huoyunWidget.constant("HuoyunWidgetConstant", {
  Colors: {
    Red: "rgb(255, 99, 132)",
    Orange: "rgb(255, 159, 64)",
    Yellow: "rgb(255, 205, 86)",
    Green: "rgb(75, 192, 192)",
    Blue: "rgb(54, 162, 235)",
    Purple: "rgb(153, 102, 255)",
    Grey: "rgb(201, 203, 207)"
  },
  Months: {
    FullYear: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
    FirstHalfYear: ["一月", "二月", "三月", "四月", "五月", "六月"],
    NextHalfYear: ["七月", "八月", "九月", "十月", "十一月", "十二月"]
  }
});

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


/**
 * http://www.chartjs.org/docs/latest/charts/bar.html
 * http://www.chartjs.org/samples/latest/
 */
huoyunWidget.directive('widgetChart', ["$q", "ColorFactory", function($q, ColorFactory) {
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


      $scope.dataSource = [];
      var chart = null;

      $scope.$watch("dataSource", function(newVal, oldVal) {
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
          options: options
        });
      });

      $scope.reload = function() {
        if (!$scope.options) {
          return;
        }

        if (typeof $scope.options.dataSource === "function") {
          var result = $scope.options.dataSource.apply($scope.options, []);
          if (result instanceof Promise || result instanceof $q) {
            result.then(function(data) {
              $scope.dataSource = data;
            });
          } else {
            $scope.dataSource = result;
          }
        } else {
          $scope.dataSource = $scope.options.dataSource;
        }
      };


      $scope.$watch("options", function(newVal, oldVal) {
        if (newVal) {
          $scope.reload();
        }
      });
    }
  }
}]);