'use strict';

var singleView = document.cookie.indexOf('lw=s') !== -1;
var booted = false;

var libs = function () {
  if(!singleView) {
    return;
  }

  require('angular/angular.min');
  require('./gear');
  require('./tpb-ui');
};

var boot = function() {
  if(!singleView || booted) {
    return;
  }

  booted = true;

  angular.bootstrap(
    angular.element('<app/>'),
    ['search-result', 'gear']
  );
};

module.exports = {
  libs: libs,
  boot: boot
};
