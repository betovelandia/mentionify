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
   * Default settings
   * @private
   */
  var defaults = {
    matchCase: true,
    minChars: 1,
    keyDelay: 400,
    userHighlight: true,
    queryParam: 'key'
  },

  keyCodes = {
    backspace: 8,
    shift: 16,
    enter: 13,
    ctrl: 17,
    alt: 18,
    down: 40,
    esc: 27,
    del: 46,
    up: 38
  };

  /**
   * Mentionify constructor
   * @param {HTMLElement} element
   * @param {Object} options
   * @constructor
   */
  function Mentionify(element, options) {
    this.$element = $(element);
    this.settings = $.extend({}, defaults, options);
    this.init();
  }

  /**
   * Initialization
   * @public
   */
  Mentionify.prototype.init = function() {
    this.$element.keyUp(this.onKeyUp);
    return this;
  };


  /**
   * Event Handler
   * @param {event} event
   * @public
   */
  Mentionify.prototype.onKeyUp = function(event) {
    var allowedKeys = [keyCodes.enter, keyCodes.shift, keyCodes.ctrl];

    if(allowedKeys.indexOf(event.keyCode) > -1) {
      // @TODO
    }
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
      instance.index = $.mentionify.lookup.push(instance) - 1;
      $.data(this, 'mentionify', instance);
    });

    return this;
  };
}(jQuery));
