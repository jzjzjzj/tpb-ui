$('td:nth-child(3)').each(function() {
  var torrent = $(this).parent();
  var day = $(this).text().match(/^(.+)\s/)[1];
  var colors = {
    'Today': '#FFDD44',
    'Y-day': '#FFEE99'
  };

  torrent.css('background-color', colors[day]);
});
