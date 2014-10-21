'use strict';

require('angular/angular.min');

var app = angular.module('tpb-ui', []);

app.constant('tableTemplateUrl', chrome.extension.getURL('table-template.html'));

/**
 * Runs "torrents" service before the original <table> is replaced.
 * Replaces the original <table>
 */
app.run(['torrents', '$rootElement', '$http', 'tableTemplateUrl', function(torrents, $rootElement, $http, tableTemplateUrl) {
  // $http request fixes new table not showing up after browser restart (extension restart needed)
  $http.get(tableTemplateUrl).then(function(result) {
    angular.element(document.getElementById('searchResult')).replaceWith($rootElement);
  });
}]);

app.controller('TableController', ['$scope', 'torrents', function($scope, torrents) {
  $scope.torrents = torrents;

  // load initial column settings
  chrome.storage.local.get(null, function(items) {
    $scope.$apply(function() {
      $scope.columns = items;
    });
  });

  // live update of columns
  chrome.storage.onChanged.addListener(function(changes) {
    $scope.$apply(function() {
      var key;

      for(key in changes) {
        $scope.columns[key] = changes[key].newValue;
      }
    });
  });
}]);

/**
 * Parses existing search result table. Provides an array of "torrents".
 */
app.factory('torrents', function() {
  var cellPatterns = [
    '<td[^>]+>([^\n]+)<\/td>\n',
    '<td>([^\n]+)\n<\/td>\n',
    '<td>([^<]+)<\/td>\n',
    '<td>([^\n]+)<\/td>\n',
    '<td[^>]+>([^<]+)<\/td>\n',
    '<td[^>]+>([0-9]+)<\/td>\n',
    '<td[^>]+>([0-9]+)'
  ];
  var rowPattern = new RegExp(cellPatterns.join(''), 'g');
  var torrents = [];
  var cells;

  while(cells = rowPattern.exec(document.body.innerHTML)) {
    torrents.push({
      type: cells[1],
      name: cells[2],
      uploaded: cells[3],
      icons: cells[4],
      size: cells[5],
      seeders: cells[6],
      leechers: cells[7]
    });
  }

  return torrents;
});

/**
 * Highlights recently (today, yesterday) added torrents.
 */
app.directive('highlightRecent', function() {
  return {
    restrict: 'A',
    scope: {
      uploaded: '=highlightRecent'
    },
    link: function(scope, element, attrs) {
      var day = scope.uploaded.substring(0, 5);
      var colors = {
        'Today': '#FFDD44',
        'Y-day': '#FFEE99'
      };

      element.css('background-color', colors[day]);
    }
  };
});

/**
 * Replaces <search-result> element with our table template.
 */
app.directive('searchResult', ['$sce', 'tableTemplateUrl', function($sce, tableTemplateUrl) {
  return {
    restrict: 'E',
    replace: true,
    templateUrl: $sce.trustAsResourceUrl(tableTemplateUrl)
  };
}]);
