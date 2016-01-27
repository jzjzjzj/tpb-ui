'use strict';

require('angular/angular.min');
var ptn = require('parse-torrent-name');

var app = angular.module('tpb-ui', []);

app.constant('tableTemplateUrl', chrome.extension.getURL('table-template.html'));

/**
 * Runs "torrents" service before the original <table> is replaced.
 * Replaces the original <table>
 */
app.run(['torrents', '$rootElement', '$http', 'tableTemplateUrl', function(torrents, $rootElement, $http, tableTemplateUrl) {
  // $http request fixes new table not showing up after browser restart (extension restart needed)
  $http.get(tableTemplateUrl).then(function() {
    // replace hidden original <table> with $rootElement
    angular.element(document.getElementById('searchResult')).replaceWith($rootElement);
  });
}]);

app.controller('TableController', ['$scope', '$element', 'torrents', function($scope, $element, torrents) {
  $scope.torrents = torrents;
  // show new <table> (replacement)
  $element.css('visibility', 'visible');

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
        if(changes.hasOwnProperty(key)) {
          $scope.columns[key] = changes[key].newValue;
        }
      }
    });
  });
}]);

/**
 * Parses existing search result table. Provides an array of "torrents".
 */
app.factory('torrents', function() {
  var torrents = [];
  var cells = document.querySelectorAll('td');
  var torrent, parts, key;

  for(var i = 0; i < cells.length; i += 8) {
    torrent = {
      type: cells[i].innerHTML,
      name: cells[i + 1].innerHTML,
      uploaded: cells[i + 2].innerHTML,
      icons: cells[i + 3].innerHTML,
      size: cells[i + 4].innerHTML,
      seeders: cells[i + 5].innerHTML,
      leechers: cells[i + 6].innerHTML
    };

    torrent.recent = torrent.uploaded.toLowerCase().match(/^\D{5}/);

    parts = ptn(torrent.name.match(/>([^<]+)</)[1]);

    for(key in parts) {
      if(parts.hasOwnProperty(key)) {
        torrent[key] = parts[key];
      }
    }

    torrent.title = torrent.name.replace(/>[^<]+</, '>' + torrent.title + '<');

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
