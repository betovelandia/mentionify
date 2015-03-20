/*
 * 
 * 
 *
 * Copyright (c) 2015 Alberto Velandia
 * Licensed under the MIT license.
 */
(function ($) {
  $.fn.mentionify = function () {
    return this.each(function (i) {
      // Do something to each selected element.
      $(this).html('mentionify' + i);
    });
  };
}(jQuery));
