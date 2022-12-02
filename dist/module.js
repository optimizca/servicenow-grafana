define(["@grafana/data","@grafana/runtime","@grafana/ui","lodash","react"], (__WEBPACK_EXTERNAL_MODULE__grafana_data__, __WEBPACK_EXTERNAL_MODULE__grafana_runtime__, __WEBPACK_EXTERNAL_MODULE__grafana_ui__, __WEBPACK_EXTERNAL_MODULE_lodash__, __WEBPACK_EXTERNAL_MODULE_react__) => { return /******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./APIClient.ts":
/*!**********************!*\
  !*** ./APIClient.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "APIClient": () => (/* binding */ APIClient)
/* harmony export */ });
/* harmony import */ var _grafana_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @grafana/runtime */ "@grafana/runtime");
/* harmony import */ var _grafana_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_grafana_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _grafana_data__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @grafana/data */ "@grafana/data");
/* harmony import */ var _grafana_data__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_grafana_data__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var memory_cache__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! memory-cache */ "../node_modules/memory-cache/index.js");
/* harmony import */ var memory_cache__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(memory_cache__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! lodash */ "lodash");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _Utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Utils */ "./Utils.ts");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var method = delegate.iterator[context.method]; if (undefined === method) { if (context.delegate = null, "throw" === context.method) { if (delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method)) return ContinueSentinel; context.method = "throw", context.arg = new TypeError("The iterator does not provide a 'throw' method"); } return ContinueSentinel; } var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) { if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; } return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) { keys.push(key); } return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) { "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); } }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



var _lodash = __webpack_require__(/*! lodash */ "lodash");

var _lodash2 = _interopRequireDefault(_lodash);
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
}

var APIClient = /*#__PURE__*/function () {
  function APIClient(headers, withCredentials, url, cacheTimeout) {
    _classCallCheck(this, APIClient);
    _defineProperty(this, "requestOptions", void 0);
    _defineProperty(this, "cache", void 0);
    _defineProperty(this, "lastCacheDuration", void 0);
    _defineProperty(this, "cacheTimeout", void 0);
    this.requestOptions = {
      headers: headers,
      withCredentials: withCredentials,
      url: url
    };
    this.cacheTimeout = cacheTimeout;
    this.cache = new (memory_cache__WEBPACK_IMPORTED_MODULE_2___default().Cache)();
  }
  _createClass(APIClient, [{
    key: "cachedGet",
    value: function () {
      var _cachedGet = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(method, path, params, cacheDurationSeconds, headers, body, options) {
        var cacheTime, cacheKey, cacheKeyNoTime, cachedItem, cacheKeys, i, key, cacheTimeParams, cacheStartTime, cacheEndTime, timeParams, startTime, endTime, startTimeDifference, endTimeDifference, paramString, result;
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                cacheTime = 60;
                if (typeof cacheDurationSeconds === 'undefined' || !cacheDurationSeconds) {
                  cacheTime = this.cacheTimeout;
                } else {
                  cacheTime = cacheDurationSeconds;
                }
                console.log('using cache timeout: ', cacheTime);
                cacheKey = this.requestOptions.url + path;
                cacheKey += '/body/' + body;
                cacheKeyNoTime = cacheKey;
                if (params && Object.keys(params).length > 0) {
                  cacheKey = cacheKey + (cacheKey.search(/\?/) >= 0 ? '&' : '?') + params.map(function (_ref) {
                    var _ref2 = _slicedToArray(_ref, 2),
                      k = _ref2[0],
                      v = _ref2[1];
                    return "".concat(encodeURIComponent(k), "=").concat(encodeURIComponent(v));
                  }).join('&');
                }
                if (this.lastCacheDuration !== cacheTime) {
                  this.cache.del(cacheKey);
                }
                this.lastCacheDuration = cacheTime;
                cachedItem = this.cache.get(cacheKey);
                if (!(!cachedItem && cacheKey.includes('?'))) {
                  _context.next = 34;
                  break;
                }
                cacheKeys = this.cache.keys();
                i = 0;
              case 13:
                if (!(i < cacheKeys.length)) {
                  _context.next = 34;
                  break;
                }
                key = cacheKeys[i];
                if (!(key.includes(cacheKeyNoTime) && key.includes('?'))) {
                  _context.next = 31;
                  break;
                }
                cacheTimeParams = key.substring(key.indexOf('?') + 1, key.length);
                cacheTimeParams = cacheTimeParams.split('&');
                cacheStartTime = cacheTimeParams[0].substring(cacheTimeParams[0].indexOf('=') + 1, cacheTimeParams[0].length);
                cacheEndTime = cacheTimeParams[1].substring(cacheTimeParams[1].indexOf('=') + 1, cacheTimeParams[1].length);
                timeParams = cacheKey.substring(cacheKey.indexOf('?') + 1, cacheKey.length);
                timeParams = timeParams.split('&');
                startTime = timeParams[0].substring(timeParams[0].indexOf('=') + 1, timeParams[0].length);
                endTime = timeParams[1].substring(timeParams[1].indexOf('=') + 1, timeParams[1].length);
                startTimeDifference = startTime - cacheStartTime;
                endTimeDifference = endTime - cacheEndTime;
                if (!(startTimeDifference >= 0)) {
                  _context.next = 31;
                  break;
                }
                if (!(startTimeDifference <= cacheTime * 1000 && endTimeDifference <= cacheTime * 1000)) {
                  _context.next = 31;
                  break;
                }
                console.log('cache item found in timerange');
                cachedItem = this.cache.get(key);
                return _context.abrupt("break", 34);
              case 31:
                i++;
                _context.next = 13;
                break;
              case 34:
                if (!cachedItem) {
                  _context.next = 37;
                  break;
                }
                console.log('cache item found');
                return _context.abrupt("return", Promise.resolve(cachedItem));
              case 37:
                paramString = '?' + params.map(function (_ref3) {
                  var _ref4 = _slicedToArray(_ref3, 2),
                    k = _ref4[0],
                    v = _ref4[1];
                  return "".concat(encodeURIComponent(k), "=").concat(encodeURIComponent(v));
                }).join('&');
                result = '';
                if (method === 'GET') {
                  result = (0,_grafana_runtime__WEBPACK_IMPORTED_MODULE_0__.getBackendSrv)().get(this.requestOptions.url + path, paramString);
                } else if (method === 'POST') {
                  result = (0,_grafana_runtime__WEBPACK_IMPORTED_MODULE_0__.getBackendSrv)().post(this.requestOptions.url + path + paramString, body);
                }

                // Deprecated method
                //const result = getBackendSrv().datasourceRequest(options);

                this.cache.put(cacheKey, result, cacheTime * 1000);
                return _context.abrupt("return", result);
              case 42:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));
      function cachedGet(_x, _x2, _x3, _x4, _x5, _x6, _x7) {
        return _cachedGet.apply(this, arguments);
      }
      return cachedGet;
    }()
  }, {
    key: "request",
    value: function request(options) {
      options.withCredentials = this.requestOptions.withCredentials;
      options.headers = this.requestOptions.headers;
      var apiPath = options.url;
      options.url = this.requestOptions.url + apiPath;
      var paramStartIndex = apiPath.indexOf('?');
      if (paramStartIndex === -1) {
        paramStartIndex = apiPath.length;
      }
      var path = apiPath.substring(0, paramStartIndex);
      var paramsObject = [];
      if (options.url.indexOf('?') !== -1) {
        var paramStr = options.url.substring(options.url.indexOf('?') + 1, options.url.length);
        var paramArray = paramStr.split('&');
        paramArray.map(function (value) {
          var key = value.substring(0, value.indexOf('='));
          var keyValue = value.substring(value.indexOf('=') + 1, value.length);
          var pair = [key, keyValue];
          paramsObject.push(pair);
        });
      }
      if (options.cacheOverride) {
        var cacheSecondIndex = options.cacheOverride.indexOf('s');
        var cacheMinuteIndex = options.cacheOverride.indexOf('m');
        if (cacheSecondIndex !== -1) {
          options.cacheOverride = parseInt(options.cacheOverride.substring(0, cacheSecondIndex), 10);
        } else if (cacheMinuteIndex !== -1) {
          options.cacheOverride = parseInt(options.cacheOverride.substring(0, cacheMinuteIndex), 10) * 60;
        }
      }
      return this.cachedGet(options.method, path, paramsObject, options.cacheOverride, options.headers, options.data, options);
    }
  }, {
    key: "mapAlertTags",
    value: function mapAlertTags(response) {
      var tags = [];
      response.map(function (d) {
        if (typeof d.additional_info === 'undefined') {
          return;
        }
        try {
          var additional_info = JSON.parse(d.additional_info);
          var keys = Object.keys(additional_info);
          var tagKeys = keys.filter(function (k) {
            return k.includes('tbac-');
          });
          tagKeys.map(function (k) {
            tags.push({
              key: k,
              value: additional_info[k]
            });
          });
        } catch (e) {
          console.log(e);
        }
      });
      tags = tags.filter(function (option, index, self) {
        return index === self.findIndex(function (t) {
          return t.value === option.value && t.key === option.key;
        });
      });
      return tags;
    }
  }, {
    key: "mapChecksToValue",
    value: function mapChecksToValue(result) {
      return _lodash2["default"].map(result, function (d, i) {
        if (typeof d.name !== 'undefined' && typeof d.id !== 'undefined') {
          if (d.name === '' || d.name === null) {
            d.name = 'NULL';
          }
          if (d.id === '' || d.id === null) {
            d.id = 'NULL';
          }
          return {
            text: d.name,
            value: d.id
          };
        } else {
          var keys = Object.keys(d);
          if (d[keys[0]] === '' || d[keys[0]] === null) {
            d[keys[0]] = 'NULL';
          }
          if (keys[1] && (d[keys[1]] === '' || d[keys[1]] === null)) {
            d[keys[1]] = 'NULL';
          }
          return {
            label: d[keys[0]],
            value: keys[1] ? d[keys[1]] : d[keys[0]]
          };
        }
      });
    }
  }, {
    key: "mapChecksToValuePlusSuffix",
    value: function mapChecksToValuePlusSuffix(result) {
      return _lodash2["default"].map(result, function (d, i) {
        var keys = Object.keys(d);
        return {
          label: d[keys[0]],
          value: keys[1] ? d[keys[1]] : d[keys[0]],
          suffix: d[keys[2]]
        };
      });
    }
  }, {
    key: "mapValueSuffixToColumns",
    value: function mapValueSuffixToColumns(result) {
      var displayArray = _lodash2["default"].map(result, function (d, i) {
        return {
          label: d.label + ':display',
          value: d.value + ':d'
        };
      });
      var valueArray = _lodash2["default"].map(result, function (d, i) {
        return {
          label: d.label + ':value',
          value: d.value + ':v'
        };
      });
      var finalResult = displayArray.concat(valueArray);
      finalResult = lodash__WEBPACK_IMPORTED_MODULE_3___default().orderBy(finalResult, ['label'], ['asc']);
      return finalResult;
    }
  }, {
    key: "mapValueAsSuffix",
    value: function mapValueAsSuffix(result, addType) {
      var options = _lodash2["default"].map(result, function (d) {
        var option = {
          label: addType ? d.label + ' (' + d.type + ')' : d.label,
          value: d.value,
          description: d.value
        };
        if (typeof d.options !== 'undefined') {
          option.options = _lodash2["default"].map(d.options, function (n) {
            return {
              label: addType ? n.label + ' (' + n.type + ')' : n.label,
              value: n.value,
              description: n.value
            };
          });
        }
        return option;
      });
      options = lodash__WEBPACK_IMPORTED_MODULE_3___default().orderBy(options, ['label'], ['asc']);
      return options;
    }
  }, {
    key: "mapSuffixToLabel",
    value: function mapSuffixToLabel(result) {
      return _lodash2["default"].map(result, function (d) {
        return {
          label: d.label + ' (' + d.suffix + ')',
          value: d.value
        };
      });
    }
  }, {
    key: "appendInstanceNameToResponse",
    value: function appendInstanceNameToResponse(response, instanceName) {
      response = _lodash2["default"].map(response, function (d, i) {
        d.instanceName = instanceName;
        return d;
      });
      return response;
    }
    // mapTagsToValue(result) {
    //   let tagsList: any[] = [];
    //   for (let d = 0; d < result.data.length; d++) {
    //     for (let v = 0; v < result.data[d].values.length; v++) {
    //       let tagValue = result.data[d].key.name + ' - ' + result.data[d].values[v].value;
    //       let tagId = result.data[d].values[v].id;
    //       tagsList.push({ text: tagValue, value: tagId });
    //     }
    //   }
    //   return tagsList;
    // }
  }, {
    key: "mapToTextValue",
    value: function mapToTextValue(result) {
      return _lodash2["default"].map(result, function (d, i) {
        if (d && d.text && d.value) {
          return {
            text: d.text,
            value: d.value
          };
        } else if (_lodash2["default"].isObject(d)) {
          return {
            text: d,
            value: i
          };
        }
        return {
          text: d,
          value: d
        };
      });
    }
  }, {
    key: "mapOutageResponseToFrame",
    value: function mapOutageResponseToFrame(result, target) {
      return result.map(function (data) {
        var ciName = data.ci;
        console.log(ciName);
        return _Utils__WEBPACK_IMPORTED_MODULE_4__.parseResponse(data.datapoints, ciName, target, [], _grafana_data__WEBPACK_IMPORTED_MODULE_1__.FieldType.string);
      });
    }
  }, {
    key: "mapTrendResponseToFrame",
    value: function mapTrendResponseToFrame(result, target) {
      return Object.keys(result[0]).map(function (data) {
        return _Utils__WEBPACK_IMPORTED_MODULE_4__.parseResponse(result[0][data].datapoints, data, target, [], _grafana_data__WEBPACK_IMPORTED_MODULE_1__.FieldType.number);
      });

      // return result.map((data) => {

      //   return utils.parseResponse(data.datapoints, '', target, [], FieldType.number);
      // });
    }
  }, {
    key: "mapMetricsResponseToFrame",
    value: function mapMetricsResponseToFrame(result, target) {
      return result.map(function (data) {
        var seriesName = data.source + ':' + data.metricName;
        if (data.type.length > 0) {
          seriesName += ':' + data.type;
        }
        return _Utils__WEBPACK_IMPORTED_MODULE_4__.parseResponse(data.datapoints, seriesName, target, [], _grafana_data__WEBPACK_IMPORTED_MODULE_1__.FieldType.number);
      });
    }
  }, {
    key: "mapAnamMetricsResponseToFrame",
    value: function mapAnamMetricsResponseToFrame(result, target) {
      var response = result.map(function (r) {
        var ciName = r.ciName;
        var metricName = r.metricName;
        return r.data.map(function (data) {
          var seriesName = ciName + ':' + metricName + ':' + data.type;
          if (result.length === 1 && (data.type === 'UPPER' || data.type === 'LOWER')) {
            seriesName = data.type;
          }
          return _Utils__WEBPACK_IMPORTED_MODULE_4__.parseAnomResponse(data.data, seriesName, target, [], _grafana_data__WEBPACK_IMPORTED_MODULE_1__.FieldType.number);
        });
      });
      // Flattens the array
      response = [].concat.apply([], response);
      return response;
    }
  }, {
    key: "mapTextResponseToFrame",
    value: function mapTextResponseToFrame(result, refId) {
      var _this = this;
      var frame = new _grafana_data__WEBPACK_IMPORTED_MODULE_1__.MutableDataFrame({
        fields: [],
        refId: refId
      });
      if (_Utils__WEBPACK_IMPORTED_MODULE_4__.debugLevel() === 1) {
        _Utils__WEBPACK_IMPORTED_MODULE_4__.printDebug('You are Inside mapTextResponseToFrame');
      }
      console.log(result);
      if (!(result.length > 0)) {
        return [];
      }
      result = result.map(function (r) {
        if (r.additional_info) {
          var additonal_info = JSON.parse(r.additional_info);
          var keys = Object.keys(additonal_info);
          var tags = keys.filter(function (k) {
            return k.includes('tbac-');
          });
          r.tbac_data = {};
          for (var j = 0; j < tags.length; j++) {
            r.tbac_data[tags[j]] = additonal_info[tags[j]];
          }
          r.tbac_data = JSON.stringify(r.tbac_data);
          return r;
        } else {
          return r;
        }
      });
      console.log(result);
      var filedNames = Object.keys(result[0]);
      var _loop = function _loop(i) {
        var values = result.map(function (d) {
          return d[filedNames[i]];
        });
        if (filedNames[i] === 'new' || filedNames[i] === 'value:display') {
          values = _this.sanitizeValues(values);
        }
        var fieldType = _grafana_data__WEBPACK_IMPORTED_MODULE_1__.FieldType.string;
        if (values.length >= 0) {
          fieldType = _Utils__WEBPACK_IMPORTED_MODULE_4__.getFiledType(values[0], filedNames[i]);
        }
        frame.addField({
          name: filedNames[i],
          type: fieldType,
          values: values
        });
      };
      for (var i = 0; i < filedNames.length; i++) {
        _loop(i);
      }
      if (_Utils__WEBPACK_IMPORTED_MODULE_4__.debugLevel() === 1) {
        _Utils__WEBPACK_IMPORTED_MODULE_4__.printDebug(frame);
      }
      return frame;
    }
  }, {
    key: "createTopologyFrame",
    value: function createTopologyFrame(result, refId) {
      var data = [{
        columns: [{
          text: 'type'
        }, {
          type: 'time',
          text: 'Time'
        }, {
          text: 'app'
        }, {
          text: 'target_app'
        }, {
          text: 'req_rate'
        }, {
          text: 'error_rate'
        }],
        rows: result.rows,
        refId: refId || undefined,
        meta: undefined
      }];
      console.log('topology frame: ', data);
      return data;
    }
  }, {
    key: "sanitizeValues",
    value: function sanitizeValues(values) {
      var sanitizedArray = [];
      values.map(function (value) {
        while (value.indexOf('[code]') !== -1) {
          var strBeforeCode = value.substring(0, value.indexOf('[code]'));
          var strAfterCode = value.substring(value.indexOf('[/code]') + 7, value.length);
          if (value.indexOf('<a') !== -1) {
            var aElement = value.substring(value.indexOf('<a'), value.indexOf('</a>', value.indexOf('<a')));
            var aValue = aElement.substring(aElement.indexOf('>') + 1, aElement.length);
            if (aValue.indexOf('<') !== -1) {
              aValue = aValue.substring(0, aValue.indexOf('<'));
            }
            value = strBeforeCode + aValue + strAfterCode;
          } else {
            value = strBeforeCode + strAfterCode;
          }
        }
        sanitizedArray.push(value);
      });
      return sanitizedArray;
    }
  }]);
  return APIClient;
}();

/***/ }),

/***/ "./ConfigEditor.tsx":
/*!**************************!*\
  !*** ./ConfigEditor.tsx ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ConfigEditor": () => (/* binding */ ConfigEditor)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @grafana/ui */ "@grafana/ui");
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__);
var _Alert;
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }


var ConfigEditor = function ConfigEditor(props) {
  var options = props.options,
    onOptionsChange = props.onOptionsChange;
  if (options.url === '') {
    options.url = 'https://<instance_name>.service-now.com/';
  }
  if (typeof options.jsonData.apiPath === 'undefined') {
    options.jsonData.apiPath = '/api/snc/grafana_api';
  }
  if (typeof options.jsonData.cacheTimeout === 'undefined') {
    options.jsonData.cacheTimeout = 60;
  }
  if (typeof options.jsonData.imageURL === 'undefined') {
    options.jsonData.imageURL = 'https://yiij743y0gi4fteri1asp7p6-wpengine.netdna-ssl.com/wp-content/uploads/2019/03/RegoLink-integration-icons-01.png';
  }
  console.log('config opitons: ', options);
  var customOnChange = function customOnChange(v) {
    var instanceName = '';
    if (v.url.indexOf('https://') !== -1) {
      instanceName = v.url.substring(8, v.url.indexOf('.service-now', 8));
    } else if (v.url.indexOf('http://') !== -1) {
      instanceName = v.url.substring(7, v.url.indexOf('.service-now', 7));
    }
    v.jsonData.instanceName = instanceName;
    onOptionsChange(v);
  };
  var onChangeJsonData = function onChangeJsonData(key, value) {
    onOptionsChange(_extends({}, options, {
      jsonData: _extends({}, options.jsonData, _defineProperty({}, key, value))
    }));
  };
  var cacheOptions = [{
    label: '30m',
    value: 1800
  }, {
    label: '15m',
    value: 900
  }, {
    label: '5m',
    value: 300
  }, {
    label: '2m',
    value: 120
  }, {
    label: '60s',
    value: 60
  }, {
    label: '30s',
    value: 30
  }, {
    label: '5s',
    value: 5
  }];
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, _Alert || (_Alert = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__.Alert, {
    title: "Need more information?",
    severity: "info",
    elevated: true
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__.VerticalGroup, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("p", null, "Local documentation can be found in Configuration => Plugins on this plugin's page"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("p", null, "Or", ' ', /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("a", {
    href: "https://github.com/optimizca/servicenow-grafana/blob/main/README.md"
  }, "Click here to view the documentation on GitHub"))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__.InlineFieldRow, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__.InlineField, {
    labelWidth: 20,
    label: "Logo URL",
    tooltip: "To access this value in each dashboard, create a variable query using namespace: global_image."
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__.Input, {
    defaultValue: typeof options.jsonData['imageURL'] === 'undefined' ? '' : options.jsonData['imageURL'],
    onBlur: function onBlur(v) {
      return onChangeJsonData('imageURL', v.target.value);
    },
    width: 60
  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__.InlineFieldRow, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__.InlineField, {
    labelWidth: 20,
    label: "API Path"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__.Input, {
    defaultValue: typeof options.jsonData['apiPath'] === 'undefined' ? '' : options.jsonData['apiPath'],
    onBlur: function onBlur(v) {
      return onChangeJsonData('apiPath', v.target.value);
    },
    width: 40
  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__.InlineFieldRow, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__.InlineField, {
    labelWidth: 20,
    label: "Cache Timeout",
    tooltip: "Number of seconds to cache a request for. This can be overridden in the query panel."
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__.Select, {
    value: options.jsonData['cacheTimeout'],
    options: cacheOptions,
    allowCustomValue: false,
    backspaceRemovesValue: false,
    isClearable: false,
    isSearchable: true,
    isMulti: false,
    onChange: function onChange(v) {
      return onChangeJsonData('cacheTimeout', v.value);
    }
  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__.DataSourceHttpSettings, {
    defaultUrl: "https://<instance_name>.service-now.com/",
    dataSourceConfig: options,
    showAccessOptions: true,
    sigV4AuthToggleEnabled: false,
    showForwardOAuthIdentityOption: false,
    onChange: customOnChange
  }));
};

/***/ }),

/***/ "./Constants.ts":
/*!**********************!*\
  !*** ./Constants.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "TIME_FILED_NAMES": () => (/* binding */ TIME_FILED_NAMES)
/* harmony export */ });
var TIME_FILED_NAMES = ['sys_created_on', 'created_on', 'last_event_time', 'sys_updated_on', 'time', 'start_time', 'end_time', 'Updated'];

/***/ }),

/***/ "./DataSource.ts":
/*!***********************!*\
  !*** ./DataSource.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DataSource": () => (/* binding */ DataSource)
/* harmony export */ });
/* harmony import */ var lodash_defaults__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash/defaults */ "../node_modules/lodash/defaults.js");
/* harmony import */ var lodash_defaults__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash_defaults__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _grafana_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @grafana/runtime */ "@grafana/runtime");
/* harmony import */ var _grafana_runtime__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_grafana_runtime__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! lodash */ "lodash");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _grafana_data__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @grafana/data */ "@grafana/data");
/* harmony import */ var _grafana_data__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_grafana_data__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./types */ "./types.ts");
/* harmony import */ var SnowManager__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! SnowManager */ "./SnowManager.ts");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var method = delegate.iterator[context.method]; if (undefined === method) { if (context.delegate = null, "throw" === context.method) { if (delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method)) return ContinueSentinel; context.method = "throw", context.arg = new TypeError("The iterator does not provide a 'throw' method"); } return ContinueSentinel; } var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) { if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; } return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) { keys.push(key); } return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) { "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); } }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }






var DataSource = /*#__PURE__*/function (_DataSourceApi) {
  _inherits(DataSource, _DataSourceApi);
  var _super = _createSuper(DataSource);
  function DataSource(instanceSettings) {
    var _this;
    _classCallCheck(this, DataSource);
    _this = _super.call(this, instanceSettings);
    _defineProperty(_assertThisInitialized(_this), "snowConnection", void 0);
    _defineProperty(_assertThisInitialized(_this), "annotations", void 0);
    _defineProperty(_assertThisInitialized(_this), "instanceName", void 0);
    _defineProperty(_assertThisInitialized(_this), "globalImage", void 0);
    _defineProperty(_assertThisInitialized(_this), "apiPath", void 0);
    var connectionOptions = {
      type: instanceSettings.type,
      url: instanceSettings.url,
      name: instanceSettings.name,
      basicAuth: instanceSettings.basicAuth,
      withCredentials: instanceSettings.withCredentials,
      apiPath: instanceSettings.jsonData.apiPath,
      cacheTimeout: instanceSettings.jsonData.cacheTimeout
    };
    _this.globalImage = instanceSettings.jsonData.imageURL;
    _this.instanceName = instanceSettings.jsonData.instanceName;
    _this.apiPath = connectionOptions.apiPath;
    _this.snowConnection = new SnowManager__WEBPACK_IMPORTED_MODULE_5__.SNOWManager(connectionOptions);
    _this.annotations = {};
    return _this;
  }
  _createClass(DataSource, [{
    key: "metricFindQuery",
    value: function () {
      var _metricFindQuery = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(query, options) {
        var values, tableName, nameColumn, idColumn, sysparam, limit, replacedValue, cis, _replacedValue, _cis, _replacedValue2, _cis2, _values, valuesObj, nested_cis, _values2, classesObj, _values3, state, _sysparam, _limit, tags, returnVariables, _values4, keys, _state, _sysparam2, _limit2, _tags, _returnVariables;
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                console.log('inside template variables metricFindQuery');
                if (!(query.namespace === 'global_image')) {
                  _context.next = 3;
                  break;
                }
                return _context.abrupt("return", [{
                  label: this.globalImage,
                  value: this.globalImage
                }]);
              case 3:
                if (!(query.namespace === 'global_instance_name')) {
                  _context.next = 5;
                  break;
                }
                return _context.abrupt("return", [{
                  label: this.instanceName,
                  value: this.instanceName
                }]);
              case 5:
                if (!(query.namespace === 'generic')) {
                  _context.next = 18;
                  break;
                }
                console.log('inside generic variable query');
                if (!(typeof query.rawQuery !== 'undefined')) {
                  _context.next = 17;
                  break;
                }
                values = query.rawQuery.split('||');
                tableName = typeof values[0] === 'undefined' ? '' : (0,_grafana_runtime__WEBPACK_IMPORTED_MODULE_1__.getTemplateSrv)().replace(values[0], options.scopedVars, 'csv');
                nameColumn = typeof values[1] === 'undefined' ? '' : (0,_grafana_runtime__WEBPACK_IMPORTED_MODULE_1__.getTemplateSrv)().replace(values[1], options.scopedVars, 'csv');
                idColumn = typeof values[2] === 'undefined' ? '' : (0,_grafana_runtime__WEBPACK_IMPORTED_MODULE_1__.getTemplateSrv)().replace(values[2], options.scopedVars, 'csv');
                sysparam = typeof values[3] === 'undefined' ? '' : (0,_grafana_runtime__WEBPACK_IMPORTED_MODULE_1__.getTemplateSrv)().replace(values[3], options.scopedVars, 'csv');
                limit = typeof values[4] === 'undefined' ? '9999' : (0,_grafana_runtime__WEBPACK_IMPORTED_MODULE_1__.getTemplateSrv)().replace(values[4], options.scopedVars, 'csv');
                return _context.abrupt("return", this.snowConnection.getGenericVariable(tableName, nameColumn, idColumn, sysparam, limit));
              case 17:
                return _context.abrupt("return", []);
              case 18:
                if (!(query.namespace === 'metric_names')) {
                  _context.next = 25;
                  break;
                }
                console.log('inside metric name variables metricFindQuery');
                console.log(options);
                replacedValue = (0,_grafana_runtime__WEBPACK_IMPORTED_MODULE_1__.getTemplateSrv)().replace(query.rawQuery, options.scopedVars, 'csv');
                console.log('RawQuery replacedValue= ' + replacedValue);
                cis = replacedValue.split(',');
                return _context.abrupt("return", this.snowConnection.getMetricNamesInCIs('', cis));
              case 25:
                if (!(query.namespace === 'golden_metric_names')) {
                  _context.next = 32;
                  break;
                }
                console.log('inside metric name variables metricFindQuery');
                console.log(options);
                _replacedValue = (0,_grafana_runtime__WEBPACK_IMPORTED_MODULE_1__.getTemplateSrv)().replace(query.rawQuery, options.scopedVars, 'csv');
                console.log('RawQuery replacedValue= ' + _replacedValue);
                _cis = _replacedValue.split(',');
                return _context.abrupt("return", this.snowConnection.getMetricNamesInCIs('GOLDEN', _cis));
              case 32:
                if (!(query.namespace === 'custom_kpis')) {
                  _context.next = 39;
                  break;
                }
                console.log('inside metric name variables metricFindQuery');
                console.log(options);
                _replacedValue2 = (0,_grafana_runtime__WEBPACK_IMPORTED_MODULE_1__.getTemplateSrv)().replace(query.rawQuery, options.scopedVars, 'csv');
                console.log('RawQuery replacedValue= ' + _replacedValue2);
                _cis2 = _replacedValue2.split(',');
                return _context.abrupt("return", this.snowConnection.getMetricNamesInCIs('CUSTOM_KPIS', _cis2));
              case 39:
                if (!(query.namespace === 'nested_cis')) {
                  _context.next = 48;
                  break;
                }
                console.log('inside nested cis variable query');
                _values = query.rawQuery.split('||');
                _values.map(function (value, i) {
                  _values[i] = (0,_grafana_runtime__WEBPACK_IMPORTED_MODULE_1__.getTemplateSrv)().replace(value, options.scopedVars, 'csv');
                  if (_values[i].indexOf('$') === 0) {
                    _values = _values.splice(i);
                  }
                });
                valuesObj = {
                  ci: typeof _values[0] === 'undefined' ? '' : _values[0],
                  parentDepth: typeof _values[1] === 'undefined' ? '' : _values[1],
                  childDepth: typeof _values[2] === 'undefined' ? '' : _values[2],
                  sysparam: typeof _values[3] === 'undefined' ? '' : _values[3]
                };
                console.log(valuesObj);
                nested_cis = this.snowConnection.getNestedCIS(valuesObj);
                console.log('nested cis return: ', nested_cis);
                return _context.abrupt("return", nested_cis);
              case 48:
                if (!(query.namespace === 'nested_classes')) {
                  _context.next = 55;
                  break;
                }
                console.log('inside nested cis variable query');
                _values2 = query.rawQuery.split('||');
                _values2.map(function (value, i) {
                  _values2[i] = (0,_grafana_runtime__WEBPACK_IMPORTED_MODULE_1__.getTemplateSrv)().replace(value, options.scopedVars, 'csv');
                  if (_values2[i].indexOf('$') === 0) {
                    _values2 = _values2.splice(i);
                  }
                });
                classesObj = {
                  ci: typeof _values2[0] === 'undefined' ? '' : _values2[0],
                  parentDepth: typeof _values2[1] === 'undefined' ? '' : _values2[1],
                  childDepth: typeof _values2[2] === 'undefined' ? '' : _values2[2],
                  sysparam: typeof _values2[3] === 'undefined' ? '' : _values2[3]
                };
                console.log(classesObj);
                return _context.abrupt("return", this.snowConnection.getNestedClasses(classesObj));
              case 55:
                if (!(query.namespace === 'tagKeys')) {
                  _context.next = 71;
                  break;
                }
                console.log('inside tagKeys variable query');
                if (!(typeof query.rawQuery !== 'undefined')) {
                  _context.next = 70;
                  break;
                }
                _values3 = query.rawQuery.split('||');
                _values3.map(function (value, i) {
                  _values3[i] = (0,_grafana_runtime__WEBPACK_IMPORTED_MODULE_1__.getTemplateSrv)().replace(value, options.scopedVars, 'csv');
                  if (_values3[i].indexOf('$') === 0) {
                    _values3 = _values3.splice(i);
                  }
                });
                state = typeof _values3[0] === 'undefined' ? 'All' : _values3[0];
                _sysparam = typeof _values3[1] === 'undefined' ? '' : _values3[1];
                _limit = typeof _values3[2] === 'undefined' ? '9999' : _values3[2];
                _context.next = 65;
                return this.snowConnection.getAlertTags(state, _sysparam, _limit);
              case 65:
                tags = _context.sent;
                returnVariables = tags.map(function (t) {
                  return {
                    text: t.key,
                    value: t.key
                  };
                });
                returnVariables.unshift({
                  text: 'None',
                  value: ''
                });
                console.log('tagKeys variable: ', returnVariables);
                return _context.abrupt("return", returnVariables);
              case 70:
                return _context.abrupt("return", []);
              case 71:
                if (!(query.namespace === 'tagValues')) {
                  _context.next = 89;
                  break;
                }
                console.log('inside tagKeys variable query');
                if (!(typeof query.rawQuery !== 'undefined')) {
                  _context.next = 88;
                  break;
                }
                _values4 = query.rawQuery.split('||');
                _values4.map(function (value, i) {
                  _values4[i] = (0,_grafana_runtime__WEBPACK_IMPORTED_MODULE_1__.getTemplateSrv)().replace(value, options.scopedVars, 'csv');
                  if (_values4[i].indexOf('$') === 0) {
                    _values4 = _values4.splice(i);
                  }
                });
                keys = typeof _values4[0] === 'undefined' ? '' : _values4[0];
                _state = typeof _values4[1] === 'undefined' ? 'All' : _values4[1];
                _sysparam2 = typeof _values4[2] === 'undefined' ? '' : _values4[2];
                _limit2 = typeof _values4[3] === 'undefined' ? '9999' : _values4[3];
                _context.next = 82;
                return this.snowConnection.getAlertTags(_state, _sysparam2, _limit2);
              case 82:
                _tags = _context.sent;
                _tags = _tags.filter(function (t) {
                  if (keys.includes(t.key)) {
                    return t;
                  }
                });
                _returnVariables = _tags.map(function (t) {
                  return {
                    text: t.value,
                    value: t.value
                  };
                });
                _returnVariables.unshift({
                  text: 'None',
                  value: ''
                });
                console.log('tagValues variable: ', _returnVariables);
                return _context.abrupt("return", _returnVariables);
              case 88:
                return _context.abrupt("return", []);
              case 89:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));
      function metricFindQuery(_x, _x2) {
        return _metricFindQuery.apply(this, arguments);
      }
      return metricFindQuery;
    }()
  }, {
    key: "query",
    value: function () {
      var _query = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(options) {
        var _this2 = this;
        var range, from, to, promises;
        return _regeneratorRuntime().wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                range = options.range;
                from = range.from.valueOf();
                to = range.to.valueOf(); // let queryTopologyType: string = options.targets[0].selectedQueryCategory.value as string;
                // let topologyCacheOverride = options.targets[0].cacheOverride;
                // if (queryTopologyType === 'Topology') {
                //   return this.snowConnection.getTopologyFrame(options.targets[0], options, topologyCacheOverride);
                // }
                promises = lodash__WEBPACK_IMPORTED_MODULE_2___default().map(options.targets, function (t) {
                  if (t.hide) {
                    return [];
                  }
                  var target = lodash__WEBPACK_IMPORTED_MODULE_2___default().cloneDeep(t);
                  var query = lodash_defaults__WEBPACK_IMPORTED_MODULE_0___default()(target, _types__WEBPACK_IMPORTED_MODULE_4__.defaultQuery);
                  var queryType = query.selectedQueryCategory.value;
                  var cacheOverride = query.cacheOverride;
                  switch (queryType) {
                    case 'Topology':
                      return _this2.snowConnection.getTopology(target, options, cacheOverride);
                    case 'Metrics':
                      return _this2.snowConnection.getMetrics(target, from, to, options, cacheOverride);
                    case 'Alerts':
                      return _this2.snowConnection.getAlerts(target, from, to, options, _this2.instanceName, cacheOverride);
                    case 'Changes':
                      return _this2.snowConnection.getChanges(target, from, to, options, cacheOverride);
                    case 'Live_Agent_Data':
                      return _this2.snowConnection.getLiveACCData(target, from, to, options, cacheOverride);
                    case 'Table':
                      return _this2.snowConnection.queryTable(target, from, to, options, cacheOverride);
                    case 'Row_Count':
                      return _this2.snowConnection.getRowCount(target, from, to, options, cacheOverride);
                    case 'Aggregate':
                      return _this2.snowConnection.getAggregateQuery(target, from, to, options, cacheOverride);
                    case 'Geohash_Map':
                      return _this2.snowConnection.getGeohashMap(target, options, cacheOverride);
                    case 'Log_Data':
                      return _this2.snowConnection.queryLogData(target, from, to, options, cacheOverride);
                    case 'Trend_Data':
                      return _this2.snowConnection.getTrendData(target, from, to, options, cacheOverride);
                    case 'Outage_Status':
                      return _this2.snowConnection.getOutageStatus(target, from, to, options, cacheOverride);
                    case 'Anomaly':
                      return _this2.snowConnection.getAnomaly(target, from, to, options, cacheOverride);
                    default:
                      return [];
                  }
                });
                return _context2.abrupt("return", Promise.all(lodash__WEBPACK_IMPORTED_MODULE_2___default().flatten(promises)).then((lodash__WEBPACK_IMPORTED_MODULE_2___default().flatten)).then(function (data) {
                  return {
                    data: data,
                    state: _grafana_data__WEBPACK_IMPORTED_MODULE_3__.LoadingState.Done,
                    key: options.requestId
                  };
                }));
              case 5:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));
      function query(_x3) {
        return _query.apply(this, arguments);
      }
      return query;
    }()
  }, {
    key: "testDatasource",
    value: function testDatasource() {
      return this.snowConnection.apiClient.request({
        url: this.apiPath,
        method: 'GET'
      }).then(function () {
        return {
          status: 'success',
          message: 'Data source connection is successful',
          title: 'Success'
        };
      })["catch"](function (error) {
        return {
          status: 'error',
          message: "Data source connection failed: ".concat(error.statusText),
          title: 'Error'
        };
      });
    }
  }]);
  return DataSource;
}(_grafana_data__WEBPACK_IMPORTED_MODULE_3__.DataSourceApi);

/***/ }),

/***/ "./QueryEditor.tsx":
/*!*************************!*\
  !*** ./QueryEditor.tsx ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "QueryEditor": () => (/* binding */ QueryEditor)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _SplitQueryEditor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./SplitQueryEditor */ "./SplitQueryEditor.tsx");


var QueryEditor = function QueryEditor(props) {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_SplitQueryEditor__WEBPACK_IMPORTED_MODULE_1__.SplitQueryEditor, props);
};

/***/ }),

/***/ "./SnowManager.ts":
/*!************************!*\
  !*** ./SnowManager.ts ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SNOWManager": () => (/* binding */ SNOWManager)
/* harmony export */ });
/* harmony import */ var APIClient__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! APIClient */ "./APIClient.ts");
/* harmony import */ var _Utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Utils */ "./Utils.ts");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }


var SNOWManager = /*#__PURE__*/function () {
  function SNOWManager(options) {
    _classCallCheck(this, SNOWManager);
    _defineProperty(this, "apiClient", void 0);
    _defineProperty(this, "apiPath", void 0);
    var basicAuth = options.basicAuth,
      withCredentials = options.withCredentials,
      url = options.url,
      apiPath = options.apiPath,
      cacheTimeout = options.cacheTimeout;
    this.apiPath = apiPath;
    var headers = {
      'Content-Type': 'application/json'
    };
    if (typeof basicAuth === 'string' && basicAuth.length > 0) {
      headers['Authorization'] = basicAuth;
    }
    this.apiClient = new APIClient__WEBPACK_IMPORTED_MODULE_0__.APIClient(headers, withCredentials, url, cacheTimeout);
  }
  // Start of query methods
  _createClass(SNOWManager, [{
    key: "getTopology",
    value: function getTopology(target, options, cacheOverride) {
      var _this = this;
      if (_Utils__WEBPACK_IMPORTED_MODULE_1__.debugLevel() === 1) {
        console.log('isnide get Topology');
        console.log('print target');
        console.log(target);
        console.log('print options');
        console.log(options);
      }
      var startingPoint = '';
      if (target.selectedServiceList) {
        if (target.selectedServiceList.value) {
          startingPoint = _Utils__WEBPACK_IMPORTED_MODULE_1__.replaceTargetUsingTemplVarsCSV(target.selectedServiceList.value, options.scopedVars);
        }
      }
      var child_depth = '';
      if (target.topology_child_depth) {
        child_depth = _Utils__WEBPACK_IMPORTED_MODULE_1__.replaceTargetUsingTemplVars(target.topology_child_depth, options.scopedVars);
      }
      var parent_depth = '';
      if (target.topology_parent_depth) {
        parent_depth = _Utils__WEBPACK_IMPORTED_MODULE_1__.replaceTargetUsingTemplVars(target.topology_parent_depth, options.scopedVars);
      }
      var sysparm = '';
      if (target.sysparam_query) {
        sysparm = _Utils__WEBPACK_IMPORTED_MODULE_1__.replaceTargetUsingTemplVarsCSV(target.sysparam_query, options.scopedVars);
      }
      sysparm = this.removeFiltersWithAll(sysparm);
      var bodyData = "{\"targets\":[{\"target\":\"".concat(startingPoint, "\",\"child_depth\":\"").concat(child_depth, "\",\"parent_depth\":\"").concat(parent_depth, "\",\"sysparm_query\":\"").concat(sysparm, "\"}]}");
      if (_Utils__WEBPACK_IMPORTED_MODULE_1__.debugLevel() === 1) {
        console.log('startingPoint after replace');
        console.log(startingPoint);
        console.log(bodyData);
      }
      return this.apiClient.request({
        url: this.apiPath + '/v1/query/topology',
        data: bodyData,
        method: 'POST',
        cacheOverride: cacheOverride === '' ? null : cacheOverride
      }).then(function (response) {
        _Utils__WEBPACK_IMPORTED_MODULE_1__.printDebug('print topology response from SNOW');
        _Utils__WEBPACK_IMPORTED_MODULE_1__.printDebug(response);
        _Utils__WEBPACK_IMPORTED_MODULE_1__.printDebug('~~~~~~~~~~~~~~~~');
        return _this.apiClient.createTopologyFrame(response, target.refId);
      })["catch"](function (error) {
        console.error('topology query error: ', error);
        throw new Error(error.data.error.message);
      });
    }
  }, {
    key: "getMetrics",
    value: function getMetrics(target, timeFrom, timeTo, options, cacheOverride) {
      var _this2 = this;
      if (_Utils__WEBPACK_IMPORTED_MODULE_1__.debugLevel() === 1) {
        console.log('isnide getMetrics');
        console.log('print target');
        console.log(target);
        console.log('print options scoped Vars');
        console.log(options.scopedVars);
      }
      var anomaly = false;
      var sourceTarget = '';
      var resourceNameArray = [];
      var resourceName = '';
      var metricNameArray = [];
      var metricName = '';
      var metricAnomaly = '';
      var sysparam = '';
      if (target.selectedSourceList) {
        var sourceArray = [];
        target.selectedSourceList.map(function (listItem) {
          sourceArray.push(_Utils__WEBPACK_IMPORTED_MODULE_1__.replaceTargetUsingTemplVars(listItem.value, options.scopedVars));
        });
        sourceTarget = _Utils__WEBPACK_IMPORTED_MODULE_1__.createRegEx(sourceArray);
        console.log('ciIds: ', sourceTarget);
      }
      if (target.selectedMetricTypeList) {
        target.selectedMetricTypeList.map(function (listItem) {
          resourceNameArray.push(_Utils__WEBPACK_IMPORTED_MODULE_1__.replaceTargetUsingTemplVars(listItem.value, options.scopedVars));
        });
        resourceName = _Utils__WEBPACK_IMPORTED_MODULE_1__.createRegEx(resourceNameArray);
        console.log('resourceNames: ', resourceName);
      }
      if (target.selectedMetricNameList) {
        target.selectedMetricNameList.map(function (listItem) {
          metricNameArray.push(_Utils__WEBPACK_IMPORTED_MODULE_1__.replaceTargetUsingTemplVars(listItem.value, options.scopedVars));
        });
        metricName = _Utils__WEBPACK_IMPORTED_MODULE_1__.createRegEx(metricNameArray);
      }
      if (target.selectedMetricAnomalyList) {
        if (target.selectedMetricAnomalyList.value) {
          metricAnomaly = _Utils__WEBPACK_IMPORTED_MODULE_1__.replaceTargetUsingTemplVars(target.selectedMetricAnomalyList.value, options.scopedVars);
          if (metricAnomaly === 'true') {
            anomaly = true;
          }
        }
      }
      if (target.sysparam_query) {
        sysparam = _Utils__WEBPACK_IMPORTED_MODULE_1__.replaceTargetUsingTemplVarsCSV(target.sysparam_query, options.scopedVars);
      }
      sysparam = this.removeFiltersWithAll(sysparam);
      metricName = _Utils__WEBPACK_IMPORTED_MODULE_1__.trimRegEx(metricName);
      sourceTarget = _Utils__WEBPACK_IMPORTED_MODULE_1__.trimRegEx(sourceTarget);
      var bodyData = "{\"targets\":[{\"target\":\"".concat(sourceTarget, "\",\"resourceName\":\"").concat(resourceName, "\",\"metricName\":\"").concat(metricName, "\",\"sysparm_query\":\"").concat(sysparam, "\"}]}");
      var metricURL = this.apiPath + '/v1/query/single_metric?startTime=' + timeFrom + '&endTime=' + timeTo;
      if (metricName === '*') {
        metricURL = this.apiPath + '/v1/query/all_metrics?startTime=' + timeFrom + '&endTime=' + timeTo;
      }
      if (anomaly === true) {
        metricURL = this.apiPath + '/v1/query/anomaly_metrics?startTime=' + timeFrom + '&endTime=' + timeTo;
      }
      if (_Utils__WEBPACK_IMPORTED_MODULE_1__.debugLevel() === 1) {
        console.log('source after replace');
        console.log(metricURL);
        console.log(sourceTarget);
        console.log(bodyData);
      }
      return this.apiClient.request({
        url: metricURL,
        data: bodyData,
        method: 'POST',
        cacheOverride: cacheOverride === '' ? null : cacheOverride
      }).then(function (response) {
        console.log('metric response: ', response);
        if (anomaly === true) {
          return _this2.apiClient.mapAnamMetricsResponseToFrame(response, target);
        } else {
          return _this2.apiClient.mapMetricsResponseToFrame(response, target);
        }
      })["catch"](function (error) {
        console.error('metric query error: ', error);
        throw new Error(error.data.error.message);
      });
    }
  }, {
    key: "getAlerts",
    value: function getAlerts(target, timeFrom, timeTo, options, instanceName, cacheOverride) {
      var _this3 = this;
      if (_Utils__WEBPACK_IMPORTED_MODULE_1__.debugLevel() === 1) {
        console.log('isnide GetAlerts');
        console.log('print target');
        console.log(target);
        console.log('print options scoped Vars');
        console.log(options.scopedVars);
      }
      var service = '';
      if (target.selectedServiceList) {
        if (target.selectedServiceList.value) {
          service = _Utils__WEBPACK_IMPORTED_MODULE_1__.replaceTargetUsingTemplVarsCSV(target.selectedServiceList.value, options.scopedVars);
        }
      }
      var ci = '';
      if (target.selectedSourceList) {
        var sourceArray = [];
        target.selectedSourceList.map(function (listItem) {
          sourceArray.push(_Utils__WEBPACK_IMPORTED_MODULE_1__.replaceTargetUsingTemplVars(listItem.value, options.scopedVars));
        });
        ci = _Utils__WEBPACK_IMPORTED_MODULE_1__.createRegEx(sourceArray);
        console.log('ciIds: ', ci);
      }
      var bodyTarget = service;
      var alertState = 'All';
      var alertType = 'none';
      var sys_query = '';
      if (target.selectedAlertStateList) {
        if (target.selectedAlertStateList.value) {
          alertState = target.selectedAlertStateList.value;
        }
      }
      if (target.selectedAlertTypeList) {
        if (target.selectedAlertTypeList.value === 'CI') {
          alertType = 'ci';
          bodyTarget = ci;
        } else if (target.selectedAlertTypeList.value === 'OS') {
          alertType = 'os';
          bodyTarget = ci;
          if (bodyTarget.indexOf('(') !== -1) {
            bodyTarget = bodyTarget.substring(bodyTarget.indexOf('(') + 1, bodyTarget.indexOf(')'));
          }
        } else if (target.selectedAlertTypeList.value === 'None') {
          alertType = 'none';
        }
      }
      if (target.sysparam_query) {
        sys_query = _Utils__WEBPACK_IMPORTED_MODULE_1__.replaceTargetUsingTemplVarsCSV(target.sysparam_query, options.scopedVars);
      }
      sys_query = this.removeFiltersWithAll(sys_query);
      var tagString = '';
      if (target.tagKeys && target.tagValues) {
        for (var k = 0; k < target.tagKeys.length; k++) {
          if (target.tagKeys[k].value.charAt(0) === '$') {
            var key = _Utils__WEBPACK_IMPORTED_MODULE_1__.replaceTargetUsingTemplVarsCSV(target.tagKeys[k].value, options.scopedVars);
            var splitKeys = key.split(',');
            splitKeys.map(function (sk) {
              for (var v = 0; v < target.tagValues.length; v++) {
                if (target.tagValues[v].value.charAt(0) === '$') {
                  var value = _Utils__WEBPACK_IMPORTED_MODULE_1__.replaceTargetUsingTemplVarsCSV(target.tagValues[v].value, options.scopedVars);
                  var splitValues = value.split(',');
                  splitValues.map(function (sv) {
                    if (sk !== '' && sv !== '') {
                      console.log('tagString: ', sk + '=' + sv + ',');
                      tagString += sk + '=' + sv + ',';
                    }
                  });
                } else {
                  var _value = target.tagValues[v].value;
                  if (sk !== '' && _value !== '') {
                    console.log('tagString: ', sk + '=' + _value + ',');
                    tagString += sk + '=' + _value + ',';
                  }
                }
              }
            });
          } else {
            (function () {
              var key = target.tagKeys[k].value;
              for (var v = 0; v < target.tagValues.length; v++) {
                if (target.tagValues[v].value.charAt(0) === '$') {
                  var value = _Utils__WEBPACK_IMPORTED_MODULE_1__.replaceTargetUsingTemplVarsCSV(target.tagValues[v].value, options.scopedVars);
                  var splitValues = value.split(',');
                  splitValues.map(function (sv) {
                    if (key !== '' && sv !== '') {
                      console.log('tagString: ', key + '=' + sv + ',');
                      tagString += key + '=' + sv + ',';
                    }
                  });
                } else {
                  var _value2 = target.tagValues[v].value;
                  if (key !== '' && _value2 !== '') {
                    console.log('tagString: ', key + '=' + _value2 + ',');
                    tagString += key + '=' + _value2 + ',';
                  }
                }
              }
            })();
          }
        }
      }
      if (tagString.charAt(tagString.length - 1) === ',') {
        tagString = tagString.substring(0, tagString.length - 1);
      }
      console.log('FINAL tagString: ', tagString);
      var sortBy = '';
      var sortDirection = '';
      if (target.sortBy && target.sortDirection) {
        if (target.sortBy.value) {
          sortBy = _Utils__WEBPACK_IMPORTED_MODULE_1__.replaceTargetUsingTemplVarsCSV(target.sortBy.value, options.scopedVars);
          sortDirection = target.sortDirection;
        }
      }
      var limit = 9999;
      if (target.rowLimit) {
        if (target.rowLimit > 0 && target.rowLimit < 10000) {
          limit = target.rowLimit;
        }
      }
      var page = 0;
      if (target.page) {
        if (target.page >= 0) {
          page = target.page;
        }
      }
      var timerangeColumn = 'sys_updated_on';
      if (target.grafanaTimerangeColumn) {
        if (target.grafanaTimerangeColumn.value) {
          timerangeColumn = _Utils__WEBPACK_IMPORTED_MODULE_1__.replaceTargetUsingTemplVarsCSV(target.grafanaTimerangeColumn.value, options.scopedVars);
        }
      }
      var bodyData = "{\"targets\":[{\"target\":\"".concat(bodyTarget, "\",\"sysparm_query\":\"").concat(sys_query, "\",\"alertType\":\"").concat(alertType, "\",\"alertState\":\"").concat(alertState, "\",\"sortBy\":\"").concat(sortBy, "\",\"sortDirection\":\"").concat(sortDirection, "\",\"limit\":").concat(limit, ",\"page\":").concat(page, ",\"tagFilters\":\"").concat(tagString, "\"}]}");
      var url = this.apiPath + '/v1/query/alerts';
      if (target.grafanaTimerange) {
        url += '?startTime=' + timeFrom + '&endTime=' + timeTo + '&timerangeColumn=' + timerangeColumn;
      }
      if (_Utils__WEBPACK_IMPORTED_MODULE_1__.debugLevel() === 1) {
        console.log('source after replace');
        console.log(service);
        console.log(bodyData);
        console.log(url);
      }
      return this.apiClient.request({
        url: url,
        data: bodyData,
        method: 'POST',
        cacheOverride: cacheOverride === '' ? null : cacheOverride
      }).then(function (response) {
        _Utils__WEBPACK_IMPORTED_MODULE_1__.printDebug('print alerts response from SNOW');
        _Utils__WEBPACK_IMPORTED_MODULE_1__.printDebug(response);
        response = _this3.apiClient.appendInstanceNameToResponse(response, instanceName);
        _Utils__WEBPACK_IMPORTED_MODULE_1__.printDebug(response);
        return _this3.apiClient.mapTextResponseToFrame(response, target.refId);
      })["catch"](function (error) {
        console.error('alert query error: ', error);
        throw new Error(error.data.error.message);
      });
    }
  }, {
    key: "getChanges",
    value: function getChanges(target, timeFrom, timeTo, options, cacheOverride) {
      var _this4 = this;
      if (_Utils__WEBPACK_IMPORTED_MODULE_1__.debugLevel() === 1) {
        console.log('inside getChanges');
        console.log('print target', target);
      }
      var service = '';
      if (target.selectedServiceList) {
        if (target.selectedServiceList.value) {
          service = _Utils__WEBPACK_IMPORTED_MODULE_1__.replaceTargetUsingTemplVarsCSV(target.selectedServiceList.value, options.scopedVars);
        }
      }
      var ci = '';
      if (target.selectedSourceList) {
        if (target.selectedSourceList.value) {
          ci = _Utils__WEBPACK_IMPORTED_MODULE_1__.replaceTargetUsingTemplVarsCSV(target.selectedSourceList.value, options.scopedVars);
        }
      }
      var bodyTarget = service;
      var changeType = 'none';
      if (target.selectedChangeTypeList) {
        if (target.selectedChangeTypeList.value === 'CI') {
          changeType = 'ci';
          bodyTarget = ci;
        } else if (target.selectedChangeTypeList.value === 'None') {
          changeType = 'none';
          bodyTarget = '';
        }
      }
      var sysparam = '';
      if (target.sysparam_query) {
        sysparam = _Utils__WEBPACK_IMPORTED_MODULE_1__.replaceTargetUsingTemplVarsCSV(target.sysparam_query, options.scopedVars);
      }
      sysparam = this.removeFiltersWithAll(sysparam);
      var sortBy = '';
      var sortDirection = '';
      if (target.sortBy && target.sortDirection) {
        if (target.sortBy.value) {
          sortBy = _Utils__WEBPACK_IMPORTED_MODULE_1__.replaceTargetUsingTemplVarsCSV(target.sortBy.value, options.scopedVars);
          sortDirection = target.sortDirection;
        }
      }
      var limit = 9999;
      if (target.rowLimit) {
        if (target.rowLimit > 0 && target.rowLimit < 10000) {
          limit = target.rowLimit;
        }
      }
      var page = 0;
      if (target.page) {
        if (target.page >= 0) {
          page = target.page;
        }
      }
      var timerangeColumn = 'sys_updated_on';
      if (target.grafanaTimerangeColumn) {
        if (target.grafanaTimerangeColumn.value) {
          timerangeColumn = _Utils__WEBPACK_IMPORTED_MODULE_1__.replaceTargetUsingTemplVarsCSV(target.grafanaTimerangeColumn.value, options.scopedVars);
        }
      }
      var bodyData = "{\"targets\":[{\"target\":\"".concat(bodyTarget, "\",\"sysparm_query\":\"").concat(sysparam, "\",\"alertType\":\"").concat(changeType, "\",\"sortBy\":\"").concat(sortBy, "\",\"sortDirection\":\"").concat(sortDirection, "\",\"limit\":").concat(limit, ",\"page\":").concat(page, "}]}");
      if (_Utils__WEBPACK_IMPORTED_MODULE_1__.debugLevel() === 1) {
        console.log('bodyData: ', bodyData);
      }
      var url = this.apiPath + '/v1/query/changes';
      if (target.grafanaTimerange) {
        url += '?startTime=' + timeFrom + '&endTime=' + timeTo + '&timerangeColumn=' + timerangeColumn;
      }
      return this.apiClient.request({
        url: url,
        data: bodyData,
        method: 'POST',
        cacheOverride: cacheOverride === '' ? null : cacheOverride
      }).then(function (response) {
        _Utils__WEBPACK_IMPORTED_MODULE_1__.printDebug('print changes response from SNOW');
        _Utils__WEBPACK_IMPORTED_MODULE_1__.printDebug(response);
        return _this4.apiClient.mapTextResponseToFrame(response, target.refId);
      })["catch"](function (error) {
        console.error('changes query error: ', error);
        throw new Error(error.data.error.message);
      });
    }
  }, {
    key: "getLiveACCData",
    value: function getLiveACCData(target, from, to, options, cacheOverride) {
      if (_Utils__WEBPACK_IMPORTED_MODULE_1__.debugLevel() === 1) {
        console.log('isnide getLiveACCData');
        console.log('print target');
        console.log(target);
        console.log('print options scoped Vars');
        console.log(options.scopedVars);
      }
      var osquery = '';
      if (target.live_osquery) {
        osquery = _Utils__WEBPACK_IMPORTED_MODULE_1__.replaceTargetUsingTemplVarsCSV(target.live_osquery, options.scopedVars);
      }
      console.log(osquery);
      /*
        Request will go here
      */
      var response = {
        data: [
        // { name: 'xfsaild/xvda1', percentage: '56.49', pid: '473', uid: '0' },
        // { name: 'systemd', percentage: '26.53', pid: '1', uid: '0' },
        // { name: 'dbus-daemon', percentage: '12.1', pid: '679', uid: '499' },
        // { name: 'systemd-journal', percentage: '11.43', pid: '573', uid: '0' },
        // { name: 'ntpd', percentage: '11.19', pid: '1384', uid: '74' },
        {
          mem_in_megs: '740.39',
          name: 'nscd',
          pid: '689'
        }, {
          mem_in_megs: '333.76',
          name: 'rsyslogd',
          pid: '29468'
        }, {
          mem_in_megs: '125.67',
          name: 'acc',
          pid: '30448'
        }, {
          mem_in_megs: '109.54',
          name: 'lvmetad',
          pid: '13729'
        }, {
          mem_in_megs: '78.15',
          name: 'xenstore-watch',
          pid: '707'
        }]
      };
      return this.apiClient.mapTextResponseToFrame(response, target.refId);
    }
  }, {
    key: "queryTable",
    value: function queryTable(target, timeFrom, timeTo, options, cacheOverride) {
      var _this5 = this;
      if (_Utils__WEBPACK_IMPORTED_MODULE_1__.debugLevel() === 1) {
        console.log('query table');
        console.log(target);
      }
      var tableName = '';
      if (target.tableName) {
        if (target.tableName.value) {
          tableName = _Utils__WEBPACK_IMPORTED_MODULE_1__.replaceTargetUsingTemplVars(target.tableName.value, options.scopedVars);
        }
      }
      var tableColumns = '';
      if (target.selectedtableColumns) {
        target.selectedtableColumns.map(function (listItem) {
          tableColumns += _Utils__WEBPACK_IMPORTED_MODULE_1__.replaceTargetUsingTemplVars(listItem.value, options.scopedVars) + ',';
        });
        if (tableColumns.charAt(tableColumns.length - 1) === ',') {
          tableColumns = tableColumns.substring(0, tableColumns.length - 1);
        }
      }
      var sysparam = '';
      //Checks if variable is an array
      console.log('sysparam: ', target.basic_sysparam);
      if (target.basic_sysparam.constructor.toString().indexOf('Array') !== -1) {
        for (var i = 0; i < target.basic_sysparam.length; i++) {
          var field = target.basic_sysparam[i];
          var fieldOne = '';
          if (field[1]) {
            fieldOne = _Utils__WEBPACK_IMPORTED_MODULE_1__.replaceTargetUsingTemplVarsCSV(field[1].value, options.scopedVars);
          }
          var fieldTwo = '';
          if (field[2]) {
            fieldTwo = field[2].value;
          }
          var fieldThree = '';
          if (field[3]) {
            fieldThree = _Utils__WEBPACK_IMPORTED_MODULE_1__.replaceTargetUsingTemplVarsCSV(field[3].value, options.scopedVars);
          }
          var fieldFour = '';
          if (field[4]) {
            fieldFour = field[4].value;
          }
          sysparam += fieldFour + fieldOne + fieldTwo + fieldThree;
        }
      }
      sysparam = this.removeFiltersWithAll(sysparam);
      var limit = 9999;
      if (target.rowLimit) {
        if (target.rowLimit > 0 && target.rowLimit < 10000) {
          limit = target.rowLimit;
        }
      }
      var page = 0;
      if (target.page) {
        if (target.page >= 0) {
          page = target.page;
        }
      }
      var sortBy = '';
      var sortDirection = '';
      if (target.sortBy && target.sortDirection) {
        if (target.sortBy.value) {
          sortBy = _Utils__WEBPACK_IMPORTED_MODULE_1__.replaceTargetUsingTemplVarsCSV(target.sortBy.value, options.scopedVars);
          sortDirection = target.sortDirection;
        }
      }
      var getAlertCount = 'false';
      if (target.getAlertCount) {
        getAlertCount = target.getAlertCount.value;
      }
      var timerangeColumn = 'sys_updated_on';
      if (target.grafanaTimerangeColumn) {
        if (target.grafanaTimerangeColumn.value) {
          timerangeColumn = _Utils__WEBPACK_IMPORTED_MODULE_1__.replaceTargetUsingTemplVarsCSV(target.grafanaTimerangeColumn.value, options.scopedVars);
        }
      }
      var bodyData = "{\"targets\":[{\"target\":\"".concat(tableName, "\",\"columns\":\"").concat(tableColumns, "\",\"sysparm\":\"").concat(sysparam, "\",\"limit\":").concat(limit, ",\"page\":").concat(page, ",\"sortBy\":\"").concat(sortBy, "\",\"sortDirection\":\"").concat(sortDirection, "\",\"getAlertCount\":").concat(getAlertCount, "}]}");
      var url = this.apiPath + '/v1/query/table';
      if (target.grafanaTimerange) {
        url += '?startTime=' + timeFrom + '&endTime=' + timeTo + '&timerangeColumn=' + timerangeColumn;
      }
      if (_Utils__WEBPACK_IMPORTED_MODULE_1__.debugLevel() === 1) {
        console.log(target);
        console.log(bodyData);
      }
      return this.apiClient.request({
        url: url,
        data: bodyData,
        method: 'POST',
        cacheOverride: cacheOverride === '' ? null : cacheOverride
      }).then(function (response) {
        _Utils__WEBPACK_IMPORTED_MODULE_1__.printDebug('print table query response from SNOW');
        _Utils__WEBPACK_IMPORTED_MODULE_1__.printDebug(response);
        return _this5.apiClient.mapTextResponseToFrame(response, target.refId);
      })["catch"](function (error) {
        console.error('table query error: ', error);
        throw new Error(error.data.error.message);
      });
    }
  }, {
    key: "getRowCount",
    value: function getRowCount(target, timeFrom, timeTo, options, cacheOverride) {
      var _this6 = this;
      var tableName = '';
      if (target.tableName) {
        if (target.tableName.value) {
          tableName = _Utils__WEBPACK_IMPORTED_MODULE_1__.replaceTargetUsingTemplVars(target.tableName.value, options.scopedVars);
        }
      }
      var sysparam = '';
      if (target.sysparam_query) {
        sysparam = _Utils__WEBPACK_IMPORTED_MODULE_1__.replaceTargetUsingTemplVarsCSV(target.sysparam_query, options.scopedVars);
      }
      sysparam = this.removeFiltersWithAll(sysparam);
      var timerangeColumn = 'sys_updated_on';
      if (target.grafanaTimerangeColumn) {
        if (target.grafanaTimerangeColumn.value) {
          timerangeColumn = _Utils__WEBPACK_IMPORTED_MODULE_1__.replaceTargetUsingTemplVarsCSV(target.grafanaTimerangeColumn.value, options.scopedVars);
        }
      }
      var bodyData = "{\"targets\":[{\"target\":\"".concat(tableName, "\",\"sysparm\":\"").concat(sysparam, "\"}]}");
      var url = this.apiPath + '/v1/query/row_count';
      if (target.grafanaTimerange) {
        url += '?startTime=' + timeFrom + '&endTime=' + timeTo + '&timerangeColumn=' + timerangeColumn;
      }
      if (_Utils__WEBPACK_IMPORTED_MODULE_1__.debugLevel() === 1) {
        console.log(target);
        console.log(bodyData);
      }
      return this.apiClient.request({
        url: url,
        data: bodyData,
        method: 'POST',
        cacheOverride: cacheOverride === '' ? null : cacheOverride
      }).then(function (response) {
        _Utils__WEBPACK_IMPORTED_MODULE_1__.printDebug('print row count response from SNOW');
        _Utils__WEBPACK_IMPORTED_MODULE_1__.printDebug(response);
        return _this6.apiClient.mapTextResponseToFrame(response, target.refId);
      })["catch"](function (error) {
        console.error('row count query error: ', error);
        throw new Error(error.data.error.message);
      });
    }
  }, {
    key: "getAggregateQuery",
    value: function getAggregateQuery(target, timeFrom, timeTo, options, cacheOverride) {
      var _this7 = this;
      var tableName = '';
      var groupBy = '';
      var type = '';
      var column = '';
      var sysparam = '';
      if (target.tableName) {
        if (target.tableName.value) {
          tableName = _Utils__WEBPACK_IMPORTED_MODULE_1__.replaceTargetUsingTemplVars(target.tableName.value, options.scopedVars);
        }
      }
      if (typeof target.groupBy === 'string') {
        if (target.groupBy !== '') {
          groupBy = _Utils__WEBPACK_IMPORTED_MODULE_1__.replaceTargetUsingTemplVarsCSV(target.groupBy, options.scopedVars);
        }
      } else if (target.groupBy) {
        if (target.groupBy.value) {
          groupBy = _Utils__WEBPACK_IMPORTED_MODULE_1__.replaceTargetUsingTemplVarsCSV(target.groupBy.value, options.scopedVars);
        }
      }
      if (target.selectedAggregateType) {
        if (target.selectedAggregateType.value) {
          type = target.selectedAggregateType.value;
        }
      }
      if (target.aggregateColumn) {
        if (target.aggregateColumn.value) {
          column = _Utils__WEBPACK_IMPORTED_MODULE_1__.replaceTargetUsingTemplVarsCSV(target.aggregateColumn.value, options.scopedVars);
        }
      }
      if (target.sysparam_query) {
        sysparam = _Utils__WEBPACK_IMPORTED_MODULE_1__.replaceTargetUsingTemplVarsCSV(target.sysparam_query, options.scopedVars);
        sysparam = this.removeFiltersWithAll(sysparam);
      }
      var limit = 9999;
      if (target.rowLimit) {
        if (target.rowLimit > 0 && target.rowLimit < 10000) {
          limit = target.rowLimit;
        }
      }
      var timerangeColumn = 'sys_updated_on';
      if (target.grafanaTimerangeColumn) {
        if (target.grafanaTimerangeColumn.value) {
          timerangeColumn = _Utils__WEBPACK_IMPORTED_MODULE_1__.replaceTargetUsingTemplVarsCSV(target.grafanaTimerangeColumn.value, options.scopedVars);
        }
      }
      var bodyData = "{\"targets\":[{\"target\":\"".concat(tableName, "\",\"type\":\"").concat(type, "\",\"column\":\"").concat(column, "\",\"groupBy\":\"").concat(groupBy, "\",\"sysparm\":\"").concat(sysparam, "\",\"limit\":").concat(limit, "}]}");
      var url = this.apiPath + '/v1/query/aggregate';
      if (target.grafanaTimerange) {
        url += '?startTime=' + timeFrom + '&endTime=' + timeTo + '&timerangeColumn=' + timerangeColumn;
      }
      if (_Utils__WEBPACK_IMPORTED_MODULE_1__.debugLevel() === 1) {
        console.log(target);
        console.log(bodyData);
      }
      return this.apiClient.request({
        url: url,
        data: bodyData,
        method: 'POST',
        cacheOverride: cacheOverride === '' ? null : cacheOverride
      }).then(function (response) {
        _Utils__WEBPACK_IMPORTED_MODULE_1__.printDebug('print aggregate query response from SNOW');
        _Utils__WEBPACK_IMPORTED_MODULE_1__.printDebug(response);
        return _this7.apiClient.mapTextResponseToFrame(response, target.refId);
      })["catch"](function (error) {
        console.error('aggregate query error: ', error);
        throw new Error(error.data.error.message);
      });
    }
  }, {
    key: "getGeohashMap",
    value: function getGeohashMap(target, options, cacheOverride) {
      var _this8 = this;
      var tableName = '';
      var groupBy = '';
      var sysparam = '';
      if (target.tableName) {
        if (target.tableName.value) {
          tableName = _Utils__WEBPACK_IMPORTED_MODULE_1__.replaceTargetUsingTemplVars(target.tableName.value, options.scopedVars);
        }
      }
      if (typeof target.groupBy === 'string') {
        if (target.groupBy !== '') {
          groupBy = _Utils__WEBPACK_IMPORTED_MODULE_1__.replaceTargetUsingTemplVarsCSV(target.groupBy, options.scopedVars);
        }
      } else if (_typeof(target.groupBy) === 'object') {
        if (target.groupBy !== null && target.groupBy.value !== '') {
          groupBy = _Utils__WEBPACK_IMPORTED_MODULE_1__.replaceTargetUsingTemplVarsCSV(target.groupBy.value, options.scopedVars);
        }
      }
      if (target.sysparam_query) {
        sysparam = _Utils__WEBPACK_IMPORTED_MODULE_1__.replaceTargetUsingTemplVarsCSV(target.sysparam_query, options.scopedVars);
      }
      sysparam = this.removeFiltersWithAll(sysparam);
      var bodyData = "{\"targets\":[{\"target\":\"".concat(tableName, "\",\"column\":\"").concat(groupBy, "\",\"sysparm\":\"").concat(sysparam, "\"}]}");
      if (_Utils__WEBPACK_IMPORTED_MODULE_1__.debugLevel() === 1) {
        console.log(target);
        console.log(bodyData);
      }
      return this.apiClient.request({
        url: this.apiPath + '/v1/query/geohash_map',
        data: bodyData,
        method: 'POST',
        cacheOverride: cacheOverride === '' ? null : cacheOverride
      }).then(function (response) {
        _Utils__WEBPACK_IMPORTED_MODULE_1__.printDebug('print geohash_map response from SNOW');
        _Utils__WEBPACK_IMPORTED_MODULE_1__.printDebug(response);
        return _this8.apiClient.mapTextResponseToFrame(response, target.refId);
      })["catch"](function (error) {
        console.error('geohash_map query error: ', error);
        throw new Error(error.data.error.message);
      });
    }
  }, {
    key: "queryLogData",
    value: function queryLogData(target, timeFrom, timeTo, options, cacheOverride) {
      var _this9 = this;
      var compressLog = target.compressLogs;
      var sysparam = '';
      //Checks if variable is an array
      if (target.basic_sysparam.constructor.toString().indexOf('Array') !== -1) {
        for (var i = 0; i < target.basic_sysparam.length; i++) {
          var field = target.basic_sysparam[i];
          var fieldOne = '';
          if (field[1]) {
            fieldOne = _Utils__WEBPACK_IMPORTED_MODULE_1__.replaceTargetUsingTemplVarsCSV(field[1].value, options.scopedVars);
          }
          var fieldTwo = '';
          if (field[2]) {
            fieldTwo = field[2].value;
          }
          var fieldThree = '';
          if (field[3]) {
            fieldThree = _Utils__WEBPACK_IMPORTED_MODULE_1__.replaceTargetUsingTemplVarsCSV(field[3].value, options.scopedVars);
          }
          var fieldFour = '';
          if (field[4]) {
            fieldFour = field[4].value;
          }
          sysparam += fieldFour + fieldOne + fieldTwo + fieldThree;
        }
      }
      sysparam = this.removeFiltersWithAll(sysparam);
      var limit = 9999;
      if (target.rowLimit) {
        if (target.rowLimit > 0 && target.rowLimit < 10000) {
          limit = target.rowLimit;
        }
      }
      var page = 0;
      if (target.page) {
        if (target.page >= 0) {
          page = target.page;
        }
      }
      var sortBy = '';
      var sortDirection = '';
      if (target.sortBy && target.sortDirection) {
        if (target.sortBy.value) {
          sortBy = _Utils__WEBPACK_IMPORTED_MODULE_1__.replaceTargetUsingTemplVarsCSV(target.sortBy.value, options.scopedVars);
          sortDirection = target.sortDirection;
        }
      }
      var elasticSearch = '';
      if (target.elasticSearch) {
        elasticSearch = _Utils__WEBPACK_IMPORTED_MODULE_1__.replaceTargetUsingTemplVarsCSV(target.elasticSearch, options.scopedVars);
      }
      var bodyData = "{\"targets\":[{\"sysparm\":\"".concat(sysparam, "\",\"limit\":").concat(limit, ",\"page\":").concat(page, ",\"sortBy\":\"").concat(sortBy, "\",\"sortDirection\":\"").concat(sortDirection, "\",\"esSearch\":\"").concat(elasticSearch, "\",\"startTime\":").concat(timeFrom, ",\"endTime\":").concat(timeTo, ",\"compressLog\":").concat(compressLog, "}]}");
      if (_Utils__WEBPACK_IMPORTED_MODULE_1__.debugLevel() === 1) {
        console.log(target);
        console.log(bodyData);
      }
      return this.apiClient.request({
        url: this.apiPath + '/v1/query/logs',
        data: bodyData,
        method: 'POST',
        cacheOverride: cacheOverride === '' ? null : cacheOverride
      }).then(function (response) {
        _Utils__WEBPACK_IMPORTED_MODULE_1__.printDebug('print query log data response from SNOW');
        _Utils__WEBPACK_IMPORTED_MODULE_1__.printDebug(response);
        return _this9.apiClient.mapTextResponseToFrame(response, target.refId);
      })["catch"](function (error) {
        console.error('log query error: ', error);
        throw new Error(error.data.error.message);
      });
    }
  }, {
    key: "getTrendData",
    value: function getTrendData(target, timeFrom, timeTo, options, cacheOverride) {
      var _this10 = this;
      if (_Utils__WEBPACK_IMPORTED_MODULE_1__.debugLevel() === 1) {
        console.log(target);
      }
      var table = '';
      var sysparam = '';
      var elasticSearch = '';
      var groupBy = '';
      var trendColumn = '';
      var trendBy = '';
      var period = 1;
      if (target.tableName) {
        if (target.tableName.value) {
          table = _Utils__WEBPACK_IMPORTED_MODULE_1__.replaceTargetUsingTemplVars(target.tableName.value, options.scopedVars);
        }
      }
      //Checks if variable is an array
      if (target.basic_sysparam.constructor.toString().indexOf('Array') !== -1) {
        for (var i = 0; i < target.basic_sysparam.length; i++) {
          var field = target.basic_sysparam[i];
          var fieldOne = '';
          if (field[1]) {
            fieldOne = _Utils__WEBPACK_IMPORTED_MODULE_1__.replaceTargetUsingTemplVarsCSV(field[1].value, options.scopedVars);
          }
          var fieldTwo = '';
          if (field[2]) {
            fieldTwo = field[2].value;
          }
          var fieldThree = '';
          if (field[3]) {
            fieldThree = _Utils__WEBPACK_IMPORTED_MODULE_1__.replaceTargetUsingTemplVarsCSV(field[3].value, options.scopedVars);
          }
          var fieldFour = '';
          if (field[4]) {
            fieldFour = field[4].value;
          }
          sysparam += fieldFour + fieldOne + fieldTwo + fieldThree;
        }
      }
      sysparam = this.removeFiltersWithAll(sysparam);
      if (target.elasticSearch) {
        elasticSearch = _Utils__WEBPACK_IMPORTED_MODULE_1__.replaceTargetUsingTemplVarsCSV(target.elasticSearch, options.scopedVars);
      }
      if (typeof target.groupBy === 'string') {
        if (target.groupBy !== '') {
          groupBy = _Utils__WEBPACK_IMPORTED_MODULE_1__.replaceTargetUsingTemplVarsCSV(target.groupBy, options.scopedVars);
        }
      } else if (_typeof(target.groupBy) === 'object') {
        if (target.groupBy !== null && target.groupBy.value !== '') {
          groupBy = _Utils__WEBPACK_IMPORTED_MODULE_1__.replaceTargetUsingTemplVarsCSV(target.groupBy.value, options.scopedVars);
        }
      }
      if (target.selectedTrendColumn) {
        if (target.selectedTrendColumn.value) {
          trendColumn = _Utils__WEBPACK_IMPORTED_MODULE_1__.replaceTargetUsingTemplVarsCSV(target.selectedTrendColumn.value, options.scopedVars);
        }
      }
      if (target.selectedTrendBy) {
        if (target.selectedTrendBy.value) {
          trendBy = _Utils__WEBPACK_IMPORTED_MODULE_1__.replaceTargetUsingTemplVarsCSV(target.selectedTrendBy.value, options.scopedVars);
        }
      }
      if (target.trendPeriod) {
        if (target.trendPeriod > 0) {
          period = target.trendPeriod;
        }
      }
      var bodyData = "{\"targets\":[{\"target\":\"".concat(table, "\",\"sysparm\":\"").concat(sysparam, "\",\"esSearch\":\"").concat(elasticSearch, "\",\"trendColumn\":\"").concat(trendColumn, "\",\"trendBy\":\"").concat(trendBy, "\",\"period\":").concat(period, ",\"groupBy\":\"").concat(groupBy, "\"}]}");
      if (_Utils__WEBPACK_IMPORTED_MODULE_1__.debugLevel() === 1) {
        console.log(target);
        console.log(bodyData);
      }
      return this.apiClient.request({
        url: this.apiPath + '/v1/query/trend?startTime=' + timeFrom + '&endTime=' + timeTo,
        data: bodyData,
        method: 'POST',
        cacheOverride: cacheOverride === '' ? null : cacheOverride
      }).then(function (response) {
        _Utils__WEBPACK_IMPORTED_MODULE_1__.printDebug('print trend data response from SNOW');
        _Utils__WEBPACK_IMPORTED_MODULE_1__.printDebug(response);
        return _this10.apiClient.mapTrendResponseToFrame(response, target);
      })["catch"](function (error) {
        console.error('trend query error: ', error);
        throw new Error(error.data.error.message);
      });
    }
  }, {
    key: "getOutageStatus",
    value: function getOutageStatus(target, timeFrom, timeTo, options, cacheOverride) {
      var _this11 = this;
      var ciIds = '';
      if (target.selectedServiceList) {
        if (target.selectedServiceList.value) {
          ciIds = _Utils__WEBPACK_IMPORTED_MODULE_1__.replaceTargetUsingTemplVarsCSV(target.selectedServiceList.value, options.scopedVars);
        }
      }
      var showPercent = false;
      if (typeof target.showPercent === 'boolean') {
        showPercent = target.showPercent;
      }
      var sysparam = '';
      if (target.sysparam_query) {
        sysparam = _Utils__WEBPACK_IMPORTED_MODULE_1__.replaceTargetUsingTemplVarsCSV(target.sysparam_query, options.scopedVars);
      }
      sysparam = this.removeFiltersWithAll(sysparam);
      var limit = 9999;
      if (target.rowLimit) {
        if (target.rowLimit > 0 && target.rowLimit < 10000) {
          limit = target.rowLimit;
        }
      }
      var page = 0;
      if (target.page) {
        if (target.page >= 0) {
          page = target.page;
        }
      }
      var bodyData = "{\"targets\":[{\"target\":\"".concat(ciIds, "\",\"showPercent\":").concat(showPercent, ",\"sysparm\":\"").concat(sysparam, "\",\"limit\":").concat(limit, ",\"page\":").concat(page, "}]}");
      if (_Utils__WEBPACK_IMPORTED_MODULE_1__.debugLevel() === 1) {
        console.log(bodyData);
      }
      return this.apiClient.request({
        url: this.apiPath + '/v1/query/outage',
        data: bodyData,
        method: 'POST',
        cacheOverride: cacheOverride === '' ? null : cacheOverride
      }).then(function (response) {
        _Utils__WEBPACK_IMPORTED_MODULE_1__.printDebug('print outage status response from SNOW');
        _Utils__WEBPACK_IMPORTED_MODULE_1__.printDebug(response);
        if (showPercent) {
          return _this11.apiClient.mapTextResponseToFrame(response, target.refId);
        } else {
          return _this11.apiClient.mapOutageResponseToFrame(response, target);
        }
      })["catch"](function (error) {
        console.error('outage query error: ', error);
        throw new Error(error.data.error.message);
      });
    }
  }, {
    key: "getAnomaly",
    value: function getAnomaly(target, timeFrom, timeTo, options, cacheOverride) {
      var _this12 = this;
      if (_Utils__WEBPACK_IMPORTED_MODULE_1__.debugLevel() === 1) {
        console.log('query anomaly');
        console.log(target);
      }
      var tableColumns = '';
      if (target.selectedtableColumns) {
        if (target.selectedtableColumns.length > 0) {
          target.selectedtableColumns.map(function (listItem) {
            tableColumns += _Utils__WEBPACK_IMPORTED_MODULE_1__.replaceTargetUsingTemplVars(listItem.value, options.scopedVars) + ',';
          });
          if (tableColumns.charAt(tableColumns.length - 1) === ',') {
            tableColumns = tableColumns.substring(0, tableColumns.length - 1);
          }
        }
      }
      var sysparam = '';
      //Checks if variable is an array
      if (target.basic_sysparam.constructor.toString().indexOf('Array') !== -1) {
        for (var i = 0; i < target.basic_sysparam.length; i++) {
          var field = target.basic_sysparam[i];
          var fieldOne = '';
          if (field[1]) {
            fieldOne = _Utils__WEBPACK_IMPORTED_MODULE_1__.replaceTargetUsingTemplVarsCSV(field[1].value, options.scopedVars);
          }
          var fieldTwo = '';
          if (field[2]) {
            fieldTwo = field[2].value;
          }
          var fieldThree = '';
          if (field[3]) {
            fieldThree = _Utils__WEBPACK_IMPORTED_MODULE_1__.replaceTargetUsingTemplVarsCSV(field[3].value, options.scopedVars);
          }
          var fieldFour = '';
          if (field[4]) {
            fieldFour = field[4].value;
          }
          sysparam += fieldFour + fieldOne + fieldTwo + fieldThree;
        }
      }
      sysparam = this.removeFiltersWithAll(sysparam);
      var limit = 9999;
      if (target.rowLimit) {
        if (target.rowLimit > 0 && target.rowLimit < 10000) {
          limit = target.rowLimit;
        }
      }
      var page = 0;
      if (target.page) {
        if (target.page >= 0) {
          page = target.page;
        }
      }
      var sortBy = '';
      var sortDirection = '';
      if (target.sortBy && target.sortDirection) {
        if (target.sortBy.value) {
          sortBy = _Utils__WEBPACK_IMPORTED_MODULE_1__.replaceTargetUsingTemplVarsCSV(target.sortBy.value, options.scopedVars);
          sortDirection = target.sortDirection;
        }
      }
      var bodyData = "{\"targets\":[{\"columns\":\"".concat(tableColumns, "\",\"sysparm\":\"").concat(sysparam, "\",\"limit\":").concat(limit, ",\"page\":").concat(page, ",\"sortBy\":\"").concat(sortBy, "\",\"sortDirection\":\"").concat(sortDirection, "\"}]}");
      if (_Utils__WEBPACK_IMPORTED_MODULE_1__.debugLevel() === 1) {
        console.log(target);
        console.log(bodyData);
      }
      return this.apiClient.request({
        url: this.apiPath + '/v1/query/anomaly',
        data: bodyData,
        method: 'POST',
        cacheOverride: cacheOverride === '' ? null : cacheOverride
      }).then(function (response) {
        _Utils__WEBPACK_IMPORTED_MODULE_1__.printDebug('print anomaly query response from SNOW');
        _Utils__WEBPACK_IMPORTED_MODULE_1__.printDebug(response);
        return _this12.apiClient.mapTextResponseToFrame(response, target.refId);
      })["catch"](function (error) {
        console.error('anomaly query error: ', error);
        throw new Error(error.data.error.message);
      });
    }
    // End of query methods
    // Start variable query methods
  }, {
    key: "getGenericVariable",
    value: function getGenericVariable(tableName, nameColumn, idColumn, sysparam, limit) {
      var _this13 = this;
      var bodyData = "{\"targets\":[{\"tableName\":\"".concat(tableName, "\",\"nameColumn\":\"").concat(nameColumn, "\",\"idColumn\":\"").concat(idColumn, "\",\"sysparm\":\"").concat(sysparam, "\",\"limit\":").concat(limit, "}]}");
      console.log(bodyData);
      return this.apiClient.request({
        url: this.apiPath + '/v1/variable/generic',
        data: bodyData,
        method: 'POST'
      }).then(function (response) {
        _Utils__WEBPACK_IMPORTED_MODULE_1__.printDebug(response);
        return _this13.apiClient.mapChecksToValue(response);
      })["catch"](function (error) {
        console.error('generic variable error: ', error);
        throw new Error(error.data.error.message);
      });
    }
  }, {
    key: "getMetricNamesInCIs",
    value: function getMetricNamesInCIs(metricCategory, cis) {
      var _this14 = this;
      if (_Utils__WEBPACK_IMPORTED_MODULE_1__.debugLevel() === 1) {
        console.log('isnide getMetricsForCI');
        console.log('print target');
        console.log(metricCategory);
      }
      var ciTarget = _Utils__WEBPACK_IMPORTED_MODULE_1__.createRegEx(cis);
      ciTarget = _Utils__WEBPACK_IMPORTED_MODULE_1__.trimRegEx(ciTarget);
      var bodyData = '{"targets":[{"target":"' + ciTarget + '","metricType":"' + metricCategory + '"}]}';
      var cisURL = this.apiPath + '/v1/variable/metrics';
      if (_Utils__WEBPACK_IMPORTED_MODULE_1__.debugLevel() === 1) {
        console.log('source after replace');
        console.log(ciTarget);
        console.log(bodyData);
      }
      return this.apiClient.request({
        url: cisURL,
        data: bodyData,
        method: 'POST'
      }).then(function (response) {
        _Utils__WEBPACK_IMPORTED_MODULE_1__.printDebug(response);
        return _this14.apiClient.mapChecksToValue(response);
      })["catch"](function (error) {
        console.error('metric variable error: ', error);
        throw new Error(error.data.error.message);
      });
    }
  }, {
    key: "getNestedCIS",
    value: function getNestedCIS(bodyObj) {
      var _this15 = this;
      var bodyData = "{\"targets\":[{\"ci\": \"".concat(bodyObj.ci, "\",\n      \"parentDepth\":\"").concat(bodyObj.parentDepth, "\",\n      \"childDepth\":\"").concat(bodyObj.childDepth, "\",\n      \"sysparm\":\"").concat(bodyObj.sysparam, "\",\n      \"type\":\"ci\"}]}");
      if (_Utils__WEBPACK_IMPORTED_MODULE_1__.debugLevel() === 1) {
        console.log('get nested cis');
        console.log(bodyData);
      }
      return this.apiClient.request({
        url: this.apiPath + '/v1/variable/nested_value',
        data: bodyData,
        method: 'POST'
      }).then(function (response) {
        _Utils__WEBPACK_IMPORTED_MODULE_1__.printDebug(response);
        return _this15.apiClient.mapChecksToValue(response);
      })["catch"](function (error) {
        console.error('nested cis variable error: ', error);
        throw new Error(error.data.error.message);
      });
    }
  }, {
    key: "getNestedClasses",
    value: function getNestedClasses(bodyObj) {
      var _this16 = this;
      var bodyData = "{\"targets\":[{\"ci\": \"".concat(bodyObj.ci, "\",\n      \"parentDepth\":\"").concat(bodyObj.parentDepth, "\",\n      \"childDepth\":\"").concat(bodyObj.childDepth, "\",\n      \"sysparm\":\"").concat(bodyObj.sysparam, "\",\n      \"type\":\"class\"}]}");
      if (_Utils__WEBPACK_IMPORTED_MODULE_1__.debugLevel() === 1) {
        console.log('get nested classes');
        console.log(bodyData);
      }
      return this.apiClient.request({
        url: this.apiPath + '/v1/variable/nested_value',
        data: bodyData,
        method: 'POST'
      }).then(function (response) {
        _Utils__WEBPACK_IMPORTED_MODULE_1__.printDebug(response);
        return _this16.apiClient.mapChecksToValue(response);
      })["catch"](function (error) {
        console.error('nested classes variable error: ', error);
        throw new Error(error.data.error.message);
      });
    }
    // End variable query methods
    // Start option query methods
  }, {
    key: "getMetricAnomalyOptions",
    value: function getMetricAnomalyOptions() {
      var queryOptions = [{
        label: 'true',
        value: 'true'
      }, {
        label: 'false',
        value: 'false'
      }];
      return queryOptions;
    }
  }, {
    key: "getAlertTypeOptions",
    value: function getAlertTypeOptions() {
      var queryOptions = [{
        label: 'CI',
        value: 'CI',
        description: 'Get Alerts at the CI level'
      }, {
        label: 'Service',
        value: 'Service',
        description: 'Get Alerts at the Service level'
      }, {
        label: 'None',
        value: 'None',
        description: 'Ignore CI selection and use sysparam_query'
      }];
      return queryOptions;
    }
  }, {
    key: "getAlertStateOptions",
    value: function getAlertStateOptions() {
      var queryOptions = [{
        label: 'Active',
        value: 'Active',
        description: 'Get Open and Reopen Alerts'
      }, {
        label: 'All',
        value: 'All',
        description: 'Get All alerts Open,Reopen, and Closed'
      }];
      return queryOptions;
    }
  }, {
    key: "getChangeTypeOptions",
    value: function getChangeTypeOptions() {
      var queryOptions = [{
        label: 'CI',
        value: 'CI',
        description: 'Get Changes at the CI level'
      }, {
        label: 'Service',
        value: 'Service',
        description: 'Get Changes at the Service level'
      }, {
        label: 'None',
        value: 'None',
        description: 'Ignore CI selection and use sysparam_query'
      }];
      return queryOptions;
    }
  }, {
    key: "getAggregateTypeOptions",
    value: function getAggregateTypeOptions() {
      var queryOptions = [{
        label: 'AVG',
        value: 'AVG'
      }, {
        label: 'COUNT',
        value: 'COUNT'
      }, {
        label: 'MIN',
        value: 'MIN'
      }, {
        label: 'MAX',
        value: 'MAX'
      }, {
        label: 'STDDEV',
        value: 'STDDEV'
      }, {
        label: 'SUM',
        value: 'SUM'
      }];
      return queryOptions;
    }
  }, {
    key: "getSysparamTypeOptions",
    value: function getSysparamTypeOptions() {
      var queryOptions = [{
        label: 'is',
        value: '=',
        description: '='
      }, {
        label: 'is not',
        value: '!=',
        description: '!='
      }, {
        label: 'starts with',
        value: 'STARTSWITH',
        description: 'STARTSWITH'
      }, {
        label: 'ends with',
        value: 'ENDSWITH',
        description: 'ENDSWITH'
      }, {
        label: 'contains',
        value: 'LIKE',
        description: 'LIKE'
      }, {
        label: 'does not contain',
        value: 'NOT LIKE',
        description: 'NOT LIKE'
      }, {
        label: 'is empty',
        value: 'ISEMPTY',
        description: 'ISEMPTY'
      }, {
        label: 'is not empty',
        value: 'ISNOTEMPTY',
        description: 'ISNOTEMPTY'
      }, {
        label: 'is anything',
        value: 'ANYTHING',
        description: 'ANYTHING'
      }, {
        label: 'is one of',
        value: 'IN',
        description: 'IN'
      }, {
        label: 'is not one of',
        value: 'NOT IN',
        description: 'NOT IN'
      }, {
        label: 'is empty string',
        value: 'EMPTYSTRING',
        description: 'EMPTYSTRING'
      }, {
        label: 'less than or is',
        value: '<=',
        description: '<='
      }, {
        label: 'greater than or is',
        value: '>=',
        description: '>='
      }, {
        label: 'between',
        value: 'BETWEEN',
        description: 'BETWEEN'
      }, {
        label: 'instance of',
        value: 'INSTANCEOF',
        description: 'INSTANCEOF'
      }];
      return queryOptions;
    }
  }, {
    key: "getTrendByOptions",
    value: function getTrendByOptions() {
      var queryOptions = [{
        label: 'Minute',
        value: 'minute'
      }, {
        label: 'Week',
        value: 'week'
      }];
      return queryOptions;
    }
  }, {
    key: "loadServiceOptions",
    value: function loadServiceOptions(input) {
      var _this17 = this;
      var search = input ? input : '';
      var bodyData = "{\"targets\":[{\"target\":\"cmdb_ci_service\",\"columns\":\"name:d,sys_id:v\",\"sysparm\":\"operational_status=1^name!=All^nameLIKE".concat(search, "\",\"limit\":100,\"sortBy\":\"name\",\"sortDirection\":\"ASC\"}]}");
      if (_Utils__WEBPACK_IMPORTED_MODULE_1__.debugLevel() === 1) {
        console.log(bodyData);
        console.log('loadServiceOptions');
      }
      return this.apiClient.request({
        url: this.apiPath + '/v1/query/table',
        data: bodyData,
        method: 'POST'
      }).then(function (response) {
        _Utils__WEBPACK_IMPORTED_MODULE_1__.printDebug('print loadServiceOptions response from SNOW');
        _Utils__WEBPACK_IMPORTED_MODULE_1__.printDebug(response);
        _Utils__WEBPACK_IMPORTED_MODULE_1__.printDebug(_this17.apiClient.mapChecksToValue(response));
        return _this17.apiClient.mapChecksToValue(response);
      })["catch"](function (error) {
        console.error('loadServiceOptions error: ', error);
        throw new Error(error.data.error.message);
      });
    }
  }, {
    key: "loadCIOptions",
    value: function loadCIOptions(serviceId, input) {
      var _this18 = this;
      var search = input ? input : '';
      var bodyData = '';
      if (serviceId) {
        bodyData = "{\"targets\":[{\"target\":\"em_impact_graph\",\"columns\":\"child_name:d,child_id:v,child_id:d\",\"sysparm\":\"business_service=".concat(serviceId, "^child_nameLIKE").concat(search, "\",\"limit\":100,\"sortBy\":\"ci_name\",\"sortDirection\":\"ASC\"}]}");
      } else {
        bodyData = "{\"targets\":[{\"target\":\"cmdb_ci\",\"columns\":\"name:d,sys_id:v,sys_class_name:d\",\"sysparm\":\"nameLIKE".concat(search, "^name!=NULL\",\"limit\":100,\"sortBy\":\"cmdb_ci.name\",\"sortDirection\":\"ASC\"}]}");
      }
      if (_Utils__WEBPACK_IMPORTED_MODULE_1__.debugLevel() === 1) {
        console.log(bodyData);
        console.log('loadCIOptions');
      }
      return this.apiClient.request({
        url: this.apiPath + '/v1/query/table',
        data: bodyData,
        method: 'POST'
      }).then(function (response) {
        _Utils__WEBPACK_IMPORTED_MODULE_1__.printDebug('print loadCIOptions response from SNOW');
        _Utils__WEBPACK_IMPORTED_MODULE_1__.printDebug(response);
        var result = _this18.apiClient.mapChecksToValuePlusSuffix(response);
        _Utils__WEBPACK_IMPORTED_MODULE_1__.printDebug(result);
        return _this18.apiClient.mapSuffixToLabel(result);
      })["catch"](function (error) {
        console.error('loadCIOptions error: ', error);
        throw new Error(error.data.error.message);
      });
    }
  }, {
    key: "loadResourceOptions",
    value: function loadResourceOptions(selectedCIS, input) {
      var _this19 = this;
      var bodyData = '';
      var search = input ? input : '';
      if (selectedCIS) {
        var ciArray = selectedCIS.map(function (option) {
          return option.value;
        });
        console.log(ciArray);
        bodyData = "{\"targets\":[{\"target\":\"sa_metric_map\",\"columns\":\"resource_id:d,resource_id:v\",\"sysparm\":\"cmdb_ciIN".concat(ciArray, "^resource_idLIKE").concat(search, "^resource_id!=NULL\",\"limit\":100,\"sortBy\":\"resource_id\",\"sortDirection\":\"ASC\"}]}");
      }
      return this.apiClient.request({
        url: this.apiPath + '/v1/query/table',
        data: bodyData,
        method: 'POST'
      }).then(function (response) {
        _Utils__WEBPACK_IMPORTED_MODULE_1__.printDebug('print loadResourceOptions response from SNOW');
        _Utils__WEBPACK_IMPORTED_MODULE_1__.printDebug(response);
        var result = [{
          label: '*',
          value: '*'
        }];
        var options = result.concat(_this19.apiClient.mapChecksToValue(response));
        //Next line removes duplicate value's from the array
        options = options.filter(function (option, index, self) {
          return index === self.findIndex(function (t) {
            return t.value === option.value;
          });
        });
        return options;
      })["catch"](function (error) {
        console.error('loadResourceOptions error: ', error);
        throw new Error(error.data.error.message);
      });
    }
  }, {
    key: "loadMetricOptions",
    value: function loadMetricOptions(selectedCIS, input) {
      var _this20 = this;
      var bodyData = '';
      var search = input ? input : '';
      if (typeof selectedCIS !== 'undefined') {
        var ciArray = selectedCIS.map(function (option) {
          return option.value;
        });
        console.log(ciArray);
        bodyData = "{\"targets\":[{\"target\":\"sa_metric_map\",\"columns\":\"metric_type_id.metric_type_tiny_name:d,metric_type_id:v\",\"sysparm\":\"cmdb_ciIN".concat(ciArray, "^metric_type_id.metric_type_tiny_nameLIKE").concat(search, "\",\"limit\":100,\"sortBy\":\"\",\"sortDirection\":\"ASC\"}]}");
      }
      return this.apiClient.request({
        url: this.apiPath + '/v1/query/table',
        data: bodyData,
        method: 'POST'
      }).then(function (response) {
        _Utils__WEBPACK_IMPORTED_MODULE_1__.printDebug('print loadMetricOptions response from SNOW');
        _Utils__WEBPACK_IMPORTED_MODULE_1__.printDebug(response);
        var result = [{
          label: '*',
          value: '*'
        }];
        var options = result.concat(_this20.apiClient.mapChecksToValue(response));
        //Next line removes duplicate value's from the array
        options = options.filter(function (option, index, self) {
          return index === self.findIndex(function (t) {
            return t.value === option.value;
          });
        });
        return options;
      })["catch"](function (error) {
        console.error('loadMetricOptions error: ', error);
        throw new Error(error.data.error.message);
      });
    }
  }, {
    key: "loadColumnChoices",
    value: function loadColumnChoices(tableName, tableColumn, input) {
      var _this21 = this;
      var bodyData = "{\"targets\":[{\"target\":\"sys_choice\",\"columns\":\"label,value\",\"sysparm\":\"name=".concat(tableName, "^element!=NULL^elementLIKE").concat(tableColumn, "^labelLIKE").concat(input, "^language=en\",\"limit\":100,\"sortBy\":\"label\",\"sortDirection\":\"ASC\"}]}");
      if (_Utils__WEBPACK_IMPORTED_MODULE_1__.debugLevel() === 1) {
        console.log(bodyData);
        console.log('loadColumnChoices');
      }
      return this.apiClient.request({
        url: this.apiPath + '/v1/query/table',
        data: bodyData,
        method: 'POST'
      }).then(function (response) {
        _Utils__WEBPACK_IMPORTED_MODULE_1__.printDebug('print loadColumnChoices response from SNOW');
        _Utils__WEBPACK_IMPORTED_MODULE_1__.printDebug(response);
        return _this21.apiClient.mapChecksToValue(response);
      })["catch"](function (error) {
        console.error('loadColumnChoices error: ', error);
        throw new Error(error.data.error.message);
      });
    }
  }, {
    key: "getTableColumnOptions",
    value: function getTableColumnOptions(tableName) {
      var _this22 = this;
      if (typeof tableName === 'undefined') {
        return;
      }
      var bodyData = "{\"targets\":[{\"table\":\"".concat(tableName, "\"}]}");
      if (_Utils__WEBPACK_IMPORTED_MODULE_1__.debugLevel() === 1) {
        console.log(bodyData);
      }
      return this.apiClient.request({
        url: this.apiPath + '/v1/select/table_columns',
        data: bodyData,
        method: 'POST'
      }).then(function (response) {
        _Utils__WEBPACK_IMPORTED_MODULE_1__.printDebug('print getTableColumnOptions response from SNOW');
        _Utils__WEBPACK_IMPORTED_MODULE_1__.printDebug(response);
        return _this22.apiClient.mapValueAsSuffix(response, true);
      })["catch"](function (error) {
        console.error('getTableColumnOptions error: ', error);
        throw new Error(error.data.error.message);
      });
    }
  }, {
    key: "loadTableOptions",
    value: function loadTableOptions(input) {
      var _this23 = this;
      var bodyData = "{\"targets\":[{\"target\":\"sys_db_object\",\"columns\":\"label,name\",\"sysparm\":\"nameLIKE".concat(input, "^ORlabelLIKE").concat(input, "\",\"limit\":100}]}");
      if (_Utils__WEBPACK_IMPORTED_MODULE_1__.debugLevel() === 1) {
        console.log(bodyData);
        console.log('loadTableOptions');
      }
      return this.apiClient.request({
        url: this.apiPath + '/v1/query/table',
        data: bodyData,
        method: 'POST'
      }).then(function (response) {
        _Utils__WEBPACK_IMPORTED_MODULE_1__.printDebug('print loadTableOptions response from SNOW');
        _Utils__WEBPACK_IMPORTED_MODULE_1__.printDebug(response);
        var result = _this23.apiClient.mapChecksToValue(response);
        _Utils__WEBPACK_IMPORTED_MODULE_1__.printDebug(result);
        return _this23.apiClient.mapValueAsSuffix(result, false);
      })["catch"](function (error) {
        console.error('loadTableOptions error: ', error);
        throw new Error(error.data.error.message);
      });
    }
    // End option query methods
    // getTopologyCISummary is used by our forked novatec sdg panel
  }, {
    key: "getTopologyCISummary",
    value: function getTopologyCISummary(ciName) {
      var bodyData = '{"targets":[{"target":"' + ciName + '"}]}';
      if (_Utils__WEBPACK_IMPORTED_MODULE_1__.debugLevel() === 1) {
        console.log('source after replace');
        console.log(bodyData);
      }
      return this.apiClient.request({
        url: this.apiPath + '/query/ci_summary',
        data: bodyData,
        method: 'POST'
      }).then(function (response) {
        _Utils__WEBPACK_IMPORTED_MODULE_1__.printDebug('print alerts response from SNOW');
        _Utils__WEBPACK_IMPORTED_MODULE_1__.printDebug(response);
        return response.data;
      });
    }
  }, {
    key: "getAlertTags",
    value: function getAlertTags(state, sysparam, limit) {
      var _this24 = this;
      if (!limit) {
        limit = 9999;
      }
      if (state === 'Active') {
        sysparam += 'state!=Closed';
      }
      var bodyData = "{\"targets\":[{\"target\":\"em_alert\",\"columns\":\"additional_info\",\"sysparm\":\"".concat(sysparam, "\",\"limit\":").concat(limit, ",\"sortBy\":\"\",\"sortDirection\":\"ASC\"}]}");
      console.log('bodyData: ', bodyData);
      return this.apiClient.request({
        url: this.apiPath + '/v1/query/table',
        data: bodyData,
        method: 'POST'
      }).then(function (response) {
        _Utils__WEBPACK_IMPORTED_MODULE_1__.printDebug('print getAlertTags response from SNOW');
        _Utils__WEBPACK_IMPORTED_MODULE_1__.printDebug(response);
        var tags = _this24.apiClient.mapAlertTags(response);
        _Utils__WEBPACK_IMPORTED_MODULE_1__.printDebug(tags);
        return tags;
      })["catch"](function (error) {
        console.error('getAlertTags error: ', error);
        throw new Error(error.data.error.message);
      });
    }
    // When a sysparam filter contains a *, remove that filter but leave the rest on place
    // Ex. Input: operational_status=1^clusterIN*
    // Ex. Output: operational_status=1
  }, {
    key: "removeFiltersWithAll",
    value: function removeFiltersWithAll(sysparam) {
      console.log('inside removeFiltersWithAll');
      console.log('starting sysparam: ', sysparam);
      var allIndex = sysparam.indexOf('*');
      while (allIndex !== -1) {
        var afterAll = sysparam.substring(allIndex + 1);
        var beforeAll = sysparam.substring(0, allIndex + 1);
        var lastSeperator = beforeAll.lastIndexOf('^');
        if (lastSeperator === -1) {
          lastSeperator = 0;
        }
        beforeAll = beforeAll.substring(0, lastSeperator);
        sysparam = beforeAll + afterAll;
        allIndex = sysparam.indexOf('*');
      }
      console.log('return sysparam: ', sysparam);
      return sysparam;
    }
  }]);
  return SNOWManager;
}();

/***/ }),

/***/ "./SplitQueryEditor.tsx":
/*!******************************!*\
  !*** ./SplitQueryEditor.tsx ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SplitQueryEditor": () => (/* binding */ SplitQueryEditor)
/* harmony export */ });
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash */ "lodash");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @grafana/ui */ "@grafana/ui");
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./types */ "./types.ts");
/* harmony import */ var components_SelectTags__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! components/SelectTags */ "./components/SelectTags.tsx");
/* harmony import */ var components_AlertCountChoice__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! components/AlertCountChoice */ "./components/AlertCountChoice.tsx");
/* harmony import */ var components_InputElasticSearch__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! components/InputElasticSearch */ "./components/InputElasticSearch.tsx");
/* harmony import */ var components_InputGroupBy__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! components/InputGroupBy */ "./components/InputGroupBy.tsx");
/* harmony import */ var components_InputLimit__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! components/InputLimit */ "./components/InputLimit.tsx");
/* harmony import */ var components_InputPage__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! components/InputPage */ "./components/InputPage.tsx");
/* harmony import */ var components_SelectAggregate__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! components/SelectAggregate */ "./components/SelectAggregate.tsx");
/* harmony import */ var components_SelectBasicSysparam__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! components/SelectBasicSysparam */ "./components/SelectBasicSysparam.tsx");
/* harmony import */ var components_SelectCacheTimeout__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! components/SelectCacheTimeout */ "./components/SelectCacheTimeout.tsx");
/* harmony import */ var components_SelectSortBy__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! components/SelectSortBy */ "./components/SelectSortBy.tsx");
/* harmony import */ var components_SelectTrend__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! components/SelectTrend */ "./components/SelectTrend.tsx");
/* harmony import */ var components_ShowPercentSwitch__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! components/ShowPercentSwitch */ "./components/ShowPercentSwitch.tsx");
/* harmony import */ var components_TimeRangeCheckBox__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! components/TimeRangeCheckBox */ "./components/TimeRangeCheckBox.tsx");
/* harmony import */ var components_ToggleLogCompression__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! components/ToggleLogCompression */ "./components/ToggleLogCompression.tsx");
/* harmony import */ var components_SelectCI__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! components/SelectCI */ "./components/SelectCI.tsx");
/* harmony import */ var components_SelectMetric__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! components/SelectMetric */ "./components/SelectMetric.tsx");
/* harmony import */ var components_InputOsquery__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! components/InputOsquery */ "./components/InputOsquery.tsx");
/* harmony import */ var components_InputSysparam__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! components/InputSysparam */ "./components/InputSysparam.tsx");
/* harmony import */ var components_SelectService__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! components/SelectService */ "./components/SelectService.tsx");
/* harmony import */ var components_SelectResource__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! components/SelectResource */ "./components/SelectResource.tsx");
/* harmony import */ var components_SelectAlertType__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! components/SelectAlertType */ "./components/SelectAlertType.tsx");
/* harmony import */ var components_InputChildDepth__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! components/InputChildDepth */ "./components/InputChildDepth.tsx");
/* harmony import */ var components_SelectTableName__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! components/SelectTableName */ "./components/SelectTableName.tsx");
/* harmony import */ var components_SelectAlertState__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! components/SelectAlertState */ "./components/SelectAlertState.tsx");
/* harmony import */ var components_SelectChangeType__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! components/SelectChangeType */ "./components/SelectChangeType.tsx");
/* harmony import */ var components_InputParentDepth__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! components/InputParentDepth */ "./components/InputParentDepth.tsx");
/* harmony import */ var components_SelectTableColumn__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(/*! components/SelectTableColumn */ "./components/SelectTableColumn.tsx");
/* harmony import */ var components_SelectMetricAnomaly__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(/*! components/SelectMetricAnomaly */ "./components/SelectMetricAnomaly.tsx");
/* harmony import */ var components_SelectStartingPoint__WEBPACK_IMPORTED_MODULE_32__ = __webpack_require__(/*! components/SelectStartingPoint */ "./components/SelectStartingPoint.tsx");
/* harmony import */ var _grafana_runtime__WEBPACK_IMPORTED_MODULE_33__ = __webpack_require__(/*! @grafana/runtime */ "@grafana/runtime");
/* harmony import */ var _grafana_runtime__WEBPACK_IMPORTED_MODULE_33___default = /*#__PURE__*/__webpack_require__.n(_grafana_runtime__WEBPACK_IMPORTED_MODULE_33__);
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }


































var SplitQueryEditor = function SplitQueryEditor(_ref) {
  var _q$selectedQueryCateg;
  var query = _ref.query,
    onChange = _ref.onChange,
    datasource = _ref.datasource;
  var q = (0,lodash__WEBPACK_IMPORTED_MODULE_0__.defaults)(query, _types__WEBPACK_IMPORTED_MODULE_3__.defaultQuery);
  var metricAnomalyOptions = datasource.snowConnection.getMetricAnomalyOptions();
  var alertTypeOptions = datasource.snowConnection.getAlertTypeOptions();
  var alertStateOptions = datasource.snowConnection.getAlertStateOptions();
  var changeTypeOptions = datasource.snowConnection.getChangeTypeOptions();
  var sysparamTypeOptions = datasource.snowConnection.getSysparamTypeOptions();
  var trendByOptions = datasource.snowConnection.getTrendByOptions();
  var loadServiceOptions = function loadServiceOptions(input) {
    return new Promise(function (resolve) {
      setTimeout(function () {
        resolve(datasource.snowConnection.loadServiceOptions(input));
      }, 500);
    });
  };
  var loadCIOptions = function loadCIOptions(input) {
    return new Promise(function (resolve) {
      setTimeout(function () {
        var _q$selectedServiceLis;
        resolve(datasource.snowConnection.loadCIOptions((_q$selectedServiceLis = q.selectedServiceList) === null || _q$selectedServiceLis === void 0 ? void 0 : _q$selectedServiceLis.value, input));
      }, 500);
    });
  };
  var loadResourceOptions = function loadResourceOptions(input) {
    return new Promise(function (resolve) {
      setTimeout(function () {
        resolve(datasource.snowConnection.loadResourceOptions(q.selectedSourceList, input));
      }, 500);
    });
  };
  var loadMetricOptions = function loadMetricOptions(input) {
    return new Promise(function (resolve) {
      setTimeout(function () {
        resolve(datasource.snowConnection.loadMetricOptions(q.selectedSourceList, input));
      }, 500);
    });
  };
  var loadColumnChoices = function loadColumnChoices(index, input) {
    return new Promise(function (resolve) {
      setTimeout(function () {
        var _q$tableName, _q$basic_sysparam$ind;
        resolve(datasource.snowConnection.loadColumnChoices((_q$tableName = q.tableName) === null || _q$tableName === void 0 ? void 0 : _q$tableName.value, (_q$basic_sysparam$ind = q.basic_sysparam[index][1]) === null || _q$basic_sysparam$ind === void 0 ? void 0 : _q$basic_sysparam$ind.value, input));
      }, 500);
    });
  };
  var loadTableOptions = function loadTableOptions(input) {
    return new Promise(function (resolve) {
      setTimeout(function () {
        resolve(datasource.snowConnection.loadTableOptions(input));
      }, 500);
    });
  };
  var updateQuery = function updateQuery(key, value) {
    onChange(_extends({}, q, _defineProperty({}, key, value)));
  };
  var updateTwoQueries = function updateTwoQueries(values) {
    console.log('values: ', values);
    var newQuery = q;
    console.log('oldQuery: ', newQuery);
    for (var i = 0; i < values.length; i++) {
      newQuery[values[i].key] = values[i].value;
    }
    console.log('newQuery: ', newQuery);
    onChange(newQuery);
  };
  var getQueryCategories = function getQueryCategories() {
    var categoryOptions = [];
    for (var _key in options) {
      var value = options[_key];
      categoryOptions.push({
        label: value.title,
        value: _key,
        description: value.description
      });
    }
    return categoryOptions;
  };
  var getVariables = function getVariables() {
    var variables = {};
    Object.values((0,_grafana_runtime__WEBPACK_IMPORTED_MODULE_33__.getTemplateSrv)().getVariables()).forEach(function (variable) {
      if (variable.type === 'adhoc' || variable.type === 'interval') {
        // These are being added to request.adhocFilters
        console.warn("Variable of type \"".concat(variable.type, "\" is not currently supported by this plugin"));
        return;
      }
      var supportedVariable = variable;
      var variableValue = supportedVariable.current.value;
      if (variableValue === '$__all' || (0,lodash__WEBPACK_IMPORTED_MODULE_0__.isEqual)(variableValue, ['$__all'])) {
        if (supportedVariable.allValue === null || supportedVariable.allValue === '') {
          var allValues = '';
          for (var i = 1; i < supportedVariable.options.length; i++) {
            allValues += supportedVariable.options[i].value + ',';
          }
          if (allValues.charAt(allValues.length - 1) === ',') {
            allValues = allValues.substring(0, allValues.length - 1);
          }
          variableValue = allValues;
        } else {
          variableValue = supportedVariable.allValue;
        }
      }
      variables[supportedVariable.id] = {
        text: supportedVariable.current.text,
        value: variableValue
      };
    });
    return variables;
  };
  var stripVariableString = function stripVariableString(variableString) {
    if (variableString.charAt(0) === '$') {
      variableString = variableString.substring(1);
      if (variableString.charAt(0) === '{' && variableString.charAt(variableString.length - 1) === '}') {
        variableString = variableString.substring(1, variableString.length - 1);
      }
    }
    return variableString;
  };

  // const replaceVariable = (replace: string) => {
  //   replace = stripVariableString(replace);
  //   var returnValue: string = replace;
  //   var variables = getVariables();
  //   console.log('variables: ', variables);
  //   if (typeof variables[replace] !== 'undefined') {
  //     returnValue = variables[replace].value;
  //   }
  //   return returnValue;
  // };

  var replaceMultipleVariables = function replaceMultipleVariables(string) {
    if (!string) {
      return '';
    }
    var dollarIndex = string.indexOf('$');
    var variables = getVariables();
    while (dollarIndex !== -1) {
      var endIndex = string.indexOf('^', dollarIndex) === -1 ? string.length : string.indexOf('^', dollarIndex);
      var variable = string.substring(dollarIndex, endIndex);
      var variableValue = variable;
      var varId = stripVariableString(variable);
      if (typeof variables[varId] !== 'undefined') {
        variableValue = variables[varId].value;
      }
      string = string.replace(variable, variableValue);
      dollarIndex = string.indexOf('$');
    }
    return string;
  };
  var options = {
    Table: {
      title: 'Table',
      description: 'Choose your own table to gather data from',
      content: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement((react__WEBPACK_IMPORTED_MODULE_2___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(components_SelectTableName__WEBPACK_IMPORTED_MODULE_26__.SelectTableName, {
        updateQuery: updateQuery,
        loadTableOptions: loadTableOptions,
        value: q.tableName
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(components_SelectTableColumn__WEBPACK_IMPORTED_MODULE_30__.SelectTableColumn, {
        query: q,
        updateQuery: updateQuery,
        datasource: datasource
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(components_SelectBasicSysparam__WEBPACK_IMPORTED_MODULE_11__.SelectBasicSysparam, {
        query: q,
        updateQuery: updateQuery,
        datasource: datasource,
        sysparamTypeOptions: sysparamTypeOptions,
        loadChoices: loadColumnChoices
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(components_SelectSortBy__WEBPACK_IMPORTED_MODULE_13__.SelectSortBy, {
        query: q,
        updateQuery: updateQuery,
        datasource: datasource
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(components_InputLimit__WEBPACK_IMPORTED_MODULE_8__.InputLimit, {
        defaultValue: q.rowLimit,
        updateQuery: updateQuery
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(components_InputPage__WEBPACK_IMPORTED_MODULE_9__.InputPage, {
        defaultValue: q.page,
        updateQuery: updateQuery
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(components_AlertCountChoice__WEBPACK_IMPORTED_MODULE_5__.AlertCountChoice, {
        value: q.getAlertCount,
        updateQuery: updateQuery
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(components_TimeRangeCheckBox__WEBPACK_IMPORTED_MODULE_16__.TimerangeCheckbox, {
        query: q,
        updateQuery: updateQuery,
        datasource: datasource
      }))
    },
    Aggregate: {
      title: 'Aggregate',
      description: 'Group by and apply aggregate functions to table data',
      content: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement((react__WEBPACK_IMPORTED_MODULE_2___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(components_SelectTableName__WEBPACK_IMPORTED_MODULE_26__.SelectTableName, {
        updateQuery: updateQuery,
        loadTableOptions: loadTableOptions,
        value: q.tableName
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(components_InputGroupBy__WEBPACK_IMPORTED_MODULE_7__.InputGroupBy, {
        query: q,
        updateQuery: updateQuery,
        datasource: datasource
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(components_SelectAggregate__WEBPACK_IMPORTED_MODULE_10__.SelectAggregate, {
        query: q,
        updateQuery: updateQuery,
        datasource: datasource
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(components_InputSysparam__WEBPACK_IMPORTED_MODULE_21__.InputSysparam, {
        updateQuery: updateQuery,
        defaultValue: q.sysparam_query
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(components_InputLimit__WEBPACK_IMPORTED_MODULE_8__.InputLimit, {
        defaultValue: q.rowLimit,
        updateQuery: updateQuery
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(components_TimeRangeCheckBox__WEBPACK_IMPORTED_MODULE_16__.TimerangeCheckbox, {
        query: q,
        updateQuery: updateQuery,
        datasource: datasource
      }))
    },
    Alerts: {
      title: 'Alerts',
      description: 'Get Alerts',
      content: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement((react__WEBPACK_IMPORTED_MODULE_2___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(components_SelectService__WEBPACK_IMPORTED_MODULE_22__.SelectService, {
        loadOptions: loadServiceOptions,
        value: q.selectedServiceList,
        updateQuery: updateQuery
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(components_SelectCI__WEBPACK_IMPORTED_MODULE_18__.SelectCI, {
        loadOptions: loadCIOptions,
        value: q.selectedSourceList,
        updateQuery: updateQuery
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(components_SelectAlertType__WEBPACK_IMPORTED_MODULE_24__.SelectAlertType, {
        options: alertTypeOptions,
        value: q.selectedAlertTypeList,
        updateQuery: updateQuery
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(components_SelectAlertState__WEBPACK_IMPORTED_MODULE_27__.SelectAlertState, {
        options: alertStateOptions,
        value: q.selectedAlertStateList,
        updateQuery: updateQuery
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(components_InputSysparam__WEBPACK_IMPORTED_MODULE_21__.InputSysparam, {
        updateQuery: updateQuery,
        defaultValue: q.sysparam_query
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(components_SelectTags__WEBPACK_IMPORTED_MODULE_4__.SelectTags, {
        query: q,
        updateQuery: updateQuery,
        datasource: datasource,
        replaceMultipleVariables: replaceMultipleVariables
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(components_SelectSortBy__WEBPACK_IMPORTED_MODULE_13__.SelectSortBy, {
        query: q,
        updateQuery: updateQuery,
        datasource: datasource
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(components_InputLimit__WEBPACK_IMPORTED_MODULE_8__.InputLimit, {
        defaultValue: q.rowLimit,
        updateQuery: updateQuery
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(components_InputPage__WEBPACK_IMPORTED_MODULE_9__.InputPage, {
        defaultValue: q.page,
        updateQuery: updateQuery
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(components_TimeRangeCheckBox__WEBPACK_IMPORTED_MODULE_16__.TimerangeCheckbox, {
        query: q,
        updateQuery: updateQuery,
        datasource: datasource
      }))
    },
    Anomaly: {
      title: 'Anomaly',
      description: 'Parse values out of Alert Anomalies table',
      content: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement((react__WEBPACK_IMPORTED_MODULE_2___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(components_SelectTableName__WEBPACK_IMPORTED_MODULE_26__.SelectTableName, {
        updateQuery: updateQuery,
        loadTableOptions: loadTableOptions,
        value: q.tableName
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(components_SelectTableColumn__WEBPACK_IMPORTED_MODULE_30__.SelectTableColumn, {
        query: q,
        updateQuery: updateQuery,
        datasource: datasource
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(components_SelectBasicSysparam__WEBPACK_IMPORTED_MODULE_11__.SelectBasicSysparam, {
        query: q,
        updateQuery: updateQuery,
        datasource: datasource,
        sysparamTypeOptions: sysparamTypeOptions,
        loadChoices: loadColumnChoices
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(components_SelectSortBy__WEBPACK_IMPORTED_MODULE_13__.SelectSortBy, {
        query: q,
        updateQuery: updateQuery,
        datasource: datasource
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(components_InputLimit__WEBPACK_IMPORTED_MODULE_8__.InputLimit, {
        defaultValue: q.rowLimit,
        updateQuery: updateQuery
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(components_InputPage__WEBPACK_IMPORTED_MODULE_9__.InputPage, {
        defaultValue: q.page,
        updateQuery: updateQuery
      }))
    },
    Changes: {
      title: 'Changes',
      description: 'Get Changes',
      content: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement((react__WEBPACK_IMPORTED_MODULE_2___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(components_SelectService__WEBPACK_IMPORTED_MODULE_22__.SelectService, {
        loadOptions: loadServiceOptions,
        value: q.selectedServiceList,
        updateQuery: updateQuery
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(components_SelectCI__WEBPACK_IMPORTED_MODULE_18__.SelectCI, {
        loadOptions: loadCIOptions,
        value: q.selectedSourceList,
        updateQuery: updateQuery
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(components_SelectChangeType__WEBPACK_IMPORTED_MODULE_28__.SelectChangeType, {
        options: changeTypeOptions,
        value: q.selectedChangeTypeList,
        updateQuery: updateQuery
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(components_InputSysparam__WEBPACK_IMPORTED_MODULE_21__.InputSysparam, {
        updateQuery: updateQuery,
        defaultValue: q.sysparam_query
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(components_SelectSortBy__WEBPACK_IMPORTED_MODULE_13__.SelectSortBy, {
        query: q,
        updateQuery: updateQuery,
        datasource: datasource
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(components_InputLimit__WEBPACK_IMPORTED_MODULE_8__.InputLimit, {
        defaultValue: q.rowLimit,
        updateQuery: updateQuery
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(components_InputPage__WEBPACK_IMPORTED_MODULE_9__.InputPage, {
        defaultValue: q.page,
        updateQuery: updateQuery
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(components_TimeRangeCheckBox__WEBPACK_IMPORTED_MODULE_16__.TimerangeCheckbox, {
        query: q,
        updateQuery: updateQuery,
        datasource: datasource
      }))
    },
    Geohash_Map: {
      title: 'GeoHash Map',
      description: 'Get map data from AWS or Azure',
      content: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement((react__WEBPACK_IMPORTED_MODULE_2___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(components_SelectTableName__WEBPACK_IMPORTED_MODULE_26__.SelectTableName, {
        updateQuery: updateQuery,
        loadTableOptions: loadTableOptions,
        value: q.tableName
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(components_InputGroupBy__WEBPACK_IMPORTED_MODULE_7__.InputGroupBy, {
        query: q,
        updateQuery: updateQuery,
        datasource: datasource
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(components_InputSysparam__WEBPACK_IMPORTED_MODULE_21__.InputSysparam, {
        updateQuery: updateQuery,
        defaultValue: q.sysparam_query
      }))
    },
    Live_Agent_Data: {
      title: 'Live Agent Data',
      description: 'Get Live Data from your ACC Agents',
      content: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement((react__WEBPACK_IMPORTED_MODULE_2___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(components_InputOsquery__WEBPACK_IMPORTED_MODULE_20__.InputOsquery, {
        updateQuery: updateQuery,
        defaultValue: q.live_osquery
      }))
    },
    Log_Data: {
      title: 'Log Data',
      description: 'Get log data',
      content: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement((react__WEBPACK_IMPORTED_MODULE_2___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(components_ToggleLogCompression__WEBPACK_IMPORTED_MODULE_17__.ToggleLogCompression, {
        value: q.compressLogs,
        updateQuery: updateQuery
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(components_SelectBasicSysparam__WEBPACK_IMPORTED_MODULE_11__.SelectBasicSysparam, {
        query: q,
        updateQuery: updateQuery,
        datasource: datasource,
        sysparamTypeOptions: sysparamTypeOptions,
        loadChoices: loadColumnChoices
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(components_InputElasticSearch__WEBPACK_IMPORTED_MODULE_6__.InputElasticSearch, {
        updateQuery: updateQuery,
        defaultValue: q.elasticSearch
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(components_SelectSortBy__WEBPACK_IMPORTED_MODULE_13__.SelectSortBy, {
        query: q,
        updateQuery: updateQuery,
        datasource: datasource
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(components_InputLimit__WEBPACK_IMPORTED_MODULE_8__.InputLimit, {
        defaultValue: q.rowLimit,
        updateQuery: updateQuery
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(components_InputPage__WEBPACK_IMPORTED_MODULE_9__.InputPage, {
        defaultValue: q.page,
        updateQuery: updateQuery
      }))
    },
    Metrics: {
      title: 'Metrics',
      description: 'Get Timeseries metrics',
      content: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement((react__WEBPACK_IMPORTED_MODULE_2___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(components_SelectService__WEBPACK_IMPORTED_MODULE_22__.SelectService, {
        loadOptions: loadServiceOptions,
        value: q.selectedServiceList,
        updateQuery: updateQuery
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(components_SelectCI__WEBPACK_IMPORTED_MODULE_18__.SelectCI, {
        loadOptions: loadCIOptions,
        value: q.selectedSourceList,
        updateQuery: updateQuery
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(components_SelectResource__WEBPACK_IMPORTED_MODULE_23__.SelectResource, {
        loadOptions: loadResourceOptions,
        value: q.selectedMetricTypeList,
        updateQuery: updateQuery
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(components_SelectMetric__WEBPACK_IMPORTED_MODULE_19__.SelectMetric, {
        loadOptions: loadMetricOptions,
        value: q.selectedMetricNameList,
        updateQuery: updateQuery
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(components_SelectMetricAnomaly__WEBPACK_IMPORTED_MODULE_31__.SelectMetricAnomaly, {
        options: metricAnomalyOptions,
        value: q.selectedMetricAnomalyList,
        updateQuery: updateQuery
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(components_InputSysparam__WEBPACK_IMPORTED_MODULE_21__.InputSysparam, {
        updateQuery: updateQuery,
        defaultValue: q.sysparam_query
      }))
    },
    Outage_Status: {
      title: 'Outage Status',
      description: 'Gathers business service status over the last 90 days',
      content: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement((react__WEBPACK_IMPORTED_MODULE_2___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(components_SelectService__WEBPACK_IMPORTED_MODULE_22__.SelectService, {
        loadOptions: loadServiceOptions,
        value: q.selectedServiceList,
        updateQuery: updateQuery
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(components_ShowPercentSwitch__WEBPACK_IMPORTED_MODULE_15__.ShowPercentSwitch, {
        value: q.showPercent,
        updateQuery: updateQuery
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(components_InputSysparam__WEBPACK_IMPORTED_MODULE_21__.InputSysparam, {
        updateQuery: updateQuery,
        defaultValue: q.sysparam_query
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(components_InputLimit__WEBPACK_IMPORTED_MODULE_8__.InputLimit, {
        defaultValue: q.rowLimit,
        updateQuery: updateQuery
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(components_InputPage__WEBPACK_IMPORTED_MODULE_9__.InputPage, {
        defaultValue: q.page,
        updateQuery: updateQuery
      }))
    },
    Row_Count: {
      title: 'Row Count',
      description: 'Get row count from query',
      content: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement((react__WEBPACK_IMPORTED_MODULE_2___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(components_SelectTableName__WEBPACK_IMPORTED_MODULE_26__.SelectTableName, {
        updateQuery: updateQuery,
        loadTableOptions: loadTableOptions,
        value: q.tableName
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(components_InputSysparam__WEBPACK_IMPORTED_MODULE_21__.InputSysparam, {
        updateQuery: updateQuery,
        defaultValue: q.sysparam_query
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(components_TimeRangeCheckBox__WEBPACK_IMPORTED_MODULE_16__.TimerangeCheckbox, {
        query: q,
        updateQuery: updateQuery,
        datasource: datasource
      }))
    },
    Topology: {
      title: 'Topology',
      description: 'Get Topology',
      content: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement((react__WEBPACK_IMPORTED_MODULE_2___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(components_SelectStartingPoint__WEBPACK_IMPORTED_MODULE_32__.SelectStartingPoint, {
        loadOptions: loadServiceOptions,
        value: q.selectedServiceList,
        updateQuery: updateQuery
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(components_InputParentDepth__WEBPACK_IMPORTED_MODULE_29__.InputParentDepth, {
        updateQuery: updateQuery,
        defaultValue: q.topology_parent_depth
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(components_InputChildDepth__WEBPACK_IMPORTED_MODULE_25__.InputChildDepth, {
        updateQuery: updateQuery,
        defaultValue: q.topology_child_depth
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(components_InputSysparam__WEBPACK_IMPORTED_MODULE_21__.InputSysparam, {
        updateQuery: updateQuery,
        defaultValue: q.sysparam_query
      }))
    },
    Trend_Data: {
      title: 'Trend Data',
      description: 'Get timeseries data based on a time trend',
      content: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement((react__WEBPACK_IMPORTED_MODULE_2___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(components_SelectTableName__WEBPACK_IMPORTED_MODULE_26__.SelectTableName, {
        updateQuery: updateQuery,
        loadTableOptions: loadTableOptions,
        value: q.tableName
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(components_SelectBasicSysparam__WEBPACK_IMPORTED_MODULE_11__.SelectBasicSysparam, {
        query: q,
        updateQuery: updateQuery,
        datasource: datasource,
        sysparamTypeOptions: sysparamTypeOptions,
        loadChoices: loadColumnChoices
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(components_InputElasticSearch__WEBPACK_IMPORTED_MODULE_6__.InputElasticSearch, {
        updateQuery: updateQuery,
        defaultValue: q.elasticSearch
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(components_InputGroupBy__WEBPACK_IMPORTED_MODULE_7__.InputGroupBy, {
        query: q,
        updateQuery: updateQuery,
        datasource: datasource
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(components_SelectTrend__WEBPACK_IMPORTED_MODULE_14__.SelectTrend, {
        query: q,
        updateQuery: updateQuery,
        trendByOptions: trendByOptions,
        datasource: datasource
      }))
    }
  };
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement((react__WEBPACK_IMPORTED_MODULE_2___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__.HorizontalGroup, {
    justify: "space-between"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__.InlineFieldRow, {
    style: {
      paddingTop: '8px'
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__.InlineField, {
    label: "Query Category",
    labelWidth: 20
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__.Select, {
    className: "min-width-10 max-width-30",
    options: getQueryCategories(),
    value: q.selectedQueryCategory,
    onChange: function onChange(e) {
      if (e.label === 'Anomaly') {
        updateTwoQueries([{
          key: 'tableName',
          value: {
            label: 'Alert Anomaly',
            value: 'em_alert_anomaly',
            description: 'em_alert_anomaly'
          }
        }, {
          key: 'selectedQueryCategory',
          value: e
        }]);
      } else {
        updateQuery('selectedQueryCategory', e);
      }
    },
    menuPlacement: "bottom",
    maxMenuHeight: 220
  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(components_SelectCacheTimeout__WEBPACK_IMPORTED_MODULE_12__.SelectCacheTimeout, {
    value: q.cacheOverride,
    updateQuery: updateQuery
  })), options[(_q$selectedQueryCateg = q.selectedQueryCategory.value) !== null && _q$selectedQueryCateg !== void 0 ? _q$selectedQueryCateg : ''].content);
};

/***/ }),

/***/ "./Utils.ts":
/*!******************!*\
  !*** ./Utils.ts ***!
  \******************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "convertMsTimeToMin": () => (/* binding */ convertMsTimeToMin),
/* harmony export */   "createRegEx": () => (/* binding */ createRegEx),
/* harmony export */   "debugLevel": () => (/* binding */ debugLevel),
/* harmony export */   "getFiledType": () => (/* binding */ getFiledType),
/* harmony export */   "parseAnomResponse": () => (/* binding */ parseAnomResponse),
/* harmony export */   "parseResponse": () => (/* binding */ parseResponse),
/* harmony export */   "printDebug": () => (/* binding */ printDebug),
/* harmony export */   "replaceTargetUsingTemplVars": () => (/* binding */ replaceTargetUsingTemplVars),
/* harmony export */   "replaceTargetUsingTemplVarsCSV": () => (/* binding */ replaceTargetUsingTemplVarsCSV),
/* harmony export */   "trimRegEx": () => (/* binding */ trimRegEx)
/* harmony export */ });
/* harmony import */ var _grafana_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @grafana/runtime */ "@grafana/runtime");
/* harmony import */ var _grafana_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_grafana_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _grafana_data__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @grafana/data */ "@grafana/data");
/* harmony import */ var _grafana_data__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_grafana_data__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _Constants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Constants */ "./Constants.ts");


function convertMsTimeToMin(value) {
  return Math.round(value.getTime() / (1000 * 60));
}

function replaceTargetUsingTemplVars(target, scopedVars) {
  var replacedValue = (0,_grafana_runtime__WEBPACK_IMPORTED_MODULE_0__.getTemplateSrv)().replace(target, scopedVars, 'csv');
  var commaIndex = replacedValue.indexOf(',');
  if (commaIndex >= 0) {
    while (commaIndex >= 0) {
      replacedValue = replacedValue.replace(',', '|');
      commaIndex = replacedValue.indexOf(',');
    }
    replacedValue = '(' + replacedValue + ')';
  }
  if (replacedValue.startsWith('(') && replacedValue.endsWith(')')) {
    return '/' + replacedValue + '/';
  }
  return replacedValue;
}
function replaceTargetUsingTemplVarsCSV(target, scopedVars) {
  return (0,_grafana_runtime__WEBPACK_IMPORTED_MODULE_0__.getTemplateSrv)().replace(target, scopedVars, 'csv');
}
function debugLevel() {
  return 1;
}
function parseResponse(timeseries, seriesName, target, valueMappings, fieldType) {
  var timeFiled = {
    name: _grafana_data__WEBPACK_IMPORTED_MODULE_1__.TIME_SERIES_TIME_FIELD_NAME,
    type: _grafana_data__WEBPACK_IMPORTED_MODULE_1__.FieldType.time,
    config: {
      custom: {}
    },
    values: new _grafana_data__WEBPACK_IMPORTED_MODULE_1__.ArrayVector(timeseries.map(function (p) {
      return p[1];
    }))
  };
  var values;
  if (fieldType === _grafana_data__WEBPACK_IMPORTED_MODULE_1__.FieldType.string) {
    values = new _grafana_data__WEBPACK_IMPORTED_MODULE_1__.ArrayVector(timeseries.map(function (p) {
      return p[0];
    }));
  } else {
    values = new _grafana_data__WEBPACK_IMPORTED_MODULE_1__.ArrayVector(timeseries.map(function (p) {
      return p[0];
    }));
  }
  var valueFiled = {
    name: _grafana_data__WEBPACK_IMPORTED_MODULE_1__.TIME_SERIES_VALUE_FIELD_NAME,
    type: fieldType !== null && fieldType !== void 0 ? fieldType : _grafana_data__WEBPACK_IMPORTED_MODULE_1__.FieldType.number,
    labels: {},
    config: {
      displayName: seriesName,
      custom: {}
    },
    values: values
  };
  var fields = [timeFiled, valueFiled];
  var frame = {
    name: seriesName,
    refId: target.refId,
    fields: fields,
    length: timeseries.length
  };
  return frame;
}
function parseAnomResponse(timeseries, seriesName, target, valueMappings, fieldType) {
  var timeFiled = {
    name: _grafana_data__WEBPACK_IMPORTED_MODULE_1__.TIME_SERIES_TIME_FIELD_NAME,
    type: _grafana_data__WEBPACK_IMPORTED_MODULE_1__.FieldType.time,
    config: {
      custom: {}
    },
    values: new _grafana_data__WEBPACK_IMPORTED_MODULE_1__.ArrayVector(timeseries.map(function (p) {
      return p.x;
    }))
  };
  var values;
  if (fieldType === _grafana_data__WEBPACK_IMPORTED_MODULE_1__.FieldType.string) {
    values = new _grafana_data__WEBPACK_IMPORTED_MODULE_1__.ArrayVector(timeseries.map(function (p) {
      return p.y;
    }));
  } else {
    values = new _grafana_data__WEBPACK_IMPORTED_MODULE_1__.ArrayVector(timeseries.map(function (p) {
      return p.y;
    }));
  }
  var valueFiled = {
    name: _grafana_data__WEBPACK_IMPORTED_MODULE_1__.TIME_SERIES_VALUE_FIELD_NAME,
    type: fieldType !== null && fieldType !== void 0 ? fieldType : _grafana_data__WEBPACK_IMPORTED_MODULE_1__.FieldType.number,
    labels: {},
    config: {
      displayName: seriesName,
      custom: {}
    },
    values: values
  };
  var fields = [timeFiled, valueFiled];
  var frame = {
    name: seriesName,
    refId: target.refId,
    fields: fields,
    length: timeseries.length
  };
  return frame;
}
function printDebug(value) {
  if (debugLevel() === 1) {
    console.log(value);
  }
}

//this function is used to map a text based field type to its type
function getFiledType(value, filedName) {
  //console.log(filedName);
  if (_Constants__WEBPACK_IMPORTED_MODULE_2__.TIME_FILED_NAMES.includes(filedName)) {
    return _grafana_data__WEBPACK_IMPORTED_MODULE_1__.FieldType.time;
  }
  if (typeof value === 'number') {
    return _grafana_data__WEBPACK_IMPORTED_MODULE_1__.FieldType.number;
  }
  return _grafana_data__WEBPACK_IMPORTED_MODULE_1__.FieldType.string;
}
//remove () from RegEx at position 1 and length-2
function trimRegEx(str) {
  //console.log(str.charAt(str.length-2)+" "+)
  if (str.charAt(str.length - 2) === ')' && str.charAt(1) === '(') {
    str = str.charAt(0) + str.slice(2, -2) + str.charAt(str.length - 1);
  }
  return str;
}
function createRegEx(input) {
  console.log('inside createRegEx');
  console.log('Input: ' + input);
  var regExStr = '';
  console.log('Input Length: ' + input.length);
  if (input.length === 1) {
    console.log('Using original input value');
    return input[0];
  }
  if (typeof input === 'string') {
    console.log('Its a string');
    return input;
  }
  for (var i = 0; i < input.length; i++) {
    regExStr += '|' + input[i];
  }
  if (regExStr.charAt(0) === '|') {
    regExStr = regExStr.substring(1, regExStr.length);
    regExStr = '/' + regExStr + '/';
  }
  console.log('New Regex Expression: ' + regExStr);
  return regExStr;
}

/***/ }),

/***/ "./VariableQueryEditor.tsx":
/*!*********************************!*\
  !*** ./VariableQueryEditor.tsx ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "VariableQueryEditor": () => (/* binding */ VariableQueryEditor)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @grafana/ui */ "@grafana/ui");
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__);
var _p;
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }


var VariableQueryEditor = function VariableQueryEditor(_ref) {
  var onChange = _ref.onChange,
    query = _ref.query;
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(query),
    _useState2 = _slicedToArray(_useState, 2),
    state = _useState2[0],
    setState = _useState2[1];
  var saveQuery = function saveQuery() {
    onChange(state, "".concat(state.rawQuery, " (").concat(state.namespace, ")"));
  };
  var handleChange = function handleChange(key, value) {
    setState(_extends({}, state, _defineProperty({}, key, value)));
  };
  var namespaceOptions = [{
    label: 'global_image',
    value: 'global_image'
  }, {
    label: 'global_instance_name',
    value: 'global_instance_name'
  }, {
    label: 'metric_names',
    value: 'metric_names'
  }, {
    label: 'golden_metric_names',
    value: 'golden_metric_names'
  }, {
    label: 'custom_kpis',
    value: 'custom_kpis'
  }, {
    label: 'generic',
    value: 'generic'
  }, {
    label: 'nested_cis',
    value: 'nested_cis'
  }, {
    label: 'nested_classes',
    value: 'nested_classes'
  }, {
    label: 'tagKeys',
    value: 'tagKeys'
  }, {
    label: 'tagValues',
    value: 'tagValues'
  }];
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__.InlineFieldRow, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__.InlineField, {
    label: "Namespace",
    labelWidth: 20
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__.Select, {
    options: namespaceOptions,
    value: state.namespace,
    onChange: function onChange(v) {
      return handleChange('namespace', v.value);
    },
    allowCustomValue: false,
    isClearable: false,
    isSearchable: true,
    onBlur: saveQuery,
    width: 30
  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__.InlineFieldRow, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__.InlineField, {
    label: "Query",
    labelWidth: 20,
    grow: true,
    tooltip: _p || (_p = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("p", null, "Documentation for variables can be found", ' ', /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("a", {
      href: "https://github.com/optimizca/servicenow-grafana#variables",
      rel: "noopener noreferrer",
      target: "_blank"
    }, "(Here)")))
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__.Input, {
    name: "rawQuery",
    onChange: function onChange(v) {
      return handleChange('rawQuery', v.target.value);
    },
    onBlur: saveQuery,
    value: state.rawQuery
  }))));
};

/***/ }),

/***/ "./components/AlertCountChoice.tsx":
/*!*****************************************!*\
  !*** ./components/AlertCountChoice.tsx ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AlertCountChoice": () => (/* binding */ AlertCountChoice)
/* harmony export */ });
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @grafana/ui */ "@grafana/ui");
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_grafana_ui__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);


var AlertCountChoice = function AlertCountChoice(_ref) {
  var value = _ref.value,
    updateQuery = _ref.updateQuery;
  var options = [{
    label: 'No',
    value: 'false'
  }, {
    label: 'Yes',
    value: 'true'
  }];
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement((react__WEBPACK_IMPORTED_MODULE_1___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_0__.InlineFieldRow, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_0__.InlineField, {
    label: "Query Alert Count",
    labelWidth: 20,
    tooltip: "Extra query per row to get the number of alerts on a ci. Adds extra processing, use wisely!"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_0__.RadioButtonGroup, {
    value: value.value,
    options: options,
    onChange: function onChange(v) {
      return updateQuery('getAlertCount', {
        label: v,
        value: v
      });
    }
  }))));
};

/***/ }),

/***/ "./components/InputChildDepth.tsx":
/*!****************************************!*\
  !*** ./components/InputChildDepth.tsx ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "InputChildDepth": () => (/* binding */ InputChildDepth)
/* harmony export */ });
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @grafana/ui */ "@grafana/ui");
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_grafana_ui__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);


var InputChildDepth = function InputChildDepth(_ref) {
  var updateQuery = _ref.updateQuery,
    defaultValue = _ref.defaultValue;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement((react__WEBPACK_IMPORTED_MODULE_1___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_0__.InlineFieldRow, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_0__.InlineField, {
    label: "Child Depth",
    labelWidth: 20
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_0__.Input, {
    width: 20,
    name: "child_depth",
    defaultValue: defaultValue,
    onBlur: function onBlur(e) {
      return updateQuery('topology_child_depth', e.target.value);
    }
  }))));
};

/***/ }),

/***/ "./components/InputElasticSearch.tsx":
/*!*******************************************!*\
  !*** ./components/InputElasticSearch.tsx ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "InputElasticSearch": () => (/* binding */ InputElasticSearch)
/* harmony export */ });
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @grafana/ui */ "@grafana/ui");
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_grafana_ui__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);


var InputElasticSearch = function InputElasticSearch(_ref) {
  var updateQuery = _ref.updateQuery,
    defaultValue = _ref.defaultValue;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement((react__WEBPACK_IMPORTED_MODULE_1___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_0__.InlineFieldRow, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_0__.InlineField, {
    label: "Elastic Search Query",
    labelWidth: 20
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_0__.Input, {
    name: "elasticSearch",
    width: 20,
    defaultValue: defaultValue,
    onBlur: function onBlur(e) {
      return updateQuery('elasticSearch', e.target.value);
    }
  }))));
};

/***/ }),

/***/ "./components/InputGroupBy.tsx":
/*!*************************************!*\
  !*** ./components/InputGroupBy.tsx ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "InputGroupBy": () => (/* binding */ InputGroupBy)
/* harmony export */ });
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @grafana/ui */ "@grafana/ui");
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_grafana_ui__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var method = delegate.iterator[context.method]; if (undefined === method) { if (context.delegate = null, "throw" === context.method) { if (delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method)) return ContinueSentinel; context.method = "throw", context.arg = new TypeError("The iterator does not provide a 'throw' method"); } return ContinueSentinel; } var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) { if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; } return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) { keys.push(key); } return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) { "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); } }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }


var InputGroupBy = function InputGroupBy(_ref) {
  var query = _ref.query,
    updateQuery = _ref.updateQuery,
    datasource = _ref.datasource;
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(query.groupBy),
    _useState2 = _slicedToArray(_useState, 2),
    chosenValue = _useState2[0],
    setChosenValue = _useState2[1];
  var _useState3 = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([{
      label: 'Loading ...',
      value: ''
    }]),
    _useState4 = _slicedToArray(_useState3, 2),
    options = _useState4[0],
    setOptions = _useState4[1];
  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(function () {
    var results = [];
    var unmounted = false;
    function getTableColumnOptions() {
      return _getTableColumnOptions.apply(this, arguments);
    }
    function _getTableColumnOptions() {
      _getTableColumnOptions = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
        var _query$tableName;
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return datasource.snowConnection.getTableColumnOptions((_query$tableName = query.tableName) === null || _query$tableName === void 0 ? void 0 : _query$tableName.value);
              case 2:
                results = _context.sent;
                if (!unmounted) {
                  if (results.length > 0) {
                    setOptions(results);
                  }
                }
              case 4:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));
      return _getTableColumnOptions.apply(this, arguments);
    }
    getTableColumnOptions();
    return function () {
      unmounted = true;
    };
  }, [datasource.snowConnection, query.tableName]);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement((react__WEBPACK_IMPORTED_MODULE_1___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_0__.InlineFieldRow, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_0__.InlineField, {
    labelWidth: 20,
    label: "Group By",
    tooltip: "Select a column which will be used to group the results by."
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_0__.Select, {
    width: 20,
    isMulti: false,
    options: options,
    isClearable: true,
    value: chosenValue,
    isSearchable: true,
    menuPlacement: "top",
    maxMenuHeight: 200,
    allowCustomValue: true,
    defaultValue: chosenValue,
    backspaceRemovesValue: true,
    onChange: function onChange(v) {
      setChosenValue(v);
      updateQuery('groupBy', v);
    },
    onCreateOption: function onCreateOption(v) {
      setChosenValue({
        label: v,
        value: v
      });
      updateQuery('groupBy', {
        label: v,
        value: v
      });
    }
  }))));
};

/***/ }),

/***/ "./components/InputLimit.tsx":
/*!***********************************!*\
  !*** ./components/InputLimit.tsx ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "InputLimit": () => (/* binding */ InputLimit)
/* harmony export */ });
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @grafana/ui */ "@grafana/ui");
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_grafana_ui__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);


var InputLimit = function InputLimit(_ref) {
  var updateQuery = _ref.updateQuery,
    defaultValue = _ref.defaultValue;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement((react__WEBPACK_IMPORTED_MODULE_1___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_0__.InlineFieldRow, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_0__.InlineField, {
    label: "Limit",
    labelWidth: 20,
    tooltip: "Limit the number of results. Expects a number between 1 - 9999"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_0__.Input, {
    name: "limit",
    type: "number",
    max: 9999,
    min: 1,
    width: 20,
    defaultValue: defaultValue,
    onBlur: function onBlur(e) {
      return updateQuery('rowLimit', e.target.value);
    }
  }))));
};

/***/ }),

/***/ "./components/InputOsquery.tsx":
/*!*************************************!*\
  !*** ./components/InputOsquery.tsx ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "InputOsquery": () => (/* binding */ InputOsquery)
/* harmony export */ });
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @grafana/ui */ "@grafana/ui");
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_grafana_ui__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);


var InputOsquery = function InputOsquery(_ref) {
  var updateQuery = _ref.updateQuery,
    defaultValue = _ref.defaultValue;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement((react__WEBPACK_IMPORTED_MODULE_1___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_0__.InlineFieldRow, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_0__.InlineField, {
    label: "Osquery",
    labelWidth: 20
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_0__.Input, {
    width: 20,
    name: "osquery",
    defaultValue: defaultValue,
    onBlur: function onBlur(e) {
      return updateQuery('live_osquery', e.target.value);
    }
  }))));
};

/***/ }),

/***/ "./components/InputPage.tsx":
/*!**********************************!*\
  !*** ./components/InputPage.tsx ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "InputPage": () => (/* binding */ InputPage)
/* harmony export */ });
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @grafana/ui */ "@grafana/ui");
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_grafana_ui__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);


var InputPage = function InputPage(_ref) {
  var defaultValue = _ref.defaultValue,
    updateQuery = _ref.updateQuery;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement((react__WEBPACK_IMPORTED_MODULE_1___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_0__.InlineFieldRow, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_0__.InlineField, {
    label: "Page",
    labelWidth: 20,
    tooltip: "Page number used for pagination. Starts at page 0"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_0__.Input, {
    name: "page",
    type: "number",
    max: 9999,
    min: 0,
    width: 20,
    defaultValue: defaultValue,
    onBlur: function onBlur(e) {
      return updateQuery('page', e.target.valueAsNumber);
    }
  }))));
};

/***/ }),

/***/ "./components/InputParentDepth.tsx":
/*!*****************************************!*\
  !*** ./components/InputParentDepth.tsx ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "InputParentDepth": () => (/* binding */ InputParentDepth)
/* harmony export */ });
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @grafana/ui */ "@grafana/ui");
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_grafana_ui__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);


var InputParentDepth = function InputParentDepth(_ref) {
  var updateQuery = _ref.updateQuery,
    defaultValue = _ref.defaultValue;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement((react__WEBPACK_IMPORTED_MODULE_1___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_0__.InlineFieldRow, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_0__.InlineField, {
    label: "Parent Depth",
    labelWidth: 20
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_0__.Input, {
    width: 20,
    name: "parent_depth",
    defaultValue: defaultValue,
    onBlur: function onBlur(e) {
      return updateQuery('topology_parent_depth', e.target.value);
    }
  }))));
};

/***/ }),

/***/ "./components/InputSysparam.tsx":
/*!**************************************!*\
  !*** ./components/InputSysparam.tsx ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "InputSysparam": () => (/* binding */ InputSysparam)
/* harmony export */ });
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @grafana/ui */ "@grafana/ui");
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_grafana_ui__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);


var InputSysparam = function InputSysparam(_ref) {
  var updateQuery = _ref.updateQuery,
    defaultValue = _ref.defaultValue;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement((react__WEBPACK_IMPORTED_MODULE_1___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_0__.InlineFieldRow, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_0__.InlineField, {
    label: "Sysparam Query",
    labelWidth: 20
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_0__.Input, {
    width: 20,
    name: "sysparam_query",
    defaultValue: defaultValue,
    onBlur: function onBlur(e) {
      return updateQuery('sysparam_query', e.target.value);
    }
  }))));
};

/***/ }),

/***/ "./components/SelectAggregate.tsx":
/*!****************************************!*\
  !*** ./components/SelectAggregate.tsx ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SelectAggregate": () => (/* binding */ SelectAggregate)
/* harmony export */ });
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @grafana/ui */ "@grafana/ui");
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_grafana_ui__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var method = delegate.iterator[context.method]; if (undefined === method) { if (context.delegate = null, "throw" === context.method) { if (delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method)) return ContinueSentinel; context.method = "throw", context.arg = new TypeError("The iterator does not provide a 'throw' method"); } return ContinueSentinel; } var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) { if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; } return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) { keys.push(key); } return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) { "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); } }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }


var SelectAggregate = function SelectAggregate(_ref) {
  var query = _ref.query,
    updateQuery = _ref.updateQuery,
    datasource = _ref.datasource;
  var aggregationTypeOptions = datasource.snowConnection.getAggregateTypeOptions();
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([{
      label: 'Loading ...',
      value: ''
    }]),
    _useState2 = _slicedToArray(_useState, 2),
    options = _useState2[0],
    setOptions = _useState2[1];
  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(function () {
    var results = [];
    console.log('SelectTableColumns - UseEffect');
    var unmounted = false;
    function getTableColumnOptions() {
      return _getTableColumnOptions.apply(this, arguments);
    }
    function _getTableColumnOptions() {
      _getTableColumnOptions = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
        var _query$tableName;
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return datasource.snowConnection.getTableColumnOptions((_query$tableName = query.tableName) === null || _query$tableName === void 0 ? void 0 : _query$tableName.value);
              case 2:
                results = _context.sent;
                if (!unmounted) {
                  if (results.length > 0) {
                    console.log('Setting tableColumn options: ', results);
                    if (query.aggregateColumn) {
                      if (query.aggregateColumn.length > 0) {
                        results = results.concat(query.aggregateColumn);
                      }
                    }
                    setOptions(results);
                  }
                }
              case 4:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));
      return _getTableColumnOptions.apply(this, arguments);
    }
    getTableColumnOptions();
    return function () {
      unmounted = true;
    };
  }, [datasource.snowConnection, query.tableName, query.aggregateColumn]);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement((react__WEBPACK_IMPORTED_MODULE_1___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_0__.InlineFieldRow, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_0__.InlineField, {
    label: "Aggregate Function",
    labelWidth: 20,
    tooltip: "Choose your aggregation function then the column to run this function on"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_0__.Select, {
    width: 20,
    options: aggregationTypeOptions,
    value: query.selectedAggregateType,
    defaultValue: query.selectedAggregateType,
    isSearchable: true,
    isClearable: true,
    isMulti: false,
    backspaceRemovesValue: true,
    allowCustomValue: true,
    onCreateOption: function onCreateOption(v) {
      return updateQuery('selectedAggregateType', {
        label: v,
        value: v
      });
    },
    onChange: function onChange(v) {
      return updateQuery('selectedAggregateType', v);
    },
    maxMenuHeight: 200
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_0__.InlineField, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_0__.Select, {
    options: options,
    value: query.aggregateColumn,
    defaultValue: query.aggregateColumn,
    width: 20,
    isSearchable: true,
    isClearable: true,
    isMulti: false,
    backspaceRemovesValue: true,
    allowCustomValue: true,
    onChange: function onChange(v) {
      return updateQuery('aggregateColumn', v);
    },
    onCreateOption: function onCreateOption(v) {
      var newQuery = [];
      if (typeof query.aggregateColumn !== 'undefined') {
        newQuery = _toConsumableArray(query.aggregateColumn);
        newQuery[newQuery.length] = {
          label: v,
          value: v
        };
      } else {
        newQuery = [{
          label: v,
          value: v
        }];
      }
      updateQuery('aggregateColumn', newQuery);
    },
    maxMenuHeight: 200
  }))));
};

/***/ }),

/***/ "./components/SelectAlertState.tsx":
/*!*****************************************!*\
  !*** ./components/SelectAlertState.tsx ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SelectAlertState": () => (/* binding */ SelectAlertState)
/* harmony export */ });
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @grafana/ui */ "@grafana/ui");
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_grafana_ui__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);


var SelectAlertState = function SelectAlertState(_ref) {
  var options = _ref.options,
    value = _ref.value,
    updateQuery = _ref.updateQuery;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement((react__WEBPACK_IMPORTED_MODULE_1___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_0__.InlineFieldRow, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_0__.InlineField, {
    label: "Alert State Filter",
    labelWidth: 20
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_0__.Select, {
    width: 20,
    value: value,
    options: options,
    isClearable: true,
    maxMenuHeight: 200,
    isSearchable: true,
    defaultValue: value,
    onChange: function onChange(v) {
      return updateQuery('selectedAlertStateList', v);
    }
  }))));
};

/***/ }),

/***/ "./components/SelectAlertType.tsx":
/*!****************************************!*\
  !*** ./components/SelectAlertType.tsx ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SelectAlertType": () => (/* binding */ SelectAlertType)
/* harmony export */ });
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @grafana/ui */ "@grafana/ui");
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_grafana_ui__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);


var SelectAlertType = function SelectAlertType(_ref) {
  var options = _ref.options,
    value = _ref.value,
    updateQuery = _ref.updateQuery;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement((react__WEBPACK_IMPORTED_MODULE_1___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_0__.InlineFieldRow, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_0__.InlineField, {
    label: "Alert Type Filter",
    labelWidth: 20
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_0__.Select, {
    width: 20,
    value: value,
    options: options,
    isClearable: true,
    maxMenuHeight: 200,
    isSearchable: true,
    defaultValue: value,
    onChange: function onChange(v) {
      return updateQuery('selectedAlertTypeList', v);
    }
  }))));
};

/***/ }),

/***/ "./components/SelectBasicSysparam.tsx":
/*!********************************************!*\
  !*** ./components/SelectBasicSysparam.tsx ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SelectBasicSysparam": () => (/* binding */ SelectBasicSysparam)
/* harmony export */ });
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @grafana/ui */ "@grafana/ui");
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_grafana_ui__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var method = delegate.iterator[context.method]; if (undefined === method) { if (context.delegate = null, "throw" === context.method) { if (delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method)) return ContinueSentinel; context.method = "throw", context.arg = new TypeError("The iterator does not provide a 'throw' method"); } return ContinueSentinel; } var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) { if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; } return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) { keys.push(key); } return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) { "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); } }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }


var SelectBasicSysparam = function SelectBasicSysparam(_ref) {
  var query = _ref.query,
    updateQuery = _ref.updateQuery,
    datasource = _ref.datasource,
    sysparamTypeOptions = _ref.sysparamTypeOptions,
    loadChoices = _ref.loadChoices;
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([{
      label: 'Loading ...',
      value: ''
    }]),
    _useState2 = _slicedToArray(_useState, 2),
    columnOptions = _useState2[0],
    setColumnOptions = _useState2[1];
  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(function () {
    var results = [];
    var unmounted = false;
    function getTableColumnOptions() {
      return _getTableColumnOptions.apply(this, arguments);
    }
    function _getTableColumnOptions() {
      _getTableColumnOptions = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
        var _query$tableName;
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return datasource.snowConnection.getTableColumnOptions((_query$tableName = query.tableName) === null || _query$tableName === void 0 ? void 0 : _query$tableName.value);
              case 2:
                results = _context.sent;
                if (!unmounted) {
                  if (results.length > 0) {
                    setColumnOptions(results);
                  }
                }
              case 4:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));
      return _getTableColumnOptions.apply(this, arguments);
    }
    getTableColumnOptions();
    return function () {
      unmounted = true;
    };
  }, [datasource.snowConnection, query.tableName]);
  var values = _toConsumableArray(query.basic_sysparam);
  var deleteRow = function deleteRow(index) {
    var newValue = values;
    newValue.splice(index, 1);
    updateQuery('basic_sysparam', newValue);
  };
  var addRow = function addRow() {
    var newValue = values;
    newValue.push({
      1: null,
      2: null,
      3: null,
      4: {
        label: 'AND',
        value: '^'
      }
    });
    updateQuery('basic_sysparam', newValue);
  };
  var updateValue = function updateValue(index, key, _updateValue) {
    var newValue = values;
    newValue[index][key] = _updateValue;
    updateQuery('basic_sysparam', newValue);
  };
  var radioOptions = [{
    label: 'AND',
    value: '^'
  }, {
    label: 'OR',
    value: '^OR'
  }];
  var fields = [];
  var length = values.constructor.toString().indexOf('Array') !== -1 ? query.basic_sysparam.length : 0;
  var _loop = function _loop(i) {
    fields.push( /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement((react__WEBPACK_IMPORTED_MODULE_1___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_0__.InlineFieldRow, null, i !== 0 && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_0__.InlineField, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_0__.RadioButtonGroup, {
      options: radioOptions,
      value: typeof values[i][4] !== 'undefined' ? values[i][4].value : null,
      onChange: function onChange(v) {
        return updateValue(i, 4, {
          label: v,
          value: v
        });
      }
    })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_0__.InlineField, {
      label: i === 0 ? 'Sysparam Query' : undefined,
      labelWidth: i === 0 ? 20 : undefined
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_0__.Select, {
      className: "min-width-10",
      options: columnOptions,
      value: typeof values[i][1] !== 'undefined' ? values[i][1] : null,
      defaultValue: typeof values[i][1] !== 'undefined' ? values[i][1] : null,
      isSearchable: true,
      isClearable: true,
      isMulti: false,
      backspaceRemovesValue: true,
      allowCustomValue: true,
      onChange: function onChange(v) {
        return updateValue(i, 1, v);
      },
      onCreateOption: function onCreateOption(v) {
        return updateValue(i, 1, {
          label: v,
          value: v
        });
      },
      maxMenuHeight: 200
    })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_0__.InlineField, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_0__.Select, {
      width: 20,
      options: sysparamTypeOptions,
      value: typeof values[i][2] !== 'undefined' ? values[i][2] : null,
      defaultValue: typeof values[i][2] !== 'undefined' ? values[i][2] : null,
      isClearable: true,
      backspaceRemovesValue: true,
      allowCustomValue: true,
      onChange: function onChange(v) {
        return updateValue(i, 2, v);
      },
      onCreateOption: function onCreateOption(v) {
        return updateValue(i, 2, {
          label: v,
          value: v
        });
      },
      maxMenuHeight: 200
    })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_0__.InlineField, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_0__.AsyncSelect, {
      className: "min-width-10",
      loadOptions: function loadOptions(s) {
        return loadChoices(i, s);
      },
      value: typeof values[i][3] !== 'undefined' ? values[i][3] : null,
      defaultValue: typeof values[i][3] !== 'undefined' ? values[i][3] : null,
      isSearchable: true,
      isClearable: true,
      backspaceRemovesValue: true,
      allowCustomValue: true,
      onChange: function onChange(v) {
        return updateValue(i, 3, v);
      },
      onCreateOption: function onCreateOption(v) {
        return updateValue(i, 3, {
          label: v,
          value: v
        });
      },
      maxMenuHeight: 200
    })), i > 0 && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_0__.InlineField, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_0__.ToolbarButton, {
      icon: "trash-alt",
      variant: "destructive",
      iconOnly: true,
      onClick: function onClick() {
        return deleteRow(i);
      }
    }))), i === length - 1 && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_0__.InlineFieldRow, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_0__.InlineField, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_0__.ToolbarButton, {
      icon: "plus",
      variant: "primary",
      onClick: function onClick() {
        return addRow();
      }
    })))));
  };
  for (var i = 0; i < length; i++) {
    _loop(i);
  }
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement((react__WEBPACK_IMPORTED_MODULE_1___default().Fragment), null, fields);
};

/***/ }),

/***/ "./components/SelectCI.tsx":
/*!*********************************!*\
  !*** ./components/SelectCI.tsx ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SelectCI": () => (/* binding */ SelectCI)
/* harmony export */ });
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @grafana/ui */ "@grafana/ui");
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_grafana_ui__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }


var SelectCI = function SelectCI(_ref) {
  var loadOptions = _ref.loadOptions,
    value = _ref.value,
    updateQuery = _ref.updateQuery;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement((react__WEBPACK_IMPORTED_MODULE_1___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_0__.InlineFieldRow, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_0__.InlineField, {
    label: "CI",
    labelWidth: 20
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_0__.AsyncSelect, {
    width: 20,
    value: value,
    isMulti: true,
    isClearable: true,
    maxMenuHeight: 200,
    isSearchable: true,
    defaultValue: value,
    menuPlacement: "bottom",
    allowCustomValue: true,
    loadOptions: loadOptions,
    backspaceRemovesValue: true,
    onChange: function onChange(v) {
      return updateQuery('selectedSourceList', v);
    },
    onCreateOption: function onCreateOption(v) {
      var newQuery = [];
      if (typeof value !== 'undefined') {
        newQuery = _toConsumableArray(value);
        newQuery[newQuery.length] = {
          label: v,
          value: v
        };
      } else {
        newQuery = [{
          label: v,
          value: v
        }];
      }
      updateQuery('selectedSourceList', newQuery);
    }
  }))));
};

/***/ }),

/***/ "./components/SelectCacheTimeout.tsx":
/*!*******************************************!*\
  !*** ./components/SelectCacheTimeout.tsx ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SelectCacheTimeout": () => (/* binding */ SelectCacheTimeout)
/* harmony export */ });
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @grafana/ui */ "@grafana/ui");
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_grafana_ui__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);


var SelectCacheTimeout = function SelectCacheTimeout(_ref) {
  var value = _ref.value,
    updateQuery = _ref.updateQuery;
  var cacheOptions = ['5s', '30s', '60s', '2m', '5m', '15m', '30m'];
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement((react__WEBPACK_IMPORTED_MODULE_1___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_0__.InlineFieldRow, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_0__.InlineField, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_0__.RefreshPicker, {
    value: value,
    text: "Cache Override",
    intervals: cacheOptions,
    onIntervalChanged: function onIntervalChanged(v) {
      return updateQuery('cacheOverride', v);
    }
  }))));
};

/***/ }),

/***/ "./components/SelectChangeType.tsx":
/*!*****************************************!*\
  !*** ./components/SelectChangeType.tsx ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SelectChangeType": () => (/* binding */ SelectChangeType)
/* harmony export */ });
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @grafana/ui */ "@grafana/ui");
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_grafana_ui__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);


var SelectChangeType = function SelectChangeType(_ref) {
  var options = _ref.options,
    value = _ref.value,
    updateQuery = _ref.updateQuery;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement((react__WEBPACK_IMPORTED_MODULE_1___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_0__.InlineFieldRow, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_0__.InlineField, {
    label: "Change Type Filter",
    labelWidth: 20
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_0__.Select, {
    width: 20,
    value: value,
    options: options,
    isClearable: true,
    isSearchable: true,
    maxMenuHeight: 200,
    defaultValue: value,
    onChange: function onChange(v) {
      return updateQuery('selectedChangeTypeList', v);
    }
  }))));
};

/***/ }),

/***/ "./components/SelectMetric.tsx":
/*!*************************************!*\
  !*** ./components/SelectMetric.tsx ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SelectMetric": () => (/* binding */ SelectMetric)
/* harmony export */ });
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @grafana/ui */ "@grafana/ui");
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_grafana_ui__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }


var SelectMetric = function SelectMetric(_ref) {
  var loadOptions = _ref.loadOptions,
    value = _ref.value,
    updateQuery = _ref.updateQuery;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement((react__WEBPACK_IMPORTED_MODULE_1___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_0__.InlineFieldRow, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_0__.InlineField, {
    label: "Metric Name",
    labelWidth: 20
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_0__.AsyncSelect, {
    width: 20,
    value: value,
    isMulti: true,
    isClearable: true,
    maxMenuHeight: 200,
    isSearchable: true,
    defaultValue: value,
    allowCustomValue: true,
    className: "coloredSelect",
    loadOptions: loadOptions,
    backspaceRemovesValue: true,
    onChange: function onChange(v) {
      return updateQuery('selectedMetricNameList', v);
    },
    onCreateOption: function onCreateOption(v) {
      var newQuery = [];
      if (typeof value !== 'undefined') {
        newQuery = _toConsumableArray(value);
        newQuery[newQuery.length] = {
          label: v,
          value: v
        };
      } else {
        newQuery = [{
          label: v,
          value: v
        }];
      }
      updateQuery('selectedMetricNameList', newQuery);
    }
  }))));
};

/***/ }),

/***/ "./components/SelectMetricAnomaly.tsx":
/*!********************************************!*\
  !*** ./components/SelectMetricAnomaly.tsx ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SelectMetricAnomaly": () => (/* binding */ SelectMetricAnomaly)
/* harmony export */ });
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @grafana/ui */ "@grafana/ui");
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_grafana_ui__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);


var SelectMetricAnomaly = function SelectMetricAnomaly(_ref) {
  var options = _ref.options,
    value = _ref.value,
    updateQuery = _ref.updateQuery;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement((react__WEBPACK_IMPORTED_MODULE_1___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_0__.InlineFieldRow, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_0__.InlineField, {
    label: "Anomaly",
    labelWidth: 20
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_0__.Select, {
    width: 20,
    value: value,
    options: options,
    isClearable: true,
    maxMenuHeight: 200,
    defaultValue: value,
    onChange: function onChange(v) {
      return updateQuery('selectedMetricAnomalyList', v);
    }
  }))));
};

/***/ }),

/***/ "./components/SelectResource.tsx":
/*!***************************************!*\
  !*** ./components/SelectResource.tsx ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SelectResource": () => (/* binding */ SelectResource)
/* harmony export */ });
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @grafana/ui */ "@grafana/ui");
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_grafana_ui__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }


var SelectResource = function SelectResource(_ref) {
  var loadOptions = _ref.loadOptions,
    value = _ref.value,
    updateQuery = _ref.updateQuery;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement((react__WEBPACK_IMPORTED_MODULE_1___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_0__.InlineFieldRow, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_0__.InlineField, {
    label: "Resource ID",
    labelWidth: 20
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_0__.AsyncSelect, {
    width: 20,
    value: value,
    isMulti: true,
    isClearable: true,
    isSearchable: true,
    maxMenuHeight: 200,
    defaultValue: value,
    allowCustomValue: true,
    loadOptions: loadOptions,
    backspaceRemovesValue: true,
    onChange: function onChange(v) {
      return updateQuery('selectedMetricTypeList', v);
    },
    onCreateOption: function onCreateOption(v) {
      var newQuery = [];
      if (typeof value !== 'undefined') {
        newQuery = _toConsumableArray(value);
        newQuery[newQuery.length] = {
          label: v,
          value: v
        };
      } else {
        newQuery = [{
          label: v,
          value: v
        }];
      }
      updateQuery('selectedMetricTypeList', newQuery);
    }
  }))));
};

/***/ }),

/***/ "./components/SelectService.tsx":
/*!**************************************!*\
  !*** ./components/SelectService.tsx ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SelectService": () => (/* binding */ SelectService)
/* harmony export */ });
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @grafana/ui */ "@grafana/ui");
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_grafana_ui__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);


var SelectService = function SelectService(_ref) {
  var loadOptions = _ref.loadOptions,
    value = _ref.value,
    updateQuery = _ref.updateQuery;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement((react__WEBPACK_IMPORTED_MODULE_1___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_0__.InlineFieldRow, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_0__.InlineField, {
    label: "Service",
    labelWidth: 20
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_0__.AsyncSelect, {
    width: 20,
    value: value,
    isClearable: true,
    maxMenuHeight: 200,
    isSearchable: true,
    defaultValue: value,
    defaultOptions: true,
    menuPlacement: "bottom",
    allowCustomValue: true,
    loadOptions: loadOptions,
    backspaceRemovesValue: true,
    onChange: function onChange(v) {
      return updateQuery('selectedServiceList', v);
    },
    onCreateOption: function onCreateOption(v) {
      return updateQuery('selectedServiceList', {
        label: v,
        value: v
      });
    }
  }))));
};

/***/ }),

/***/ "./components/SelectSortBy.tsx":
/*!*************************************!*\
  !*** ./components/SelectSortBy.tsx ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SelectSortBy": () => (/* binding */ SelectSortBy)
/* harmony export */ });
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @grafana/ui */ "@grafana/ui");
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_grafana_ui__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var method = delegate.iterator[context.method]; if (undefined === method) { if (context.delegate = null, "throw" === context.method) { if (delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method)) return ContinueSentinel; context.method = "throw", context.arg = new TypeError("The iterator does not provide a 'throw' method"); } return ContinueSentinel; } var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) { if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; } return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) { keys.push(key); } return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) { "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); } }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }


var SelectSortBy = function SelectSortBy(_ref) {
  var query = _ref.query,
    updateQuery = _ref.updateQuery,
    datasource = _ref.datasource;
  var sortDirectionOptions = [{
    label: 'ASC',
    value: 'ASC',
    icon: 'arrow-up'
  }, {
    label: 'DESC',
    value: 'DESC',
    icon: 'arrow-down'
  }];
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([{
      label: 'Loading ...',
      value: ''
    }]),
    _useState2 = _slicedToArray(_useState, 2),
    options = _useState2[0],
    setOptions = _useState2[1];
  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(function () {
    var results = [];
    console.log('SelectTableColumns - UseEffect');
    var unmounted = false;
    function getTableColumnOptions() {
      return _getTableColumnOptions.apply(this, arguments);
    }
    function _getTableColumnOptions() {
      _getTableColumnOptions = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
        var _query$tableName;
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return datasource.snowConnection.getTableColumnOptions((_query$tableName = query.tableName) === null || _query$tableName === void 0 ? void 0 : _query$tableName.value);
              case 2:
                results = _context.sent;
                if (!unmounted) {
                  if (results.length > 0) {
                    console.log('Setting tableColumn options: ', results);
                    if (query.sortBy) {
                      if (query.sortBy.length > 0) {
                        results = results.concat(query.sortBy);
                      }
                    }
                    setOptions(results);
                  }
                }
              case 4:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));
      return _getTableColumnOptions.apply(this, arguments);
    }
    getTableColumnOptions();
    return function () {
      unmounted = true;
    };
  }, [datasource.snowConnection, query.tableName, query.sortBy]);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement((react__WEBPACK_IMPORTED_MODULE_1___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_0__.InlineFieldRow, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_0__.InlineField, {
    label: "Sort By",
    labelWidth: 20
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_0__.Select, {
    width: 20,
    options: options,
    value: query.sortBy,
    defaultValue: query.sortBy,
    isSearchable: true,
    isClearable: true,
    isMulti: false,
    backspaceRemovesValue: true,
    allowCustomValue: true,
    onChange: function onChange(v) {
      return updateQuery('sortBy', v);
    },
    onCreateOption: function onCreateOption(v) {
      return updateQuery('sortBy', {
        label: v,
        value: v
      });
    },
    maxMenuHeight: 200,
    menuPlacement: "top"
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_0__.InlineField, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_0__.RadioButtonGroup, {
    value: query.sortDirection,
    options: sortDirectionOptions,
    onChange: function onChange(v) {
      return updateQuery('sortDirection', v);
    }
  }))));
};

/***/ }),

/***/ "./components/SelectStartingPoint.tsx":
/*!********************************************!*\
  !*** ./components/SelectStartingPoint.tsx ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SelectStartingPoint": () => (/* binding */ SelectStartingPoint)
/* harmony export */ });
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @grafana/ui */ "@grafana/ui");
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_grafana_ui__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);


var SelectStartingPoint = function SelectStartingPoint(_ref) {
  var loadOptions = _ref.loadOptions,
    value = _ref.value,
    updateQuery = _ref.updateQuery;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement((react__WEBPACK_IMPORTED_MODULE_1___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_0__.InlineFieldRow, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_0__.InlineField, {
    label: "Starting Point",
    labelWidth: 20
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_0__.AsyncSelect, {
    width: 20,
    value: value,
    isClearable: true,
    isSearchable: true,
    maxMenuHeight: 200,
    defaultValue: value,
    defaultOptions: true,
    menuPlacement: "bottom",
    allowCustomValue: true,
    loadOptions: loadOptions,
    backspaceRemovesValue: true,
    onCreateOption: function onCreateOption(v) {
      return updateQuery('selectedServiceList', {
        label: v,
        value: v
      });
    },
    onChange: function onChange(v) {
      return updateQuery('selectedServiceList', v);
    }
  }))));
};

/***/ }),

/***/ "./components/SelectTableColumn.tsx":
/*!******************************************!*\
  !*** ./components/SelectTableColumn.tsx ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SelectTableColumn": () => (/* binding */ SelectTableColumn)
/* harmony export */ });
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @grafana/ui */ "@grafana/ui");
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_grafana_ui__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
var _Icon;
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var method = delegate.iterator[context.method]; if (undefined === method) { if (context.delegate = null, "throw" === context.method) { if (delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method)) return ContinueSentinel; context.method = "throw", context.arg = new TypeError("The iterator does not provide a 'throw' method"); } return ContinueSentinel; } var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) { if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; } return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) { keys.push(key); } return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) { "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); } }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }


var SelectTableColumn = function SelectTableColumn(_ref) {
  var query = _ref.query,
    updateQuery = _ref.updateQuery,
    datasource = _ref.datasource;
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(query.selectedtableColumns),
    _useState2 = _slicedToArray(_useState, 2),
    chosenValue = _useState2[0],
    setChosenValue = _useState2[1];
  var _useState3 = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([{
      label: 'Loading ...',
      value: ''
    }]),
    _useState4 = _slicedToArray(_useState3, 2),
    options = _useState4[0],
    setOptions = _useState4[1];
  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(function () {
    var results = [];
    console.log('SelectTableColumns - UseEffect');
    var unmounted = false;
    function getTableColumnOptions() {
      return _getTableColumnOptions.apply(this, arguments);
    }
    function _getTableColumnOptions() {
      _getTableColumnOptions = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
        var _query$tableName;
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return datasource.snowConnection.getTableColumnOptions((_query$tableName = query.tableName) === null || _query$tableName === void 0 ? void 0 : _query$tableName.value);
              case 2:
                results = _context.sent;
                if (!unmounted) {
                  if (results.length > 0) {
                    console.log('Setting tableColumn options: ', results);
                    if (chosenValue) {
                      if (chosenValue.length > 0) {
                        results = results.concat(chosenValue);
                      }
                    }
                    setOptions(results);
                  }
                }
              case 4:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));
      return _getTableColumnOptions.apply(this, arguments);
    }
    getTableColumnOptions();
    return function () {
      unmounted = true;
    };
  }, [datasource.snowConnection, query.tableName, chosenValue]);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement((react__WEBPACK_IMPORTED_MODULE_1___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_0__.InlineFieldRow, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_0__.InlineField, {
    labelWidth: 20,
    label: "Table Columns",
    tooltip: "Leave columns blank to return all columns in the dictionary"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_0__.Select, {
    isMulti: true,
    options: options,
    isClearable: true,
    maxMenuHeight: 200,
    value: chosenValue,
    isSearchable: true,
    menuPlacement: "bottom",
    allowCustomValue: true,
    defaultValue: chosenValue,
    backspaceRemovesValue: true,
    prefix: _Icon || (_Icon = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_0__.Icon, {
      name: "columns"
    })),
    className: "min-width-10 max-width-30",
    onChange: function onChange(v) {
      setChosenValue(v);
      updateQuery('selectedtableColumns', v);
    },
    onCreateOption: function onCreateOption(v) {
      var newQuery = [];
      if (typeof chosenValue !== 'undefined') {
        newQuery = _toConsumableArray(chosenValue);
        newQuery[newQuery.length] = {
          label: v,
          value: v
        };
      } else {
        newQuery = [{
          label: v,
          value: v
        }];
      }
      setChosenValue(newQuery);
      updateQuery('selectedtableColumns', newQuery);
    }
  }))));
};

/***/ }),

/***/ "./components/SelectTableName.tsx":
/*!****************************************!*\
  !*** ./components/SelectTableName.tsx ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SelectTableName": () => (/* binding */ SelectTableName)
/* harmony export */ });
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @grafana/ui */ "@grafana/ui");
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_grafana_ui__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
var _Icon;


var SelectTableName = function SelectTableName(_ref) {
  var loadTableOptions = _ref.loadTableOptions,
    value = _ref.value,
    updateQuery = _ref.updateQuery;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement((react__WEBPACK_IMPORTED_MODULE_1___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_0__.InlineFieldRow, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_0__.InlineField, {
    label: "Table Name",
    labelWidth: 20
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_0__.AsyncSelect, {
    value: value,
    isClearable: true,
    maxMenuHeight: 200,
    isSearchable: true,
    defaultValue: value,
    defaultOptions: true,
    menuPlacement: "bottom",
    allowCustomValue: true,
    backspaceRemovesValue: true,
    prefix: _Icon || (_Icon = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_0__.Icon, {
      name: "table"
    })),
    loadOptions: loadTableOptions,
    className: "min-width-10 max-width-30",
    onChange: function onChange(v) {
      return updateQuery('tableName', v);
    },
    onCreateOption: function onCreateOption(v) {
      return updateQuery('tableName', {
        label: v,
        value: v
      });
    }
  }))));
};

/***/ }),

/***/ "./components/SelectTags.tsx":
/*!***********************************!*\
  !*** ./components/SelectTags.tsx ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SelectTags": () => (/* binding */ SelectTags)
/* harmony export */ });
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @grafana/ui */ "@grafana/ui");
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_grafana_ui__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! lodash */ "lodash");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_2__);
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var method = delegate.iterator[context.method]; if (undefined === method) { if (context.delegate = null, "throw" === context.method) { if (delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method)) return ContinueSentinel; context.method = "throw", context.arg = new TypeError("The iterator does not provide a 'throw' method"); } return ContinueSentinel; } var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) { if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; } return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) { keys.push(key); } return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) { "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); } }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }



var SelectTags = function SelectTags(_ref) {
  var query = _ref.query,
    updateQuery = _ref.updateQuery,
    datasource = _ref.datasource,
    replaceMultipleVariables = _ref.replaceMultipleVariables;
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([{
      label: 'Loading...',
      value: ''
    }]),
    _useState2 = _slicedToArray(_useState, 2),
    keyOptions = _useState2[0],
    setKeyOptions = _useState2[1];
  var _useState3 = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([{
      label: 'Loading...',
      value: ''
    }]),
    _useState4 = _slicedToArray(_useState3, 2),
    valueOptions = _useState4[0],
    setValueOptions = _useState4[1];
  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(function () {
    var keys = [];
    var values = [];
    var tags = [];
    console.log('Use Effect: SelectTags Component');
    console.log('query', query);
    function getKeyOptions() {
      return _getKeyOptions.apply(this, arguments);
    }
    function _getKeyOptions() {
      _getKeyOptions = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
        var selectedAlertStateList, sysparam_query, rowLimit, _loop, i, newSelectedValues;
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                selectedAlertStateList = query.selectedAlertStateList, sysparam_query = query.sysparam_query, rowLimit = query.rowLimit;
                sysparam_query = replaceMultipleVariables(sysparam_query);
                console.log('replaced sysparam: ', sysparam_query);
                _context.next = 5;
                return datasource.snowConnection.getAlertTags(selectedAlertStateList, sysparam_query, rowLimit);
              case 5:
                tags = _context.sent;
                console.log('Tags: ', tags);
                _loop = function _loop(i) {
                  keys.push({
                    label: tags[i].key,
                    value: tags[i].key
                  });
                  if (typeof query.tagKeys !== 'undefined') {
                    if (typeof query.tagKeys[0] !== 'undefined') {
                      if (query.tagKeys[0].value.charAt(0) !== '$') {
                        query.tagKeys.map(function (k) {
                          if (tags[i].key === k.value) {
                            values.push({
                              label: tags[i].value,
                              value: tags[i].value
                            });
                          }
                        });
                      }
                    }
                  }
                };
                for (i = 0; i < tags.length; i++) {
                  _loop(i);
                }
                keys = keys.filter(function (option, index, self) {
                  return index === self.findIndex(function (t) {
                    return t.value === option.value;
                  });
                });
                values = values.filter(function (option, index, self) {
                  return index === self.findIndex(function (t) {
                    return t.value === option.value;
                  });
                });

                // Removes any tagValues that are not currently in the list
                if (query.tagValues) {
                  if (query.tagValues[0]) {
                    if (query.tagValues[0].value.charAt(0) !== '$') {
                      newSelectedValues = query.tagValues;
                      query.tagValues.map(function (v, i) {
                        if (v.custom) {
                          return;
                        }
                        var match = false;
                        values.map(function (valueOptions) {
                          if (v.value === valueOptions.value && !v.custom) {
                            match = true;
                          }
                        });
                        if (!match) {
                          newSelectedValues.splice(i, 1);
                        }
                      });
                      if (!(0,lodash__WEBPACK_IMPORTED_MODULE_2__.isEqual)(newSelectedValues, query.tagValues)) {
                        updateQuery('tagValues', newSelectedValues);
                      }
                    }
                  }
                }
                setKeyOptions(keys);
                setValueOptions(values);
              case 14:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));
      return _getKeyOptions.apply(this, arguments);
    }
    getKeyOptions();
  }, [datasource.snowConnection, query, updateQuery, replaceMultipleVariables]);
  var customKeyOptions = keyOptions;
  if (typeof query.tagKeys !== 'undefined') {
    customKeyOptions = [].concat(_toConsumableArray(keyOptions), [query.tagKeys]);
    customKeyOptions = [].concat.apply([], customKeyOptions);
  }
  var customValueOptions = valueOptions;
  if (typeof query.tagValues !== 'undefined') {
    customValueOptions = [].concat(_toConsumableArray(valueOptions), [query.tagValues]);
    customValueOptions = [].concat.apply([], customValueOptions);
  }
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement((react__WEBPACK_IMPORTED_MODULE_1___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_0__.InlineFieldRow, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_0__.InlineField, {
    label: "Tag Keys",
    labelWidth: 20,
    tooltip: "Filter by tags located in additional info"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_0__.Select, {
    className: "min-width-10 max-width-20",
    options: customKeyOptions,
    value: query.tagKeys,
    defaultValue: query.tagKeys,
    isSearchable: true,
    isClearable: true,
    isMulti: true,
    backspaceRemovesValue: true,
    allowCustomValue: true,
    onChange: function onChange(v) {
      return updateQuery('tagKeys', v);
    },
    onCreateOption: function onCreateOption(v) {
      var customValue = {
        label: v,
        value: v
      };
      var newValue = [];
      if (query.tagKeys) {
        newValue = _toConsumableArray(query.tagKeys);
        newValue.push(customValue);
      } else {
        newValue = [customValue];
      }
      updateQuery('tagKeys', newValue);
    },
    maxMenuHeight: 200
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_0__.InlineField, {
    label: "Tag Values",
    labelWidth: 20
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_0__.Select, {
    className: "min-width-10 max-width-20",
    options: customValueOptions,
    value: query.tagValues,
    defaultValue: query.tagValues,
    isSearchable: true,
    isClearable: true,
    isMulti: true,
    backspaceRemovesValue: true,
    allowCustomValue: true,
    onChange: function onChange(v) {
      return updateQuery('tagValues', v);
    },
    onCreateOption: function onCreateOption(v) {
      var customValue = {
        label: v,
        value: v,
        custom: true
      };
      var newValue = [];
      if (query.tagValues) {
        newValue = _toConsumableArray(query.tagValues);
        newValue.push(customValue);
      } else {
        newValue = [customValue];
      }
      updateQuery('tagValues', newValue);
    },
    maxMenuHeight: 200
  }))));
};

/***/ }),

/***/ "./components/SelectTrend.tsx":
/*!************************************!*\
  !*** ./components/SelectTrend.tsx ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SelectTrend": () => (/* binding */ SelectTrend)
/* harmony export */ });
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @grafana/ui */ "@grafana/ui");
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_grafana_ui__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var method = delegate.iterator[context.method]; if (undefined === method) { if (context.delegate = null, "throw" === context.method) { if (delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method)) return ContinueSentinel; context.method = "throw", context.arg = new TypeError("The iterator does not provide a 'throw' method"); } return ContinueSentinel; } var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) { if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; } return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) { keys.push(key); } return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) { "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); } }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }


var SelectTrend = function SelectTrend(_ref) {
  var updateQuery = _ref.updateQuery,
    trendByOptions = _ref.trendByOptions,
    query = _ref.query,
    datasource = _ref.datasource;
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([{
      label: 'Loading ...',
      value: ''
    }]),
    _useState2 = _slicedToArray(_useState, 2),
    options = _useState2[0],
    setOptions = _useState2[1];
  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(function () {
    var results = [];
    var unmounted = false;
    function getTableColumnOptions() {
      return _getTableColumnOptions.apply(this, arguments);
    }
    function _getTableColumnOptions() {
      _getTableColumnOptions = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
        var _query$tableName;
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return datasource.snowConnection.getTableColumnOptions((_query$tableName = query.tableName) === null || _query$tableName === void 0 ? void 0 : _query$tableName.value);
              case 2:
                results = _context.sent;
                if (!unmounted) {
                  if (results.length > 0) {
                    setOptions(results);
                  }
                }
              case 4:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));
      return _getTableColumnOptions.apply(this, arguments);
    }
    getTableColumnOptions();
    return function () {
      unmounted = true;
    };
  }, [datasource.snowConnection, query.tableName]);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement((react__WEBPACK_IMPORTED_MODULE_1___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_0__.InlineFieldRow, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_0__.InlineField, {
    label: "Trend",
    labelWidth: 20
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_0__.Select, {
    className: "min-width-10 max-width-30",
    options: options,
    value: query.selectedTrendColumn,
    defaultValue: query.selectedTrendColumn,
    isSearchable: true,
    isClearable: true,
    backspaceRemovesValue: true,
    allowCustomValue: true,
    onChange: function onChange(v) {
      return updateQuery('selectedTrendColumn', v);
    },
    onCreateOption: function onCreateOption(v) {
      return updateQuery('selectedTrendColumn', {
        label: v,
        value: v
      });
    },
    maxMenuHeight: 200
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_0__.InlineField, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_0__.Select, {
    className: "min-width-10 max-width-30",
    options: trendByOptions,
    value: query.selectedTrendBy,
    defaultValue: query.selectedTrendBy,
    isSearchable: true,
    isClearable: true,
    backspaceRemovesValue: true,
    allowCustomValue: true,
    onChange: function onChange(v) {
      return updateQuery('selectedTrendBy', v);
    },
    onCreateOption: function onCreateOption(v) {
      return updateQuery('selectedTrendBy', {
        label: v,
        value: v
      });
    },
    maxMenuHeight: 200
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_0__.InlineField, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_0__.Input, {
    name: "period",
    type: "number",
    max: 300,
    min: 1,
    width: 20,
    defaultValue: query.trendPeriod,
    onBlur: function onBlur(e) {
      return updateQuery('trendPeriod', e.target.value);
    }
  }))));
};

/***/ }),

/***/ "./components/ShowPercentSwitch.tsx":
/*!******************************************!*\
  !*** ./components/ShowPercentSwitch.tsx ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ShowPercentSwitch": () => (/* binding */ ShowPercentSwitch)
/* harmony export */ });
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @grafana/ui */ "@grafana/ui");
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_grafana_ui__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);


var ShowPercentSwitch = function ShowPercentSwitch(_ref) {
  var value = _ref.value,
    updateQuery = _ref.updateQuery;
  var switchOptions = [{
    label: 'False',
    value: false
  }, {
    label: 'True',
    value: true
  }];
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement((react__WEBPACK_IMPORTED_MODULE_1___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_0__.InlineFieldRow, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_0__.InlineField, {
    label: "Show Uptime %",
    labelWidth: 20
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_0__.RadioButtonGroup, {
    options: switchOptions,
    value: value || false,
    onChange: function onChange(v) {
      return updateQuery('showPercent', v);
    }
  }))));
};

/***/ }),

/***/ "./components/TimeRangeCheckBox.tsx":
/*!******************************************!*\
  !*** ./components/TimeRangeCheckBox.tsx ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "TimerangeCheckbox": () => (/* binding */ TimerangeCheckbox)
/* harmony export */ });
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @grafana/ui */ "@grafana/ui");
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_grafana_ui__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var method = delegate.iterator[context.method]; if (undefined === method) { if (context.delegate = null, "throw" === context.method) { if (delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method)) return ContinueSentinel; context.method = "throw", context.arg = new TypeError("The iterator does not provide a 'throw' method"); } return ContinueSentinel; } var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) { if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; } return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) { keys.push(key); } return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) { "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); } }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }


var TimerangeCheckbox = function TimerangeCheckbox(_ref) {
  var query = _ref.query,
    updateQuery = _ref.updateQuery,
    datasource = _ref.datasource;
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([{
      label: 'Loading ...',
      value: ''
    }]),
    _useState2 = _slicedToArray(_useState, 2),
    options = _useState2[0],
    setOptions = _useState2[1];
  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(function () {
    var results = [];
    console.log('SelectTableColumns - UseEffect');
    var unmounted = false;
    function getTableColumnOptions() {
      return _getTableColumnOptions.apply(this, arguments);
    }
    function _getTableColumnOptions() {
      _getTableColumnOptions = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
        var _query$tableName;
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return datasource.snowConnection.getTableColumnOptions((_query$tableName = query.tableName) === null || _query$tableName === void 0 ? void 0 : _query$tableName.value);
              case 2:
                results = _context.sent;
                if (!unmounted) {
                  if (results.length > 0) {
                    console.log('Setting tableColumn options: ', results);
                    if (query.grafanaTimerangeColumn) {
                      if (query.grafanaTimerangeColumn.length > 0) {
                        results = results.concat(query.grafanaTimerangeColumn);
                      }
                    }
                    setOptions(results);
                  }
                }
              case 4:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));
      return _getTableColumnOptions.apply(this, arguments);
    }
    getTableColumnOptions();
    return function () {
      unmounted = true;
    };
  }, [datasource.snowConnection, query.tableName, query.grafanaTimerangeColumn]);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement((react__WEBPACK_IMPORTED_MODULE_1___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_0__.InlineFieldRow, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_0__.InlineField, {
    label: "Grafana Timerange",
    labelWidth: 20,
    tooltip: "If selected, only results that fit inbetween your Grafana Timerange will be returned"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_0__.InlineSwitch, {
    value: query.grafanaTimerange,
    onChange: function onChange(v) {
      return updateQuery('grafanaTimerange', v.target.checked);
    }
  })), query.grafanaTimerange && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_0__.InlineField, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_0__.Select, {
    options: options,
    value: query.grafanaTimerangeColumn,
    defaultValue: query.grafanaTimerangeColumn,
    width: 20,
    isSearchable: true,
    isClearable: true,
    isMulti: false,
    backspaceRemovesValue: true,
    allowCustomValue: true,
    onChange: function onChange(v) {
      return updateQuery('grafanaTimerangeColumn', v);
    },
    onCreateOption: function onCreateOption(v) {
      return updateQuery('grafanaTimerangeColumn', {
        label: v,
        value: v
      });
    },
    maxMenuHeight: 200
  }))));
};

/***/ }),

/***/ "./components/ToggleLogCompression.tsx":
/*!*********************************************!*\
  !*** ./components/ToggleLogCompression.tsx ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ToggleLogCompression": () => (/* binding */ ToggleLogCompression)
/* harmony export */ });
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @grafana/ui */ "@grafana/ui");
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_grafana_ui__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);


var ToggleLogCompression = function ToggleLogCompression(_ref) {
  var value = _ref.value,
    updateQuery = _ref.updateQuery;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement((react__WEBPACK_IMPORTED_MODULE_1___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_0__.InlineFieldRow, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_0__.InlineField, {
    label: "Compress Logs",
    labelWidth: 20
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_0__.InlineSwitch, {
    value: value,
    onChange: function onChange(v) {
      return updateQuery('compressLogs', v.target.checked);
    }
  }))));
};

/***/ }),

/***/ "./types.ts":
/*!******************!*\
  !*** ./types.ts ***!
  \******************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "defaultQuery": () => (/* binding */ defaultQuery)
/* harmony export */ });
var defaultQuery = {
  selectedQueryCategory: {
    label: 'Metrics',
    value: 'Metrics',
    description: 'Get Timeseries metrics.'
  },
  basic_sysparam: [{
    1: null,
    2: null,
    3: null,
    4: null
  }],
  getAlertCount: {
    label: 'No',
    value: 'false'
  },
  cacheOverride: '',
  compressLogs: false,
  grafanaTimerange: false,
  sortDirection: 'ASC',
  page: 0,
  rowLimit: '9999'
};

/**
 * These are options configured for each DataSource instance
 */

/***/ }),

/***/ "../node_modules/lodash/_Symbol.js":
/*!*****************************************!*\
  !*** ../node_modules/lodash/_Symbol.js ***!
  \*****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var root = __webpack_require__(/*! ./_root */ "../node_modules/lodash/_root.js");

/** Built-in value references. */
var Symbol = root.Symbol;

module.exports = Symbol;


/***/ }),

/***/ "../node_modules/lodash/_apply.js":
/*!****************************************!*\
  !*** ../node_modules/lodash/_apply.js ***!
  \****************************************/
/***/ ((module) => {

/**
 * A faster alternative to `Function#apply`, this function invokes `func`
 * with the `this` binding of `thisArg` and the arguments of `args`.
 *
 * @private
 * @param {Function} func The function to invoke.
 * @param {*} thisArg The `this` binding of `func`.
 * @param {Array} args The arguments to invoke `func` with.
 * @returns {*} Returns the result of `func`.
 */
function apply(func, thisArg, args) {
  switch (args.length) {
    case 0: return func.call(thisArg);
    case 1: return func.call(thisArg, args[0]);
    case 2: return func.call(thisArg, args[0], args[1]);
    case 3: return func.call(thisArg, args[0], args[1], args[2]);
  }
  return func.apply(thisArg, args);
}

module.exports = apply;


/***/ }),

/***/ "../node_modules/lodash/_arrayLikeKeys.js":
/*!************************************************!*\
  !*** ../node_modules/lodash/_arrayLikeKeys.js ***!
  \************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var baseTimes = __webpack_require__(/*! ./_baseTimes */ "../node_modules/lodash/_baseTimes.js"),
    isArguments = __webpack_require__(/*! ./isArguments */ "../node_modules/lodash/isArguments.js"),
    isArray = __webpack_require__(/*! ./isArray */ "../node_modules/lodash/isArray.js"),
    isBuffer = __webpack_require__(/*! ./isBuffer */ "../node_modules/lodash/isBuffer.js"),
    isIndex = __webpack_require__(/*! ./_isIndex */ "../node_modules/lodash/_isIndex.js"),
    isTypedArray = __webpack_require__(/*! ./isTypedArray */ "../node_modules/lodash/isTypedArray.js");

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Creates an array of the enumerable property names of the array-like `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @param {boolean} inherited Specify returning inherited property names.
 * @returns {Array} Returns the array of property names.
 */
function arrayLikeKeys(value, inherited) {
  var isArr = isArray(value),
      isArg = !isArr && isArguments(value),
      isBuff = !isArr && !isArg && isBuffer(value),
      isType = !isArr && !isArg && !isBuff && isTypedArray(value),
      skipIndexes = isArr || isArg || isBuff || isType,
      result = skipIndexes ? baseTimes(value.length, String) : [],
      length = result.length;

  for (var key in value) {
    if ((inherited || hasOwnProperty.call(value, key)) &&
        !(skipIndexes && (
           // Safari 9 has enumerable `arguments.length` in strict mode.
           key == 'length' ||
           // Node.js 0.10 has enumerable non-index properties on buffers.
           (isBuff && (key == 'offset' || key == 'parent')) ||
           // PhantomJS 2 has enumerable non-index properties on typed arrays.
           (isType && (key == 'buffer' || key == 'byteLength' || key == 'byteOffset')) ||
           // Skip index properties.
           isIndex(key, length)
        ))) {
      result.push(key);
    }
  }
  return result;
}

module.exports = arrayLikeKeys;


/***/ }),

/***/ "../node_modules/lodash/_baseGetTag.js":
/*!*********************************************!*\
  !*** ../node_modules/lodash/_baseGetTag.js ***!
  \*********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var Symbol = __webpack_require__(/*! ./_Symbol */ "../node_modules/lodash/_Symbol.js"),
    getRawTag = __webpack_require__(/*! ./_getRawTag */ "../node_modules/lodash/_getRawTag.js"),
    objectToString = __webpack_require__(/*! ./_objectToString */ "../node_modules/lodash/_objectToString.js");

/** `Object#toString` result references. */
var nullTag = '[object Null]',
    undefinedTag = '[object Undefined]';

/** Built-in value references. */
var symToStringTag = Symbol ? Symbol.toStringTag : undefined;

/**
 * The base implementation of `getTag` without fallbacks for buggy environments.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
function baseGetTag(value) {
  if (value == null) {
    return value === undefined ? undefinedTag : nullTag;
  }
  return (symToStringTag && symToStringTag in Object(value))
    ? getRawTag(value)
    : objectToString(value);
}

module.exports = baseGetTag;


/***/ }),

/***/ "../node_modules/lodash/_baseIsArguments.js":
/*!**************************************************!*\
  !*** ../node_modules/lodash/_baseIsArguments.js ***!
  \**************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var baseGetTag = __webpack_require__(/*! ./_baseGetTag */ "../node_modules/lodash/_baseGetTag.js"),
    isObjectLike = __webpack_require__(/*! ./isObjectLike */ "../node_modules/lodash/isObjectLike.js");

/** `Object#toString` result references. */
var argsTag = '[object Arguments]';

/**
 * The base implementation of `_.isArguments`.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 */
function baseIsArguments(value) {
  return isObjectLike(value) && baseGetTag(value) == argsTag;
}

module.exports = baseIsArguments;


/***/ }),

/***/ "../node_modules/lodash/_baseIsNative.js":
/*!***********************************************!*\
  !*** ../node_modules/lodash/_baseIsNative.js ***!
  \***********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var isFunction = __webpack_require__(/*! ./isFunction */ "../node_modules/lodash/isFunction.js"),
    isMasked = __webpack_require__(/*! ./_isMasked */ "../node_modules/lodash/_isMasked.js"),
    isObject = __webpack_require__(/*! ./isObject */ "../node_modules/lodash/isObject.js"),
    toSource = __webpack_require__(/*! ./_toSource */ "../node_modules/lodash/_toSource.js");

/**
 * Used to match `RegExp`
 * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
 */
var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;

/** Used to detect host constructors (Safari). */
var reIsHostCtor = /^\[object .+?Constructor\]$/;

/** Used for built-in method references. */
var funcProto = Function.prototype,
    objectProto = Object.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/** Used to detect if a method is native. */
var reIsNative = RegExp('^' +
  funcToString.call(hasOwnProperty).replace(reRegExpChar, '\\$&')
  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
);

/**
 * The base implementation of `_.isNative` without bad shim checks.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a native function,
 *  else `false`.
 */
function baseIsNative(value) {
  if (!isObject(value) || isMasked(value)) {
    return false;
  }
  var pattern = isFunction(value) ? reIsNative : reIsHostCtor;
  return pattern.test(toSource(value));
}

module.exports = baseIsNative;


/***/ }),

/***/ "../node_modules/lodash/_baseIsTypedArray.js":
/*!***************************************************!*\
  !*** ../node_modules/lodash/_baseIsTypedArray.js ***!
  \***************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var baseGetTag = __webpack_require__(/*! ./_baseGetTag */ "../node_modules/lodash/_baseGetTag.js"),
    isLength = __webpack_require__(/*! ./isLength */ "../node_modules/lodash/isLength.js"),
    isObjectLike = __webpack_require__(/*! ./isObjectLike */ "../node_modules/lodash/isObjectLike.js");

/** `Object#toString` result references. */
var argsTag = '[object Arguments]',
    arrayTag = '[object Array]',
    boolTag = '[object Boolean]',
    dateTag = '[object Date]',
    errorTag = '[object Error]',
    funcTag = '[object Function]',
    mapTag = '[object Map]',
    numberTag = '[object Number]',
    objectTag = '[object Object]',
    regexpTag = '[object RegExp]',
    setTag = '[object Set]',
    stringTag = '[object String]',
    weakMapTag = '[object WeakMap]';

var arrayBufferTag = '[object ArrayBuffer]',
    dataViewTag = '[object DataView]',
    float32Tag = '[object Float32Array]',
    float64Tag = '[object Float64Array]',
    int8Tag = '[object Int8Array]',
    int16Tag = '[object Int16Array]',
    int32Tag = '[object Int32Array]',
    uint8Tag = '[object Uint8Array]',
    uint8ClampedTag = '[object Uint8ClampedArray]',
    uint16Tag = '[object Uint16Array]',
    uint32Tag = '[object Uint32Array]';

/** Used to identify `toStringTag` values of typed arrays. */
var typedArrayTags = {};
typedArrayTags[float32Tag] = typedArrayTags[float64Tag] =
typedArrayTags[int8Tag] = typedArrayTags[int16Tag] =
typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] =
typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] =
typedArrayTags[uint32Tag] = true;
typedArrayTags[argsTag] = typedArrayTags[arrayTag] =
typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] =
typedArrayTags[dataViewTag] = typedArrayTags[dateTag] =
typedArrayTags[errorTag] = typedArrayTags[funcTag] =
typedArrayTags[mapTag] = typedArrayTags[numberTag] =
typedArrayTags[objectTag] = typedArrayTags[regexpTag] =
typedArrayTags[setTag] = typedArrayTags[stringTag] =
typedArrayTags[weakMapTag] = false;

/**
 * The base implementation of `_.isTypedArray` without Node.js optimizations.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
 */
function baseIsTypedArray(value) {
  return isObjectLike(value) &&
    isLength(value.length) && !!typedArrayTags[baseGetTag(value)];
}

module.exports = baseIsTypedArray;


/***/ }),

/***/ "../node_modules/lodash/_baseKeysIn.js":
/*!*********************************************!*\
  !*** ../node_modules/lodash/_baseKeysIn.js ***!
  \*********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var isObject = __webpack_require__(/*! ./isObject */ "../node_modules/lodash/isObject.js"),
    isPrototype = __webpack_require__(/*! ./_isPrototype */ "../node_modules/lodash/_isPrototype.js"),
    nativeKeysIn = __webpack_require__(/*! ./_nativeKeysIn */ "../node_modules/lodash/_nativeKeysIn.js");

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * The base implementation of `_.keysIn` which doesn't treat sparse arrays as dense.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function baseKeysIn(object) {
  if (!isObject(object)) {
    return nativeKeysIn(object);
  }
  var isProto = isPrototype(object),
      result = [];

  for (var key in object) {
    if (!(key == 'constructor' && (isProto || !hasOwnProperty.call(object, key)))) {
      result.push(key);
    }
  }
  return result;
}

module.exports = baseKeysIn;


/***/ }),

/***/ "../node_modules/lodash/_baseRest.js":
/*!*******************************************!*\
  !*** ../node_modules/lodash/_baseRest.js ***!
  \*******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var identity = __webpack_require__(/*! ./identity */ "../node_modules/lodash/identity.js"),
    overRest = __webpack_require__(/*! ./_overRest */ "../node_modules/lodash/_overRest.js"),
    setToString = __webpack_require__(/*! ./_setToString */ "../node_modules/lodash/_setToString.js");

/**
 * The base implementation of `_.rest` which doesn't validate or coerce arguments.
 *
 * @private
 * @param {Function} func The function to apply a rest parameter to.
 * @param {number} [start=func.length-1] The start position of the rest parameter.
 * @returns {Function} Returns the new function.
 */
function baseRest(func, start) {
  return setToString(overRest(func, start, identity), func + '');
}

module.exports = baseRest;


/***/ }),

/***/ "../node_modules/lodash/_baseSetToString.js":
/*!**************************************************!*\
  !*** ../node_modules/lodash/_baseSetToString.js ***!
  \**************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var constant = __webpack_require__(/*! ./constant */ "../node_modules/lodash/constant.js"),
    defineProperty = __webpack_require__(/*! ./_defineProperty */ "../node_modules/lodash/_defineProperty.js"),
    identity = __webpack_require__(/*! ./identity */ "../node_modules/lodash/identity.js");

/**
 * The base implementation of `setToString` without support for hot loop shorting.
 *
 * @private
 * @param {Function} func The function to modify.
 * @param {Function} string The `toString` result.
 * @returns {Function} Returns `func`.
 */
var baseSetToString = !defineProperty ? identity : function(func, string) {
  return defineProperty(func, 'toString', {
    'configurable': true,
    'enumerable': false,
    'value': constant(string),
    'writable': true
  });
};

module.exports = baseSetToString;


/***/ }),

/***/ "../node_modules/lodash/_baseTimes.js":
/*!********************************************!*\
  !*** ../node_modules/lodash/_baseTimes.js ***!
  \********************************************/
/***/ ((module) => {

/**
 * The base implementation of `_.times` without support for iteratee shorthands
 * or max array length checks.
 *
 * @private
 * @param {number} n The number of times to invoke `iteratee`.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the array of results.
 */
function baseTimes(n, iteratee) {
  var index = -1,
      result = Array(n);

  while (++index < n) {
    result[index] = iteratee(index);
  }
  return result;
}

module.exports = baseTimes;


/***/ }),

/***/ "../node_modules/lodash/_baseUnary.js":
/*!********************************************!*\
  !*** ../node_modules/lodash/_baseUnary.js ***!
  \********************************************/
/***/ ((module) => {

/**
 * The base implementation of `_.unary` without support for storing metadata.
 *
 * @private
 * @param {Function} func The function to cap arguments for.
 * @returns {Function} Returns the new capped function.
 */
function baseUnary(func) {
  return function(value) {
    return func(value);
  };
}

module.exports = baseUnary;


/***/ }),

/***/ "../node_modules/lodash/_coreJsData.js":
/*!*********************************************!*\
  !*** ../node_modules/lodash/_coreJsData.js ***!
  \*********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var root = __webpack_require__(/*! ./_root */ "../node_modules/lodash/_root.js");

/** Used to detect overreaching core-js shims. */
var coreJsData = root['__core-js_shared__'];

module.exports = coreJsData;


/***/ }),

/***/ "../node_modules/lodash/_defineProperty.js":
/*!*************************************************!*\
  !*** ../node_modules/lodash/_defineProperty.js ***!
  \*************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var getNative = __webpack_require__(/*! ./_getNative */ "../node_modules/lodash/_getNative.js");

var defineProperty = (function() {
  try {
    var func = getNative(Object, 'defineProperty');
    func({}, '', {});
    return func;
  } catch (e) {}
}());

module.exports = defineProperty;


/***/ }),

/***/ "../node_modules/lodash/_freeGlobal.js":
/*!*********************************************!*\
  !*** ../node_modules/lodash/_freeGlobal.js ***!
  \*********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof __webpack_require__.g == 'object' && __webpack_require__.g && __webpack_require__.g.Object === Object && __webpack_require__.g;

module.exports = freeGlobal;


/***/ }),

/***/ "../node_modules/lodash/_getNative.js":
/*!********************************************!*\
  !*** ../node_modules/lodash/_getNative.js ***!
  \********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var baseIsNative = __webpack_require__(/*! ./_baseIsNative */ "../node_modules/lodash/_baseIsNative.js"),
    getValue = __webpack_require__(/*! ./_getValue */ "../node_modules/lodash/_getValue.js");

/**
 * Gets the native function at `key` of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {string} key The key of the method to get.
 * @returns {*} Returns the function if it's native, else `undefined`.
 */
function getNative(object, key) {
  var value = getValue(object, key);
  return baseIsNative(value) ? value : undefined;
}

module.exports = getNative;


/***/ }),

/***/ "../node_modules/lodash/_getRawTag.js":
/*!********************************************!*\
  !*** ../node_modules/lodash/_getRawTag.js ***!
  \********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var Symbol = __webpack_require__(/*! ./_Symbol */ "../node_modules/lodash/_Symbol.js");

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/** Built-in value references. */
var symToStringTag = Symbol ? Symbol.toStringTag : undefined;

/**
 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the raw `toStringTag`.
 */
function getRawTag(value) {
  var isOwn = hasOwnProperty.call(value, symToStringTag),
      tag = value[symToStringTag];

  try {
    value[symToStringTag] = undefined;
    var unmasked = true;
  } catch (e) {}

  var result = nativeObjectToString.call(value);
  if (unmasked) {
    if (isOwn) {
      value[symToStringTag] = tag;
    } else {
      delete value[symToStringTag];
    }
  }
  return result;
}

module.exports = getRawTag;


/***/ }),

/***/ "../node_modules/lodash/_getValue.js":
/*!*******************************************!*\
  !*** ../node_modules/lodash/_getValue.js ***!
  \*******************************************/
/***/ ((module) => {

/**
 * Gets the value at `key` of `object`.
 *
 * @private
 * @param {Object} [object] The object to query.
 * @param {string} key The key of the property to get.
 * @returns {*} Returns the property value.
 */
function getValue(object, key) {
  return object == null ? undefined : object[key];
}

module.exports = getValue;


/***/ }),

/***/ "../node_modules/lodash/_isIndex.js":
/*!******************************************!*\
  !*** ../node_modules/lodash/_isIndex.js ***!
  \******************************************/
/***/ ((module) => {

/** Used as references for various `Number` constants. */
var MAX_SAFE_INTEGER = 9007199254740991;

/** Used to detect unsigned integer values. */
var reIsUint = /^(?:0|[1-9]\d*)$/;

/**
 * Checks if `value` is a valid array-like index.
 *
 * @private
 * @param {*} value The value to check.
 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
 */
function isIndex(value, length) {
  var type = typeof value;
  length = length == null ? MAX_SAFE_INTEGER : length;

  return !!length &&
    (type == 'number' ||
      (type != 'symbol' && reIsUint.test(value))) &&
        (value > -1 && value % 1 == 0 && value < length);
}

module.exports = isIndex;


/***/ }),

/***/ "../node_modules/lodash/_isIterateeCall.js":
/*!*************************************************!*\
  !*** ../node_modules/lodash/_isIterateeCall.js ***!
  \*************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var eq = __webpack_require__(/*! ./eq */ "../node_modules/lodash/eq.js"),
    isArrayLike = __webpack_require__(/*! ./isArrayLike */ "../node_modules/lodash/isArrayLike.js"),
    isIndex = __webpack_require__(/*! ./_isIndex */ "../node_modules/lodash/_isIndex.js"),
    isObject = __webpack_require__(/*! ./isObject */ "../node_modules/lodash/isObject.js");

/**
 * Checks if the given arguments are from an iteratee call.
 *
 * @private
 * @param {*} value The potential iteratee value argument.
 * @param {*} index The potential iteratee index or key argument.
 * @param {*} object The potential iteratee object argument.
 * @returns {boolean} Returns `true` if the arguments are from an iteratee call,
 *  else `false`.
 */
function isIterateeCall(value, index, object) {
  if (!isObject(object)) {
    return false;
  }
  var type = typeof index;
  if (type == 'number'
        ? (isArrayLike(object) && isIndex(index, object.length))
        : (type == 'string' && index in object)
      ) {
    return eq(object[index], value);
  }
  return false;
}

module.exports = isIterateeCall;


/***/ }),

/***/ "../node_modules/lodash/_isMasked.js":
/*!*******************************************!*\
  !*** ../node_modules/lodash/_isMasked.js ***!
  \*******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var coreJsData = __webpack_require__(/*! ./_coreJsData */ "../node_modules/lodash/_coreJsData.js");

/** Used to detect methods masquerading as native. */
var maskSrcKey = (function() {
  var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || '');
  return uid ? ('Symbol(src)_1.' + uid) : '';
}());

/**
 * Checks if `func` has its source masked.
 *
 * @private
 * @param {Function} func The function to check.
 * @returns {boolean} Returns `true` if `func` is masked, else `false`.
 */
function isMasked(func) {
  return !!maskSrcKey && (maskSrcKey in func);
}

module.exports = isMasked;


/***/ }),

/***/ "../node_modules/lodash/_isPrototype.js":
/*!**********************************************!*\
  !*** ../node_modules/lodash/_isPrototype.js ***!
  \**********************************************/
/***/ ((module) => {

/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Checks if `value` is likely a prototype object.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
 */
function isPrototype(value) {
  var Ctor = value && value.constructor,
      proto = (typeof Ctor == 'function' && Ctor.prototype) || objectProto;

  return value === proto;
}

module.exports = isPrototype;


/***/ }),

/***/ "../node_modules/lodash/_nativeKeysIn.js":
/*!***********************************************!*\
  !*** ../node_modules/lodash/_nativeKeysIn.js ***!
  \***********************************************/
/***/ ((module) => {

/**
 * This function is like
 * [`Object.keys`](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
 * except that it includes inherited enumerable properties.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function nativeKeysIn(object) {
  var result = [];
  if (object != null) {
    for (var key in Object(object)) {
      result.push(key);
    }
  }
  return result;
}

module.exports = nativeKeysIn;


/***/ }),

/***/ "../node_modules/lodash/_nodeUtil.js":
/*!*******************************************!*\
  !*** ../node_modules/lodash/_nodeUtil.js ***!
  \*******************************************/
/***/ ((module, exports, __webpack_require__) => {

/* module decorator */ module = __webpack_require__.nmd(module);
var freeGlobal = __webpack_require__(/*! ./_freeGlobal */ "../node_modules/lodash/_freeGlobal.js");

/** Detect free variable `exports`. */
var freeExports =  true && exports && !exports.nodeType && exports;

/** Detect free variable `module`. */
var freeModule = freeExports && "object" == 'object' && module && !module.nodeType && module;

/** Detect the popular CommonJS extension `module.exports`. */
var moduleExports = freeModule && freeModule.exports === freeExports;

/** Detect free variable `process` from Node.js. */
var freeProcess = moduleExports && freeGlobal.process;

/** Used to access faster Node.js helpers. */
var nodeUtil = (function() {
  try {
    // Use `util.types` for Node.js 10+.
    var types = freeModule && freeModule.require && freeModule.require('util').types;

    if (types) {
      return types;
    }

    // Legacy `process.binding('util')` for Node.js < 10.
    return freeProcess && freeProcess.binding && freeProcess.binding('util');
  } catch (e) {}
}());

module.exports = nodeUtil;


/***/ }),

/***/ "../node_modules/lodash/_objectToString.js":
/*!*************************************************!*\
  !*** ../node_modules/lodash/_objectToString.js ***!
  \*************************************************/
/***/ ((module) => {

/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/**
 * Converts `value` to a string using `Object.prototype.toString`.
 *
 * @private
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 */
function objectToString(value) {
  return nativeObjectToString.call(value);
}

module.exports = objectToString;


/***/ }),

/***/ "../node_modules/lodash/_overRest.js":
/*!*******************************************!*\
  !*** ../node_modules/lodash/_overRest.js ***!
  \*******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var apply = __webpack_require__(/*! ./_apply */ "../node_modules/lodash/_apply.js");

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max;

/**
 * A specialized version of `baseRest` which transforms the rest array.
 *
 * @private
 * @param {Function} func The function to apply a rest parameter to.
 * @param {number} [start=func.length-1] The start position of the rest parameter.
 * @param {Function} transform The rest array transform.
 * @returns {Function} Returns the new function.
 */
function overRest(func, start, transform) {
  start = nativeMax(start === undefined ? (func.length - 1) : start, 0);
  return function() {
    var args = arguments,
        index = -1,
        length = nativeMax(args.length - start, 0),
        array = Array(length);

    while (++index < length) {
      array[index] = args[start + index];
    }
    index = -1;
    var otherArgs = Array(start + 1);
    while (++index < start) {
      otherArgs[index] = args[index];
    }
    otherArgs[start] = transform(array);
    return apply(func, this, otherArgs);
  };
}

module.exports = overRest;


/***/ }),

/***/ "../node_modules/lodash/_root.js":
/*!***************************************!*\
  !*** ../node_modules/lodash/_root.js ***!
  \***************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var freeGlobal = __webpack_require__(/*! ./_freeGlobal */ "../node_modules/lodash/_freeGlobal.js");

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

module.exports = root;


/***/ }),

/***/ "../node_modules/lodash/_setToString.js":
/*!**********************************************!*\
  !*** ../node_modules/lodash/_setToString.js ***!
  \**********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var baseSetToString = __webpack_require__(/*! ./_baseSetToString */ "../node_modules/lodash/_baseSetToString.js"),
    shortOut = __webpack_require__(/*! ./_shortOut */ "../node_modules/lodash/_shortOut.js");

/**
 * Sets the `toString` method of `func` to return `string`.
 *
 * @private
 * @param {Function} func The function to modify.
 * @param {Function} string The `toString` result.
 * @returns {Function} Returns `func`.
 */
var setToString = shortOut(baseSetToString);

module.exports = setToString;


/***/ }),

/***/ "../node_modules/lodash/_shortOut.js":
/*!*******************************************!*\
  !*** ../node_modules/lodash/_shortOut.js ***!
  \*******************************************/
/***/ ((module) => {

/** Used to detect hot functions by number of calls within a span of milliseconds. */
var HOT_COUNT = 800,
    HOT_SPAN = 16;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeNow = Date.now;

/**
 * Creates a function that'll short out and invoke `identity` instead
 * of `func` when it's called `HOT_COUNT` or more times in `HOT_SPAN`
 * milliseconds.
 *
 * @private
 * @param {Function} func The function to restrict.
 * @returns {Function} Returns the new shortable function.
 */
function shortOut(func) {
  var count = 0,
      lastCalled = 0;

  return function() {
    var stamp = nativeNow(),
        remaining = HOT_SPAN - (stamp - lastCalled);

    lastCalled = stamp;
    if (remaining > 0) {
      if (++count >= HOT_COUNT) {
        return arguments[0];
      }
    } else {
      count = 0;
    }
    return func.apply(undefined, arguments);
  };
}

module.exports = shortOut;


/***/ }),

/***/ "../node_modules/lodash/_toSource.js":
/*!*******************************************!*\
  !*** ../node_modules/lodash/_toSource.js ***!
  \*******************************************/
/***/ ((module) => {

/** Used for built-in method references. */
var funcProto = Function.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/**
 * Converts `func` to its source code.
 *
 * @private
 * @param {Function} func The function to convert.
 * @returns {string} Returns the source code.
 */
function toSource(func) {
  if (func != null) {
    try {
      return funcToString.call(func);
    } catch (e) {}
    try {
      return (func + '');
    } catch (e) {}
  }
  return '';
}

module.exports = toSource;


/***/ }),

/***/ "../node_modules/lodash/constant.js":
/*!******************************************!*\
  !*** ../node_modules/lodash/constant.js ***!
  \******************************************/
/***/ ((module) => {

/**
 * Creates a function that returns `value`.
 *
 * @static
 * @memberOf _
 * @since 2.4.0
 * @category Util
 * @param {*} value The value to return from the new function.
 * @returns {Function} Returns the new constant function.
 * @example
 *
 * var objects = _.times(2, _.constant({ 'a': 1 }));
 *
 * console.log(objects);
 * // => [{ 'a': 1 }, { 'a': 1 }]
 *
 * console.log(objects[0] === objects[1]);
 * // => true
 */
function constant(value) {
  return function() {
    return value;
  };
}

module.exports = constant;


/***/ }),

/***/ "../node_modules/lodash/defaults.js":
/*!******************************************!*\
  !*** ../node_modules/lodash/defaults.js ***!
  \******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var baseRest = __webpack_require__(/*! ./_baseRest */ "../node_modules/lodash/_baseRest.js"),
    eq = __webpack_require__(/*! ./eq */ "../node_modules/lodash/eq.js"),
    isIterateeCall = __webpack_require__(/*! ./_isIterateeCall */ "../node_modules/lodash/_isIterateeCall.js"),
    keysIn = __webpack_require__(/*! ./keysIn */ "../node_modules/lodash/keysIn.js");

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Assigns own and inherited enumerable string keyed properties of source
 * objects to the destination object for all destination properties that
 * resolve to `undefined`. Source objects are applied from left to right.
 * Once a property is set, additional values of the same property are ignored.
 *
 * **Note:** This method mutates `object`.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Object
 * @param {Object} object The destination object.
 * @param {...Object} [sources] The source objects.
 * @returns {Object} Returns `object`.
 * @see _.defaultsDeep
 * @example
 *
 * _.defaults({ 'a': 1 }, { 'b': 2 }, { 'a': 3 });
 * // => { 'a': 1, 'b': 2 }
 */
var defaults = baseRest(function(object, sources) {
  object = Object(object);

  var index = -1;
  var length = sources.length;
  var guard = length > 2 ? sources[2] : undefined;

  if (guard && isIterateeCall(sources[0], sources[1], guard)) {
    length = 1;
  }

  while (++index < length) {
    var source = sources[index];
    var props = keysIn(source);
    var propsIndex = -1;
    var propsLength = props.length;

    while (++propsIndex < propsLength) {
      var key = props[propsIndex];
      var value = object[key];

      if (value === undefined ||
          (eq(value, objectProto[key]) && !hasOwnProperty.call(object, key))) {
        object[key] = source[key];
      }
    }
  }

  return object;
});

module.exports = defaults;


/***/ }),

/***/ "../node_modules/lodash/eq.js":
/*!************************************!*\
  !*** ../node_modules/lodash/eq.js ***!
  \************************************/
/***/ ((module) => {

/**
 * Performs a
 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * comparison between two values to determine if they are equivalent.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 * @example
 *
 * var object = { 'a': 1 };
 * var other = { 'a': 1 };
 *
 * _.eq(object, object);
 * // => true
 *
 * _.eq(object, other);
 * // => false
 *
 * _.eq('a', 'a');
 * // => true
 *
 * _.eq('a', Object('a'));
 * // => false
 *
 * _.eq(NaN, NaN);
 * // => true
 */
function eq(value, other) {
  return value === other || (value !== value && other !== other);
}

module.exports = eq;


/***/ }),

/***/ "../node_modules/lodash/identity.js":
/*!******************************************!*\
  !*** ../node_modules/lodash/identity.js ***!
  \******************************************/
/***/ ((module) => {

/**
 * This method returns the first argument it receives.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Util
 * @param {*} value Any value.
 * @returns {*} Returns `value`.
 * @example
 *
 * var object = { 'a': 1 };
 *
 * console.log(_.identity(object) === object);
 * // => true
 */
function identity(value) {
  return value;
}

module.exports = identity;


/***/ }),

/***/ "../node_modules/lodash/isArguments.js":
/*!*********************************************!*\
  !*** ../node_modules/lodash/isArguments.js ***!
  \*********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var baseIsArguments = __webpack_require__(/*! ./_baseIsArguments */ "../node_modules/lodash/_baseIsArguments.js"),
    isObjectLike = __webpack_require__(/*! ./isObjectLike */ "../node_modules/lodash/isObjectLike.js");

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/** Built-in value references. */
var propertyIsEnumerable = objectProto.propertyIsEnumerable;

/**
 * Checks if `value` is likely an `arguments` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 *  else `false`.
 * @example
 *
 * _.isArguments(function() { return arguments; }());
 * // => true
 *
 * _.isArguments([1, 2, 3]);
 * // => false
 */
var isArguments = baseIsArguments(function() { return arguments; }()) ? baseIsArguments : function(value) {
  return isObjectLike(value) && hasOwnProperty.call(value, 'callee') &&
    !propertyIsEnumerable.call(value, 'callee');
};

module.exports = isArguments;


/***/ }),

/***/ "../node_modules/lodash/isArray.js":
/*!*****************************************!*\
  !*** ../node_modules/lodash/isArray.js ***!
  \*****************************************/
/***/ ((module) => {

/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(document.body.children);
 * // => false
 *
 * _.isArray('abc');
 * // => false
 *
 * _.isArray(_.noop);
 * // => false
 */
var isArray = Array.isArray;

module.exports = isArray;


/***/ }),

/***/ "../node_modules/lodash/isArrayLike.js":
/*!*********************************************!*\
  !*** ../node_modules/lodash/isArrayLike.js ***!
  \*********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var isFunction = __webpack_require__(/*! ./isFunction */ "../node_modules/lodash/isFunction.js"),
    isLength = __webpack_require__(/*! ./isLength */ "../node_modules/lodash/isLength.js");

/**
 * Checks if `value` is array-like. A value is considered array-like if it's
 * not a function and has a `value.length` that's an integer greater than or
 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
 * @example
 *
 * _.isArrayLike([1, 2, 3]);
 * // => true
 *
 * _.isArrayLike(document.body.children);
 * // => true
 *
 * _.isArrayLike('abc');
 * // => true
 *
 * _.isArrayLike(_.noop);
 * // => false
 */
function isArrayLike(value) {
  return value != null && isLength(value.length) && !isFunction(value);
}

module.exports = isArrayLike;


/***/ }),

/***/ "../node_modules/lodash/isBuffer.js":
/*!******************************************!*\
  !*** ../node_modules/lodash/isBuffer.js ***!
  \******************************************/
/***/ ((module, exports, __webpack_require__) => {

/* module decorator */ module = __webpack_require__.nmd(module);
var root = __webpack_require__(/*! ./_root */ "../node_modules/lodash/_root.js"),
    stubFalse = __webpack_require__(/*! ./stubFalse */ "../node_modules/lodash/stubFalse.js");

/** Detect free variable `exports`. */
var freeExports =  true && exports && !exports.nodeType && exports;

/** Detect free variable `module`. */
var freeModule = freeExports && "object" == 'object' && module && !module.nodeType && module;

/** Detect the popular CommonJS extension `module.exports`. */
var moduleExports = freeModule && freeModule.exports === freeExports;

/** Built-in value references. */
var Buffer = moduleExports ? root.Buffer : undefined;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeIsBuffer = Buffer ? Buffer.isBuffer : undefined;

/**
 * Checks if `value` is a buffer.
 *
 * @static
 * @memberOf _
 * @since 4.3.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a buffer, else `false`.
 * @example
 *
 * _.isBuffer(new Buffer(2));
 * // => true
 *
 * _.isBuffer(new Uint8Array(2));
 * // => false
 */
var isBuffer = nativeIsBuffer || stubFalse;

module.exports = isBuffer;


/***/ }),

/***/ "../node_modules/lodash/isFunction.js":
/*!********************************************!*\
  !*** ../node_modules/lodash/isFunction.js ***!
  \********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var baseGetTag = __webpack_require__(/*! ./_baseGetTag */ "../node_modules/lodash/_baseGetTag.js"),
    isObject = __webpack_require__(/*! ./isObject */ "../node_modules/lodash/isObject.js");

/** `Object#toString` result references. */
var asyncTag = '[object AsyncFunction]',
    funcTag = '[object Function]',
    genTag = '[object GeneratorFunction]',
    proxyTag = '[object Proxy]';

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */
function isFunction(value) {
  if (!isObject(value)) {
    return false;
  }
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in Safari 9 which returns 'object' for typed arrays and other constructors.
  var tag = baseGetTag(value);
  return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
}

module.exports = isFunction;


/***/ }),

/***/ "../node_modules/lodash/isLength.js":
/*!******************************************!*\
  !*** ../node_modules/lodash/isLength.js ***!
  \******************************************/
/***/ ((module) => {

/** Used as references for various `Number` constants. */
var MAX_SAFE_INTEGER = 9007199254740991;

/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This method is loosely based on
 * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 * @example
 *
 * _.isLength(3);
 * // => true
 *
 * _.isLength(Number.MIN_VALUE);
 * // => false
 *
 * _.isLength(Infinity);
 * // => false
 *
 * _.isLength('3');
 * // => false
 */
function isLength(value) {
  return typeof value == 'number' &&
    value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}

module.exports = isLength;


/***/ }),

/***/ "../node_modules/lodash/isObject.js":
/*!******************************************!*\
  !*** ../node_modules/lodash/isObject.js ***!
  \******************************************/
/***/ ((module) => {

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return value != null && (type == 'object' || type == 'function');
}

module.exports = isObject;


/***/ }),

/***/ "../node_modules/lodash/isObjectLike.js":
/*!**********************************************!*\
  !*** ../node_modules/lodash/isObjectLike.js ***!
  \**********************************************/
/***/ ((module) => {

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return value != null && typeof value == 'object';
}

module.exports = isObjectLike;


/***/ }),

/***/ "../node_modules/lodash/isTypedArray.js":
/*!**********************************************!*\
  !*** ../node_modules/lodash/isTypedArray.js ***!
  \**********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var baseIsTypedArray = __webpack_require__(/*! ./_baseIsTypedArray */ "../node_modules/lodash/_baseIsTypedArray.js"),
    baseUnary = __webpack_require__(/*! ./_baseUnary */ "../node_modules/lodash/_baseUnary.js"),
    nodeUtil = __webpack_require__(/*! ./_nodeUtil */ "../node_modules/lodash/_nodeUtil.js");

/* Node.js helper references. */
var nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray;

/**
 * Checks if `value` is classified as a typed array.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
 * @example
 *
 * _.isTypedArray(new Uint8Array);
 * // => true
 *
 * _.isTypedArray([]);
 * // => false
 */
var isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;

module.exports = isTypedArray;


/***/ }),

/***/ "../node_modules/lodash/keysIn.js":
/*!****************************************!*\
  !*** ../node_modules/lodash/keysIn.js ***!
  \****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var arrayLikeKeys = __webpack_require__(/*! ./_arrayLikeKeys */ "../node_modules/lodash/_arrayLikeKeys.js"),
    baseKeysIn = __webpack_require__(/*! ./_baseKeysIn */ "../node_modules/lodash/_baseKeysIn.js"),
    isArrayLike = __webpack_require__(/*! ./isArrayLike */ "../node_modules/lodash/isArrayLike.js");

/**
 * Creates an array of the own and inherited enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keysIn(new Foo);
 * // => ['a', 'b', 'c'] (iteration order is not guaranteed)
 */
function keysIn(object) {
  return isArrayLike(object) ? arrayLikeKeys(object, true) : baseKeysIn(object);
}

module.exports = keysIn;


/***/ }),

/***/ "../node_modules/lodash/stubFalse.js":
/*!*******************************************!*\
  !*** ../node_modules/lodash/stubFalse.js ***!
  \*******************************************/
/***/ ((module) => {

/**
 * This method returns `false`.
 *
 * @static
 * @memberOf _
 * @since 4.13.0
 * @category Util
 * @returns {boolean} Returns `false`.
 * @example
 *
 * _.times(2, _.stubFalse);
 * // => [false, false]
 */
function stubFalse() {
  return false;
}

module.exports = stubFalse;


/***/ }),

/***/ "../node_modules/memory-cache/index.js":
/*!*********************************************!*\
  !*** ../node_modules/memory-cache/index.js ***!
  \*********************************************/
/***/ ((module) => {

"use strict";


function Cache () {
  var _cache = Object.create(null);
  var _hitCount = 0;
  var _missCount = 0;
  var _size = 0;
  var _debug = false;

  this.put = function(key, value, time, timeoutCallback) {
    if (_debug) {
      console.log('caching: %s = %j (@%s)', key, value, time);
    }

    if (typeof time !== 'undefined' && (typeof time !== 'number' || isNaN(time) || time <= 0)) {
      throw new Error('Cache timeout must be a positive number');
    } else if (typeof timeoutCallback !== 'undefined' && typeof timeoutCallback !== 'function') {
      throw new Error('Cache timeout callback must be a function');
    }

    var oldRecord = _cache[key];
    if (oldRecord) {
      clearTimeout(oldRecord.timeout);
    } else {
      _size++;
    }

    var record = {
      value: value,
      expire: time + Date.now()
    };

    if (!isNaN(record.expire)) {
      record.timeout = setTimeout(function() {
        _del(key);
        if (timeoutCallback) {
          timeoutCallback(key, value);
        }
      }.bind(this), time);
    }

    _cache[key] = record;

    return value;
  };

  this.del = function(key) {
    var canDelete = true;

    var oldRecord = _cache[key];
    if (oldRecord) {
      clearTimeout(oldRecord.timeout);
      if (!isNaN(oldRecord.expire) && oldRecord.expire < Date.now()) {
        canDelete = false;
      }
    } else {
      canDelete = false;
    }

    if (canDelete) {
      _del(key);
    }

    return canDelete;
  };

  function _del(key){
    _size--;
    delete _cache[key];
  }

  this.clear = function() {
    for (var key in _cache) {
      clearTimeout(_cache[key].timeout);
    }
    _size = 0;
    _cache = Object.create(null);
    if (_debug) {
      _hitCount = 0;
      _missCount = 0;
    }
  };

  this.get = function(key) {
    var data = _cache[key];
    if (typeof data != "undefined") {
      if (isNaN(data.expire) || data.expire >= Date.now()) {
        if (_debug) _hitCount++;
        return data.value;
      } else {
        // free some space
        if (_debug) _missCount++;
        _size--;
        delete _cache[key];
      }
    } else if (_debug) {
      _missCount++;
    }
    return null;
  };

  this.size = function() {
    return _size;
  };

  this.memsize = function() {
    var size = 0,
      key;
    for (key in _cache) {
      size++;
    }
    return size;
  };

  this.debug = function(bool) {
    _debug = bool;
  };

  this.hits = function() {
    return _hitCount;
  };

  this.misses = function() {
    return _missCount;
  };

  this.keys = function() {
    return Object.keys(_cache);
  };

  this.exportJson = function() {
    var plainJsCache = {};

    // Discard the `timeout` property.
    // Note: JSON doesn't support `NaN`, so convert it to `'NaN'`.
    for (var key in _cache) {
      var record = _cache[key];
      plainJsCache[key] = {
        value: record.value,
        expire: record.expire || 'NaN',
      };
    }

    return JSON.stringify(plainJsCache);
  };

  this.importJson = function(jsonToImport, options) {
    var cacheToImport = JSON.parse(jsonToImport);
    var currTime = Date.now();

    var skipDuplicates = options && options.skipDuplicates;

    for (var key in cacheToImport) {
      if (cacheToImport.hasOwnProperty(key)) {
        if (skipDuplicates) {
          var existingRecord = _cache[key];
          if (existingRecord) {
            if (_debug) {
              console.log('Skipping duplicate imported key \'%s\'', key);
            }
            continue;
          }
        }

        var record = cacheToImport[key];

        // record.expire could be `'NaN'` if no expiry was set.
        // Try to subtract from it; a string minus a number is `NaN`, which is perfectly fine here.
        var remainingTime = record.expire - currTime;

        if (remainingTime <= 0) {
          // Delete any record that might exist with the same key, since this key is expired.
          this.del(key);
          continue;
        }

        // Remaining time must now be either positive or `NaN`,
        // but `put` will throw an error if we try to give it `NaN`.
        remainingTime = remainingTime > 0 ? remainingTime : undefined;

        this.put(key, record.value, remainingTime);
      }
    }

    return this.size();
  };
}

module.exports = new Cache();
module.exports.Cache = Cache;


/***/ }),

/***/ "@grafana/data":
/*!********************************!*\
  !*** external "@grafana/data" ***!
  \********************************/
/***/ ((module) => {

"use strict";
module.exports = __WEBPACK_EXTERNAL_MODULE__grafana_data__;

/***/ }),

/***/ "@grafana/runtime":
/*!***********************************!*\
  !*** external "@grafana/runtime" ***!
  \***********************************/
/***/ ((module) => {

"use strict";
module.exports = __WEBPACK_EXTERNAL_MODULE__grafana_runtime__;

/***/ }),

/***/ "@grafana/ui":
/*!******************************!*\
  !*** external "@grafana/ui" ***!
  \******************************/
/***/ ((module) => {

"use strict";
module.exports = __WEBPACK_EXTERNAL_MODULE__grafana_ui__;

/***/ }),

/***/ "lodash":
/*!*************************!*\
  !*** external "lodash" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = __WEBPACK_EXTERNAL_MODULE_lodash__;

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/***/ ((module) => {

"use strict";
module.exports = __WEBPACK_EXTERNAL_MODULE_react__;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			loaded: false,
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/node module decorator */
/******/ 	(() => {
/******/ 		__webpack_require__.nmd = (module) => {
/******/ 			module.paths = [];
/******/ 			if (!module.children) module.children = [];
/******/ 			return module;
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!*******************!*\
  !*** ./module.ts ***!
  \*******************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "plugin": () => (/* binding */ plugin)
/* harmony export */ });
/* harmony import */ var _grafana_data__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @grafana/data */ "@grafana/data");
/* harmony import */ var _grafana_data__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_grafana_data__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _DataSource__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./DataSource */ "./DataSource.ts");
/* harmony import */ var _ConfigEditor__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ConfigEditor */ "./ConfigEditor.tsx");
/* harmony import */ var _QueryEditor__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./QueryEditor */ "./QueryEditor.tsx");
/* harmony import */ var _VariableQueryEditor__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./VariableQueryEditor */ "./VariableQueryEditor.tsx");





var plugin = new _grafana_data__WEBPACK_IMPORTED_MODULE_0__.DataSourcePlugin(_DataSource__WEBPACK_IMPORTED_MODULE_1__.DataSource).setConfigEditor(_ConfigEditor__WEBPACK_IMPORTED_MODULE_2__.ConfigEditor).setQueryEditor(_QueryEditor__WEBPACK_IMPORTED_MODULE_3__.QueryEditor).setVariableQueryEditor(_VariableQueryEditor__WEBPACK_IMPORTED_MODULE_4__.VariableQueryEditor);
})();

/******/ 	return __webpack_exports__;
/******/ })()
;
});;
//# sourceMappingURL=module.js.map