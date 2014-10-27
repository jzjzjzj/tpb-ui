'use strict';

require('angular/angular.min');

angular.module('util', []);

/**
 * Allows to bind HTML to element via ng-bind-html directive.
 */
angular.module('util').filter('trusted', ['$sce', function($sce){
  return function(text) {
    return $sce.trustAsHtml(text);
  };
}]);
