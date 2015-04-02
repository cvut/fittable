(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (global){
"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var fittable = _interopRequire(require("./modules/fittable.module.js"));

global.fittable = fittable;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"./modules/fittable.module.js":2}],2:[function(require,module,exports){
"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var renderer = _interopRequire(require("./renderer.module.js"));

/**
 @module fittable
 @brief I dunno yet
 */

var fittable = (function () {
    function fittable(elementName) {
        var _this = this;

        _classCallCheck(this, fittable);

        this.defaultElementName = elementName;
        this.DOMelement;
        this.renderer = new renderer();

        window.addEventListener("load", function () {
            _this.DOMelement = document.getElementById(_this.defaultElementName);
            _this.renderer.render(_this.DOMelement);
        });
    }

    _createClass(fittable, {
        getDOMelement: {
            value: function getDOMelement() {
                return this.DOMelement;
            }
        }
    });

    return fittable;
})();

module.exports = fittable;

},{"./renderer.module.js":3}],3:[function(require,module,exports){
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

/**
 * @class Renderer
 * @brief nah
 */

var renderer = (function () {
    function renderer() {
        _classCallCheck(this, renderer);

        this.templateFile = "template/template.html";
    }

    _createClass(renderer, {
        loadTemplate: {

            /**
             * Makes HTTP request and returns main HTML template
             * @param {function} callback - called after success http response
             */

            value: function loadTemplate(callback) {
                var tplReq = new XMLHttpRequest();

                tplReq.open("get", this.templateFile, true);
                tplReq.onload = function () {
                    callback(tplReq.response);
                };
                tplReq.send();
            }
        },
        render: {

            /**
             * Renders fittable
             */

            value: function render(element) {
                this.loadTemplate(function (template) {
                    if (element != null) element.outerHTML = template;else throw "Element for rendering not found. Render aborted.";
                });
            }
        }
    });

    return renderer;
})();

module.exports = renderer;

},{}]},{},[1])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9ncnVudC1icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJDOi94YW1wcC9odGRvY3MvZml0dGFibGUvc3JjL2pzL2FwcC5qcyIsIkM6L3hhbXBwL2h0ZG9jcy9maXR0YWJsZS9zcmMvanMvbW9kdWxlcy9maXR0YWJsZS5tb2R1bGUuanMiLCJDOi94YW1wcC9odGRvY3MvZml0dGFibGUvc3JjL2pzL21vZHVsZXMvcmVuZGVyZXIubW9kdWxlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7SUNBTyxRQUFRLDJCQUFNLDhCQUE4Qjs7QUFFbkQsTUFBTSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7Ozs7Ozs7Ozs7Ozs7SUNGcEIsUUFBUSwyQkFBTSxzQkFBc0I7Ozs7Ozs7SUFPdEIsUUFBUTtBQUVkLGFBRk0sUUFBUSxDQUVaLFdBQVcsRUFDeEI7Ozs4QkFIaUIsUUFBUTs7QUFJckIsWUFBSSxDQUFDLGtCQUFrQixHQUFHLFdBQVcsQ0FBQztBQUN0QyxZQUFJLENBQUMsVUFBVSxDQUFDO0FBQ2hCLFlBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxRQUFRLEVBQUUsQ0FBQzs7QUFFL0IsY0FBTSxDQUFDLGdCQUFnQixDQUFFLE1BQU0sRUFBRSxZQUM3QjtBQUNJLGtCQUFLLFVBQVUsR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFFLE1BQUssa0JBQWtCLENBQUUsQ0FBQztBQUNyRSxrQkFBSyxRQUFRLENBQUMsTUFBTSxDQUFFLE1BQUssVUFBVSxDQUFFLENBQUM7U0FDM0MsQ0FBQyxDQUFDO0tBQ1Y7O2lCQWJnQixRQUFRO0FBZXpCLHFCQUFhO21CQUFBLHlCQUNiO0FBQ0ksdUJBQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQzthQUMxQjs7OztXQWxCZ0IsUUFBUTs7O2lCQUFSLFFBQVE7Ozs7Ozs7Ozs7Ozs7O0lDRlIsUUFBUTtBQUVkLGFBRk0sUUFBUSxHQUd6Qjs4QkFIaUIsUUFBUTs7QUFJckIsWUFBSSxDQUFDLFlBQVksR0FBRyx3QkFBd0IsQ0FBQztLQUNoRDs7aUJBTGdCLFFBQVE7QUFZekIsb0JBQVk7Ozs7Ozs7bUJBQUEsc0JBQUUsUUFBUSxFQUN0QjtBQUNJLG9CQUFJLE1BQU0sR0FBRyxJQUFJLGNBQWMsRUFBRSxDQUFDOztBQUVsQyxzQkFBTSxDQUFDLElBQUksQ0FBRSxLQUFLLEVBQUUsSUFBSSxDQUFDLFlBQVksRUFBRSxJQUFJLENBQUUsQ0FBQztBQUM5QyxzQkFBTSxDQUFDLE1BQU0sR0FBRyxZQUFNO0FBQ2xCLDRCQUFRLENBQUUsTUFBTSxDQUFDLFFBQVEsQ0FBRSxDQUFDO2lCQUMvQixDQUFDO0FBQ0Ysc0JBQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQzthQUNqQjs7QUFLRCxjQUFNOzs7Ozs7bUJBQUEsZ0JBQUUsT0FBTyxFQUNmO0FBQ0ksb0JBQUksQ0FBQyxZQUFZLENBQUUsVUFBRSxRQUFRLEVBQ3pCO0FBQ0ksd0JBQUssT0FBTyxJQUFJLElBQUksRUFDaEIsT0FBTyxDQUFDLFNBQVMsR0FBRyxRQUFRLENBQUMsS0FFN0IsTUFBTSxrREFBa0QsQ0FBQztpQkFDaEUsQ0FDSixDQUFDO2FBQ0w7Ozs7V0FwQ2dCLFFBQVE7OztpQkFBUixRQUFRIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImltcG9ydCBmaXR0YWJsZSBmcm9tICcuL21vZHVsZXMvZml0dGFibGUubW9kdWxlLmpzJztcclxuXHJcbmdsb2JhbC5maXR0YWJsZSA9IGZpdHRhYmxlO1xyXG4iLCJpbXBvcnQgcmVuZGVyZXIgZnJvbSAnLi9yZW5kZXJlci5tb2R1bGUuanMnO1xyXG5cclxuLyoqXHJcbiBAbW9kdWxlIGZpdHRhYmxlXHJcbiBAYnJpZWYgSSBkdW5ubyB5ZXRcclxuICovXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBmaXR0YWJsZVxyXG57XHJcbiAgICBjb25zdHJ1Y3RvciggZWxlbWVudE5hbWUgKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuZGVmYXVsdEVsZW1lbnROYW1lID0gZWxlbWVudE5hbWU7XHJcbiAgICAgICAgdGhpcy5ET01lbGVtZW50O1xyXG4gICAgICAgIHRoaXMucmVuZGVyZXIgPSBuZXcgcmVuZGVyZXIoKTtcclxuXHJcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoICdsb2FkJywgKCkgPT5cclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5ET01lbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoIHRoaXMuZGVmYXVsdEVsZW1lbnROYW1lICk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJlbmRlcmVyLnJlbmRlciggdGhpcy5ET01lbGVtZW50ICk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGdldERPTWVsZW1lbnQoKVxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiB0aGlzLkRPTWVsZW1lbnQ7XHJcbiAgICB9XHJcbn1cclxuXHJcblxyXG4iLCIvKipcclxuICogQGNsYXNzIFJlbmRlcmVyXHJcbiAqIEBicmllZiBuYWhcclxuICovXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyByZW5kZXJlclxyXG57XHJcbiAgICBjb25zdHJ1Y3RvcigpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy50ZW1wbGF0ZUZpbGUgPSAndGVtcGxhdGUvdGVtcGxhdGUuaHRtbCc7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogTWFrZXMgSFRUUCByZXF1ZXN0IGFuZCByZXR1cm5zIG1haW4gSFRNTCB0ZW1wbGF0ZVxyXG4gICAgICogQHBhcmFtIHtmdW5jdGlvbn0gY2FsbGJhY2sgLSBjYWxsZWQgYWZ0ZXIgc3VjY2VzcyBodHRwIHJlc3BvbnNlXHJcbiAgICAgKi9cclxuICAgIGxvYWRUZW1wbGF0ZSggY2FsbGJhY2sgKVxyXG4gICAge1xyXG4gICAgICAgIHZhciB0cGxSZXEgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcclxuXHJcbiAgICAgICAgdHBsUmVxLm9wZW4oICdnZXQnLCB0aGlzLnRlbXBsYXRlRmlsZSwgdHJ1ZSApO1xyXG4gICAgICAgIHRwbFJlcS5vbmxvYWQgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgIGNhbGxiYWNrKCB0cGxSZXEucmVzcG9uc2UgKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIHRwbFJlcS5zZW5kKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZW5kZXJzIGZpdHRhYmxlXHJcbiAgICAgKi9cclxuICAgIHJlbmRlciggZWxlbWVudCApXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5sb2FkVGVtcGxhdGUoICggdGVtcGxhdGUgKSA9PlxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIGVsZW1lbnQgIT0gbnVsbCApXHJcbiAgICAgICAgICAgICAgICAgICAgZWxlbWVudC5vdXRlckhUTUwgPSB0ZW1wbGF0ZTtcclxuICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICB0aHJvdyAnRWxlbWVudCBmb3IgcmVuZGVyaW5nIG5vdCBmb3VuZC4gUmVuZGVyIGFib3J0ZWQuJztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcblxyXG59XHJcbiJdfQ==
