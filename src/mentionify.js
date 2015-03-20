/*
 * Mentionify: Mention people in a textarea.
 *
 *
 * Copyright (c) 2015 Alberto Velandia
 * Licensed under the MIT license.
 */
(function ($) {
  'use strict';

  /**
   * Name of the plugin
   * @private
   */
  var pluginName = 'mentionify',

  /**
   * Default settings
   * @private
   */
  defaults = {
    matchCase: true,
    minChars: 1,
    keyDelay: 400,
    userHighlight: true,
    queryParam: 'key'
  },

  /**
   * Mentionify constructor
   * @param {HTMLElement} element
   * @param {Object} options
   * @constructor
   */
  function Mentionify(element, options) {
    // @TODO
  };

  /**
   * Plugin constructor
   * @param {Object|String} options
   * @returns {JQuery}
   * @constructor
   */
  $.fn.mentionify = function (options) {
    var instance;

    this.each(function() {
      instance = $.data(this, 'mentionify');

      if (instance) {
        // Destroy the plugin instance if exists
        instance.destroy();
      }

      // Create the plugin instance
      instance = new Mentionify(this, options);
      instance.index = $mentionify.lookup.push(instance) - 1;
      $.data(this, 'mentionify', instance);
    });

    return this;
  };
}(jQuery));
