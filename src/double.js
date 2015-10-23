'use strict';

$('font.detDesc').each(function () {
  var day = $(this).text().substring(9, 14);
  var colors = {
    'Today': '#FFDD44',
    'Y-day': '#FFEE99'
  };

  $(this).closest('tr').css('background-color', colors[day]);
});
