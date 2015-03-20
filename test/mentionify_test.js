(function ($) {
  module('jQuery#mentionify', {
    setup: function () {
      this.elems = $('#qunit-fixture').children();
    }
  });

  test('is chainable', function () {
    expect(1);
    strictEqual(this.elems.mentionify(), this.elems, 'should be chainable');
  });

  test('is mentionify', function () {
    expect(1);
    strictEqual(this.elems.mentionify().text(), 'mentionify0mentionify1mentionify2', 'should be mentionify');
  });

}(jQuery));
