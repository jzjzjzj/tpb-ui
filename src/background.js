'use strict';

var columns = {
  type: true,
  title: true,
  year: true,
  quality: true,
  season: true,
  episode: true,
  resolution: true,
  codec: false,
  group: false,
  excess: false,
  name: false,
  uploaded: true,
  icons: true,
  size: true,
  seeders: true,
  leechers: true,
  region: false,
  extended: false,
  hardcoded: false,
  proper: false,
  repack: false,
  audio: true,
  garbage: false,
  container: false,
  episodeName: false,
  widescreen: false
};

// store config of default columns
chrome.runtime.onInstalled.addListener(function (details) {
  if(details.reason === 'install') {
    chrome.storage.local.set(columns);
  }
  else if(details.reason === 'update') {
    chrome.storage.local.get(null, function(items) {
      if(Object.getOwnPropertyNames(items).length === 0) {
        chrome.storage.local.set(columns);
      }
    });
  }
});
