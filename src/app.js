'use strict';

var singleView = document.cookie.indexOf('lw=s') !== -1;

var libs = function () {
  if(!singleView) {
    return;
  }

  require('angular/angular.min');
  require('./util');
  require('./tpb-ui');
};

var boot = function() {
  if(!singleView) {
    return;
  }

  angular.bootstrap(
    angular.element('<search-result/>'),
    ['tpb-ui', 'util']
  );
};

libs();
boot();
