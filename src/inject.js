'use strict';

injectScript('double.js');
injectScript('adblock/events.js');

function injectScript(path) {
  var script = document.createElement('script');

  script.src = chrome.extension.getURL(path);

  (document.head||document.documentElement).appendChild(script);
  script.parentNode.removeChild(script);
}
