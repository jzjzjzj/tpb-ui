'use strict';

var interval = setInterval(function () {
  var el = document.getElementsByClassName('viewswitch')[0];

  if(typeof el !== 'undefined') {
    clearInterval(interval);

    el.getElementsByTagName('a')[0].onclick = function (e) {
      chrome.runtime.sendMessage(
        {
          name: 'viewswitch',
          view: e.target.innerText.toLowerCase()
        },
        function () {
          location.reload();
        }
      );

      e.preventDefault();
    };
  }
}, 300);
