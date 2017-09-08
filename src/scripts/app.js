
'use strict';

/**
 * Smash targets below this line
 * -----------------------------
 */

var
    Vec         = require('./modules/Vec'),
    Graphics    = require('./modules/Graphics'),
    $           = require('jquery');

(function(win, doc, c) {

    let
        w = win.innerWidth,
        h = win.innerHeight,

        // These are all used for the main rendering loop
        now,
        then = Date.now(),
        interval = 1000/60,
        delta;

    function render() {

        requestAnimationFrame(render);
        now = Date.now();
        delta = now - then;

        if (delta > interval) {

            then = now - (delta % interval);

        }

    }

    function init() {

        $(document).on('click', 'button', function(e) {
            e.preventDefault();
            $('.cards').toggleClass('rotate-a');
        });

    }

    $(init);

})(window,document,document.querySelectorAll('canvas')[0]);
