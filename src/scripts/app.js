

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

        now,
        then = Date.now(),
        interval = 1000/60,
        delta,

        num = 8,

        order = [
            ['af', 'bb'],
            ['cf', 'ab'],
            ['bf', 'cb']
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
        order.push(order.shift());
        num--;
        if ( num === 0 ) num = 9;
        requestAnimationFrame(smash);
    }

    function smash () {

        $order[order[0][0]].num.html(num);
        $order[order[1][0]].num.html(num);
        $order[order[0][0]].el[0].setAttribute('style', 'transform: translate3d(0, 0, 1px) rotateX(0deg); transition: transform 0.3s ease-out;');
        $order[order[2][0]].el[0].setAttribute('style', 'transform: translate3d(0, 0, 1px) rotateX(-179deg); transition: transform 0.3s ease-out;');
        $order[order[1][0]].el[0].setAttribute('style', 'transform: translate3d(0, 0, -1px) rotateX(-179deg);');

        setTimeout( () => {
            $order[order[1][0]].el[0].setAttribute('style', 'transform: translate3d(0, 0, -1px) rotateX(1deg);')
            $order[order[2][0]].num.html(num-1);
        }, 350);

    }

    function init() {

        $(document).on('click', 'button', function(e) {
            e.preventDefault();
            $('.cards').toggleClass('rotate-a');
        });

        smash();

        setInterval(next, 800);

    }

    $(init);

})(window,document,document.querySelectorAll('canvas')[0]);
