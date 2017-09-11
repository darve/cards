(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){

'use strict';

/**
 * BEHOLD: THE TICK(L)+ER
 * -----------------------------
 * HERE WE GO
 * HERE WE GO
 * HERE WE GO
 */

var Ticker = function Ticker(el, opts) {

    var _interval,
        _timer,
        _final = false,
        num = opts.starting_num || 9,
        target_num = opts.target_num || 0,
        duration = opts.duration || 3,
        transition_speed = opts.transition || 0.2,
        // The speed of each *FWIP*
    transition_normalised = transition_speed * 1000 + 25,
        // from secions to millisectonds (plus 25 for good measure)

    // We are caching these are strings so we don't have to interpolate the style values every tick
    top_style = 'transform: translate3d(0, 0, 1px) rotateX(0deg); transition: transform ' + transition_speed + 's ease-out;',
        bottom_style = 'transform: translate3d(0, 0, 1px) rotateX(-179deg); transition: transform ' + transition_speed + 's ease-out;',
        order = [['af', 'bb'], ['cf', 'ab'], ['bf', 'cb']],
        $order = {
        'af': {
            el: el.querySelectorAll('.a'),
            num: el.querySelectorAll('.a .front .num, .b .back .num')
        },

        'cf': {
            el: el.querySelectorAll('.c'),
            num: el.querySelectorAll('.c .front .num, .a .back .num')
        },

        'bf': {
            el: el.querySelectorAll('.b'),
            num: el.querySelectorAll('.b .front .num, .c .back .num')
        }
    };

    function next() {

        if (_final === true) clearInterval(_interval);

        order.push(order.shift());
        num--;
        if (num === 0) num = 9;
        requestAnimationFrame(smash);
    }

    function smash() {

        $order[order[0][0]].num.forEach(function (item) {
            return item.innerHTML = _final ? target_num : num;
        });
        $order[order[1][0]].num.forEach(function (item) {
            return item.innerHTML = _final ? target_num : num;
        });
        $order[order[0][0]].el[0].setAttribute('style', top_style);
        $order[order[2][0]].el[0].setAttribute('style', bottom_style);
        $order[order[1][0]].el[0].setAttribute('style', 'transform: translate3d(0, 0, -1px) rotateX(-179deg);');

        setTimeout(function () {
            $order[order[1][0]].el[0].setAttribute('style', 'transform: translate3d(0, 0, -1px) rotateX(1deg);');
            $order[order[2][0]].num.forEach(function (item) {
                return item.innerHTML = num - 1;
            });
        }, transition_normalised);
    }

    (function () {
        smash();
        setTimeout(function () {
            _interval = setInterval(next, transition_normalised + 25);
        }, opts.delay || 0);

        setTimeout(function () {
            _final = true;
        }, opts.duration);
    })();

    return this;
};

document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.card').forEach(function (el, i) {

        new Ticker(el, {
            starting_num: 9,
            duration: 6000,
            target_num: Number('2004'.split('')[i]),
            delay: 2000 + Math.random() * 600
        });
    });
});

module.exports = Ticker;

},{}]},{},[1])

