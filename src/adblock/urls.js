'use strict';

chrome.webRequest.onBeforeRequest.addListener(
  function () {
    return {
      redirectUrl: 'javascript:void(0)'
    };
  },
  {
    urls: [
      "*://*.thepiratebay.org/ads/*",
      "*://*.adbrau.com/*",
      "*://*.exoclick.com/*",
      "*://*.amldev.info/*"
    ]
  },
  [
    "blocking"
  ]
);
