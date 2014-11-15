'use strict';

require('angular/angular.min');

angular.module('gear', []);
angular.module('gear').directive('gear', ['$sce', function($sce) {
  return {
    restrict: 'E',
    link: function(scope, iElement) {
      iElement.css({
        'position': 'fixed',
        'z-index': '99',
        'top': '8px',
        'right': '8px',
        'width': '32px',
        'height': '32px',
        'cursor': 'pointer',
        'background': 'url('+$sce.trustAsResourceUrl(chrome.extension.getURL('img/gear.svg'))+') 0 0'
      });

      iElement.on('mouseover', function() {
        iElement.css('background-position', '-32px 0');
      });

      iElement.on('mouseout', function() {
        iElement.css('background-position', '0 0');
      });

      iElement.on('click', function() {
        iElement.css('background-position', '0 0');
        window.open(chrome.extension.getURL('options.html'));
      });
    }
  };
}]);
