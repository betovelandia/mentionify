/*
 * Mentionify: Mention people in a textarea.
 *
 *
 * Copyright (c) 2015 Alberto Velandia
 * Licensed under the MIT license.
 */
(function ($) {
  "use strict";

  /**
   * Default settings
   * @private
   */
  var defaults = {
    matchCase: true,
    minChars: 1,
    keyDelay: 400,
    userHighlight: true,
    showAvatar: true,
    queryParam: "key"
  };

  /**
   * Keycodes.
   * @private
   */
  var keyCodes = {
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

  var $matches = $("ul#mentionify-matches");

  /**
   * Hides the UL and removes the candidates.
   * @private
   */
  function hideMatches() {
    $matches.remove('li');
    $matches.hide();
  }

  /**
   * Once the user types after @ grab the string that follows.
   * @returns {Boolean|String} the param or false if the param length is not
   * enough based on the plugin's configuration,
   * @private
   */
  function findQuery(text) {
    var param;

    if (param.length >== settings.minChars) {
      return param;
    } else {
      return false;
    }
  }

  /**
   * Fetch the matches based on the query entered by the user.
   * @private
   */
  function fetchMatches(param, callback) {
    $.getJSON(buildUrl(param), callback);
  }

  // @TODO: eval url lib.
  function buildUrl(param) {
    return (settings.url + "?" + settings.queryParam + param + settings.extraParams);
  }

  /**
   * Appends the list items of each user.
   * @private
   */
  function processMatches(data) {
    $matches.remove('li');
    $(data).each(function (key, user) {
      var $li = $('<li>' + user.nickname + '</li>');
      if (settings.showAvatar) {
        $li.append('<img src="' + user.avatar + '"/>');
      }
      $matches.append($li);
      $li.hover(onMatchHover);
    });
  }

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
    this.$element.append($matches);
    return this;
  };


  /**
   * Event Handler
   * @param {event} event
   * @public
   */
  Mentionify.prototype.onKeyUp = function(event) {
    // @TODO: Check last character function need.
    var text = this.value,
      isMentioning = text.charAt(text.length -1) === "@";

    if (isMentioning && findQuery(text)) {
      $.getJSON(getUrl(findQuery(text)), processMatches);
    } else  {
      hideMatches();
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
      instance = $.data(this, "mentionify");

      // Destroy the plugin instance if exists.
      if (instance) {
        instance.destroy();
      }

      // Create the plugin instance.
      instance = new Mentionify(this, options);
      instance.index = $.mentionify.lookup.push(instance) - 1;
      $.data(this, "mentionify", instance);
    });

    return this;
  };
}(jQuery));
