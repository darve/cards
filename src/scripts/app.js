
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
        delta,

        num = 8,

        order = [
            'af', 'bb',
            'cf', 'ab',
            'bf', 'cb'
        ],

        index = 0,

        $order = {
            'af': {
                el: $('.a'),
                num: $('.a .front .num, .b .back .num')
            },

            'cf': {
                el: $('.c'),
                num: $('.c .front .num, .a .back .num')
            },

            'bf': {
                el: $('.b'),
                num: $('.b .front .num, .c .back .num')
            }
        };

    function render() {

        requestAnimationFrame(render);
        now = Date.now();
        delta = now - then;

        if (delta > interval) {

            then = now - (delta % interval);

        }

    }

    function next() {

    }

    function prepare () {
        $order[order[2]].num = num-1;
        $order[order[3]].num = num-1;
        order.push(order.pop());
        order.push(order.pop());
    }

    function init() {

        $(document).on('click', 'button', function(e) {
            e.preventDefault();
            $('.cards').toggleClass('rotate-a');
        });

    }

    $(init);

})(window,document,document.querySelectorAll('canvas')[0]);
