var columns = {
  type: true,
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
