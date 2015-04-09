(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (global){
"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var fittable = _interopRequire(require("./modules/fittable.module.js"));

var sirius = _interopRequire(require("./modules/siriusDataSource.module.js"));

global.fittable = fittable;
global.siriusData = sirius;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"./modules/fittable.module.js":2,"./modules/siriusDataSource.module.js":4}],2:[function(require,module,exports){
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
        this.dataSource = null;

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
        },
        setDataSource: {
            value: function setDataSource(dataSource) {
                this.dataSource = dataSource;
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

},{}],4:[function(require,module,exports){
"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

/**
 * @class SiriusDataSource
 * @brief meh
 */

var dataSource = _interopRequire(require("./siriusDataSource.module.js"));

console.log(dataSource);

var siriusDataSource = (function (_dataSource) {
    function siriusDataSource(baseUrl, accessToken) {
        _classCallCheck(this, siriusDataSource);

        this.baseURL = baseUrl.endsWith("/") ? baseUrl : baseurl + "/";
        this.accessToken = accessToken;
    }

    _inherits(siriusDataSource, _dataSource);

    _createClass(siriusDataSource, {
        makeRequest: {
            value: function makeRequest(subject, parameters, callback) {
                var tplReq = new XMLHttpRequest();
                var params = "";

                // Create parameters string (GET)
                if (parameters.length > 0) {
                    params = "?";
                    for (var i in parameters) params += i + ":" + parameters[i] + (i != parameters.length - 1 ? "&" : "");
                }

                console.log(params);

                tplReq.open("get", this.baseURL + params, true);
                tplReq.onload = function () {
                    callback(tplReq.response);
                };
                tplReq.send();
            }
        },
        getEventsByPerson: {

            /**
             * Constructs a request to Sirius API and returns all event within specified
             * date range through callback in JSON format.
             * @param dateFrom
             * @param dateTo
             * @param person
             * @param offset
             * @param limit
             * @param callback
             */

            value: function getEventsByPerson(dateFrom, dateTo, person, callback) {
                makeRequest("people/" + person + "/events", {
                    from: dateFrom,
                    to: dateTo,
                    offset: 0,
                    limit: 120
                }, callback);
            }
        }
    });

    return siriusDataSource;
})(dataSource);

module.exports = siriusDataSource;

},{"./siriusDataSource.module.js":4}]},{},[1])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9ncnVudC1icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJDOi94YW1wcC9odGRvY3MvZml0dGFibGUvc3JjL2pzL2FwcC5qcyIsIkM6L3hhbXBwL2h0ZG9jcy9maXR0YWJsZS9zcmMvanMvbW9kdWxlcy9maXR0YWJsZS5tb2R1bGUuanMiLCJDOi94YW1wcC9odGRvY3MvZml0dGFibGUvc3JjL2pzL21vZHVsZXMvcmVuZGVyZXIubW9kdWxlLmpzIiwiQzoveGFtcHAvaHRkb2NzL2ZpdHRhYmxlL3NyYy9qcy9tb2R1bGVzL3Npcml1c0RhdGFTb3VyY2UubW9kdWxlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7SUNBTyxRQUFRLDJCQUFNLDhCQUE4Qjs7SUFDNUMsTUFBTSwyQkFBTSxzQ0FBc0M7O0FBRXpELE1BQU0sQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO0FBQzNCLE1BQU0sQ0FBQyxVQUFVLEdBQUcsTUFBTSxDQUFDOzs7Ozs7Ozs7Ozs7O0lDSnBCLFFBQVEsMkJBQU0sc0JBQXNCOzs7Ozs7O0lBT3RCLFFBQVE7QUFFZCxhQUZNLFFBQVEsQ0FFWixXQUFXLEVBQ3hCOzs7OEJBSGlCLFFBQVE7O0FBSXJCLFlBQUksQ0FBQyxrQkFBa0IsR0FBRyxXQUFXLENBQUM7QUFDdEMsWUFBSSxDQUFDLFVBQVUsQ0FBQztBQUNoQixZQUFJLENBQUMsUUFBUSxHQUFHLElBQUksUUFBUSxFQUFFLENBQUM7QUFDL0IsWUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUM7O0FBRXZCLGNBQU0sQ0FBQyxnQkFBZ0IsQ0FBRSxNQUFNLEVBQUUsWUFDN0I7QUFDSSxrQkFBSyxVQUFVLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBRSxNQUFLLGtCQUFrQixDQUFFLENBQUM7QUFDckUsa0JBQUssUUFBUSxDQUFDLE1BQU0sQ0FBRSxNQUFLLFVBQVUs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QUFNLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFDckQ7QUFDSSwyQkFBVyxDQUFFLFNBQVMsR0FBRyxNQUFNLEdBQUcsU0FBUyxFQUFFO0FBQ3pDLDBCQUFRLFFBQVE7QUFDaEIsd0JBQU0sTUFBTTtBQUNaLDRCQUFVLENBQUM7QUFDWCwyQkFBUyxHQUFHO2lCQUNmLEVBQUUsUUFBUSxDQUFDLENBQUM7YUFDaEI7Ozs7V0FoRGdCLGdCQUFnQjtHQUFTLFVBQVU7O2lCQUFuQyxnQkFBZ0IiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiaW1wb3J0IGZpdHRhYmxlIGZyb20gJy4vbW9kdWxlcy9maXR0YWJsZS5tb2R1bGUuanMnO1xyXG5pbXBvcnQgc2lyaXVzIGZyb20gJy4vbW9kdWxlcy9zaXJpdXNEYXRhU291cmNlLm1vZHVsZS5qcyc7XHJcblxyXG5nbG9iYWwuZml0dGFibGUgPSBmaXR0YWJsZTtcclxuZ2xvYmFsLnNpcml1c0RhdGEgPSBzaXJpdXM7XHJcbiIsImltcG9ydCByZW5kZXJlciBmcm9tICcuL3JlbmRlcmVyLm1vZHVsZS5qcyc7XHJcblxyXG4vKipcclxuIEBtb2R1bGUgZml0dGFibGVcclxuIEBicmllZiBJIGR1bm5vIHlldFxyXG4gKi9cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGZpdHRhYmxlXHJcbntcclxuICAgIGNvbnN0cnVjdG9yKCBlbGVtZW50TmFtZSApXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5kZWZhdWx0RWxlbWVudE5hbWUgPSBlbGVtZW50TmFtZTtcclxuICAgICAgICB0aGlzLkRPTWVsZW1lbnQ7XHJcbiAgICAgICAgdGhpcy5yZW5kZXJlciA9IG5ldyByZW5kZXJlcigpO1xyXG4gICAgICAgIHRoaXMuZGF0YVNvdXJjZSA9IG51bGw7XHJcblxyXG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCAnbG9hZCcsICgpID0+XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuRE9NZWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCB0aGlzLmRlZmF1bHRFbGVtZW50TmFtZSApO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yZW5kZXJlci5yZW5kZXIoIHRoaXMuRE9NZWxlbWVudCApO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRET01lbGVtZW50KClcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5ET01lbGVtZW50O1xyXG4gICAgfVxyXG5cclxuICAgIHNldERhdGFTb3VyY2UoIGRhdGFTb3VyY2UgKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuZGF0YVNvdXJjZSA9IGRhdGFTb3VyY2U7XHJcbiAgICB9XHJcbn1cclxuXHJcblxyXG4iLCIvKipcclxuICogQGNsYXNzIFJlbmRlcmVyXHJcbiAqIEBicmllZiBuYWhcclxuICovXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyByZW5kZXJlclxyXG57XHJcbiAgICBjb25zdHJ1Y3RvcigpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy50ZW1wbGF0ZUZpbGUgPSAndGVtcGxhdGUvdGVtcGxhdGUuaHRtbCc7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogTWFrZXMgSFRUUCByZXF1ZXN0IGFuZCByZXR1cm5zIG1haW4gSFRNTCB0ZW1wbGF0ZVxyXG4gICAgICogQHBhcmFtIHtmdW5jdGlvbn0gY2FsbGJhY2sgLSBjYWxsZWQgYWZ0ZXIgc3VjY2VzcyBodHRwIHJlc3BvbnNlXHJcbiAgICAgKi9cclxuICAgIGxvYWRUZW1wbGF0ZSggY2FsbGJhY2sgKVxyXG4gICAge1xyXG4gICAgICAgIHZhciB0cGxSZXEgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcclxuXHJcbiAgICAgICAgdHBsUmVxLm9wZW4oICdnZXQnLCB0aGlzLnRlbXBsYXRlRmlsZSwgdHJ1ZSApO1xyXG4gICAgICAgIHRwbFJlcS5vbmxvYWQgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgIGNhbGxiYWNrKCB0cGxSZXEucmVzcG9uc2UgKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIHRwbFJlcS5zZW5kKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZW5kZXJzIGZpdHRhYmxlXHJcbiAgICAgKi9cclxuICAgIHJlbmRlciggZWxlbWVudCApXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5sb2FkVGVtcGxhdGUoICggdGVtcGxhdGUgKSA9PlxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIGVsZW1lbnQgIT0gbnVsbCApXHJcbiAgICAgICAgICAgICAgICAgICAgZWxlbWVudC5vdXRlckhUTUwgPSB0ZW1wbGF0ZTtcclxuICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICB0aHJvdyAnRWxlbWVudCBmb3IgcmVuZGVyaW5nIG5vdCBmb3VuZC4gUmVuZGVyIGFib3J0ZWQuJztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcblxyXG59XHJcbiIsIi8qKlxyXG4gKiBAY2xhc3MgU2lyaXVzRGF0YVNvdXJjZVxyXG4gKiBAYnJpZWYgbWVoXHJcbiAqL1xyXG5cclxuaW1wb3J0IGRhdGFTb3VyY2UgZnJvbSAnLi9zaXJpdXNEYXRhU291cmNlLm1vZHVsZS5qcyc7XHJcblxyXG5jb25zb2xlLmxvZyggZGF0YVNvdXJjZSApO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3Mgc2lyaXVzRGF0YVNvdXJjZSBleHRlbmRzIGRhdGFTb3VyY2Vcclxue1xyXG4gICAgY29uc3RydWN0b3IoIGJhc2VVcmwsIGFjY2Vzc1Rva2VuIClcclxuICAgIHtcclxuICAgICAgICB0aGlzLmJhc2VVUkwgPSBiYXNlVXJsLmVuZHNXaXRoKCcvJykgPyBiYXNlVXJsIDogYmFzZXVybCArICcvJztcclxuICAgICAgICB0aGlzLmFjY2Vzc1Rva2VuID0gYWNjZXNzVG9rZW47XHJcbiAgICB9XHJcblxyXG4gICAgbWFrZVJlcXVlc3QoIHN1YmplY3QsIHBhcmFtZXRlcnMsIGNhbGxiYWNrIClcclxuICAgIHtcclxuICAgICAgICB2YXIgdHBsUmVxID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XHJcbiAgICAgICAgdmFyIHBhcmFtcyA9ICcnO1xyXG5cclxuICAgICAgICAvLyBDcmVhdGUgcGFyYW1ldGVycyBzdHJpbmcgKEdFVClcclxuICAgICAgICBpZiAoIHBhcmFtZXRlcnMubGVuZ3RoID4gMCApXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBwYXJhbXMgPSAnPyc7XHJcbiAgICAgICAgICAgIGZvciAoIHZhciBpIGluIHBhcmFtZXRlcnMgKVxyXG4gICAgICAgICAgICAgICAgcGFyYW1zICs9IGkgKyAnOicgKyBwYXJhbWV0ZXJzW2ldICsgKCBpICE9IHBhcmFtZXRlcnMubGVuZ3RoIC0gMSA/ICcmJyA6ICcnKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnNvbGUubG9nKCBwYXJhbXMgKTtcclxuXHJcbiAgICAgICAgdHBsUmVxLm9wZW4oICdnZXQnLCB0aGlzLmJhc2VVUkwgKyBwYXJhbXMsIHRydWUgKTtcclxuICAgICAgICB0cGxSZXEub25sb2FkID0gKCkgPT4ge1xyXG4gICAgICAgICAgICBjYWxsYmFjayggdHBsUmVxLnJlc3BvbnNlICk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICB0cGxSZXEuc2VuZCgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ29uc3RydWN0cyBhIHJlcXVlc3QgdG8gU2lyaXVzIEFQSSBhbmQgcmV0dXJucyBhbGwgZXZlbnQgd2l0aGluIHNwZWNpZmllZFxyXG4gICAgICogZGF0ZSByYW5nZSB0aHJvdWdoIGNhbGxiYWNrIGluIEpTT04gZm9ybWF0LlxyXG4gICAgICogQHBhcmFtIGRhdGVGcm9tXHJcbiAgICAgKiBAcGFyYW0gZGF0ZVRvXHJcbiAgICAgKiBAcGFyYW0gcGVyc29uXHJcbiAgICAgKiBAcGFyYW0gb2Zmc2V0XHJcbiAgICAgKiBAcGFyYW0gbGltaXRcclxuICAgICAqIEBwYXJhbSBjYWxsYmFja1xyXG4gICAgICovXHJcbiAgICBnZXRFdmVudHNCeVBlcnNvbiggZGF0ZUZyb20sIGRhdGVUbywgcGVyc29uLCBjYWxsYmFjayApXHJcbiAgICB7XHJcbiAgICAgICAgbWFrZVJlcXVlc3QoICdwZW9wbGUvJyArIHBlcnNvbiArICcvZXZlbnRzJywge1xyXG4gICAgICAgICAgICAnZnJvbSc6IGRhdGVGcm9tLFxyXG4gICAgICAgICAgICAndG8nOiBkYXRlVG8sXHJcbiAgICAgICAgICAgICdvZmZzZXQnOiAwLFxyXG4gICAgICAgICAgICAnbGltaXQnOiAxMjBcclxuICAgICAgICB9LCBjYWxsYmFjayk7XHJcbiAgICB9XHJcbn1cclxuIl19
