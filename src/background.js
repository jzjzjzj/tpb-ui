var columns = {
  type: true,
  title: true,
  year: true,
  quality: true,
  season: true,
  episode: true,
  resolution: true,
  codec: true,
  group: true,
  excess: true,
  name: true,
  uploaded: true,
  icons: true,
  size: true,
  seeders: true,
  leechers: true
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
