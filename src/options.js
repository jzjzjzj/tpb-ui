// load initial state of columns
document.addEventListener('DOMContentLoaded', function() {
  var elms = document.getElementsByTagName('input');
  var i;

  chrome.storage.local.get(null, function(items) {
    var key, checkbox;

    for(key in items) {
      checkbox = document.getElementById(key);

      if(checkbox) checkbox.checked = items[key];
    }
  });

  // save the new state of a column
  for(i = 0; i < elms.length; i ++){
    elms[i].addEventListener('click', function(event) {
      var items = {};

      items[event.target.id] = event.target.checked;
      chrome.storage.local.set(items);
    });
  }
});

