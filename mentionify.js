// TODO: CLEANUP! OLD VERSION, DONT JUDGE!
(function ($) {
    $.fn.mentionify = function (url, options) {
        var defaults = {
            emptyText: "No Results Found",
            matchCase: true,
            minChars: 1,
            keyDelay: 400,
            resultsHighlight: true,
            showAvatars: true,
            queryParam: "key",
            extraParams: "",
            isAdmin: false
        };
        var keycodes = {
            shift: 16,
            enter: 13,
            ctrl: 17,
            alt: 18,
            up: 38,
            down: 40,
            esc: 27,
            del: 46,
            backspace: 8
        };
        var opts = $.extend(defaults, options);
        var isLooking = false;
        var textarea = $(this);

        textarea.keyup(function (event) {
            text = this.value;
            if (event.keyCode != keycodes.enter && event.keyCode != keycodes.ctrl && event.keyCode != keycodes.alt && event.keyCode != keycodes.up && event.keyCode != keycodes.down && event.keycode != keycodes.shift) { // Unless alt or ctrl
                if (isLooking) {
                    var ulclass = opts.isAdmin ? 'class="admin"' : '';

                    if ($('ul#mentionCandidates').length == 0) textarea.after("<ul id='mentionCandidates' " + ulclass + "></ul>");
                    var key = findKey(text);                                                // Obtain the search key.
                    $.getJSON(url + "?" + opts.queryParam + "=" + key + opts.extraParams, function (data) {                     // Call the URL to obtain the list via JSON.  
                        var candidates = 0;
                        $('ul#mentionCandidates *').remove();                                     // Removing the previous list of candidates.
                        $.each(data, function (key, user) {                                       // Appending each new one.  
                            candidates++;
                            if (opts.showAvatars) $('ul#mentionCandidates').append('<li> <img src="' + user.Avatar + '"/>' + user.Nickname + '</li>');
                            else $('ul#mentionCandidates').append('<li data-role="' + user.Role + '">' + user.Nickname + '</li>');
                        });
                        $('ul#mentionCandidates li').hover(                                     // Binding the hover action for each one.
                function () {
                    $('ul#mentionCandidates li').removeClass('selected');
                    $(this).addClass('selected');
                }
              );
                        if (candidates) $('ul#mentionCandidates li').click(function () { pickCandidate(); })              // Binding the click on each list item.
                        else $('ul#mentionCandidates').append('<li class="emptySearch">' + opts.emptyText + '</li>'); // If no mathches show up, show a message.
                        $('ul#mentionCandidates li:last-child').css('border', 'none');                        // Remove the border of the last item.
                        $('ul#mentionCandidates li:first-child').addClass('selected');                        // Select the First candidate by default.
                        $('ul#mentionCandidates').fadeIn();                                     // Fade in the entire list.
                    });
                };
                if (text.charAt(text.length - 1) == "@")
                    isLooking = true;                                 // if the @ has been typed the user is looking for another user.
            };
        });
        //    }).blur(
        //  function(event) { 
        //    hideCandidates(); 
        //  }
        // );

        $(this).bind('keydown',
      function (e) {
          textarea.attr('processing', 'false');
          text = this.value;
          // If the candidates are shown block the key from moving the cursor the textarea.
          if ($('ul#mentionCandidates').length > 0) {
              var n = (window.Event) ? e.which : e.keyCode;
              var selected;
              switch (n) {
                  case keycodes.up:
                      selected = $(".selected");
                      $("#mentionCandidates li").removeClass("selected");
                      if (selected.prev().length == 0) {
                          selected.siblings().last().addClass("selected");
                      } else {
                          selected.prev().addClass("selected");
                      }
                      return false;
                      break;
                  case keycodes.down:
                      selected = $(".selected");
                      $("#mentionCandidates li").removeClass("selected");
                      if (selected.next().length == 0) {
                          selected.siblings().first().addClass("selected");
                      } else {
                          selected.next().addClass("selected");
                      }
                      return false;
                      break;
                  // Use textarea.attr('processing', 'true'); if you need to deal with multiple event handlers in a conditional inside them                       
                  case keycodes.enter: 
                      textarea.attr('processing', 'true'); pickCandidate();
                      return false;
                      break;
                  // Delete                   
                  case keycodes.del:
                      if (text === '@' || text.length === 0) {
                          hideCandidates();
                      }
                      break;
                  case keycodes.backspace:
                      if (text === '@' || text.length === 0) {
                          hideCandidates();
                      }
                      // If the user aborts the search hide the candidates
                  default: if (text == "" || text.indexOf('@') == -1) hideCandidates();
                      break;
              }
          };
          // If the user aborts the search hide the candidates  
          if (text == "" || text.indexOf('@') == -1) {
              hideCandidates();
          };
      });

        function findKey(string) {                                                    // This function takes care of finding the search key that follows the @ and has to be sent to the service
            if (!opts.matchCase) string = string.toLowerCase();
            var substring = string.substr(string.indexOf('@') + 1, string.length - 1);
            var words = substring.split(' ');
            return words[0];
        };

        function hideCandidates() {
            setTimeout(     // We are giving enough time in case the user clicks on a user from the list
        function () { $('ul#mentionCandidates').remove(); }, 250
      );
            textarea.focus();
            isLooking = false; // If the user has deleted the textarea content reset the flag
        };

        function pickCandidate() { // takes the candidates name and replaces the text that follows the @ to the username
            if (!($('ul#mentionCandidates li.emptySearch').length > 0)) {
                //Obtain the nickname of the selected user
                var nickname = $('ul#mentionCandidates li.selected').text(), mention;
                var text = textarea.val();
                var key = findKey(text);
                nickname = nickname.replace(" ", "");
                // Determine if mention goes to an admin or an user
                if ($('ul#mentionCandidates li.selected').data('role') === 30) {
                    mention = text.replace("@" + key, "{admin}" + nickname + "{/admin}");
                } else {
                    mention = text.replace("@" + key, "{user}" + nickname + "{/user}");
                }

                textarea.focus();
                textarea.val(mention);
            };
            hideCandidates();
        };
    }
})(jQuery);