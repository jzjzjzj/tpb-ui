'use strict';

require('angular/angular.min');
require('./util');
require('./tpb-ui');

angular.bootstrap(
  angular.element('<search-result/>'),
  ['tpb-ui', 'util']
);
