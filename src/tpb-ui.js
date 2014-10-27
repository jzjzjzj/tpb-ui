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
  var cells, torrent;

  while(cells = rowPattern.exec(document.body.innerHTML)) {
    torrent = {
      type: cells[1],
      name: cells[2],
      uploaded: cells[3],
      icons: cells[4],
      size: cells[5],
      seeders: cells[6],
      leechers: cells[7]
    };

    torrent.recent = torrent.uploaded.toLowerCase().match(/^\D{5}/);

    torrents.push(torrent);
  }

  return torrents;
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
