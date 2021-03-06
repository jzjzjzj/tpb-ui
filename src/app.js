'use strict';

var singleView = document.cookie.indexOf('lw=s') !== -1;
var booted = false;

var libs = function () {
  if(!singleView) {
    document.getElementById('searchResult').style.visibility = 'visible';
    return;
  }

  require('angular/angular.min');
  require('./util');
  require('./tpb-ui');
};

var boot = function() {
  if(!singleView || booted) {
    return;
  }

  booted = true;

  angular.bootstrap(
    angular.element('<search-result/>'),
    ['tpb-ui', 'util']
  );
};

module.exports = {
  libs: libs,
  boot: boot
};
