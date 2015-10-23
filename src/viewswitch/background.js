'use strict';

var domains = [
  'la',
  'vg',
  'mn',
  'gd',
  'se'
];

var count = domains.length * 2;

var responder = function (sendResponse) {
  count --;

  if(count === 0) {
    count = domains.length * 2;
    sendResponse();
  }
};

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  var i, j;

  var callback = function () {
    responder(sendResponse);
  };

  if(message.name === 'viewswitch') {
    for(i = 0; i <= 1; i ++) {
      for(j = 0; j < domains.length; j ++) {
        chrome.cookies.set(
          {
            url: 'http' + (i === 0 ? '' : 's') + '://thepiratebay.' + domains[j],
            name: 'lw',
            value: message.view.charAt(0),
            domain: '.thepiratebay.' + domains[j],
            expirationDate: 1735689600
          },
          callback
        );
      }
    }
  }

  return true;
});
