'use strict';

// do not touch "double" view
if(document.cookie.indexOf('lw=d') !== -1) {
  document.getElementById('searchResult').style.visibility = 'visible';
  return;
}

require('angular/angular.min');
require('./util');
require('./tpb-ui');

angular.bootstrap(
  angular.element('<search-result/>'),
  ['tpb-ui', 'util']
);
