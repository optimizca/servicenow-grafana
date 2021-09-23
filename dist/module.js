define(["@grafana/data","@grafana/runtime","@grafana/ui","lodash","react"], function(__WEBPACK_EXTERNAL_MODULE__grafana_data__, __WEBPACK_EXTERNAL_MODULE__grafana_runtime__, __WEBPACK_EXTERNAL_MODULE__grafana_ui__, __WEBPACK_EXTERNAL_MODULE_lodash__, __WEBPACK_EXTERNAL_MODULE_react__) { return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./module.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "../node_modules/css-loader/dist/cjs.js?!../node_modules/postcss-loader/src/index.js?!../node_modules/sass-loader/dist/cjs.js!./QueryEditorStyles.css":
/*!*********************************************************************************************************************************************************************!*\
  !*** ../node_modules/css-loader/dist/cjs.js??ref--8-1!../node_modules/postcss-loader/src??ref--8-2!../node_modules/sass-loader/dist/cjs.js!./QueryEditorStyles.css ***!
  \*********************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/api.js */ "../node_modules/css-loader/dist/runtime/api.js");
exports = ___CSS_LOADER_API_IMPORT___(true);
// Module
exports.push([module.i, ".coloredSelect:nth-child(2) {\n  /* color: #5865F2; */\n}", "",{"version":3,"sources":["QueryEditorStyles.css"],"names":[],"mappings":"AAAA;EACE,oBAAoB;AACtB","file":"QueryEditorStyles.css","sourcesContent":[".coloredSelect:nth-child(2) {\n  /* color: #5865F2; */\n}"]}]);
// Exports
module.exports = exports;


/***/ }),

/***/ "../node_modules/css-loader/dist/runtime/api.js":
/*!******************************************************!*\
  !*** ../node_modules/css-loader/dist/runtime/api.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
// eslint-disable-next-line func-names
module.exports = function (useSourceMap) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = cssWithMappingToString(item, useSourceMap);

      if (item[2]) {
        return "@media ".concat(item[2], " {").concat(content, "}");
      }

      return content;
    }).join('');
  }; // import a list of modules into the list
  // eslint-disable-next-line func-names


  list.i = function (modules, mediaQuery, dedupe) {
    if (typeof modules === 'string') {
      // eslint-disable-next-line no-param-reassign
      modules = [[null, modules, '']];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var i = 0; i < this.length; i++) {
        // eslint-disable-next-line prefer-destructuring
        var id = this[i][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _i = 0; _i < modules.length; _i++) {
      var item = [].concat(modules[_i]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        // eslint-disable-next-line no-continue
        continue;
      }

      if (mediaQuery) {
        if (!item[2]) {
          item[2] = mediaQuery;
        } else {
          item[2] = "".concat(mediaQuery, " and ").concat(item[2]);
        }
      }

      list.push(item);
    }
  };

  return list;
};

function cssWithMappingToString(item, useSourceMap) {
  var content = item[1] || ''; // eslint-disable-next-line prefer-destructuring

  var cssMapping = item[3];

  if (!cssMapping) {
    return content;
  }

  if (useSourceMap && typeof btoa === 'function') {
    var sourceMapping = toComment(cssMapping);
    var sourceURLs = cssMapping.sources.map(function (source) {
      return "/*# sourceURL=".concat(cssMapping.sourceRoot || '').concat(source, " */");
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
  }

  return [content].join('\n');
} // Adapted from convert-source-map (MIT)


function toComment(sourceMap) {
  // eslint-disable-next-line no-undef
  var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
  var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
  return "/*# ".concat(data, " */");
}

/***/ }),

/***/ "../node_modules/lodash/_Symbol.js":
/*!*****************************************!*\
  !*** ../node_modules/lodash/_Symbol.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var root = __webpack_require__(/*! ./_root */ "../node_modules/lodash/_root.js");

/** Built-in value references. */
var Symbol = root.Symbol;

module.exports = Symbol;


/***/ }),

/***/ "../node_modules/lodash/_apply.js":
/*!****************************************!*\
  !*** ../node_modules/lodash/_apply.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

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
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

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
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

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
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

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
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

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
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

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
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

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
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

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
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

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
/*! no static exports found */
/***/ (function(module, exports) {

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
/*! no static exports found */
/***/ (function(module, exports) {

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
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var root = __webpack_require__(/*! ./_root */ "../node_modules/lodash/_root.js");

/** Used to detect overreaching core-js shims. */
var coreJsData = root['__core-js_shared__'];

module.exports = coreJsData;


/***/ }),

/***/ "../node_modules/lodash/_defineProperty.js":
/*!*************************************************!*\
  !*** ../node_modules/lodash/_defineProperty.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

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
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

module.exports = freeGlobal;

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../webpack/buildin/global.js */ "../node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "../node_modules/lodash/_getNative.js":
/*!********************************************!*\
  !*** ../node_modules/lodash/_getNative.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

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
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

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
/*! no static exports found */
/***/ (function(module, exports) {

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
/*! no static exports found */
/***/ (function(module, exports) {

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
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

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
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

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
/*! no static exports found */
/***/ (function(module, exports) {

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
/*! no static exports found */
/***/ (function(module, exports) {

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
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {var freeGlobal = __webpack_require__(/*! ./_freeGlobal */ "../node_modules/lodash/_freeGlobal.js");

/** Detect free variable `exports`. */
var freeExports =  true && exports && !exports.nodeType && exports;

/** Detect free variable `module`. */
var freeModule = freeExports && typeof module == 'object' && module && !module.nodeType && module;

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

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../webpack/buildin/module.js */ "../node_modules/webpack/buildin/module.js")(module)))

/***/ }),

/***/ "../node_modules/lodash/_objectToString.js":
/*!*************************************************!*\
  !*** ../node_modules/lodash/_objectToString.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

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
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

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
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

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
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

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
/*! no static exports found */
/***/ (function(module, exports) {

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
/*! no static exports found */
/***/ (function(module, exports) {

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
/*! no static exports found */
/***/ (function(module, exports) {

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
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

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
/*! no static exports found */
/***/ (function(module, exports) {

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
/*! no static exports found */
/***/ (function(module, exports) {

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
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

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
/*! no static exports found */
/***/ (function(module, exports) {

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
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

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
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {var root = __webpack_require__(/*! ./_root */ "../node_modules/lodash/_root.js"),
    stubFalse = __webpack_require__(/*! ./stubFalse */ "../node_modules/lodash/stubFalse.js");

/** Detect free variable `exports`. */
var freeExports =  true && exports && !exports.nodeType && exports;

/** Detect free variable `module`. */
var freeModule = freeExports && typeof module == 'object' && module && !module.nodeType && module;

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

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../webpack/buildin/module.js */ "../node_modules/webpack/buildin/module.js")(module)))

/***/ }),

/***/ "../node_modules/lodash/isFunction.js":
/*!********************************************!*\
  !*** ../node_modules/lodash/isFunction.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

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
/*! no static exports found */
/***/ (function(module, exports) {

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
/*! no static exports found */
/***/ (function(module, exports) {

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
/*! no static exports found */
/***/ (function(module, exports) {

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
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

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
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

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
/*! no static exports found */
/***/ (function(module, exports) {

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
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

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

/***/ "../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!*****************************************************************************!*\
  !*** ../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isOldIE = function isOldIE() {
  var memo;
  return function memorize() {
    if (typeof memo === 'undefined') {
      // Test for IE <= 9 as proposed by Browserhacks
      // @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
      // Tests for existence of standard globals is to allow style-loader
      // to operate correctly into non-standard environments
      // @see https://github.com/webpack-contrib/style-loader/issues/177
      memo = Boolean(window && document && document.all && !window.atob);
    }

    return memo;
  };
}();

var getTarget = function getTarget() {
  var memo = {};
  return function memorize(target) {
    if (typeof memo[target] === 'undefined') {
      var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

      if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
        try {
          // This will throw an exception if access to iframe is blocked
          // due to cross-origin restrictions
          styleTarget = styleTarget.contentDocument.head;
        } catch (e) {
          // istanbul ignore next
          styleTarget = null;
        }
      }

      memo[target] = styleTarget;
    }

    return memo[target];
  };
}();

var stylesInDom = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDom.length; i++) {
    if (stylesInDom[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var index = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3]
    };

    if (index !== -1) {
      stylesInDom[index].references++;
      stylesInDom[index].updater(obj);
    } else {
      stylesInDom.push({
        identifier: identifier,
        updater: addStyle(obj, options),
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function insertStyleElement(options) {
  var style = document.createElement('style');
  var attributes = options.attributes || {};

  if (typeof attributes.nonce === 'undefined') {
    var nonce =  true ? __webpack_require__.nc : undefined;

    if (nonce) {
      attributes.nonce = nonce;
    }
  }

  Object.keys(attributes).forEach(function (key) {
    style.setAttribute(key, attributes[key]);
  });

  if (typeof options.insert === 'function') {
    options.insert(style);
  } else {
    var target = getTarget(options.insert || 'head');

    if (!target) {
      throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
    }

    target.appendChild(style);
  }

  return style;
}

function removeStyleElement(style) {
  // istanbul ignore if
  if (style.parentNode === null) {
    return false;
  }

  style.parentNode.removeChild(style);
}
/* istanbul ignore next  */


var replaceText = function replaceText() {
  var textStore = [];
  return function replace(index, replacement) {
    textStore[index] = replacement;
    return textStore.filter(Boolean).join('\n');
  };
}();

function applyToSingletonTag(style, index, remove, obj) {
  var css = remove ? '' : obj.media ? "@media ".concat(obj.media, " {").concat(obj.css, "}") : obj.css; // For old IE

  /* istanbul ignore if  */

  if (style.styleSheet) {
    style.styleSheet.cssText = replaceText(index, css);
  } else {
    var cssNode = document.createTextNode(css);
    var childNodes = style.childNodes;

    if (childNodes[index]) {
      style.removeChild(childNodes[index]);
    }

    if (childNodes.length) {
      style.insertBefore(cssNode, childNodes[index]);
    } else {
      style.appendChild(cssNode);
    }
  }
}

function applyToTag(style, options, obj) {
  var css = obj.css;
  var media = obj.media;
  var sourceMap = obj.sourceMap;

  if (media) {
    style.setAttribute('media', media);
  } else {
    style.removeAttribute('media');
  }

  if (sourceMap && btoa) {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    while (style.firstChild) {
      style.removeChild(style.firstChild);
    }

    style.appendChild(document.createTextNode(css));
  }
}

var singleton = null;
var singletonCounter = 0;

function addStyle(obj, options) {
  var style;
  var update;
  var remove;

  if (options.singleton) {
    var styleIndex = singletonCounter++;
    style = singleton || (singleton = insertStyleElement(options));
    update = applyToSingletonTag.bind(null, style, styleIndex, false);
    remove = applyToSingletonTag.bind(null, style, styleIndex, true);
  } else {
    style = insertStyleElement(options);
    update = applyToTag.bind(null, style, options);

    remove = function remove() {
      removeStyleElement(style);
    };
  }

  update(obj);
  return function updateStyle(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap) {
        return;
      }

      update(obj = newObj);
    } else {
      remove();
    }
  };
}

module.exports = function (list, options) {
  options = options || {}; // Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
  // tags it will allow on a page

  if (!options.singleton && typeof options.singleton !== 'boolean') {
    options.singleton = isOldIE();
  }

  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    if (Object.prototype.toString.call(newList) !== '[object Array]') {
      return;
    }

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDom[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDom[_index].references === 0) {
        stylesInDom[_index].updater();

        stylesInDom.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ "../node_modules/tslib/tslib.es6.js":
/*!******************************************!*\
  !*** ../node_modules/tslib/tslib.es6.js ***!
  \******************************************/
/*! exports provided: __extends, __assign, __rest, __decorate, __param, __metadata, __awaiter, __generator, __createBinding, __exportStar, __values, __read, __spread, __spreadArrays, __spreadArray, __await, __asyncGenerator, __asyncDelegator, __asyncValues, __makeTemplateObject, __importStar, __importDefault, __classPrivateFieldGet, __classPrivateFieldSet */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__extends", function() { return __extends; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__assign", function() { return __assign; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__rest", function() { return __rest; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__decorate", function() { return __decorate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__param", function() { return __param; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__metadata", function() { return __metadata; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__awaiter", function() { return __awaiter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__generator", function() { return __generator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__createBinding", function() { return __createBinding; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__exportStar", function() { return __exportStar; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__values", function() { return __values; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__read", function() { return __read; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__spread", function() { return __spread; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__spreadArrays", function() { return __spreadArrays; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__spreadArray", function() { return __spreadArray; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__await", function() { return __await; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__asyncGenerator", function() { return __asyncGenerator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__asyncDelegator", function() { return __asyncDelegator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__asyncValues", function() { return __asyncValues; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__makeTemplateObject", function() { return __makeTemplateObject; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__importStar", function() { return __importStar; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__importDefault", function() { return __importDefault; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__classPrivateFieldGet", function() { return __classPrivateFieldGet; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__classPrivateFieldSet", function() { return __classPrivateFieldSet; });
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    if (typeof b !== "function" && b !== null)
        throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    }
    return __assign.apply(this, arguments);
}

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
}

function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

function __param(paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
}

function __metadata(metadataKey, metadataValue) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
}

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

var __createBinding = Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
});

function __exportStar(m, o) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(o, p)) __createBinding(o, m, p);
}

function __values(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
}

function __read(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
}

/** @deprecated */
function __spread() {
    for (var ar = [], i = 0; i < arguments.length; i++)
        ar = ar.concat(__read(arguments[i]));
    return ar;
}

/** @deprecated */
function __spreadArrays() {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
}

function __spreadArray(to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || from);
}

function __await(v) {
    return this instanceof __await ? (this.v = v, this) : new __await(v);
}

function __asyncGenerator(thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
    function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
    function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
    function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
    function fulfill(value) { resume("next", value); }
    function reject(value) { resume("throw", value); }
    function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
}

function __asyncDelegator(o) {
    var i, p;
    return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
    function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
}

function __asyncValues(o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
}

function __makeTemplateObject(cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};

var __setModuleDefault = Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
};

function __importStar(mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
}

function __importDefault(mod) {
    return (mod && mod.__esModule) ? mod : { default: mod };
}

function __classPrivateFieldGet(receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
}

function __classPrivateFieldSet(receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
}


/***/ }),

/***/ "../node_modules/webpack/buildin/global.js":
/*!*************************************************!*\
  !*** ../node_modules/webpack/buildin/global.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ "../node_modules/webpack/buildin/module.js":
/*!*************************************************!*\
  !*** ../node_modules/webpack/buildin/module.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function(module) {
	if (!module.webpackPolyfill) {
		module.deprecate = function() {};
		module.paths = [];
		// module.parent = undefined by default
		if (!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ }),

/***/ "./APIClient.ts":
/*!**********************!*\
  !*** ./APIClient.ts ***!
  \**********************/
/*! exports provided: APIClient */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "APIClient", function() { return APIClient; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../node_modules/tslib/tslib.es6.js");
/* harmony import */ var _grafana_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @grafana/runtime */ "@grafana/runtime");
/* harmony import */ var _grafana_runtime__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_grafana_runtime__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _grafana_data__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @grafana/data */ "@grafana/data");
/* harmony import */ var _grafana_data__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_grafana_data__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var memory_cache__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! memory-cache */ "../node_modules/memory-cache/index.js");
/* harmony import */ var memory_cache__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(memory_cache__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! lodash */ "lodash");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _Utils__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Utils */ "./Utils.ts");





var _lodash = __webpack_require__(/*! lodash */ "lodash");



var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
}



var APIClient = function () {
  function APIClient(headers, withCredentials, url) {
    this.requestOptions = {
      headers: headers,
      withCredentials: withCredentials,
      url: url
    };
    this.cache = new memory_cache__WEBPACK_IMPORTED_MODULE_3___default.a.Cache();
  }

  APIClient.prototype.cachedGet = function (cacheDurationSeconds, method, path, params, headers, body, options) {
    return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function () {
      var cacheKey, cacheKeyNoTime, cachedItem, cacheKeys, result;

      var _this = this;

      return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"])(this, function (_a) {
        if (!cacheDurationSeconds) {
          return [2
          /*return*/
          , Object(_grafana_runtime__WEBPACK_IMPORTED_MODULE_1__["getBackendSrv"])().datasourceRequest(options)]; //return await this.get(method, path, params, headers, body);
        }

        cacheKey = this.requestOptions.url + path;
        cacheKey += '/body/' + body;
        cacheKeyNoTime = cacheKey;

        if (params && Object.keys(params).length > 0) {
          cacheKey = cacheKey + (cacheKey.search(/\?/) >= 0 ? '&' : '?') + params.map(function (_a) {
            var _b = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__read"])(_a, 2),
                k = _b[0],
                v = _b[1];

            return encodeURIComponent(k) + "=" + encodeURIComponent(v);
          }).join('&');
        }

        if (this.lastCacheDuration !== cacheDurationSeconds) {
          this.cache.del(cacheKey);
        }

        this.lastCacheDuration = cacheDurationSeconds;
        cachedItem = this.cache.get(cacheKey);

        if (!cachedItem) {
          cacheKeys = this.cache.keys();
          cacheKeys.map(function (key) {
            if (key.includes(cacheKeyNoTime)) {
              var cacheTimeParams = key.substring(key.indexOf('?') + 1, key.length);
              cacheTimeParams = cacheTimeParams.split('&');
              var cacheStartTime = cacheTimeParams[0].substring(cacheTimeParams[0].indexOf('=') + 1, cacheTimeParams[0].length);
              var cacheEndTime = cacheTimeParams[1].substring(cacheTimeParams[1].indexOf('=') + 1, cacheTimeParams[1].length);
              var timeParams = cacheKey.substring(cacheKey.indexOf('?') + 1, cacheKey.length);
              timeParams = timeParams.split('&');
              var startTime = timeParams[0].substring(timeParams[0].indexOf('=') + 1, timeParams[0].length);
              var endTime = timeParams[1].substring(timeParams[1].indexOf('=') + 1, timeParams[1].length);

              if (cacheStartTime - startTime <= 60000 && cacheEndTime - endTime <= 60000) {
                console.log('cache item found in timerange');
                cachedItem = _this.cache.get(key);
              }
            }
          });
        }

        if (cachedItem) {
          return [2
          /*return*/
          , Promise.resolve(cachedItem)];
        }

        result = Object(_grafana_runtime__WEBPACK_IMPORTED_MODULE_1__["getBackendSrv"])().datasourceRequest(options); //const result = await this.get(method, path, params, headers, body);

        this.cache.put(cacheKey, result, cacheDurationSeconds * 1000);
        return [2
        /*return*/
        , result];
      });
    });
  };

  APIClient.prototype.request = function (options) {
    options.withCredentials = this.requestOptions.withCredentials;
    options.headers = this.requestOptions.headers;
    var apiPath = options.url;
    options.url = this.requestOptions.url + apiPath;
    var paramStartIndex = apiPath.indexOf('?');
    if (paramStartIndex === -1) paramStartIndex = apiPath.length;
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

    return this.cachedGet(60, options.method, path, paramsObject, options.headers, options.data, options); //return getBackendSrv().datasourceRequest(options);
  };

  APIClient.prototype.mapChecksToValue = function (result) {
    return _lodash2["default"].map(result.data, function (d, i) {
      if (typeof d.name !== 'undefined' && typeof d.id !== 'undefined') {
        return {
          text: d.name,
          value: d.id
        };
      } else {
        var keys = Object.keys(d);
        return {
          label: d[keys[0]],
          value: keys[1] ? d[keys[1]] : d[keys[0]]
        };
      }
    });
  };

  APIClient.prototype.mapChecksToValuePlusSuffix = function (result) {
    return _lodash2["default"].map(result.data, function (d, i) {
      var keys = Object.keys(d);
      return {
        label: d[keys[0]],
        value: keys[1] ? d[keys[1]] : d[keys[0]],
        suffix: d[keys[2]]
      };
    });
  };

  APIClient.prototype.mapValueSuffixToColumns = function (result) {
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
    finalResult = lodash__WEBPACK_IMPORTED_MODULE_4___default.a.orderBy(finalResult, ['label'], ['asc']);
    return finalResult;
  };

  APIClient.prototype.mapValueAsSuffix = function (result) {
    var options = _lodash2["default"].map(result, function (d) {
      var option = {
        label: d.label,
        value: d.value,
        description: d.value
      };

      if (typeof d.options !== 'undefined') {
        option.options = _lodash2["default"].map(d.options, function (n) {
          return {
            label: n.label,
            value: n.value,
            description: n.value
          };
        });
        option.options = lodash__WEBPACK_IMPORTED_MODULE_4___default.a.orderBy(option.options, ['label'], ['asc']);
      }

      return option;
    });

    options = lodash__WEBPACK_IMPORTED_MODULE_4___default.a.orderBy(options, ['label'], ['asc']);
    return options;
  };

  APIClient.prototype.mapSuffixToLabel = function (result) {
    return _lodash2["default"].map(result, function (d) {
      return {
        label: d.label + ' (' + d.suffix + ')',
        value: d.value
      };
    });
  };

  APIClient.prototype.appendInstanceNameToResponse = function (response, instanceName) {
    response.data = _lodash2["default"].map(response.data, function (d, i) {
      d.instanceName = instanceName;
      return d;
    });
    return response;
  }; // mapTagsToValue(result) {
  //   let tagsList: any[] = [];
  //   for (var d = 0; d < result.data.length; d++) {
  //     for (var v = 0; v < result.data[d].values.length; v++) {
  //       let tagValue = result.data[d].key.name + ' - ' + result.data[d].values[v].value;
  //       let tagId = result.data[d].values[v].id;
  //       tagsList.push({ text: tagValue, value: tagId });
  //     }
  //   }
  //   return tagsList;
  // }


  APIClient.prototype.mapToTextValue = function (result) {
    return _lodash2["default"].map(result.data, function (d, i) {
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
  };

  APIClient.prototype.mapOutageResponseToFrame = function (result, target) {
    return result.data.map(function (data) {
      var ciName = data.ci;
      console.log(ciName);
      return _Utils__WEBPACK_IMPORTED_MODULE_5__["parseResponse"](data.datapoints, ciName, target, [], _grafana_data__WEBPACK_IMPORTED_MODULE_2__["FieldType"].string);
    });
  };

  APIClient.prototype.mapTrendResponseToFrame = function (result, target) {
    return result.data.map(function (data) {
      return _Utils__WEBPACK_IMPORTED_MODULE_5__["parseResponse"](data.datapoints, '', target, [], _grafana_data__WEBPACK_IMPORTED_MODULE_2__["FieldType"].number);
    });
  };

  APIClient.prototype.mapMetricsResponseToFrame = function (result, target) {
    return result.data.map(function (data) {
      var seriesName = data.source + ':' + data.metricName;

      if (data.type.length > 0) {
        seriesName += ':' + data.type;
      }

      return _Utils__WEBPACK_IMPORTED_MODULE_5__["parseResponse"](data.datapoints, seriesName, target, [], _grafana_data__WEBPACK_IMPORTED_MODULE_2__["FieldType"].number);
    });
  };

  APIClient.prototype.mapAnamMetricsResponseToFrame = function (result, target, options) {
    return result.data.map(function (data) {
      var sourceTarget = _Utils__WEBPACK_IMPORTED_MODULE_5__["replaceTargetUsingTemplVars"](target.source, options.scopedVars);
      var resourceNameTarget = _Utils__WEBPACK_IMPORTED_MODULE_5__["replaceTargetUsingTemplVars"](target.metricType, options.scopedVars);
      var metricNameTarget = _Utils__WEBPACK_IMPORTED_MODULE_5__["replaceTargetUsingTemplVars"](target.metricName, options.scopedVars);
      var seriesName = sourceTarget + ':' + metricNameTarget + ':' + resourceNameTarget + ':' + data.type;

      if (data.type === 'UPPER' || data.type === 'LOWER') {
        seriesName = data.type;
      }

      return _Utils__WEBPACK_IMPORTED_MODULE_5__["parseAnomResponse"](data.data, seriesName, target, [], _grafana_data__WEBPACK_IMPORTED_MODULE_2__["FieldType"].number);
    });
  };

  APIClient.prototype.mapTextResponseToFrame = function (result) {
    var frame = new _grafana_data__WEBPACK_IMPORTED_MODULE_2__["MutableDataFrame"]({
      fields: []
    });

    if (_Utils__WEBPACK_IMPORTED_MODULE_5__["debugLevel"]() === 1) {
      _Utils__WEBPACK_IMPORTED_MODULE_5__["printDebug"]('You are Inside mapTextResponseToFrame');
    }

    console.log(result);

    if (!(result.data.length > 0)) {
      return [];
    }

    var filedNames = Object.keys(result.data[0]);

    for (var i = 0; i < filedNames.length; i++) {
      var values = result.data.map(function (d) {
        return d[filedNames[i]];
      });

      if (filedNames[i] === 'new' || filedNames[i] === 'value:display') {
        values = this.sanitizeValues(values);
      }

      var fieldType = _grafana_data__WEBPACK_IMPORTED_MODULE_2__["FieldType"].string;

      if (values.length >= 0) {
        fieldType = _Utils__WEBPACK_IMPORTED_MODULE_5__["getFiledType"](values[0], filedNames[i]);
      }

      frame.addField({
        name: filedNames[i],
        type: fieldType,
        values: values
      });
    }

    if (_Utils__WEBPACK_IMPORTED_MODULE_5__["debugLevel"]() === 1) {
      _Utils__WEBPACK_IMPORTED_MODULE_5__["printDebug"](frame);
    }

    return frame;
  };

  APIClient.prototype.sanitizeValues = function (values) {
    var sanitizedArray = [];
    values.map(function (value) {
      while (value.indexOf('[code]') !== -1) {
        var strBeforeCode = value.substring(0, value.indexOf('[code]'));
        var strAfterCode = value.substring(value.indexOf('[/code]') + 7, value.length);

        if (value.indexOf('<a') !== -1) {
          var aElement = value.substring(value.indexOf('<a'), value.indexOf('</a>', value.indexOf('<a')));
          var aValue = aElement.substring(aElement.indexOf('>') + 1, aElement.length);
          if (aValue.indexOf('<') !== -1) aValue = aValue.substring(0, aValue.indexOf('<'));
          value = strBeforeCode + aValue + strAfterCode;
        } else {
          value = strBeforeCode + strAfterCode;
        }
      }

      sanitizedArray.push(value);
    });
    return sanitizedArray;
  };

  return APIClient;
}();



/***/ }),

/***/ "./Components.tsx":
/*!************************!*\
  !*** ./Components.tsx ***!
  \************************/
/*! exports provided: SelectService, SelectCI, SelectResource, SelectMetric, SelectMetricAnomaly, InputSysparam, SelectAlertType, SelectAlertState, SelectChangeType, SelectStartingPoint, InputParentDepth, InputChildDepth, InputNamespace, InputExcludedClasses, SelectAdminCategory, InputMetric, SelectAgentFilter, InputOsquery, InputTableName, SelectTableName, SelectTableColumn, InputGroupBy, SelectAggregate, SelectSysparam, SelectSortBy, InputLimit, InputElasticSearch, SelectTrend, ShowPercentSwitch, InputPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SelectService", function() { return SelectService; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SelectCI", function() { return SelectCI; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SelectResource", function() { return SelectResource; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SelectMetric", function() { return SelectMetric; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SelectMetricAnomaly", function() { return SelectMetricAnomaly; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InputSysparam", function() { return InputSysparam; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SelectAlertType", function() { return SelectAlertType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SelectAlertState", function() { return SelectAlertState; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SelectChangeType", function() { return SelectChangeType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SelectStartingPoint", function() { return SelectStartingPoint; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InputParentDepth", function() { return InputParentDepth; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InputChildDepth", function() { return InputChildDepth; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InputNamespace", function() { return InputNamespace; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InputExcludedClasses", function() { return InputExcludedClasses; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SelectAdminCategory", function() { return SelectAdminCategory; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InputMetric", function() { return InputMetric; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SelectAgentFilter", function() { return SelectAgentFilter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InputOsquery", function() { return InputOsquery; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InputTableName", function() { return InputTableName; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SelectTableName", function() { return SelectTableName; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SelectTableColumn", function() { return SelectTableColumn; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InputGroupBy", function() { return InputGroupBy; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SelectAggregate", function() { return SelectAggregate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SelectSysparam", function() { return SelectSysparam; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SelectSortBy", function() { return SelectSortBy; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InputLimit", function() { return InputLimit; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InputElasticSearch", function() { return InputElasticSearch; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SelectTrend", function() { return SelectTrend; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ShowPercentSwitch", function() { return ShowPercentSwitch; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InputPage", function() { return InputPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../node_modules/tslib/tslib.es6.js");
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @grafana/ui */ "@grafana/ui");
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);



var SelectService = function SelectService(_a) {
  var loadOptions = _a.loadOptions,
      value = _a.value,
      updateQuery = _a.updateQuery;
  return react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_2___default.a.Fragment, null, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["InlineFieldRow"], null, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["InlineField"], {
    label: "Service",
    labelWidth: 20
  }, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["AsyncSelect"], {
    width: 20,
    loadOptions: loadOptions,
    defaultOptions: true,
    value: value,
    defaultValue: value,
    isSearchable: true,
    isClearable: true,
    backspaceRemovesValue: true,
    allowCustomValue: true,
    onCreateOption: function onCreateOption(v) {
      return updateQuery('selectedServiceList', {
        label: v,
        value: v
      });
    },
    onChange: function onChange(v) {
      return updateQuery('selectedServiceList', v);
    },
    menuPlacement: "bottom"
  }))));
};
var SelectCI = function SelectCI(_a) {
  var loadOptions = _a.loadOptions,
      value = _a.value,
      updateQuery = _a.updateQuery;
  return react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_2___default.a.Fragment, null, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["InlineFieldRow"], null, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["InlineField"], {
    label: "CI",
    labelWidth: 20
  }, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["AsyncSelect"], {
    width: 20,
    loadOptions: loadOptions,
    value: value,
    defaultValue: value,
    isMulti: true,
    isSearchable: true,
    isClearable: true,
    backspaceRemovesValue: true,
    allowCustomValue: true,
    onCreateOption: function onCreateOption(v) {
      var newQuery = [];

      if (typeof value !== 'undefined') {
        newQuery = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__spreadArray"])([], Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__read"])(value));
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
    },
    onChange: function onChange(v) {
      return updateQuery('selectedSourceList', v);
    },
    menuPlacement: "bottom"
  }))));
};
var SelectResource = function SelectResource(_a) {
  var loadOptions = _a.loadOptions,
      value = _a.value,
      updateQuery = _a.updateQuery;
  return react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_2___default.a.Fragment, null, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["InlineFieldRow"], null, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["InlineField"], {
    label: "Resource ID",
    labelWidth: 20
  }, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["AsyncSelect"], {
    width: 20,
    loadOptions: loadOptions,
    value: value,
    defaultValue: value,
    isSearchable: true,
    isClearable: true,
    isMulti: true,
    backspaceRemovesValue: true,
    allowCustomValue: true,
    onCreateOption: function onCreateOption(v) {
      var newQuery = [];

      if (typeof value !== 'undefined') {
        newQuery = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__spreadArray"])([], Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__read"])(value));
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
    },
    onChange: function onChange(v) {
      return updateQuery('selectedMetricTypeList', v);
    }
  }))));
};
var SelectMetric = function SelectMetric(_a) {
  var loadOptions = _a.loadOptions,
      value = _a.value,
      updateQuery = _a.updateQuery;
  return react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_2___default.a.Fragment, null, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["InlineFieldRow"], null, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["InlineField"], {
    label: "Metric Name",
    labelWidth: 20
  }, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["AsyncSelect"], {
    width: 20,
    loadOptions: loadOptions,
    value: value,
    defaultValue: value,
    isSearchable: true,
    isClearable: true,
    isMulti: true,
    backspaceRemovesValue: true,
    allowCustomValue: true,
    onCreateOption: function onCreateOption(v) {
      var newQuery = [];

      if (typeof value !== 'undefined') {
        newQuery = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__spreadArray"])([], Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__read"])(value));
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
    },
    onChange: function onChange(v) {
      return updateQuery('selectedMetricNameList', v);
    },
    className: "coloredSelect"
  }))));
};
var SelectMetricAnomaly = function SelectMetricAnomaly(_a) {
  var options = _a.options,
      value = _a.value,
      updateQuery = _a.updateQuery;
  return react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_2___default.a.Fragment, null, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["InlineFieldRow"], null, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["InlineField"], {
    label: "Anomaly",
    labelWidth: 20
  }, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["Select"], {
    width: 20,
    options: options,
    value: value,
    defaultValue: value,
    isClearable: true,
    onChange: function onChange(v) {
      return updateQuery('selectedMetricAnomalyList', v);
    }
  }))));
};
var InputSysparam = function InputSysparam(_a) {
  var updateQuery = _a.updateQuery,
      defaultValue = _a.defaultValue;
  return react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_2___default.a.Fragment, null, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["InlineFieldRow"], null, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["InlineField"], {
    label: "Sysparam Query",
    labelWidth: 20
  }, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["Input"], {
    name: "sysparam_query",
    css: null,
    width: 20,
    defaultValue: defaultValue,
    onBlur: function onBlur(e) {
      return updateQuery('sysparam_query', e.target.value);
    }
  }))));
};
var SelectAlertType = function SelectAlertType(_a) {
  var options = _a.options,
      value = _a.value,
      updateQuery = _a.updateQuery;
  return react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_2___default.a.Fragment, null, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["InlineFieldRow"], null, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["InlineField"], {
    label: "Alert Type Filter",
    labelWidth: 20
  }, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["Select"], {
    width: 20,
    options: options,
    value: value,
    defaultValue: value,
    isSearchable: true,
    isClearable: true,
    onChange: function onChange(v) {
      return updateQuery('selectedAlertTypeList', v);
    }
  }))));
};
var SelectAlertState = function SelectAlertState(_a) {
  var options = _a.options,
      value = _a.value,
      updateQuery = _a.updateQuery;
  return react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_2___default.a.Fragment, null, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["InlineFieldRow"], null, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["InlineField"], {
    label: "Alert State Filter",
    labelWidth: 20
  }, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["Select"], {
    width: 20,
    options: options,
    value: value,
    defaultValue: value,
    isSearchable: true,
    isClearable: true,
    onChange: function onChange(v) {
      return updateQuery('selectedAlertStateList', v);
    }
  }))));
};
var SelectChangeType = function SelectChangeType(_a) {
  var options = _a.options,
      value = _a.value,
      updateQuery = _a.updateQuery;
  return react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_2___default.a.Fragment, null, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["InlineFieldRow"], null, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["InlineField"], {
    label: "Change Type Filter",
    labelWidth: 20
  }, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["Select"], {
    width: 20,
    options: options,
    value: value,
    defaultValue: value,
    isSearchable: true,
    isClearable: true,
    onChange: function onChange(v) {
      return updateQuery('selectedChangeTypeList', v);
    }
  }))));
};
var SelectStartingPoint = function SelectStartingPoint(_a) {
  var loadOptions = _a.loadOptions,
      value = _a.value,
      updateQuery = _a.updateQuery;
  return react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_2___default.a.Fragment, null, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["InlineFieldRow"], null, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["InlineField"], {
    label: "Starting Point",
    labelWidth: 20
  }, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["AsyncSelect"], {
    width: 20,
    loadOptions: loadOptions,
    defaultOptions: true,
    value: value,
    defaultValue: value,
    isSearchable: true,
    isClearable: true,
    backspaceRemovesValue: true,
    allowCustomValue: true,
    onCreateOption: function onCreateOption(v) {
      return updateQuery('selectedServiceList', {
        label: v,
        value: v
      });
    },
    onChange: function onChange(v) {
      return updateQuery('selectedServiceList', v);
    },
    menuPlacement: "bottom"
  }))));
};
var InputParentDepth = function InputParentDepth(_a) {
  var updateQuery = _a.updateQuery,
      defaultValue = _a.defaultValue;
  return react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_2___default.a.Fragment, null, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["InlineFieldRow"], null, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["InlineField"], {
    label: "Parent Depth",
    labelWidth: 20
  }, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["Input"], {
    name: "parent_depth",
    css: null,
    width: 20,
    defaultValue: defaultValue,
    onBlur: function onBlur(e) {
      return updateQuery('topology_parent_depth', e.target.value);
    }
  }))));
};
var InputChildDepth = function InputChildDepth(_a) {
  var updateQuery = _a.updateQuery,
      defaultValue = _a.defaultValue;
  return react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_2___default.a.Fragment, null, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["InlineFieldRow"], null, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["InlineField"], {
    label: "Child Depth",
    labelWidth: 20
  }, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["Input"], {
    name: "child_depth",
    css: null,
    width: 20,
    defaultValue: defaultValue,
    onBlur: function onBlur(e) {
      return updateQuery('topology_child_depth', e.target.value);
    }
  }))));
};
var InputNamespace = function InputNamespace(_a) {
  var updateQuery = _a.updateQuery,
      defaultValue = _a.defaultValue;
  return react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_2___default.a.Fragment, null, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["InlineFieldRow"], null, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["InlineField"], {
    label: "Included Namespaces",
    labelWidth: 20
  }, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["Input"], {
    name: "namespaces",
    css: null,
    width: 20,
    defaultValue: defaultValue,
    onBlur: function onBlur(e) {
      return updateQuery('topology_namespaces', e.target.value);
    }
  }))));
};
var InputExcludedClasses = function InputExcludedClasses(_a) {
  var updateQuery = _a.updateQuery,
      defaultValue = _a.defaultValue;
  return react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_2___default.a.Fragment, null, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["InlineFieldRow"], null, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["InlineField"], {
    label: "Excluded Classes",
    labelWidth: 20
  }, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["Input"], {
    name: "excluded_classes",
    css: null,
    width: 20,
    defaultValue: defaultValue,
    onBlur: function onBlur(e) {
      return updateQuery('topology_filter', e.target.value);
    }
  }))));
};
var SelectAdminCategory = function SelectAdminCategory(_a) {
  var options = _a.options,
      value = _a.value,
      updateQuery = _a.updateQuery;
  return react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_2___default.a.Fragment, null, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["InlineFieldRow"], null, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["InlineField"], {
    label: "Category Option",
    labelWidth: 20
  }, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["Select"], {
    width: 20,
    options: options,
    value: value,
    defaultValue: value,
    allowCustomValue: true,
    onCreateOption: function onCreateOption(v) {
      return updateQuery('selectedAdminCategoryList', {
        label: v,
        value: v
      });
    },
    onChange: function onChange(v) {
      return updateQuery('selectedAdminCategoryList', v);
    }
  }))));
};
var InputMetric = function InputMetric(_a) {
  var options = _a.options,
      value = _a.value,
      updateQuery = _a.updateQuery;
  return react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_2___default.a.Fragment, null, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["InlineFieldRow"], null, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["InlineField"], {
    label: "Generalized Agent Metric",
    labelWidth: 20
  }, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["Select"], {
    width: 20,
    options: options,
    value: value,
    defaultValue: value,
    isSearchable: true,
    isClearable: true,
    isMulti: true,
    backspaceRemovesValue: true,
    allowCustomValue: true,
    onCreateOption: function onCreateOption(v) {
      return updateQuery('selectedMetricNameList', {
        label: v,
        value: v
      });
    },
    onChange: function onChange(v) {
      return updateQuery('selectedMetricNameList', v);
    }
  }))));
};
var SelectAgentFilter = function SelectAgentFilter(_a) {
  var typeOptions = _a.typeOptions,
      typeValue = _a.typeValue,
      updateQuery = _a.updateQuery,
      loadOptions = _a.loadOptions,
      value = _a.value;
  return react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_2___default.a.Fragment, null, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["InlineFieldRow"], null, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["InlineField"], {
    label: "Agent Filter",
    labelWidth: 20
  }, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["Select"], {
    width: 20,
    options: typeOptions,
    value: typeValue,
    defaultValue: typeValue,
    allowCustomValue: true,
    onCreateOption: function onCreateOption(v) {
      return updateQuery('selectedAgentFilterType', {
        label: v,
        value: v
      });
    },
    onChange: function onChange(v) {
      return updateQuery('selectedAgentFilterType', v);
    }
  })), react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["InlineField"], null, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["AsyncSelect"], {
    width: 20,
    loadOptions: loadOptions,
    value: value,
    defaultValue: value,
    isSearchable: true,
    isClearable: true,
    backspaceRemovesValue: true,
    allowCustomValue: true,
    onCreateOption: function onCreateOption(v) {
      return updateQuery('selectedAgentFilter', {
        label: v,
        value: v
      });
    },
    onChange: function onChange(v) {
      return updateQuery('selectedAgentFilter', v);
    }
  }))));
};
var InputOsquery = function InputOsquery(_a) {
  var updateQuery = _a.updateQuery,
      defaultValue = _a.defaultValue;
  return react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_2___default.a.Fragment, null, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["InlineFieldRow"], null, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["InlineField"], {
    label: "Osquery",
    labelWidth: 20
  }, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["Input"], {
    name: "osquery",
    css: null,
    width: 20,
    defaultValue: defaultValue,
    onBlur: function onBlur(e) {
      return updateQuery('live_osquery', e.target.value);
    }
  }))));
};
var InputTableName = function InputTableName(_a) {
  var updateQuery = _a.updateQuery,
      defaultValue = _a.defaultValue;
  return react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_2___default.a.Fragment, null, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["InlineFieldRow"], null, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["InlineField"], {
    label: "Table Name",
    labelWidth: 20
  }, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["Input"], {
    name: "table_name",
    css: null,
    width: 20,
    defaultValue: defaultValue,
    onBlur: function onBlur(e) {
      return updateQuery('tableName', e.target.value);
    }
  }))));
};
var SelectTableName = function SelectTableName(_a) {
  var loadTableOptions = _a.loadTableOptions,
      value = _a.value,
      updateQuery = _a.updateQuery;
  return react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_2___default.a.Fragment, null, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["InlineFieldRow"], null, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["InlineField"], {
    label: "Table Name",
    labelWidth: 20
  }, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["AsyncSelect"], {
    prefix: react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["Icon"], {
      name: "table"
    }),
    loadOptions: loadTableOptions,
    className: "min-width-10 max-width-30",
    value: value,
    defaultValue: value,
    defaultOptions: true,
    isSearchable: true,
    isClearable: true,
    backspaceRemovesValue: true,
    allowCustomValue: true,
    onChange: function onChange(v) {
      return updateQuery('tableName', v);
    },
    onCreateOption: function onCreateOption(v) {
      return updateQuery('tableName', {
        label: v,
        value: v
      });
    },
    menuPlacement: "bottom",
    maxMenuHeight: 200
  }))));
};
var SelectTableColumn = function SelectTableColumn(_a) {
  var _loadOptions = _a.loadOptions,
      value = _a.value,
      updateQuery = _a.updateQuery;
  return react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_2___default.a.Fragment, null, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["InlineFieldRow"], null, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["InlineField"], {
    label: "Table Columns",
    labelWidth: 20,
    tooltip: "Leave columns blank to return all columns in the dictionary"
  }, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["AsyncMultiSelect"], {
    prefix: react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["Icon"], {
      name: "columns"
    }),
    className: "min-width-10 max-width-30",
    loadOptions: function loadOptions(v) {
      return _loadOptions(false, v);
    },
    value: value,
    defaultValue: value,
    isSearchable: true,
    isClearable: true,
    backspaceRemovesValue: true,
    allowCustomValue: true,
    onChange: function onChange(v) {
      return updateQuery('selectedtableColumns', v);
    },
    onCreateOption: function onCreateOption(v) {
      var newQuery = [];

      if (typeof value !== 'undefined') {
        newQuery = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__spreadArray"])([], Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__read"])(value));
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

      updateQuery('selectedtableColumns', newQuery);
    },
    menuPlacement: "bottom",
    maxMenuHeight: 200
  }))));
};
var InputGroupBy = function InputGroupBy(_a) {
  var updateQuery = _a.updateQuery,
      defaultValue = _a.defaultValue;
  return react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_2___default.a.Fragment, null, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["InlineFieldRow"], null, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["InlineField"], {
    label: "Group By",
    labelWidth: 20
  }, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["Input"], {
    name: "group_by",
    css: null,
    width: 20,
    defaultValue: defaultValue,
    onBlur: function onBlur(e) {
      return updateQuery('groupBy', e.target.value);
    }
  }))));
};
var SelectAggregate = function SelectAggregate(_a) {
  var options = _a.options,
      value = _a.value,
      updateQuery = _a.updateQuery,
      defaultColumnValue = _a.defaultColumnValue;
  return react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_2___default.a.Fragment, null, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["InlineFieldRow"], null, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["InlineField"], {
    label: "Aggregate Function",
    labelWidth: 20,
    tooltip: "Choose your aggregation function then the column to run this function on"
  }, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["Select"], {
    width: 20,
    options: options,
    value: value,
    defaultValue: value,
    isSearchable: true,
    isClearable: true,
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
    }
  })), react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["InlineField"], null, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["Input"], {
    name: "aggregate_column",
    css: null,
    width: 20,
    defaultValue: defaultColumnValue,
    onBlur: function onBlur(e) {
      return updateQuery('aggregateColumn', e.target.value);
    }
  }))));
};
var SelectSysparam = function SelectSysparam(_a) {
  var value = _a.value,
      loadColumns = _a.loadColumns,
      updateQuery = _a.updateQuery,
      sysparamTypeOptions = _a.sysparamTypeOptions,
      sysparamTypeValue = _a.sysparamTypeValue,
      loadChoices = _a.loadChoices,
      choiceValue = _a.choiceValue,
      sysparamCount = _a.sysparamCount,
      updateSysparam = _a.updateSysparam,
      seperatorValue = _a.seperatorValue;

  var deleteRow = function deleteRow(index) {
    updateQuery('sysparam_count', sysparamCount - 1); // console.log('delete: ' + index);
    // updateSysparam('sysparam_option1', index, undefined!);
    // updateSysparam('sysparam_option2', index, undefined);
    // updateSysparam('sysparam_option3', index, undefined);
    // updateSysparam('sysparam_option4', index, undefined);
  };

  var radioOptions = [{
    label: 'AND',
    value: '^'
  }, {
    label: 'OR',
    value: '^OR'
  }];
  var fields = [];

  var _loop_1 = function _loop_1(i) {
    fields.push(react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_2___default.a.Fragment, null, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["InlineFieldRow"], null, i !== 0 && react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["InlineField"], null, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["RadioButtonGroup"], {
      options: radioOptions,
      value: typeof seperatorValue !== 'undefined' && typeof seperatorValue[i] !== 'undefined' ? seperatorValue[i].value : '^',
      // This line will take the value selected, match it to the correct option, then return the correct option to the updateSysparam function
      onChange: function onChange(v) {
        radioOptions.map(function (o) {
          if (o.value === v) updateSysparam('sysparam_option4', i, o);
        });
      }
    })), react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["InlineField"], {
      label: i === 0 ? "Filter" : undefined,
      labelWidth: i === 0 ? 20 : undefined
    }, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["AsyncSelect"], {
      className: "min-width-10",
      loadOptions: function loadOptions(s) {
        return loadColumns(false, s);
      },
      value: typeof value !== 'undefined' ? value[i] : null,
      defaultValue: typeof value !== 'undefined' ? value[i] : null,
      isSearchable: true,
      isClearable: true,
      backspaceRemovesValue: true,
      allowCustomValue: true,
      onChange: function onChange(v) {
        return updateSysparam('sysparam_option1', i, v);
      },
      onCreateOption: function onCreateOption(v) {
        return updateSysparam('sysparam_option1', i, {
          label: v,
          value: v
        });
      }
    })), react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["InlineField"], null, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["Select"], {
      width: 20,
      options: sysparamTypeOptions,
      value: typeof sysparamTypeValue !== 'undefined' ? sysparamTypeValue[i] : null,
      defaultValue: typeof sysparamTypeValue !== 'undefined' ? sysparamTypeValue[i] : null,
      isClearable: true,
      backspaceRemovesValue: true,
      allowCustomValue: true,
      onChange: function onChange(v) {
        return updateSysparam('sysparam_option2', i, v);
      },
      onCreateOption: function onCreateOption(v) {
        return updateSysparam('sysparam_option2', i, {
          label: v,
          value: v
        });
      },
      maxMenuHeight: 200
    })), react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["InlineField"], null, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["AsyncSelect"], {
      className: "min-width-10",
      loadOptions: function loadOptions(s) {
        return loadChoices(i, s);
      },
      value: typeof choiceValue !== 'undefined' ? choiceValue[i] : null,
      defaultValue: typeof choiceValue !== 'undefined' ? choiceValue[i] : null,
      isSearchable: true,
      isClearable: true,
      backspaceRemovesValue: true,
      allowCustomValue: true,
      onChange: function onChange(v) {
        return updateSysparam('sysparam_option3', i, v);
      },
      onCreateOption: function onCreateOption(v) {
        return updateSysparam('sysparam_option3', i, {
          label: v,
          value: v
        });
      }
    })), i > 0 && react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["InlineField"], null, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["ToolbarButton"], {
      icon: "trash-alt",
      variant: "destructive",
      iconOnly: true,
      onClick: function onClick() {
        return deleteRow(i);
      }
    }))), react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["InlineFieldRow"], null, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["InlineField"], null, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["ToolbarButton"], {
      icon: "plus",
      variant: "primary",
      onClick: function onClick() {
        return updateQuery('sysparam_count', sysparamCount + 1);
      }
    })))));
  };

  for (var i = 0; i <= sysparamCount; i++) {
    _loop_1(i);
  }

  return react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_2___default.a.Fragment, null, fields);
};
var SelectSortBy = function SelectSortBy(_a) {
  var _loadOptions2 = _a.loadOptions,
      value = _a.value,
      updateQuery = _a.updateQuery;
  return react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_2___default.a.Fragment, null, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["InlineFieldRow"], null, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["InlineField"], {
    label: "Sort By",
    labelWidth: 20
  }, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["AsyncSelect"], {
    className: "min-width-10",
    loadOptions: function loadOptions(s) {
      return _loadOptions2(false, s);
    },
    value: value,
    defaultValue: value,
    isSearchable: true,
    isClearable: true,
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
    maxMenuHeight: 200
  }))));
};
var InputLimit = function InputLimit(_a) {
  var updateQuery = _a.updateQuery,
      defaultValue = _a.defaultValue;
  return react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_2___default.a.Fragment, null, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["InlineFieldRow"], null, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["InlineField"], {
    label: "Limit",
    labelWidth: 20,
    tooltip: "Limit the number of results. Expects a number between 1 - 9999"
  }, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["Input"], {
    name: "limit",
    css: null,
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
var InputElasticSearch = function InputElasticSearch(_a) {
  var updateQuery = _a.updateQuery,
      defaultValue = _a.defaultValue;
  return react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_2___default.a.Fragment, null, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["InlineFieldRow"], null, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["InlineField"], {
    label: "Elastic Search Query",
    labelWidth: 20
  }, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["Input"], {
    name: "elasticSearch",
    css: null,
    width: 20,
    defaultValue: defaultValue,
    onBlur: function onBlur(e) {
      return updateQuery('elasticSearch', e.target.value);
    }
  }))));
};
var SelectTrend = function SelectTrend(_a) {
  var columnLoadOptions = _a.columnLoadOptions,
      columnValue = _a.columnValue,
      updateQuery = _a.updateQuery,
      trendByValue = _a.trendByValue,
      trendByOptions = _a.trendByOptions,
      periodValue = _a.periodValue;
  return react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_2___default.a.Fragment, null, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["InlineFieldRow"], null, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["InlineField"], {
    label: "Trend",
    labelWidth: 20
  }, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["AsyncSelect"], {
    className: "min-width-10 max-width-30",
    loadOptions: function loadOptions(v) {
      return columnLoadOptions(false, v);
    },
    value: columnValue,
    defaultValue: columnValue,
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
  })), react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["InlineField"], null, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["Select"], {
    className: "min-width-10 max-width-30",
    options: trendByOptions,
    value: trendByValue,
    defaultValue: trendByValue,
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
    }
  })), react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["InlineField"], null, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["Input"], {
    name: "period",
    css: null,
    type: "number",
    max: 300,
    min: 1,
    width: 20,
    defaultValue: periodValue,
    onBlur: function onBlur(e) {
      return updateQuery('trendPeriod', e.target.value);
    }
  }))));
};
var ShowPercentSwitch = function ShowPercentSwitch(_a) {
  var value = _a.value,
      updateQuery = _a.updateQuery;
  var switchOptions = [{
    label: "False",
    value: false
  }, {
    label: "True",
    value: true
  }];
  return react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_2___default.a.Fragment, null, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["InlineFieldRow"], null, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["InlineField"], {
    label: "Show Uptime %",
    labelWidth: 20
  }, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["RadioButtonGroup"], {
    options: switchOptions,
    value: value || false,
    onChange: function onChange(v) {
      return updateQuery("showPercent", v);
    }
  }))));
};
var InputPage = function InputPage(_a) {
  var defaultValue = _a.defaultValue,
      updateQuery = _a.updateQuery;
  return react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_2___default.a.Fragment, null, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["InlineFieldRow"], null, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["InlineField"], {
    label: "Page",
    labelWidth: 20,
    tooltip: "Page number used for pagination. Starts at page 0"
  }, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["Input"], {
    name: "page",
    css: null,
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

/***/ "./ConfigEditor.tsx":
/*!**************************!*\
  !*** ./ConfigEditor.tsx ***!
  \**************************/
/*! exports provided: ConfigEditor */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ConfigEditor", function() { return ConfigEditor; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @grafana/ui */ "@grafana/ui");
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__);


var ConfigEditor = function ConfigEditor(props) {
  var options = props.options,
      onOptionsChange = props.onOptionsChange;

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

  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["DataSourceHttpSettings"], {
    defaultUrl: 'https://<instance_name>.service-now.com',
    dataSourceConfig: options,
    showAccessOptions: true,
    onChange: customOnChange
  }));
};

/***/ }),

/***/ "./Constants.ts":
/*!**********************!*\
  !*** ./Constants.ts ***!
  \**********************/
/*! exports provided: TIME_FILED_NAMES */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TIME_FILED_NAMES", function() { return TIME_FILED_NAMES; });
var TIME_FILED_NAMES = ['sys_created_on', 'created_on', 'last_event_time', 'sys_updated_on', 'time', 'start_time', 'end_time', 'Updated'];

/***/ }),

/***/ "./DataSource.ts":
/*!***********************!*\
  !*** ./DataSource.ts ***!
  \***********************/
/*! exports provided: DataSource */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DataSource", function() { return DataSource; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../node_modules/tslib/tslib.es6.js");
/* harmony import */ var lodash_defaults__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash/defaults */ "../node_modules/lodash/defaults.js");
/* harmony import */ var lodash_defaults__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash_defaults__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _grafana_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @grafana/runtime */ "@grafana/runtime");
/* harmony import */ var _grafana_runtime__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_grafana_runtime__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! lodash */ "lodash");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _grafana_data__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @grafana/data */ "@grafana/data");
/* harmony import */ var _grafana_data__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_grafana_data__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./types */ "./types.ts");
/* harmony import */ var SnowManager__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! SnowManager */ "./SnowManager.ts");








var DataSource = function (_super) {
  Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"])(DataSource, _super);

  function DataSource(instanceSettings) {
    var _this = _super.call(this, instanceSettings) || this;

    var connectionOptions = {
      type: instanceSettings.type,
      url: instanceSettings.url,
      name: instanceSettings.name,
      basicAuth: instanceSettings.basicAuth,
      withCredentials: instanceSettings.withCredentials
    };
    _this.instanceName = instanceSettings.jsonData.instanceName;
    _this.snowConnection = new SnowManager__WEBPACK_IMPORTED_MODULE_6__["SNOWManager"](connectionOptions);
    _this.annotations = {};
    return _this;
  }

  DataSource.prototype.metricFindQuery = function (query, options) {
    return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function () {
      var values, tableName, nameColumn, idColumn, sysparam, replacedValue, cis, replacedValue, cis, replacedValue, cis, values_1, valuesObj, nested_cis, values_2, classesObj;
      return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"])(this, function (_a) {
        console.log('inside template variables metricFindQuery');

        if (query.namespace === 'generic') {
          console.log('inside generic variable query');

          if (typeof query.rawQuery !== 'undefined') {
            values = query.rawQuery.split('||');
            tableName = typeof values[0] === 'undefined' ? '' : Object(_grafana_runtime__WEBPACK_IMPORTED_MODULE_2__["getTemplateSrv"])().replace(values[0], options.scopedVars, 'csv');
            nameColumn = typeof values[1] === 'undefined' ? '' : Object(_grafana_runtime__WEBPACK_IMPORTED_MODULE_2__["getTemplateSrv"])().replace(values[1], options.scopedVars, 'csv');
            idColumn = typeof values[2] === 'undefined' ? '' : Object(_grafana_runtime__WEBPACK_IMPORTED_MODULE_2__["getTemplateSrv"])().replace(values[2], options.scopedVars, 'csv');
            sysparam = typeof values[3] === 'undefined' ? '' : Object(_grafana_runtime__WEBPACK_IMPORTED_MODULE_2__["getTemplateSrv"])().replace(values[3], options.scopedVars, 'csv');
            return [2
            /*return*/
            , this.snowConnection.getGenericVariable(tableName, nameColumn, idColumn, sysparam)];
          } else {
            return [2
            /*return*/
            , []];
          }
        }

        if (query.namespace === 'metric_names') {
          console.log('inside metric name variables metricFindQuery');
          console.log(options);
          replacedValue = Object(_grafana_runtime__WEBPACK_IMPORTED_MODULE_2__["getTemplateSrv"])().replace(query.rawQuery, options.scopedVars, 'csv');
          console.log('RawQuery replacedValue= ' + replacedValue);
          cis = replacedValue.split(',');
          return [2
          /*return*/
          , this.snowConnection.getMetricNamesInCIs('', cis)]; //
          //return this.snowConnection.getMetricsColumnForCI('', 0, 0, '', cis, 'metric_tiny_name');
        }

        if (query.namespace === 'golden_metric_names') {
          console.log('inside metric name variables metricFindQuery');
          console.log(options);
          replacedValue = Object(_grafana_runtime__WEBPACK_IMPORTED_MODULE_2__["getTemplateSrv"])().replace(query.rawQuery, options.scopedVars, 'csv');
          console.log('RawQuery replacedValue= ' + replacedValue);
          cis = replacedValue.split(',');
          return [2
          /*return*/
          , this.snowConnection.getMetricNamesInCIs('GOLDEN', cis)]; //
          //return this.snowConnection.getMetricsColumnForCI('', 0, 0, '', cis, 'metric_tiny_name');
        }

        if (query.namespace === 'custom_kpis') {
          console.log('inside metric name variables metricFindQuery');
          console.log(options);
          replacedValue = Object(_grafana_runtime__WEBPACK_IMPORTED_MODULE_2__["getTemplateSrv"])().replace(query.rawQuery, options.scopedVars, 'csv');
          console.log('RawQuery replacedValue= ' + replacedValue);
          cis = replacedValue.split(',');
          return [2
          /*return*/
          , this.snowConnection.getMetricNamesInCIs('CUSTOM_KPIS', cis)];
        }

        if (query.namespace === 'nested_cis') {
          console.log('inside nested cis variable query');
          values_1 = query.rawQuery.split('||');
          values_1.map(function (value, i) {
            values_1[i] = Object(_grafana_runtime__WEBPACK_IMPORTED_MODULE_2__["getTemplateSrv"])().replace(value, options.scopedVars, 'csv');
            if (values_1[i].indexOf('$') === 0) values_1 = values_1.splice(i);
          });
          valuesObj = {
            ci: typeof values_1[0] === 'undefined' ? '' : values_1[0],
            parentDepth: typeof values_1[1] === 'undefined' ? '' : values_1[1],
            childDepth: typeof values_1[2] === 'undefined' ? '' : values_1[2],
            sysparam: typeof values_1[3] === 'undefined' ? '' : values_1[3]
          };
          console.log(valuesObj);
          nested_cis = this.snowConnection.getNestedCIS(valuesObj);
          console.log('nested cis return: ', nested_cis);
          return [2
          /*return*/
          , nested_cis];
        }

        if (query.namespace === 'nested_classes') {
          console.log('inside nested cis variable query');
          values_2 = query.rawQuery.split('||');
          values_2.map(function (value, i) {
            values_2[i] = Object(_grafana_runtime__WEBPACK_IMPORTED_MODULE_2__["getTemplateSrv"])().replace(value, options.scopedVars, 'csv');
            if (values_2[i].indexOf('$') === 0) values_2 = values_2.splice(i);
          });
          classesObj = {
            ci: typeof values_2[0] === 'undefined' ? '' : values_2[0],
            parentDepth: typeof values_2[1] === 'undefined' ? '' : values_2[1],
            childDepth: typeof values_2[2] === 'undefined' ? '' : values_2[2],
            sysparam: typeof values_2[3] === 'undefined' ? '' : values_2[3]
          };
          console.log(classesObj);
          return [2
          /*return*/
          , this.snowConnection.getNestedClasses(classesObj)];
        }

        return [2
        /*return*/
        ];
      });
    });
  };

  DataSource.prototype.query = function (options) {
    return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, Promise, function () {
      var range, from, to, queryTopologyType, promises;

      var _this = this;

      return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"])(this, function (_a) {
        range = options.range;
        from = range.from.valueOf();
        to = range.to.valueOf();
        queryTopologyType = options.targets[0].selectedQueryCategory.value;

        if (queryTopologyType === 'Topology') {
          return [2
          /*return*/
          , this.snowConnection.getTopologyFrame(options.targets[0], from, to, options)];
        }

        promises = lodash__WEBPACK_IMPORTED_MODULE_3___default.a.map(options.targets, function (t) {
          if (t.hide) {
            return [];
          }

          var target = lodash__WEBPACK_IMPORTED_MODULE_3___default.a.cloneDeep(t);

          var query = lodash_defaults__WEBPACK_IMPORTED_MODULE_1___default()(target, _types__WEBPACK_IMPORTED_MODULE_5__["defaultQuery"]);
          var queryType = query.selectedQueryCategory.value;

          switch (queryType) {
            case 'Metrics':
              return _this.snowConnection.getMetrics(target, from, to, options);
              break;

            case 'Alerts':
              return _this.snowConnection.getTextFrames(target, from, to, options, 'Alerts', _this.instanceName);
              break;

            case 'Topology':
              return _this.snowConnection.getTopology(target, from, to, options);
              break;

            case 'Admin':
              return _this.snowConnection.getTextFrames(target, from, to, options, 'Admin');
              break;

            case 'CI_Summary':
              return _this.snowConnection.getTextFrames(target, from, to, options, 'CI_Summary');
              break;

            case 'Changes':
              return _this.snowConnection.getTextFrames(target, from, to, options, 'Changes');
              break;

            case 'Agents':
              return _this.snowConnection.getTextFrames(target, from, to, options, 'Agents');

            case 'Live_Agent_Data':
              return _this.snowConnection.getLiveACCData(target, options);

            case 'Table':
              return _this.snowConnection.getTextFrames(target, from, to, options, 'Table');

            case 'Row_Count':
              return _this.snowConnection.getRowCount(target, options);

            case 'Aggregate':
              return _this.snowConnection.getAggregateQuery(target, options);

            case 'Geohash_Map':
              return _this.snowConnection.getGeohashMap(target, options);

            case 'Log_Data':
              return _this.snowConnection.queryLogData(target, from, to, options);

            case 'Trend_Data':
              return _this.snowConnection.getTrendData(target, from, to, options);

            case 'Outage_Status':
              return _this.snowConnection.getOutageStatus(target, options);

            case 'Anomaly':
              return _this.snowConnection.getAnomaly(target, from, to, options);

            default:
              return [];
          }
        });
        return [2
        /*return*/
        , Promise.all(lodash__WEBPACK_IMPORTED_MODULE_3___default.a.flatten(promises)).then(lodash__WEBPACK_IMPORTED_MODULE_3___default.a.flatten).then(function (data) {
          return {
            data: data,
            state: _grafana_data__WEBPACK_IMPORTED_MODULE_4__["LoadingState"].Done,
            key: options.requestId
          };
        })];
      });
    });
  };

  DataSource.prototype.testDatasource = function () {
    return this.snowConnection.apiClient.request({
      url: '/',
      method: 'GET'
    }).then(function (response) {
      if (response.status === 200) {
        return {
          status: 'success',
          message: 'Data source connection is successful',
          title: 'Success'
        };
      }

      return {
        status: 'error',
        message: "Data source connection failed: " + response.message,
        title: 'Error'
      };
    });
  };

  return DataSource;
}(_grafana_data__WEBPACK_IMPORTED_MODULE_4__["DataSourceApi"]);



/***/ }),

/***/ "./QueryEditor.tsx":
/*!*************************!*\
  !*** ./QueryEditor.tsx ***!
  \*************************/
/*! exports provided: QueryEditor */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "QueryEditor", function() { return QueryEditor; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../node_modules/tslib/tslib.es6.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _SplitQueryEditor__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./SplitQueryEditor */ "./SplitQueryEditor.tsx");



var QueryEditor = function QueryEditor(props) {
  return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_SplitQueryEditor__WEBPACK_IMPORTED_MODULE_2__["SplitQueryEditor"], Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, props));
};

/***/ }),

/***/ "./QueryEditorStyles.css":
/*!*******************************!*\
  !*** ./QueryEditorStyles.css ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var api = __webpack_require__(/*! ../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
            var content = __webpack_require__(/*! !../node_modules/css-loader/dist/cjs.js??ref--8-1!../node_modules/postcss-loader/src??ref--8-2!../node_modules/sass-loader/dist/cjs.js!./QueryEditorStyles.css */ "../node_modules/css-loader/dist/cjs.js?!../node_modules/postcss-loader/src/index.js?!../node_modules/sass-loader/dist/cjs.js!./QueryEditorStyles.css");

            content = content.__esModule ? content.default : content;

            if (typeof content === 'string') {
              content = [[module.i, content, '']];
            }

var options = {};

options.insert = "head";
options.singleton = false;

var update = api(content, options);

var exported = content.locals ? content.locals : {};



module.exports = exported;

/***/ }),

/***/ "./SnowManager.ts":
/*!************************!*\
  !*** ./SnowManager.ts ***!
  \************************/
/*! exports provided: SNOWManager */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SNOWManager", function() { return SNOWManager; });
/* harmony import */ var APIClient__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! APIClient */ "./APIClient.ts");
/* harmony import */ var _Utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Utils */ "./Utils.ts");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }




var SNOWManager = function () {
  function SNOWManager(options) {
    var basicAuth = options.basicAuth,
        withCredentials = options.withCredentials,
        url = options.url;
    this.apiPath = '';
    var headers = {
      'Content-Type': 'application/json'
    };

    if (typeof basicAuth === 'string' && basicAuth.length > 0) {
      headers['Authorization'] = basicAuth;
    }

    this.apiClient = new APIClient__WEBPACK_IMPORTED_MODULE_0__["APIClient"](headers, withCredentials, url);
  }

  SNOWManager.prototype.getLiveACCData = function (target, options) {
    if (_Utils__WEBPACK_IMPORTED_MODULE_1__["debugLevel"]() === 1) {
      console.log('isnide getLiveACCData');
      console.log('print target');
      console.log(target);
      console.log('print options scoped Vars');
      console.log(options.scopedVars);
    }

    var osquery = '';

    if (typeof target.live_osquery !== 'undefined') {
      osquery = _Utils__WEBPACK_IMPORTED_MODULE_1__["replaceTargetUsingTemplVarsCSV"](target.live_osquery, options.scopedVars);
    }

    console.log(osquery);
    /*
      Request will go here
    */

    var response = {
      data: [// { name: 'xfsaild/xvda1', percentage: '56.49', pid: '473', uid: '0' },
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
    return this.apiClient.mapTextResponseToFrame(response);
  };

  SNOWManager.prototype.getNestedCIS = function (bodyObj) {
    var bodyData = "{\"targets\":[{\"ci\": \"" + bodyObj.ci + "\",\n      \"parentDepth\":\"" + bodyObj.parentDepth + "\",\n      \"childDepth\":\"" + bodyObj.childDepth + "\",\n      \"sysparm\":\"" + bodyObj.sysparam + "\",\n      \"type\":\"ci\"}]}";

    if (_Utils__WEBPACK_IMPORTED_MODULE_1__["debugLevel"]() === 1) {
      console.log('get nested cis');
      console.log(bodyData);
    }

    return this.apiClient.request({
      url: this.apiPath + '/v1/variable/nested_value',
      data: bodyData,
      method: 'POST'
    }).then(this.apiClient.mapChecksToValue);
  };

  SNOWManager.prototype.getNestedClasses = function (bodyObj) {
    var bodyData = "{\"targets\":[{\"ci\": \"" + bodyObj.ci + "\",\n      \"parentDepth\":\"" + bodyObj.parentDepth + "\",\n      \"childDepth\":\"" + bodyObj.childDepth + "\",\n      \"sysparm\":\"" + bodyObj.sysparam + "\",\n      \"type\":\"class\"}]}";

    if (_Utils__WEBPACK_IMPORTED_MODULE_1__["debugLevel"]() === 1) {
      console.log('get nested classes');
      console.log(bodyData);
    }

    return this.apiClient.request({
      url: this.apiPath + '/v1/variable/nested_value',
      data: bodyData,
      method: 'POST'
    }).then(this.apiClient.mapChecksToValue);
  };

  SNOWManager.prototype.getGenericVariable = function (tableName, nameColumn, idColumn, sysparam) {
    var _this = this;

    var bodyData = "{\"targets\":[{\"tableName\":\"" + tableName + "\",\"nameColumn\":\"" + nameColumn + "\",\"idColumn\":\"" + idColumn + "\",\"sysparm\":\"" + sysparam + "\"}]}";
    console.log(bodyData);
    return this.apiClient.request({
      url: this.apiPath + '/v1/variable/generic',
      data: bodyData,
      method: 'POST'
    }).then(function (response) {
      _Utils__WEBPACK_IMPORTED_MODULE_1__["printDebug"](response);
      return _this.apiClient.mapChecksToValue(response);
    });
  };

  SNOWManager.prototype.getMetrics = function (target, timeFrom, timeTo, options) {
    var _this = this;

    if (_Utils__WEBPACK_IMPORTED_MODULE_1__["debugLevel"]() === 1) {
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

    if (typeof target.selectedSourceList !== 'undefined') {
      var sourceArray = [];
      target.selectedSourceList.map(function (listItem) {
        sourceArray.push(_Utils__WEBPACK_IMPORTED_MODULE_1__["replaceTargetUsingTemplVars"](listItem.value, options.scopedVars));
      });
      sourceTarget = _Utils__WEBPACK_IMPORTED_MODULE_1__["createRegEx"](sourceArray);
      console.log('ciIds: ', sourceTarget);
    }

    if (typeof target.selectedMetricTypeList !== 'undefined') {
      target.selectedMetricTypeList.map(function (listItem) {
        resourceNameArray.push(_Utils__WEBPACK_IMPORTED_MODULE_1__["replaceTargetUsingTemplVars"](listItem.value, options.scopedVars));
      });
      resourceName = _Utils__WEBPACK_IMPORTED_MODULE_1__["createRegEx"](resourceNameArray);
      console.log('resourceNames: ', resourceName);
    }

    if (typeof target.selectedMetricNameList !== 'undefined') {
      if (target.selectedMetricNameList.length > 0) {
        target.selectedMetricNameList.map(function (listItem) {
          metricNameArray.push(_Utils__WEBPACK_IMPORTED_MODULE_1__["replaceTargetUsingTemplVars"](listItem.value, options.scopedVars));
        });
        metricName = _Utils__WEBPACK_IMPORTED_MODULE_1__["createRegEx"](metricNameArray);
      } else {
        metricName = _Utils__WEBPACK_IMPORTED_MODULE_1__["replaceTargetUsingTemplVars"](target.selectedMetricNameList.value, options.scopedVars);
      }
    }

    if (typeof target.selectedMetricAnomalyList !== 'undefined') {
      metricAnomaly = _Utils__WEBPACK_IMPORTED_MODULE_1__["replaceTargetUsingTemplVars"](target.selectedMetricAnomalyList.value, options.scopedVars);

      if (metricAnomaly === 'true') {
        anomaly = true;
      }
    }

    if (typeof target.sysparam_query !== 'undefined') {
      sysparam = _Utils__WEBPACK_IMPORTED_MODULE_1__["replaceTargetUsingTemplVarsCSV"](target.sysparam_query, options.scopedVars);
    } //let queryTarget = "EC2AMAZ-8AMDGC0";
    //let queryMetricName = "api_response_time_ms_2";


    metricName = _Utils__WEBPACK_IMPORTED_MODULE_1__["trimRegEx"](metricName);
    sourceTarget = _Utils__WEBPACK_IMPORTED_MODULE_1__["trimRegEx"](sourceTarget);
    var bodyData = '{"targets":[{"target":"' + sourceTarget + '","resourceName":"' + resourceName + '","metricName":"' + metricName + '","sysparm_query":"' + sysparam + '"}]}';
    var metricURL = this.apiPath + '/v1/query/single_metric?startTime=' + timeFrom + '&endTime=' + timeTo;

    if (metricName === '*') {
      metricURL = this.apiPath + '/v1/query/all_metrics?startTime=' + timeFrom + '&endTime=' + timeTo;
    }

    if (anomaly === true) {
      metricURL = this.apiPath + '/v1/query/anomaly_metrics?startTime=' + timeFrom + '&endTime=' + timeTo;
    }

    if (_Utils__WEBPACK_IMPORTED_MODULE_1__["debugLevel"]() === 1) {
      console.log('source after replace');
      console.log(metricURL);
      console.log(sourceTarget);
      console.log(bodyData);
    }

    return this.apiClient.request({
      url: metricURL,
      data: bodyData,
      method: 'POST'
    }).then(function (response) {
      console.log('metric response: ', response);

      if (anomaly === true) {
        return _this.apiClient.mapAnamMetricsResponseToFrame(response, target, options);
      } else {
        return _this.apiClient.mapMetricsResponseToFrame(response, target);
      }
    });
  };

  SNOWManager.prototype.getTextFrames = function (target, timeFrom, timeTo, options, type, instanceName) {
    if (type === 'Alerts') {
      return this.getAlerts(target, timeFrom, timeTo, options, instanceName);
    }

    if (type === 'Changes') {
      return this.getChanges(target, timeFrom, timeTo, options);
    }

    if (type === 'CI_Summary') {
      return this.getCISummary(target, options);
    }

    if (type === 'Agents') {
      return this.getAllACCAgents(target, timeFrom, timeTo, options);
    }

    if (type === 'Admin') {
      if (target.selectedAdminCategoryList.value === 'Metrics Definition') {
        return this.getMetricsDefinition(target, timeFrom, timeTo, options);
      }

      return [];
    }

    if (type === 'Table') {
      return this.queryTable(target, timeFrom, timeTo, options);
    }

    return [];
  };

  SNOWManager.prototype.getGeohashMap = function (target, options) {
    var _this = this;

    var tableName = '';
    var groupBy = '';
    var sysparam = '';

    if (typeof target.tableName !== 'undefined') {
      if (target.tableName.value !== '') {
        tableName = _Utils__WEBPACK_IMPORTED_MODULE_1__["replaceTargetUsingTemplVars"](target.tableName.value, options.scopedVars);
      }
    }

    if (typeof target.groupBy !== 'undefined') {
      if (target.groupBy !== '') {
        groupBy = target.groupBy;
      }
    }

    if (typeof target.sysparam_query !== 'undefined') {
      if (target.sysparam_query !== '') {
        sysparam = _Utils__WEBPACK_IMPORTED_MODULE_1__["replaceTargetUsingTemplVarsCSV"](target.sysparam_query, options.scopedVars);
      }
    }

    var bodyData = "{\"targets\":[{\"target\":\"" + tableName + "\",\"column\":\"" + groupBy + "\",\"sysparm\":\"" + sysparam + "\"}]}";

    if (_Utils__WEBPACK_IMPORTED_MODULE_1__["debugLevel"]() === 1) {
      console.log(target);
      console.log(bodyData);
    }

    return this.apiClient.request({
      url: this.apiPath + '/v1/query/geohash_map',
      data: bodyData,
      method: 'POST'
    }).then(function (response) {
      _Utils__WEBPACK_IMPORTED_MODULE_1__["printDebug"]('print geohash_map response from SNOW');
      _Utils__WEBPACK_IMPORTED_MODULE_1__["printDebug"](response);
      return _this.apiClient.mapTextResponseToFrame(response);
    });
  };

  SNOWManager.prototype.getAggregateQuery = function (target, options) {
    var _this = this;

    var tableName = '';
    var groupBy = '';
    var type = '';
    var column = '';
    var sysparam = '';

    if (typeof target.tableName !== 'undefined') {
      if (target.tableName.value !== '') {
        tableName = _Utils__WEBPACK_IMPORTED_MODULE_1__["replaceTargetUsingTemplVars"](target.tableName.value, options.scopedVars);
      }
    }

    if (typeof target.groupBy !== 'undefined') {
      if (target.groupBy !== '') {
        groupBy = target.groupBy;
      }
    }

    if (typeof target.selectedAggregateType !== 'undefined') {
      if (target.selectedAggregateType.value !== '') {
        type = target.selectedAggregateType.value;
      }
    }

    if (typeof target.aggregateColumn !== 'undefined') {
      if (target.aggregateColumn !== '') {
        column = target.aggregateColumn;
      }
    }

    if (typeof target.sysparam_query !== 'undefined') {
      if (target.sysparam_query !== '') {
        sysparam = _Utils__WEBPACK_IMPORTED_MODULE_1__["replaceTargetUsingTemplVarsCSV"](target.sysparam_query, options.scopedVars);
      }
    }

    var bodyData = "{\"targets\":[{\"target\":\"" + tableName + "\",\"type\":\"" + type + "\",\"column\":\"" + column + "\",\"groupBy\":\"" + groupBy + "\",\"sysparm\":\"" + sysparam + "\"}]}";

    if (_Utils__WEBPACK_IMPORTED_MODULE_1__["debugLevel"]() === 1) {
      console.log(target);
      console.log(bodyData);
    }

    return this.apiClient.request({
      url: this.apiPath + '/v1/query/aggregate',
      data: bodyData,
      method: 'POST'
    }).then(function (response) {
      _Utils__WEBPACK_IMPORTED_MODULE_1__["printDebug"]('print aggregate query response from SNOW');
      _Utils__WEBPACK_IMPORTED_MODULE_1__["printDebug"](response);
      return _this.apiClient.mapTextResponseToFrame(response);
    });
  };

  SNOWManager.prototype.getRowCount = function (target, options) {
    var _this = this;

    var tableName = '';

    if (typeof target.tableName !== 'undefined') {
      if (target.tableName.value !== '') {
        tableName = _Utils__WEBPACK_IMPORTED_MODULE_1__["replaceTargetUsingTemplVars"](target.tableName.value, options.scopedVars);
      }
    }

    var sysparam = '';

    if (typeof target.sysparam_query !== 'undefined') {
      if (target.sysparam_query !== '') {
        sysparam = _Utils__WEBPACK_IMPORTED_MODULE_1__["replaceTargetUsingTemplVarsCSV"](target.sysparam_query, options.scopedVars);
      }
    }

    var bodyData = "{\"targets\":[{\"target\":\"" + tableName + "\",\"sysparm\":\"" + sysparam + "\"}]}";

    if (_Utils__WEBPACK_IMPORTED_MODULE_1__["debugLevel"]() === 1) {
      console.log(target);
      console.log(bodyData);
    }

    return this.apiClient.request({
      url: this.apiPath + '/v1/query/row_count',
      data: bodyData,
      method: 'POST'
    }).then(function (response) {
      _Utils__WEBPACK_IMPORTED_MODULE_1__["printDebug"]('print row count response from SNOW');
      _Utils__WEBPACK_IMPORTED_MODULE_1__["printDebug"](response);
      return _this.apiClient.mapTextResponseToFrame(response);
    });
  };

  SNOWManager.prototype.getTrendData = function (target, timeFrom, timeTo, options) {
    var _this = this;

    var _a, _b, _c;

    if (_Utils__WEBPACK_IMPORTED_MODULE_1__["debugLevel"]() === 1) {
      console.log(target);
    }

    var table = '';
    var sysparam = '';
    var elasticSearch = '';
    var trendColumn = '';
    var trendBy = '';
    var period = 1;

    if (typeof target.tableName !== 'undefined') {
      if (target.tableName.value !== '') {
        table = _Utils__WEBPACK_IMPORTED_MODULE_1__["replaceTargetUsingTemplVars"](target.tableName.value, options.scopedVars);
      }
    }

    if (typeof target.sysparam_count !== 'undefined') {
      for (var i = 0; i <= target.sysparam_count; i++) {
        var sysparam_entry = '';

        if (typeof target.sysparam_option4 !== 'undefined') {
          if (typeof target.sysparam_option4[i] !== 'undefined') {
            sysparam_entry += target.sysparam_option4[i].value;

            if (typeof target.sysparam_option1 !== 'undefined') {
              sysparam_entry += _Utils__WEBPACK_IMPORTED_MODULE_1__["replaceTargetUsingTemplVarsCSV"]((_a = target.sysparam_option1[i]) === null || _a === void 0 ? void 0 : _a.value, options.scopedVars);

              if (typeof target.sysparam_option2 !== 'undefined') {
                sysparam_entry += (_b = target.sysparam_option2[i]) === null || _b === void 0 ? void 0 : _b.value;

                if (typeof target.sysparam_option3 !== 'undefined') {
                  sysparam_entry += _Utils__WEBPACK_IMPORTED_MODULE_1__["replaceTargetUsingTemplVarsCSV"]((_c = target.sysparam_option3[i]) === null || _c === void 0 ? void 0 : _c.value.toString(), options.scopedVars);
                }
              }
            }
          }
        }

        sysparam += sysparam_entry;
      }
    }

    if (typeof target.elasticSearch !== 'undefined') {
      elasticSearch = _Utils__WEBPACK_IMPORTED_MODULE_1__["replaceTargetUsingTemplVarsCSV"](target.elasticSearch, options.scopedVars);
    }

    if (typeof target.selectedTrendColumn !== 'undefined') {
      if (target.selectedTrendColumn !== null) {
        trendColumn = _Utils__WEBPACK_IMPORTED_MODULE_1__["replaceTargetUsingTemplVarsCSV"](target.selectedTrendColumn.value, options.scopedVars);
      }
    }

    if (typeof target.selectedTrendBy !== 'undefined') {
      if (target.selectedTrendBy !== null) {
        trendBy = _Utils__WEBPACK_IMPORTED_MODULE_1__["replaceTargetUsingTemplVarsCSV"](target.selectedTrendBy.value, options.scopedVars);
      }
    }

    if (typeof target.trendPeriod !== 'undefined') {
      if (target.trendPeriod > 0) {
        period = target.trendPeriod;
      }
    }

    var bodyData = "{\"targets\":[{\"target\":\"" + table + "\",\"sysparm\":\"" + sysparam + "\",\"esSearch\":\"" + elasticSearch + "\",\"trendColumn\":\"" + trendColumn + "\",\"trendBy\":\"" + trendBy + "\",\"period\":" + period + "}]}";

    if (_Utils__WEBPACK_IMPORTED_MODULE_1__["debugLevel"]() === 1) {
      console.log(target);
      console.log(bodyData);
    }

    return this.apiClient.request({
      url: this.apiPath + '/v1/query/trend?startTime=' + timeFrom + '&endTime=' + timeTo,
      data: bodyData,
      method: 'POST'
    }).then(function (response) {
      _Utils__WEBPACK_IMPORTED_MODULE_1__["printDebug"]('print trend data response from SNOW');
      _Utils__WEBPACK_IMPORTED_MODULE_1__["printDebug"](response);
      return _this.apiClient.mapTrendResponseToFrame(response, target);
    });
  };

  SNOWManager.prototype.queryLogData = function (target, timeFrom, timeTo, options) {
    var _this = this;

    var _a, _b, _c;

    var sysparam = '';

    if (typeof target.sysparam_count !== 'undefined') {
      for (var i = 0; i <= target.sysparam_count; i++) {
        var sysparam_entry = '';

        if (typeof target.sysparam_option4 !== 'undefined') {
          if (typeof target.sysparam_option4[i] !== 'undefined') {
            sysparam_entry += target.sysparam_option4[i].value;

            if (typeof target.sysparam_option1 !== 'undefined') {
              sysparam_entry += _Utils__WEBPACK_IMPORTED_MODULE_1__["replaceTargetUsingTemplVarsCSV"]((_a = target.sysparam_option1[i]) === null || _a === void 0 ? void 0 : _a.value, options.scopedVars);

              if (typeof target.sysparam_option2 !== 'undefined') {
                sysparam_entry += (_b = target.sysparam_option2[i]) === null || _b === void 0 ? void 0 : _b.value;

                if (typeof target.sysparam_option3 !== 'undefined') {
                  sysparam_entry += _Utils__WEBPACK_IMPORTED_MODULE_1__["replaceTargetUsingTemplVarsCSV"]((_c = target.sysparam_option3[i]) === null || _c === void 0 ? void 0 : _c.value.toString(), options.scopedVars);
                }
              }
            }
          }
        }

        sysparam += sysparam_entry;
      }
    }

    var limit = 9999;

    if (typeof target.rowLimit !== 'undefined') {
      if (target.rowLimit > 0 && target.rowLimit < 10000) {
        limit = target.rowLimit;
      }
    }

    var page = 0;
    console.log('typeof page: ' + _typeof(target.page));

    if (typeof target.page === 'number') {
      if (target.page >= 0) {
        page = target.page;
      }
    }

    var sortBy = '';

    if (typeof target.sortBy !== 'undefined' && target.sortBy !== null) {
      sortBy = _Utils__WEBPACK_IMPORTED_MODULE_1__["replaceTargetUsingTemplVarsCSV"](target.sortBy.value, options.scopedVars);
    }

    var elasticSearch = '';

    if (typeof target.elasticSearch !== 'undefined') {
      elasticSearch = _Utils__WEBPACK_IMPORTED_MODULE_1__["replaceTargetUsingTemplVarsCSV"](target.elasticSearch, options.scopedVars);
    }

    var bodyData = "{\"targets\":[{\"sysparm\":\"" + sysparam + "\",\"limit\":" + limit + ",\"page\":" + page + ",\"sortBy\":\"" + sortBy + "\",\"esSearch\":\"" + elasticSearch + "\",\"startTime\":" + timeFrom + ",\"endTime\":" + timeTo + "}]}";

    if (_Utils__WEBPACK_IMPORTED_MODULE_1__["debugLevel"]() === 1) {
      console.log(target);
      console.log(bodyData);
    }

    return this.apiClient.request({
      url: this.apiPath + '/v1/query/logs',
      data: bodyData,
      method: 'POST'
    }).then(function (response) {
      _Utils__WEBPACK_IMPORTED_MODULE_1__["printDebug"]('print query log data response from SNOW');
      _Utils__WEBPACK_IMPORTED_MODULE_1__["printDebug"](response);
      return _this.apiClient.mapTextResponseToFrame(response);
    });
  };

  SNOWManager.prototype.getAnomaly = function (target, timeFrom, timeTo, options) {
    var _this = this;

    var _a, _b, _c;

    if (_Utils__WEBPACK_IMPORTED_MODULE_1__["debugLevel"]() === 1) {
      console.log('query anomaly');
      console.log(target);
    }

    var tableColumns = '';

    if (typeof target.selectedtableColumns !== 'undefined') {
      console.log('columns: ', target.selectedtableColumns);

      if (target.selectedtableColumns.length > 0) {
        target.selectedtableColumns.map(function (listItem) {
          tableColumns += _Utils__WEBPACK_IMPORTED_MODULE_1__["replaceTargetUsingTemplVars"](listItem.value, options.scopedVars) + ',';
        });

        if (tableColumns.charAt(tableColumns.length - 1) === ',') {
          tableColumns = tableColumns.substring(0, tableColumns.length - 1);
        }
      }
    }

    var sysparam = '';

    if (typeof target.sysparam_count !== 'undefined') {
      for (var i = 0; i <= target.sysparam_count; i++) {
        var sysparam_entry = '';

        if (typeof target.sysparam_option4 !== 'undefined') {
          if (typeof target.sysparam_option4[i] !== 'undefined') {
            sysparam_entry += target.sysparam_option4[i].value;

            if (typeof target.sysparam_option1 !== 'undefined') {
              sysparam_entry += _Utils__WEBPACK_IMPORTED_MODULE_1__["replaceTargetUsingTemplVarsCSV"]((_a = target.sysparam_option1[i]) === null || _a === void 0 ? void 0 : _a.value, options.scopedVars);

              if (typeof target.sysparam_option2 !== 'undefined') {
                sysparam_entry += (_b = target.sysparam_option2[i]) === null || _b === void 0 ? void 0 : _b.value;

                if (typeof target.sysparam_option3 !== 'undefined') {
                  sysparam_entry += _Utils__WEBPACK_IMPORTED_MODULE_1__["replaceTargetUsingTemplVarsCSV"]((_c = target.sysparam_option3[i]) === null || _c === void 0 ? void 0 : _c.value.toString(), options.scopedVars);
                }
              }
            }
          }
        }

        sysparam += sysparam_entry;
      }
    }

    var limit = 9999;

    if (typeof target.rowLimit !== 'undefined') {
      if (target.rowLimit > 0 && target.rowLimit < 10000) {
        limit = target.rowLimit;
      }
    }

    var page = 0;

    if (typeof target.page === 'number') {
      if (target.page >= 0) {
        page = target.page;
      }
    }

    var sortBy = '';

    if (typeof target.sortBy !== 'undefined' && target.sortBy !== null) {
      sortBy = _Utils__WEBPACK_IMPORTED_MODULE_1__["replaceTargetUsingTemplVarsCSV"](target.sortBy.value, options.scopedVars);
    }

    var bodyData = "{\"targets\":[{\"columns\":\"" + tableColumns + "\",\"sysparm\":\"" + sysparam + "\",\"limit\":" + limit + ",\"page\":" + page + ",\"sortBy\":\"" + sortBy + "\"}]}";

    if (_Utils__WEBPACK_IMPORTED_MODULE_1__["debugLevel"]() === 1) {
      console.log(target);
      console.log(bodyData);
    }

    return this.apiClient.request({
      url: this.apiPath + '/v1/query/anomaly',
      data: bodyData,
      method: 'POST'
    }).then(function (response) {
      _Utils__WEBPACK_IMPORTED_MODULE_1__["printDebug"]('print anomaly query response from SNOW');
      _Utils__WEBPACK_IMPORTED_MODULE_1__["printDebug"](response);
      return _this.apiClient.mapTextResponseToFrame(response);
    });
  };

  SNOWManager.prototype.queryTable = function (target, timeFrom, timeTo, options) {
    var _this = this;

    var _a, _b, _c;

    if (_Utils__WEBPACK_IMPORTED_MODULE_1__["debugLevel"]() === 1) {
      console.log('query table');
      console.log(target);
    }

    var tableName = '';

    if (typeof target.tableName !== 'undefined') {
      if (target.tableName.value !== '') {
        tableName = _Utils__WEBPACK_IMPORTED_MODULE_1__["replaceTargetUsingTemplVars"](target.tableName.value, options.scopedVars);
      }
    }

    var tableColumns = '';

    if (typeof target.selectedtableColumns !== 'undefined') {
      console.log('columns: ', target.selectedtableColumns);

      if (target.selectedtableColumns.length > 0) {
        target.selectedtableColumns.map(function (listItem) {
          tableColumns += _Utils__WEBPACK_IMPORTED_MODULE_1__["replaceTargetUsingTemplVars"](listItem.value, options.scopedVars) + ',';
        });

        if (tableColumns.charAt(tableColumns.length - 1) === ',') {
          tableColumns = tableColumns.substring(0, tableColumns.length - 1);
        }
      }
    }

    var sysparam = '';

    if (typeof target.sysparam_count !== 'undefined') {
      for (var i = 0; i <= target.sysparam_count; i++) {
        var sysparam_entry = '';

        if (typeof target.sysparam_option4 !== 'undefined') {
          if (typeof target.sysparam_option4[i] !== 'undefined') {
            sysparam_entry += target.sysparam_option4[i].value;

            if (typeof target.sysparam_option1 !== 'undefined') {
              sysparam_entry += _Utils__WEBPACK_IMPORTED_MODULE_1__["replaceTargetUsingTemplVarsCSV"]((_a = target.sysparam_option1[i]) === null || _a === void 0 ? void 0 : _a.value, options.scopedVars);

              if (typeof target.sysparam_option2 !== 'undefined') {
                sysparam_entry += (_b = target.sysparam_option2[i]) === null || _b === void 0 ? void 0 : _b.value;

                if (typeof target.sysparam_option3 !== 'undefined') {
                  sysparam_entry += _Utils__WEBPACK_IMPORTED_MODULE_1__["replaceTargetUsingTemplVarsCSV"]((_c = target.sysparam_option3[i]) === null || _c === void 0 ? void 0 : _c.value.toString(), options.scopedVars);
                }
              }
            }
          }
        }

        sysparam += sysparam_entry;
      }
    }

    var limit = 9999;

    if (typeof target.rowLimit !== 'undefined') {
      if (target.rowLimit > 0 && target.rowLimit < 10000) {
        limit = target.rowLimit;
      }
    }

    var page = 0;
    console.log('typeof page: ' + _typeof(target.page));

    if (typeof target.page === 'number') {
      if (target.page >= 0) {
        page = target.page;
      }
    }

    var sortBy = '';

    if (typeof target.sortBy !== 'undefined' && target.sortBy !== null) {
      sortBy = _Utils__WEBPACK_IMPORTED_MODULE_1__["replaceTargetUsingTemplVarsCSV"](target.sortBy.value, options.scopedVars);
    }

    var bodyData = "{\"targets\":[{\"target\":\"" + tableName + "\",\"columns\":\"" + tableColumns + "\",\"sysparm\":\"" + sysparam + "\",\"limit\":" + limit + ",\"page\":" + page + ",\"sortBy\":\"" + sortBy + "\"}]}";

    if (_Utils__WEBPACK_IMPORTED_MODULE_1__["debugLevel"]() === 1) {
      console.log(target);
      console.log(bodyData);
    }

    return this.apiClient.request({
      url: this.apiPath + '/v1/query/table',
      data: bodyData,
      method: 'POST'
    }).then(function (response) {
      _Utils__WEBPACK_IMPORTED_MODULE_1__["printDebug"]('print table query response from SNOW');
      _Utils__WEBPACK_IMPORTED_MODULE_1__["printDebug"](response);
      return _this.apiClient.mapTextResponseToFrame(response);
    });
  };

  SNOWManager.prototype.getOutageStatus = function (target, options) {
    var _this = this;

    var ciIds = '';

    if (typeof target.selectedServiceList !== 'undefined') {
      if (target.selectedServiceList.value !== null) {
        ciIds = _Utils__WEBPACK_IMPORTED_MODULE_1__["replaceTargetUsingTemplVarsCSV"](target.selectedServiceList.value, options.scopedVars);
      }
    }

    var showPercent = false;

    if (typeof target.showPercent === 'boolean') {
      showPercent = target.showPercent;
    }

    var sysparam = '';

    if (typeof target.sysparam_query !== 'undefined') {
      sysparam = _Utils__WEBPACK_IMPORTED_MODULE_1__["replaceTargetUsingTemplVarsCSV"](target.sysparam_query, options.scopedVars);
    }

    var limit = 9999;

    if (typeof target.rowLimit !== 'undefined') {
      if (target.rowLimit > 0 && target.rowLimit < 10000) {
        limit = target.rowLimit;
      }
    }

    var page = 0;
    console.log('typeof page: ' + _typeof(target.page));

    if (typeof target.page === 'number') {
      if (target.page >= 0) {
        page = target.page;
      }
    }

    var bodyData = "{\"targets\":[{\"target\":\"" + ciIds + "\",\"showPercent\":" + showPercent + ",\"sysparm\":\"" + sysparam + "\",\"limit\":" + limit + ",\"page\":" + page + "}]}";

    if (_Utils__WEBPACK_IMPORTED_MODULE_1__["debugLevel"]() === 1) {
      console.log(bodyData);
    }

    return this.apiClient.request({
      url: this.apiPath + '/v1/query/outage',
      data: bodyData,
      method: 'POST'
    }).then(function (response) {
      _Utils__WEBPACK_IMPORTED_MODULE_1__["printDebug"]('print outage status response from SNOW');
      _Utils__WEBPACK_IMPORTED_MODULE_1__["printDebug"](response);

      if (showPercent) {
        return _this.apiClient.mapTextResponseToFrame(response);
      } else {
        return _this.apiClient.mapOutageResponseToFrame(response, target);
      }
    });
  };

  SNOWManager.prototype.getTopologyFrame = function (target, timeFrom, timeTo, options) {
    return this.getTopology(target, timeFrom, timeTo, options).then(function (response) {
      console.log(response);
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
        rows: response,
        refId: target.refId || undefined,
        meta: undefined
      }];
      _Utils__WEBPACK_IMPORTED_MODULE_1__["printDebug"](data);
      return {
        data: data
      };
    });
  };

  SNOWManager.prototype.getTopology = function (target, timeFrom, timeTo, options) {
    if (_Utils__WEBPACK_IMPORTED_MODULE_1__["debugLevel"]() === 1) {
      console.log('isnide get Topology');
      console.log('print target');
      console.log(target);
      console.log('print options');
      console.log(options);
    }

    var serviceTarget = _Utils__WEBPACK_IMPORTED_MODULE_1__["replaceTargetUsingTemplVars"](target.service, options.scopedVars);

    if (typeof target.selectedServiceList !== 'undefined') {
      serviceTarget = _Utils__WEBPACK_IMPORTED_MODULE_1__["replaceTargetUsingTemplVarsCSV"](target.selectedServiceList.value, options.scopedVars);
    }

    var child_depth = '';

    if (typeof target.topology_child_depth !== 'undefined') {
      child_depth = _Utils__WEBPACK_IMPORTED_MODULE_1__["replaceTargetUsingTemplVars"](target.topology_child_depth, options.scopedVars);
    }

    var parent_depth = '';

    if (typeof target.topology_parent_depth !== 'undefined') {
      parent_depth = _Utils__WEBPACK_IMPORTED_MODULE_1__["replaceTargetUsingTemplVars"](target.topology_parent_depth, options.scopedVars);
    }

    var excluded_classes = '';

    if (typeof target.topology_filter !== 'undefined') {
      if (target.topology_filter) {
        excluded_classes = _Utils__WEBPACK_IMPORTED_MODULE_1__["replaceTargetUsingTemplVarsCSV"](target.topology_filter, options.scopedVars);
      }
    }

    var namespaces = '';

    if (typeof target.topology_namespaces !== 'undefined') {
      if (target.topology_namespaces) {
        namespaces = _Utils__WEBPACK_IMPORTED_MODULE_1__["replaceTargetUsingTemplVarsCSV"](target.topology_namespaces, options.scopedVars);
      }
    }

    var sysparm = '';

    if (typeof target.sysparam_query !== 'undefined') {
      if (target.sysparam_query !== '') {
        sysparm = _Utils__WEBPACK_IMPORTED_MODULE_1__["replaceTargetUsingTemplVarsCSV"](target.sysparam_query, options.scopedVars);
      }
    }

    var dependsOn = '';

    if (typeof target.selectedTopologyDependsOnFilter !== 'undefined') {
      dependsOn = _Utils__WEBPACK_IMPORTED_MODULE_1__["replaceTargetUsingTemplVars"](target.selectedTopologyDependsOnFilter.value, options.scopedVars);
    }

    var bodyData = '{"targets":[{"target":"' + serviceTarget + '","child_depth":"' + child_depth + '","parent_depth":"' + parent_depth + '","exclude_classes":"' + excluded_classes + '","sysparm_query":"' + sysparm + '","namespaces":"' + namespaces + '","dependsOn":"' + dependsOn + '"}]}';

    if (_Utils__WEBPACK_IMPORTED_MODULE_1__["debugLevel"]() === 1) {
      console.log('source after replace');
      console.log(serviceTarget);
      console.log(bodyData);
    }

    return this.apiClient.request({
      url: this.apiPath + '/v1/query/topology',
      data: bodyData,
      method: 'POST'
    }).then(function (response) {
      _Utils__WEBPACK_IMPORTED_MODULE_1__["printDebug"]('print topology response from SNOW');
      _Utils__WEBPACK_IMPORTED_MODULE_1__["printDebug"](response);
      _Utils__WEBPACK_IMPORTED_MODULE_1__["printDebug"]('~~~~~~~~~~~~~~~~');
      _Utils__WEBPACK_IMPORTED_MODULE_1__["printDebug"](response.data);
      _Utils__WEBPACK_IMPORTED_MODULE_1__["printDebug"]('~~~~~~~~~~~~~~~~');
      return response.data.rows;
    });
  };

  SNOWManager.prototype.loadServiceOptions = function (input) {
    var _this = this;

    var search = '';
    if (typeof input !== 'undefined') search = input;
    var bodyData = "{\"targets\":[{\"target\":\"cmdb_ci_service\",\"columns\":\"name:d,sys_id:v\",\"sysparm\":\"operational_status=1^name!=All^nameLIKE" + search + "\",\"limit\":100,\"sortBy\":\"name\"}]}";

    if (_Utils__WEBPACK_IMPORTED_MODULE_1__["debugLevel"]() === 1) {
      console.log(bodyData);
      console.log('loadServiceOptions');
    }

    return this.apiClient.request({
      url: this.apiPath + '/v1/query/table',
      data: bodyData,
      method: 'POST'
    }).then(function (response) {
      _Utils__WEBPACK_IMPORTED_MODULE_1__["printDebug"]('print loadServiceOptions response from SNOW');
      _Utils__WEBPACK_IMPORTED_MODULE_1__["printDebug"](response);
      _Utils__WEBPACK_IMPORTED_MODULE_1__["printDebug"](_this.apiClient.mapChecksToValue(response));
      return _this.apiClient.mapChecksToValue(response);
    });
  };

  SNOWManager.prototype.loadCIOptions = function (serviceId, input) {
    var _this = this;

    var search = '';
    if (typeof input !== 'undefined') search = input;
    var bodyData = '';

    if (typeof serviceId !== 'undefined') {
      bodyData = "{\"targets\":[{\"target\":\"em_impact_graph\",\"columns\":\"child_name:d,child_id:v,child_id:d\",\"sysparm\":\"business_service=" + serviceId + "^child_nameLIKE" + search + "\",\"limit\":100,\"sortBy\":\"ci_name\"}]}";
    } else {
      bodyData = "{\"targets\":[{\"target\":\"cmdb_ci\",\"columns\":\"name:d,sys_id:v,sys_class_name:d\",\"sysparm\":\"nameLIKE" + search + "^name!=NULL\",\"limit\":100,\"sortBy\":\"cmdb_ci.name\"}]}";
    }

    if (_Utils__WEBPACK_IMPORTED_MODULE_1__["debugLevel"]() === 1) {
      console.log(bodyData);
      console.log('loadCIOptions');
    }

    return this.apiClient.request({
      url: this.apiPath + '/v1/query/table',
      data: bodyData,
      method: 'POST'
    }).then(function (response) {
      _Utils__WEBPACK_IMPORTED_MODULE_1__["printDebug"]('print loadCIOptions response from SNOW');
      _Utils__WEBPACK_IMPORTED_MODULE_1__["printDebug"](response);

      var result = _this.apiClient.mapChecksToValuePlusSuffix(response);

      _Utils__WEBPACK_IMPORTED_MODULE_1__["printDebug"](result);
      return _this.apiClient.mapSuffixToLabel(result);
    });
  };

  SNOWManager.prototype.loadResourceOptions = function (selectedCIS, input) {
    var _this = this;

    var bodyData = '';
    var search = '';
    if (typeof input !== 'undefined') search = input;

    if (typeof selectedCIS !== 'undefined') {
      var ciArray = selectedCIS.map(function (option) {
        return option.value;
      });
      console.log(ciArray);
      bodyData = "{\"targets\":[{\"target\":\"sa_metric_map\",\"columns\":\"resource_id:d,resource_id:v\",\"sysparm\":\"cmdb_ciIN" + ciArray + "^resource_idLIKE" + search + "^resource_id!=NULL\",\"limit\":100,\"sortBy\":\"resource_id\"}]}";
    }

    return this.apiClient.request({
      url: this.apiPath + '/v1/query/table',
      data: bodyData,
      method: 'POST'
    }).then(function (response) {
      _Utils__WEBPACK_IMPORTED_MODULE_1__["printDebug"]('print loadResourceOptions response from SNOW');
      _Utils__WEBPACK_IMPORTED_MODULE_1__["printDebug"](response);
      var result = [{
        label: '*',
        value: '*'
      }];
      var options = result.concat(_this.apiClient.mapChecksToValue(response)); //Next line removes duplicate value's from the array

      options = options.filter(function (option, index, self) {
        return index === self.findIndex(function (t) {
          return t.value === option.value;
        });
      });
      return options;
    });
  };

  SNOWManager.prototype.loadMetricOptions = function (selectedCIS, input) {
    var _this = this;

    var bodyData = '';
    var search = '';
    if (typeof input !== 'undefined') search = input;

    if (typeof selectedCIS !== 'undefined') {
      var ciArray = selectedCIS.map(function (option) {
        return option.value;
      });
      console.log(ciArray);
      bodyData = "{\"targets\":[{\"target\":\"sa_metric_map\",\"columns\":\"metric_type_id.metric_type_tiny_name:d,metric_type_id:v\",\"sysparm\":\"cmdb_ciIN" + ciArray + "^metric_type_id.metric_type_tiny_nameLIKE" + search + "\",\"limit\":100,\"sortBy\":\"\"}]}";
    }

    return this.apiClient.request({
      url: this.apiPath + '/v1/query/table',
      data: bodyData,
      method: 'POST'
    }).then(function (response) {
      _Utils__WEBPACK_IMPORTED_MODULE_1__["printDebug"]('print loadMetricOptions response from SNOW');
      _Utils__WEBPACK_IMPORTED_MODULE_1__["printDebug"](response);
      var result = [{
        label: '*',
        value: '*'
      }];
      var options = result.concat(_this.apiClient.mapChecksToValue(response)); //Next line removes duplicate value's from the array

      options = options.filter(function (option, index, self) {
        return index === self.findIndex(function (t) {
          return t.value === option.value;
        });
      });
      return options;
    });
  };

  SNOWManager.prototype.loadColumnChoices = function (tableName, tableColumn, input) {
    var _this = this;

    var bodyData = "{\"targets\":[{\"target\":\"sys_choice\",\"columns\":\"label,value\",\"sysparm\":\"name=" + tableName + "^element!=NULL^elementLIKE" + tableColumn + "^labelLIKE" + input + "\",\"limit\":100}]}";

    if (_Utils__WEBPACK_IMPORTED_MODULE_1__["debugLevel"]() === 1) {
      console.log(bodyData);
      console.log('loadColumnChoices');
    }

    return this.apiClient.request({
      url: this.apiPath + '/v1/query/table',
      data: bodyData,
      method: 'POST'
    }).then(function (response) {
      _Utils__WEBPACK_IMPORTED_MODULE_1__["printDebug"]('print loadColumnChoices response from SNOW');
      _Utils__WEBPACK_IMPORTED_MODULE_1__["printDebug"](response);
      _Utils__WEBPACK_IMPORTED_MODULE_1__["printDebug"](_this.apiClient.mapChecksToValue(response));
      return _this.apiClient.mapChecksToValue(response);
    });
  };

  SNOWManager.prototype.loadTableColumns = function (tableName, addSuffix, input) {
    var _this = this;

    var search = '';

    if (typeof input === 'string') {
      search = input.trim();
    }

    if (typeof tableName === 'undefined') return [];
    var bodyData = "{\"targets\":[{\"table\":\"" + tableName + "\",\"search\":\"" + search + "\"}]}";

    if (_Utils__WEBPACK_IMPORTED_MODULE_1__["debugLevel"]() === 1) {
      console.log(bodyData);
    }

    return this.apiClient.request({
      url: this.apiPath + '/v1/select/table_columns',
      data: bodyData,
      method: 'POST'
    }).then(function (response) {
      _Utils__WEBPACK_IMPORTED_MODULE_1__["printDebug"]('print loadTableColumns response from SNOW');
      _Utils__WEBPACK_IMPORTED_MODULE_1__["printDebug"](response.data);
      return _this.apiClient.mapValueAsSuffix(response.data);
    });
  };

  SNOWManager.prototype.loadTableOptions = function (input) {
    var _this = this;

    var bodyData = "{\"targets\":[{\"target\":\"sys_db_object\",\"columns\":\"label,name\",\"sysparm\":\"nameLIKE" + input + "^ORlabelLIKE" + input + "\",\"limit\":100}]}";

    if (_Utils__WEBPACK_IMPORTED_MODULE_1__["debugLevel"]() === 1) {
      console.log(bodyData);
      console.log('loadTableOptions');
    }

    return this.apiClient.request({
      url: this.apiPath + '/v1/query/table',
      data: bodyData,
      method: 'POST'
    }).then(function (response) {
      _Utils__WEBPACK_IMPORTED_MODULE_1__["printDebug"]('print loadTableOptions response from SNOW');
      _Utils__WEBPACK_IMPORTED_MODULE_1__["printDebug"](response);

      var result = _this.apiClient.mapChecksToValue(response);

      _Utils__WEBPACK_IMPORTED_MODULE_1__["printDebug"](result);
      return _this.apiClient.mapValueAsSuffix(result);
    });
  };

  SNOWManager.prototype.getMetricsDefinition = function (target, timeFrom, timeTo, options) {
    var _this = this;

    if (_Utils__WEBPACK_IMPORTED_MODULE_1__["debugLevel"]() === 1) {
      console.log('isnide getMetricsDefinition');
      console.log('print target');
      console.log(target);
      console.log('print options scoped Vars');
      console.log(options.scopedVars);
    }

    var sysparam_query = _Utils__WEBPACK_IMPORTED_MODULE_1__["replaceTargetUsingTemplVarsCSV"](target.sysparam_query, options.scopedVars);
    var bodyData = '{"targets":[{"target":"' + sysparam_query + '"}]}';

    if (_Utils__WEBPACK_IMPORTED_MODULE_1__["debugLevel"]() === 1) {
      console.log('source after replace');
      console.log(sysparam_query);
      console.log(bodyData);
    }

    return this.apiClient.request({
      url: this.apiPath + '/v1/query/metric_mapping',
      data: bodyData,
      method: 'POST'
    }).then(function (response) {
      _Utils__WEBPACK_IMPORTED_MODULE_1__["printDebug"]('print getMetricsDefinition response from SNOW');
      _Utils__WEBPACK_IMPORTED_MODULE_1__["printDebug"](response);
      return _this.apiClient.mapTextResponseToFrame(response);
    });
  };

  SNOWManager.prototype.getMetricNamesInCIs = function (metricCategory, cis) {
    if (_Utils__WEBPACK_IMPORTED_MODULE_1__["debugLevel"]() === 1) {
      console.log('isnide getMetricsForCI');
      console.log('print target');
      console.log(metricCategory);
      console.log('print options scoped Vars');
      console.log(cis);
    }

    var ciTarget = _Utils__WEBPACK_IMPORTED_MODULE_1__["createRegEx"](cis);
    ciTarget = _Utils__WEBPACK_IMPORTED_MODULE_1__["trimRegEx"](ciTarget);
    var bodyData = '{"targets":[{"target":"' + ciTarget + '","metricType":"' + metricCategory + '"}]}';
    var cisURL = this.apiPath + '/v1/variable/metrics';

    if (_Utils__WEBPACK_IMPORTED_MODULE_1__["debugLevel"]() === 1) {
      console.log('source after replace');
      console.log(ciTarget);
      console.log(bodyData);
    }

    return this.apiClient.request({
      url: cisURL,
      data: bodyData,
      method: 'POST'
    }).then(this.apiClient.mapChecksToValue);
  };

  SNOWManager.prototype.getAlerts = function (target, timeFrom, timeTo, options, instanceName) {
    var _this = this;

    if (_Utils__WEBPACK_IMPORTED_MODULE_1__["debugLevel"]() === 1) {
      console.log('isnide GetAlerts');
      console.log('print target');
      console.log(target);
      console.log('print options scoped Vars');
      console.log(options.scopedVars);
    }

    var service = '';

    if (typeof target.selectedServiceList !== 'undefined') {
      service = _Utils__WEBPACK_IMPORTED_MODULE_1__["replaceTargetUsingTemplVarsCSV"](target.selectedServiceList.value, options.scopedVars);
    }

    var ci = '';

    if (typeof target.selectedSourceList !== 'undefined') {
      ci = _Utils__WEBPACK_IMPORTED_MODULE_1__["replaceTargetUsingTemplVarsCSV"](target.selectedSourceList.value, options.scopedVars);
    }

    var bodyTarget = service;
    var alertState = 'Active';
    var alertType = 'service';
    var sys_query = '';

    if (typeof target.selectedAlertStateList !== 'undefined') {
      alertState = target.selectedAlertStateList.value;
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

    if (typeof target.sysparam_query !== 'undefined') {
      if (target.sysparam_query) {
        sys_query = _Utils__WEBPACK_IMPORTED_MODULE_1__["replaceTargetUsingTemplVarsCSV"](target.sysparam_query, options.scopedVars);
      }
    }

    var limit = 9999;

    if (typeof target.rowLimit !== 'undefined') {
      if (target.rowLimit > 0 && target.rowLimit < 10000) {
        limit = target.rowLimit;
      }
    }

    var page = 0;
    console.log('typeof page: ' + _typeof(target.page));

    if (typeof target.page === 'number') {
      if (target.page >= 0) {
        page = target.page;
      }
    }

    var bodyData = "{\"targets\":[{\"target\":\"" + bodyTarget + "\",\"sysparm_query\":\"" + sys_query + "\",\"alertType\":\"" + alertType + "\",\"alertState\":\"" + alertState + "\",\"limit\":" + limit + ",\"page\":" + page + "}]}";

    if (_Utils__WEBPACK_IMPORTED_MODULE_1__["debugLevel"]() === 1) {
      console.log('source after replace');
      console.log(service);
      console.log(bodyData);
    }

    return this.apiClient.request({
      url: this.apiPath + '/v1/query/alerts',
      data: bodyData,
      method: 'POST'
    }).then(function (response) {
      _Utils__WEBPACK_IMPORTED_MODULE_1__["printDebug"]('print alerts response from SNOW');
      _Utils__WEBPACK_IMPORTED_MODULE_1__["printDebug"](response);
      response = _this.apiClient.appendInstanceNameToResponse(response, instanceName);
      _Utils__WEBPACK_IMPORTED_MODULE_1__["printDebug"](response);
      return _this.apiClient.mapTextResponseToFrame(response);
    });
  };

  SNOWManager.prototype.getChanges = function (target, timeFrom, timeTo, options) {
    var _this = this;

    if (_Utils__WEBPACK_IMPORTED_MODULE_1__["debugLevel"]() === 1) {
      console.log('inside getChanges');
      console.log('print target', target);
    }

    var service = '';

    if (typeof target.selectedServiceList !== 'undefined') {
      if (target.selectedServiceList !== null && target.selectedServiceList.length > 0) {
        service = _Utils__WEBPACK_IMPORTED_MODULE_1__["replaceTargetUsingTemplVarsCSV"](target.selectedServiceList.value, options.scopedVars);
      }
    }

    var ci = '';

    if (typeof target.selectedSourceList !== 'undefined') {
      if (target.selectedSourceList !== null && target.selectedSourceList.length > 0) {
        ci = _Utils__WEBPACK_IMPORTED_MODULE_1__["replaceTargetUsingTemplVarsCSV"](target.selectedSourceList.value, options.scopedVars);
      }
    }

    var bodyTarget = service;
    var changeType = 'service';

    if (typeof target.selectedChangeTypeList !== 'undefined') {
      if (target.selectedChangeTypeList.value === 'CI') {
        changeType = 'ci';
        bodyTarget = ci;
      } else if (target.selectedChangeTypeList.value === 'None') {
        changeType = 'none';
        bodyTarget = '';
      }
    }

    var sysparam = '';

    if (typeof target.sysparam_query !== 'undefined') {
      if (target.sysparam_query) sysparam = _Utils__WEBPACK_IMPORTED_MODULE_1__["replaceTargetUsingTemplVarsCSV"](target.sysparam_query, options.scopedVars);
    }

    var limit = 9999;

    if (typeof target.rowLimit !== 'undefined') {
      if (target.rowLimit > 0 && target.rowLimit < 10000) {
        limit = target.rowLimit;
      }
    }

    var page = 0;
    console.log('typeof page: ' + _typeof(target.page));

    if (typeof target.page === 'number') {
      if (target.page >= 0) {
        page = target.page;
      }
    }

    var bodyData = "{\"targets\":[{\"target\":\"" + bodyTarget + "\",\"sysparm_query\":\"" + sysparam + "\",\"alertType\":\"" + changeType + "\",\"limit\":" + limit + ",\"page\":" + page + "}]}";

    if (_Utils__WEBPACK_IMPORTED_MODULE_1__["debugLevel"]() === 1) {
      console.log('bodyData: ', bodyData);
    }

    return this.apiClient.request({
      url: this.apiPath + '/v1/query/changes',
      data: bodyData,
      method: 'POST'
    }).then(function (response) {
      _Utils__WEBPACK_IMPORTED_MODULE_1__["printDebug"]('print changes response from SNOW');
      _Utils__WEBPACK_IMPORTED_MODULE_1__["printDebug"](response);
      return _this.apiClient.mapTextResponseToFrame(response);
    });
  };

  SNOWManager.prototype.getAllACCAgents = function (target, timeFrom, timeTo, options) {
    var _this = this;

    if (_Utils__WEBPACK_IMPORTED_MODULE_1__["debugLevel"]() === 1) {
      console.log('inside getAllACCAgents');
      console.log('print target', target);
    }

    var agentFilter = '';
    var metricNamesArray = [];
    var metricNames = '';
    var sysparam_query = '';
    var filterType = '';

    if (typeof target.selectedAgentFilter !== 'undefined') {
      if (target.selectedAgentFilter.value) agentFilter = _Utils__WEBPACK_IMPORTED_MODULE_1__["replaceTargetUsingTemplVars"](target.selectedAgentFilter.value, options.scopedVars);
    }

    if (typeof target.selectedMetricNameList !== 'undefined') {
      target.selectedMetricNameList.map(function (listItem) {
        metricNamesArray.push(_Utils__WEBPACK_IMPORTED_MODULE_1__["replaceTargetUsingTemplVars"](listItem.value, options.scopedVars));
      });
      metricNames = _Utils__WEBPACK_IMPORTED_MODULE_1__["createRegEx"](metricNamesArray);
    }

    if (_typeof(target.sysparam_query)) {
      if (target.sysparam_query) sysparam_query = _Utils__WEBPACK_IMPORTED_MODULE_1__["replaceTargetUsingTemplVarsCSV"](target.sysparam_query, options.scopedVars);
    }

    if (typeof target.selectedAgentFilterType !== 'undefined') {
      if (target.selectedAgentFilterType) filterType = target.selectedAgentFilterType.value.toLowerCase();
    }

    var limit = 9999;

    if (typeof target.rowLimit !== 'undefined') {
      if (target.rowLimit > 0 && target.rowLimit < 10000) {
        limit = target.rowLimit;
      }
    }

    var page = 0;
    console.log('typeof page: ' + _typeof(target.page));

    if (typeof target.page === 'number') {
      if (target.page >= 0) {
        page = target.page;
      }
    }

    var bodyData = "{\"targets\":[{\"target\":\"" + agentFilter + "\",\"metricName\":\"" + metricNames + "\",\"sysparm_query\":\"" + sysparam_query + "\",\"filterType\":\"" + filterType + "\",\"limit\":" + limit + ",\"page\":" + page + "}]}";
    console.log('Body data: ', bodyData);
    return this.apiClient.request({
      url: this.apiPath + ("/v1/query/acc_agents?startTime=" + timeFrom + "&endTime=" + timeTo),
      data: bodyData,
      method: 'POST'
    }).then(function (response) {
      console.log('ACC response: ', response);
      return _this.apiClient.mapTextResponseToFrame(response);
    });
  };

  SNOWManager.prototype.getTopologyCISummary = function (ciName) {
    var bodyData = '{"targets":[{"target":"' + ciName + '"}]}';

    if (_Utils__WEBPACK_IMPORTED_MODULE_1__["debugLevel"]() === 1) {
      console.log('source after replace');
      console.log(bodyData);
    }

    return this.apiClient.request({
      url: this.apiPath + '/query/ci_summary',
      data: bodyData,
      method: 'POST'
    }).then(function (response) {
      _Utils__WEBPACK_IMPORTED_MODULE_1__["printDebug"]('print alerts response from SNOW');
      _Utils__WEBPACK_IMPORTED_MODULE_1__["printDebug"](response);
      return response.data;
    });
  }; //this function support single CI or multiple CIs using regex


  SNOWManager.prototype.getCISummary = function (target, options) {
    var _this = this;

    var ci = '';

    if (typeof target.selectedSourceList !== 'undefined') {
      ci = _Utils__WEBPACK_IMPORTED_MODULE_1__["replaceTargetUsingTemplVarsCSV"](target.selectedSourceList.value, options.scopedVars);
    }

    var sysparam = '';

    if (typeof target.sysparam_query !== 'undefined') {
      if (target.sysparam_query) {
        sysparam = _Utils__WEBPACK_IMPORTED_MODULE_1__["replaceTargetUsingTemplVarsCSV"](target.sysparam_query, options.scopedVars);
      }
    }

    var bodyData = '{"targets":[{"target":"' + ci + '","sysparm_query":"' + sysparam + '"}]}';

    if (_Utils__WEBPACK_IMPORTED_MODULE_1__["debugLevel"]() === 1) {
      console.log('source after replace');
      console.log(bodyData);
    }

    return this.apiClient.request({
      url: this.apiPath + '/v1/query/ci_summary',
      data: bodyData,
      method: 'POST'
    }).then(function (response) {
      _Utils__WEBPACK_IMPORTED_MODULE_1__["printDebug"]('print alerts response from SNOW');
      _Utils__WEBPACK_IMPORTED_MODULE_1__["printDebug"](response);
      return _this.apiClient.mapTextResponseToFrame(response);
    });
  };

  SNOWManager.prototype.getMetricAnomalyOptions = function () {
    var queryOptions = [{
      label: 'true',
      value: 'true'
    }, {
      label: 'false',
      value: 'false'
    }];
    return queryOptions;
  };

  SNOWManager.prototype.getAggregateTypeOptions = function () {
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
  };

  SNOWManager.prototype.getAlertStateOptions = function () {
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
  };

  SNOWManager.prototype.getAlertTypeOptions = function () {
    var queryOptions = [{
      label: 'CI',
      value: 'CI',
      description: 'Get Alerts at the CI level'
    }, {
      label: 'Service',
      value: 'Service',
      description: 'Get Alerts at the Service level'
    }, {
      label: 'OS',
      value: 'OS',
      description: 'Get Alerts for all Agents in the class'
    }, {
      label: 'None',
      value: 'None',
      description: 'Ignore CI selection and use sysparam_query'
    }];
    return queryOptions;
  };

  SNOWManager.prototype.getAgentFilterTypeOptions = function () {
    var queryOptions = [{
      label: 'OS',
      value: 'OS',
      description: 'Get all agents matching the OS'
    }, {
      label: 'CI',
      value: 'CI',
      description: 'Get all agents matching the CI'
    }];
    return queryOptions;
  };

  SNOWManager.prototype.getChangeTypeOptions = function () {
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
  };

  SNOWManager.prototype.getAdminQueryOptions = function () {
    var queryOptions = [{
      label: 'Metrics Definition',
      value: 'Metrics Definition',
      description: ''
    }];
    return queryOptions;
  };

  SNOWManager.prototype.getAgentMetricOptions = function () {
    var queryOptions = [{
      label: 'cpu',
      value: 'cpu'
    }, {
      label: 'memory',
      value: 'memory'
    }, {
      label: 'disk',
      value: 'disk'
    }];
    return queryOptions;
  };

  SNOWManager.prototype.getSysparamTypeOptions = function () {
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
      label: 'is same as',
      value: 'SAMEAS',
      description: 'SAMEAS'
    }, {
      label: 'is different',
      value: 'NSAMEAS',
      description: 'NSAMEAS'
    }];
    return queryOptions;
  };

  SNOWManager.prototype.getTrendByOptions = function () {
    var queryOptions = [{
      label: 'Minute',
      value: 'minute'
    }, {
      label: 'Hour',
      value: 'hour'
    }];
    return queryOptions;
  };

  return SNOWManager;
}();



/***/ }),

/***/ "./SplitQueryEditor.tsx":
/*!******************************!*\
  !*** ./SplitQueryEditor.tsx ***!
  \******************************/
/*! exports provided: SplitQueryEditor */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SplitQueryEditor", function() { return SplitQueryEditor; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../node_modules/tslib/tslib.es6.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash */ "lodash");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @grafana/ui */ "@grafana/ui");
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./types */ "./types.ts");
/* harmony import */ var Components__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! Components */ "./Components.tsx");
/* harmony import */ var _QueryEditorStyles_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./QueryEditorStyles.css */ "./QueryEditorStyles.css");
/* harmony import */ var _QueryEditorStyles_css__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_QueryEditorStyles_css__WEBPACK_IMPORTED_MODULE_6__);







var SplitQueryEditor = function SplitQueryEditor(_a) {
  var _b;

  var query = _a.query,
      onChange = _a.onChange,
      datasource = _a.datasource;
  var q = Object(lodash__WEBPACK_IMPORTED_MODULE_1__["defaults"])(query, _types__WEBPACK_IMPORTED_MODULE_4__["defaultQuery"]);
  var metricAnomalyOptions = datasource.snowConnection.getMetricAnomalyOptions();
  var alertTypeOptions = datasource.snowConnection.getAlertTypeOptions();
  var alertStateOptions = datasource.snowConnection.getAlertStateOptions();
  var changeTypeOptions = datasource.snowConnection.getChangeTypeOptions();
  var adminOptions = datasource.snowConnection.getAdminQueryOptions();
  var agentFilterTypeOptions = datasource.snowConnection.getAgentFilterTypeOptions();
  var agentMetricOptions = datasource.snowConnection.getAgentMetricOptions();
  var aggregationTypeOptions = datasource.snowConnection.getAggregateTypeOptions();
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
        var _a;

        resolve(datasource.snowConnection.loadCIOptions((_a = q.selectedServiceList) === null || _a === void 0 ? void 0 : _a.value, input));
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

  var loadTableColumnOptions = function loadTableColumnOptions(addSuffix, input) {
    return new Promise(function (resolve) {
      setTimeout(function () {
        var _a;

        resolve(datasource.snowConnection.loadTableColumns((_a = q.tableName) === null || _a === void 0 ? void 0 : _a.value, addSuffix, input));
      }, 500);
    });
  };

  var loadColumnChoices = function loadColumnChoices(index, input) {
    return new Promise(function (resolve) {
      setTimeout(function () {
        var _a, _b;

        resolve(datasource.snowConnection.loadColumnChoices((_a = q.tableName) === null || _a === void 0 ? void 0 : _a.value, (_b = q.sysparam_option1[index]) === null || _b === void 0 ? void 0 : _b.value, input));
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
    var _a;

    onChange(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, q), (_a = {}, _a[key] = value, _a)));
  };

  var updateTwoQueries = function updateTwoQueries(values) {
    console.log("values: ", values);
    var newQuery = q;
    console.log("oldQuery: ", newQuery);

    for (var i = 0; i < values.length; i++) {
      newQuery[values[i].key] = values[i].value;
    }

    console.log("newQuery: ", newQuery);
    onChange(newQuery);
  };

  var updateSysparam = function updateSysparam(key, index, value) {
    var _a;

    var newValue = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__spreadArray"])([], Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__read"])(q[key]));

    newValue[index] = value;
    console.log('new: ', newValue[index]);
    onChange(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, q), (_a = {}, _a[key] = newValue, _a)));
  };

  var getQueryCategories = function getQueryCategories() {
    var categoryOptions = [];

    for (var key in options) {
      var value = options[key];
      categoryOptions.push({
        label: value.title,
        value: key,
        description: value.description
      });
    }

    return categoryOptions;
  };

  var options = {
    Metrics: {
      title: 'Metrics',
      description: 'Get Timeseries metrics',
      content: react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_3___default.a.Fragment, null, react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(Components__WEBPACK_IMPORTED_MODULE_5__["SelectService"], {
        loadOptions: loadServiceOptions,
        value: q.selectedServiceList,
        updateQuery: updateQuery
      }), react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(Components__WEBPACK_IMPORTED_MODULE_5__["SelectCI"], {
        loadOptions: loadCIOptions,
        value: q.selectedSourceList,
        updateQuery: updateQuery
      }), react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(Components__WEBPACK_IMPORTED_MODULE_5__["SelectResource"], {
        loadOptions: loadResourceOptions,
        value: q.selectedMetricTypeList,
        updateQuery: updateQuery
      }), react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(Components__WEBPACK_IMPORTED_MODULE_5__["SelectMetric"], {
        loadOptions: loadMetricOptions,
        value: q.selectedMetricNameList,
        updateQuery: updateQuery
      }), react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(Components__WEBPACK_IMPORTED_MODULE_5__["SelectMetricAnomaly"], {
        options: metricAnomalyOptions,
        value: q.selectedMetricAnomalyList,
        updateQuery: updateQuery
      }), react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(Components__WEBPACK_IMPORTED_MODULE_5__["InputSysparam"], {
        updateQuery: updateQuery,
        defaultValue: q.sysparam_query
      }))
    },
    Alerts: {
      title: 'Alerts',
      description: 'Get Alerts',
      content: react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_3___default.a.Fragment, null, react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(Components__WEBPACK_IMPORTED_MODULE_5__["SelectService"], {
        loadOptions: loadServiceOptions,
        value: q.selectedServiceList,
        updateQuery: updateQuery
      }), react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(Components__WEBPACK_IMPORTED_MODULE_5__["SelectCI"], {
        loadOptions: loadCIOptions,
        value: q.selectedSourceList,
        updateQuery: updateQuery
      }), react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(Components__WEBPACK_IMPORTED_MODULE_5__["SelectAlertType"], {
        options: alertTypeOptions,
        value: q.selectedAlertTypeList,
        updateQuery: updateQuery
      }), react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(Components__WEBPACK_IMPORTED_MODULE_5__["SelectAlertState"], {
        options: alertStateOptions,
        value: q.selectedAlertStateList,
        updateQuery: updateQuery
      }), react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(Components__WEBPACK_IMPORTED_MODULE_5__["InputSysparam"], {
        updateQuery: updateQuery,
        defaultValue: q.sysparam_query
      }), react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(Components__WEBPACK_IMPORTED_MODULE_5__["InputLimit"], {
        defaultValue: q.rowLimit,
        updateQuery: updateQuery
      }), react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(Components__WEBPACK_IMPORTED_MODULE_5__["InputPage"], {
        defaultValue: q.page,
        updateQuery: updateQuery
      }))
    },
    Changes: {
      title: 'Changes',
      description: 'Get Changes',
      content: react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_3___default.a.Fragment, null, react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(Components__WEBPACK_IMPORTED_MODULE_5__["SelectService"], {
        loadOptions: loadServiceOptions,
        value: q.selectedServiceList,
        updateQuery: updateQuery
      }), react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(Components__WEBPACK_IMPORTED_MODULE_5__["SelectCI"], {
        loadOptions: loadCIOptions,
        value: q.selectedSourceList,
        updateQuery: updateQuery
      }), react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(Components__WEBPACK_IMPORTED_MODULE_5__["SelectChangeType"], {
        options: changeTypeOptions,
        value: q.selectedChangeTypeList,
        updateQuery: updateQuery
      }), react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(Components__WEBPACK_IMPORTED_MODULE_5__["InputSysparam"], {
        updateQuery: updateQuery,
        defaultValue: q.sysparam_query
      }), react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(Components__WEBPACK_IMPORTED_MODULE_5__["InputLimit"], {
        defaultValue: q.rowLimit,
        updateQuery: updateQuery
      }), react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(Components__WEBPACK_IMPORTED_MODULE_5__["InputPage"], {
        defaultValue: q.page,
        updateQuery: updateQuery
      }))
    },
    Topology: {
      title: 'Topology',
      description: 'Get Topology',
      content: react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_3___default.a.Fragment, null, react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(Components__WEBPACK_IMPORTED_MODULE_5__["SelectStartingPoint"], {
        loadOptions: loadServiceOptions,
        value: q.selectedServiceList,
        updateQuery: updateQuery
      }), react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(Components__WEBPACK_IMPORTED_MODULE_5__["InputParentDepth"], {
        updateQuery: updateQuery,
        defaultValue: q.topology_parent_depth
      }), react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(Components__WEBPACK_IMPORTED_MODULE_5__["InputChildDepth"], {
        updateQuery: updateQuery,
        defaultValue: q.topology_child_depth
      }), react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(Components__WEBPACK_IMPORTED_MODULE_5__["InputSysparam"], {
        updateQuery: updateQuery,
        defaultValue: q.sysparam_query
      }))
    },
    Admin: {
      title: 'Admin',
      description: 'Definitions and Admin Queries',
      content: react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_3___default.a.Fragment, null, react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(Components__WEBPACK_IMPORTED_MODULE_5__["SelectAdminCategory"], {
        options: adminOptions,
        value: q.selectedAdminCategoryList,
        updateQuery: updateQuery
      }), react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(Components__WEBPACK_IMPORTED_MODULE_5__["InputSysparam"], {
        updateQuery: updateQuery,
        defaultValue: q.sysparam_query
      }))
    },
    CI_Summary: {
      title: 'CI Summary',
      description: 'CI Summary',
      content: react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_3___default.a.Fragment, null, react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(Components__WEBPACK_IMPORTED_MODULE_5__["SelectService"], {
        loadOptions: loadServiceOptions,
        value: q.selectedServiceList,
        updateQuery: updateQuery
      }), react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(Components__WEBPACK_IMPORTED_MODULE_5__["SelectCI"], {
        loadOptions: loadCIOptions,
        value: q.selectedSourceList,
        updateQuery: updateQuery
      }), react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(Components__WEBPACK_IMPORTED_MODULE_5__["InputSysparam"], {
        updateQuery: updateQuery,
        defaultValue: q.sysparam_query
      }))
    },
    Agents: {
      title: 'Agents',
      description: 'Get Agent information',
      content: react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_3___default.a.Fragment, null, react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(Components__WEBPACK_IMPORTED_MODULE_5__["InputMetric"], {
        updateQuery: updateQuery,
        value: q.selectedMetricNameList,
        options: agentMetricOptions
      }), react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(Components__WEBPACK_IMPORTED_MODULE_5__["SelectAgentFilter"], {
        typeOptions: agentFilterTypeOptions,
        typeValue: q.selectedAgentFilterType,
        updateQuery: updateQuery,
        loadOptions: loadCIOptions,
        value: q.selectedAgentFilter
      }), react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(Components__WEBPACK_IMPORTED_MODULE_5__["InputSysparam"], {
        updateQuery: updateQuery,
        defaultValue: q.sysparam_query
      }), react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(Components__WEBPACK_IMPORTED_MODULE_5__["InputLimit"], {
        defaultValue: q.rowLimit,
        updateQuery: updateQuery
      }), react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(Components__WEBPACK_IMPORTED_MODULE_5__["InputPage"], {
        defaultValue: q.page,
        updateQuery: updateQuery
      }))
    },
    Live_Agent_Data: {
      title: 'Live Agent Data',
      description: 'Get Live Data from your ACC Agents',
      content: react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_3___default.a.Fragment, null, react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(Components__WEBPACK_IMPORTED_MODULE_5__["InputOsquery"], {
        updateQuery: updateQuery,
        defaultValue: q.live_osquery
      }))
    },
    Table: {
      title: 'Table',
      description: 'Choose your own table to gather data from',
      content: react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_3___default.a.Fragment, null, react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(Components__WEBPACK_IMPORTED_MODULE_5__["SelectTableName"], {
        updateQuery: updateQuery,
        loadTableOptions: loadTableOptions,
        value: q.tableName
      }), react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(Components__WEBPACK_IMPORTED_MODULE_5__["SelectTableColumn"], {
        updateQuery: updateQuery,
        loadOptions: loadTableColumnOptions,
        value: q.selectedtableColumns
      }), react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(Components__WEBPACK_IMPORTED_MODULE_5__["SelectSysparam"], {
        value: q.sysparam_option1,
        loadColumns: loadTableColumnOptions,
        updateQuery: updateQuery,
        sysparamTypeOptions: sysparamTypeOptions,
        sysparamTypeValue: q.sysparam_option2,
        loadChoices: loadColumnChoices,
        choiceValue: q.sysparam_option3,
        sysparamCount: q.sysparam_count,
        updateSysparam: updateSysparam,
        seperatorValue: q.sysparam_option4
      }), react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(Components__WEBPACK_IMPORTED_MODULE_5__["SelectSortBy"], {
        loadOptions: loadTableColumnOptions,
        value: q.sortBy,
        updateQuery: updateQuery
      }), react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(Components__WEBPACK_IMPORTED_MODULE_5__["InputLimit"], {
        defaultValue: q.rowLimit,
        updateQuery: updateQuery
      }), react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(Components__WEBPACK_IMPORTED_MODULE_5__["InputPage"], {
        defaultValue: q.page,
        updateQuery: updateQuery
      }))
    },
    Row_Count: {
      title: 'Row Count',
      description: 'Get row count from query',
      content: react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_3___default.a.Fragment, null, react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(Components__WEBPACK_IMPORTED_MODULE_5__["SelectTableName"], {
        updateQuery: updateQuery,
        loadTableOptions: loadTableOptions,
        value: q.tableName
      }), react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(Components__WEBPACK_IMPORTED_MODULE_5__["InputSysparam"], {
        updateQuery: updateQuery,
        defaultValue: q.sysparam_query
      }))
    },
    Aggregate: {
      title: 'Aggregate',
      description: 'Group by and apply aggregate functions to table data',
      content: react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_3___default.a.Fragment, null, react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(Components__WEBPACK_IMPORTED_MODULE_5__["SelectTableName"], {
        updateQuery: updateQuery,
        loadTableOptions: loadTableOptions,
        value: q.tableName
      }), react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(Components__WEBPACK_IMPORTED_MODULE_5__["InputGroupBy"], {
        updateQuery: updateQuery,
        defaultValue: q.groupBy
      }), react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(Components__WEBPACK_IMPORTED_MODULE_5__["SelectAggregate"], {
        options: aggregationTypeOptions,
        value: q.selectedAggregateType,
        updateQuery: updateQuery,
        defaultColumnValue: q.aggregateColumn
      }), react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(Components__WEBPACK_IMPORTED_MODULE_5__["InputSysparam"], {
        updateQuery: updateQuery,
        defaultValue: q.sysparam_query
      }))
    },
    Geohash_Map: {
      title: 'GeoHash Map',
      description: 'Get map data from AWS or Azure',
      content: react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_3___default.a.Fragment, null, react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(Components__WEBPACK_IMPORTED_MODULE_5__["SelectTableName"], {
        updateQuery: updateQuery,
        loadTableOptions: loadTableOptions,
        value: q.tableName
      }), react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(Components__WEBPACK_IMPORTED_MODULE_5__["InputGroupBy"], {
        updateQuery: updateQuery,
        defaultValue: q.groupBy
      }), react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(Components__WEBPACK_IMPORTED_MODULE_5__["InputSysparam"], {
        updateQuery: updateQuery,
        defaultValue: q.sysparam_query
      }))
    },
    Log_Data: {
      title: 'Log Data',
      description: 'Get log data',
      content: react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_3___default.a.Fragment, null, react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(Components__WEBPACK_IMPORTED_MODULE_5__["SelectSysparam"], {
        value: q.sysparam_option1,
        loadColumns: loadTableColumnOptions,
        updateQuery: updateQuery,
        sysparamTypeOptions: sysparamTypeOptions,
        sysparamTypeValue: q.sysparam_option2,
        loadChoices: loadColumnChoices,
        choiceValue: q.sysparam_option3,
        sysparamCount: q.sysparam_count,
        updateSysparam: updateSysparam,
        seperatorValue: q.sysparam_option4
      }), react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(Components__WEBPACK_IMPORTED_MODULE_5__["InputElasticSearch"], {
        updateQuery: updateQuery,
        defaultValue: q.elasticSearch
      }), react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(Components__WEBPACK_IMPORTED_MODULE_5__["SelectSortBy"], {
        loadOptions: loadTableColumnOptions,
        value: q.sortBy,
        updateQuery: updateQuery
      }), react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(Components__WEBPACK_IMPORTED_MODULE_5__["InputLimit"], {
        defaultValue: q.rowLimit,
        updateQuery: updateQuery
      }), react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(Components__WEBPACK_IMPORTED_MODULE_5__["InputPage"], {
        defaultValue: q.page,
        updateQuery: updateQuery
      }))
    },
    Trend_Data: {
      title: 'Trend Data',
      description: 'Get timeseries data based on a time trend',
      content: react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_3___default.a.Fragment, null, react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(Components__WEBPACK_IMPORTED_MODULE_5__["SelectTableName"], {
        updateQuery: updateQuery,
        loadTableOptions: loadTableOptions,
        value: q.tableName
      }), react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(Components__WEBPACK_IMPORTED_MODULE_5__["SelectSysparam"], {
        value: q.sysparam_option1,
        loadColumns: loadTableColumnOptions,
        updateQuery: updateQuery,
        sysparamTypeOptions: sysparamTypeOptions,
        sysparamTypeValue: q.sysparam_option2,
        loadChoices: loadColumnChoices,
        choiceValue: q.sysparam_option3,
        sysparamCount: q.sysparam_count,
        updateSysparam: updateSysparam,
        seperatorValue: q.sysparam_option4
      }), react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(Components__WEBPACK_IMPORTED_MODULE_5__["InputElasticSearch"], {
        updateQuery: updateQuery,
        defaultValue: q.elasticSearch
      }), react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(Components__WEBPACK_IMPORTED_MODULE_5__["SelectTrend"], {
        columnLoadOptions: loadTableColumnOptions,
        columnValue: q.selectedTrendColumn,
        updateQuery: updateQuery,
        trendByOptions: trendByOptions,
        trendByValue: q.selectedTrendBy,
        periodValue: q.trendPeriod
      }))
    },
    Outage_Status: {
      title: 'Outage Status',
      description: 'Gathers business service status over the last 90 days',
      content: react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_3___default.a.Fragment, null, react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(Components__WEBPACK_IMPORTED_MODULE_5__["SelectService"], {
        loadOptions: loadServiceOptions,
        value: q.selectedServiceList,
        updateQuery: updateQuery
      }), react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(Components__WEBPACK_IMPORTED_MODULE_5__["ShowPercentSwitch"], {
        value: q.showPercent,
        updateQuery: updateQuery
      }), react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(Components__WEBPACK_IMPORTED_MODULE_5__["InputSysparam"], {
        updateQuery: updateQuery,
        defaultValue: q.sysparam_query
      }), react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(Components__WEBPACK_IMPORTED_MODULE_5__["InputLimit"], {
        defaultValue: q.rowLimit,
        updateQuery: updateQuery
      }), react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(Components__WEBPACK_IMPORTED_MODULE_5__["InputPage"], {
        defaultValue: q.page,
        updateQuery: updateQuery
      }))
    },
    Anomaly: {
      title: 'Anomaly',
      description: 'Parse values out of Alert Anomalies table',
      content: react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_3___default.a.Fragment, null, react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(Components__WEBPACK_IMPORTED_MODULE_5__["SelectTableName"], {
        updateQuery: updateQuery,
        loadTableOptions: loadTableOptions,
        value: q.tableName
      }), react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(Components__WEBPACK_IMPORTED_MODULE_5__["SelectTableColumn"], {
        updateQuery: updateQuery,
        loadOptions: loadTableColumnOptions,
        value: q.selectedtableColumns
      }), react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(Components__WEBPACK_IMPORTED_MODULE_5__["SelectSysparam"], {
        value: q.sysparam_option1,
        loadColumns: loadTableColumnOptions,
        updateQuery: updateQuery,
        sysparamTypeOptions: sysparamTypeOptions,
        sysparamTypeValue: q.sysparam_option2,
        loadChoices: loadColumnChoices,
        choiceValue: q.sysparam_option3,
        sysparamCount: q.sysparam_count,
        updateSysparam: updateSysparam,
        seperatorValue: q.sysparam_option4
      }), react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(Components__WEBPACK_IMPORTED_MODULE_5__["SelectSortBy"], {
        loadOptions: loadTableColumnOptions,
        value: q.sortBy,
        updateQuery: updateQuery
      }), react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(Components__WEBPACK_IMPORTED_MODULE_5__["InputLimit"], {
        defaultValue: q.rowLimit,
        updateQuery: updateQuery
      }), react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(Components__WEBPACK_IMPORTED_MODULE_5__["InputPage"], {
        defaultValue: q.page,
        updateQuery: updateQuery
      }))
    }
  };
  return react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_3___default.a.Fragment, null, react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["InlineFieldRow"], {
    style: {
      paddingTop: '8px'
    }
  }, react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["InlineField"], {
    label: "Query Category",
    labelWidth: 20
  }, react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["Select"], {
    className: "min-width-10 max-width-30",
    options: getQueryCategories(),
    value: q.selectedQueryCategory,
    onChange: function onChange(e) {
      if (e.label === 'Anomaly') {
        updateTwoQueries([{
          key: "tableName",
          value: {
            label: 'Alert Anomaly',
            value: 'em_alert_anomaly',
            description: 'em_alert_anomaly'
          }
        }, {
          key: "selectedQueryCategory",
          value: e
        }]);
      } else {
        updateQuery('selectedQueryCategory', e);
      }
    },
    menuPlacement: "bottom"
  }))), options[(_b = q.selectedQueryCategory.value) !== null && _b !== void 0 ? _b : ''].content);
};

/***/ }),

/***/ "./Utils.ts":
/*!******************!*\
  !*** ./Utils.ts ***!
  \******************/
/*! exports provided: convertMsTimeToMin, replaceTargetUsingTemplVars, replaceTargetUsingTemplVarsCSV, debugLevel, parseResponse, parseAnomResponse, printDebug, getFiledType, trimRegEx, createRegEx */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "convertMsTimeToMin", function() { return convertMsTimeToMin; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "replaceTargetUsingTemplVars", function() { return replaceTargetUsingTemplVars; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "replaceTargetUsingTemplVarsCSV", function() { return replaceTargetUsingTemplVarsCSV; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "debugLevel", function() { return debugLevel; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "parseResponse", function() { return parseResponse; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "parseAnomResponse", function() { return parseAnomResponse; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "printDebug", function() { return printDebug; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getFiledType", function() { return getFiledType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "trimRegEx", function() { return trimRegEx; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createRegEx", function() { return createRegEx; });
/* harmony import */ var _grafana_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @grafana/runtime */ "@grafana/runtime");
/* harmony import */ var _grafana_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_grafana_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _grafana_data__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @grafana/data */ "@grafana/data");
/* harmony import */ var _grafana_data__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_grafana_data__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _Constants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Constants */ "./Constants.ts");


function convertMsTimeToMin(value) {
  return Math.round(value.getTime() / (1000 * 60));
}

function replaceTargetUsingTemplVars(target, scopedVars) {
  var replacedValue = Object(_grafana_runtime__WEBPACK_IMPORTED_MODULE_0__["getTemplateSrv"])().replace(target, scopedVars, 'csv');
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
  return Object(_grafana_runtime__WEBPACK_IMPORTED_MODULE_0__["getTemplateSrv"])().replace(target, scopedVars, 'csv');
}
function debugLevel() {
  return 1;
}
function parseResponse(timeseries, seriesName, target, valueMappings, fieldType) {
  var timeFiled = {
    name: _grafana_data__WEBPACK_IMPORTED_MODULE_1__["TIME_SERIES_TIME_FIELD_NAME"],
    type: _grafana_data__WEBPACK_IMPORTED_MODULE_1__["FieldType"].time,
    config: {
      custom: {}
    },
    values: new _grafana_data__WEBPACK_IMPORTED_MODULE_1__["ArrayVector"](timeseries.map(function (p) {
      return p[1];
    }))
  };
  var values;

  if (fieldType === _grafana_data__WEBPACK_IMPORTED_MODULE_1__["FieldType"].string) {
    values = new _grafana_data__WEBPACK_IMPORTED_MODULE_1__["ArrayVector"](timeseries.map(function (p) {
      return p[0];
    }));
  } else {
    values = new _grafana_data__WEBPACK_IMPORTED_MODULE_1__["ArrayVector"](timeseries.map(function (p) {
      return p[0];
    }));
  }

  var valueFiled = {
    name: _grafana_data__WEBPACK_IMPORTED_MODULE_1__["TIME_SERIES_VALUE_FIELD_NAME"],
    type: fieldType !== null && fieldType !== void 0 ? fieldType : _grafana_data__WEBPACK_IMPORTED_MODULE_1__["FieldType"].number,
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
    name: _grafana_data__WEBPACK_IMPORTED_MODULE_1__["TIME_SERIES_TIME_FIELD_NAME"],
    type: _grafana_data__WEBPACK_IMPORTED_MODULE_1__["FieldType"].time,
    config: {
      custom: {}
    },
    values: new _grafana_data__WEBPACK_IMPORTED_MODULE_1__["ArrayVector"](timeseries.map(function (p) {
      return p.x;
    }))
  };
  var values;

  if (fieldType === _grafana_data__WEBPACK_IMPORTED_MODULE_1__["FieldType"].string) {
    values = new _grafana_data__WEBPACK_IMPORTED_MODULE_1__["ArrayVector"](timeseries.map(function (p) {
      return p.y;
    }));
  } else {
    values = new _grafana_data__WEBPACK_IMPORTED_MODULE_1__["ArrayVector"](timeseries.map(function (p) {
      return p.y;
    }));
  }

  var valueFiled = {
    name: _grafana_data__WEBPACK_IMPORTED_MODULE_1__["TIME_SERIES_VALUE_FIELD_NAME"],
    type: fieldType !== null && fieldType !== void 0 ? fieldType : _grafana_data__WEBPACK_IMPORTED_MODULE_1__["FieldType"].number,
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
} //this function is used to map a text based field type to its type

function getFiledType(value, filedName) {
  //console.log(filedName);
  if (_Constants__WEBPACK_IMPORTED_MODULE_2__["TIME_FILED_NAMES"].includes(filedName)) {
    return _grafana_data__WEBPACK_IMPORTED_MODULE_1__["FieldType"].time;
  }

  if (typeof value === 'number') {
    return _grafana_data__WEBPACK_IMPORTED_MODULE_1__["FieldType"].number;
  }

  return _grafana_data__WEBPACK_IMPORTED_MODULE_1__["FieldType"].string;
} //remove () from RegEx at position 1 and length-2

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
/*! exports provided: VariableQueryEditor */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VariableQueryEditor", function() { return VariableQueryEditor; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../node_modules/tslib/tslib.es6.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);


var VariableQueryEditor = function VariableQueryEditor(_a) {
  var onChange = _a.onChange,
      query = _a.query;

  var _b = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__read"])(Object(react__WEBPACK_IMPORTED_MODULE_1__["useState"])(query), 2),
      state = _b[0],
      setState = _b[1];

  var saveQuery = function saveQuery() {
    onChange(state, state.rawQuery + " (" + state.namespace + ")");
  };

  var handleChange = function handleChange(event) {
    var _a;

    return setState(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, state), (_a = {}, _a[event.currentTarget.name] = event.currentTarget.value, _a)));
  };

  return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_1___default.a.Fragment, null, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: "gf-form"
  }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", {
    className: "gf-form-label width-10"
  }, "Namespace"), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("input", {
    name: "namespace",
    className: "gf-form-input",
    onBlur: saveQuery,
    onChange: handleChange,
    value: state.namespace
  })), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: "gf-form"
  }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", {
    className: "gf-form-label width-10"
  }, "Query"), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("input", {
    name: "rawQuery",
    className: "gf-form-input",
    onBlur: saveQuery,
    onChange: handleChange,
    value: state.rawQuery
  })));
};

/***/ }),

/***/ "./module.ts":
/*!*******************!*\
  !*** ./module.ts ***!
  \*******************/
/*! exports provided: plugin */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "plugin", function() { return plugin; });
/* harmony import */ var _grafana_data__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @grafana/data */ "@grafana/data");
/* harmony import */ var _grafana_data__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_grafana_data__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _DataSource__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./DataSource */ "./DataSource.ts");
/* harmony import */ var _ConfigEditor__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ConfigEditor */ "./ConfigEditor.tsx");
/* harmony import */ var _QueryEditor__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./QueryEditor */ "./QueryEditor.tsx");
/* harmony import */ var _VariableQueryEditor__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./VariableQueryEditor */ "./VariableQueryEditor.tsx");





var plugin = new _grafana_data__WEBPACK_IMPORTED_MODULE_0__["DataSourcePlugin"](_DataSource__WEBPACK_IMPORTED_MODULE_1__["DataSource"]).setConfigEditor(_ConfigEditor__WEBPACK_IMPORTED_MODULE_2__["ConfigEditor"]).setQueryEditor(_QueryEditor__WEBPACK_IMPORTED_MODULE_3__["QueryEditor"]).setVariableQueryEditor(_VariableQueryEditor__WEBPACK_IMPORTED_MODULE_4__["VariableQueryEditor"]);

/***/ }),

/***/ "./types.ts":
/*!******************!*\
  !*** ./types.ts ***!
  \******************/
/*! exports provided: defaultQuery */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "defaultQuery", function() { return defaultQuery; });
var defaultQuery = {
  selectedQueryCategory: {
    label: 'Metrics',
    value: 'Metrics',
    description: 'Get Timeseries metrics.'
  },
  sysparam_count: 0,
  sysparam_option1: [],
  sysparam_option2: [],
  sysparam_option3: [],
  sysparam_option4: [{
    label: '',
    value: ''
  }]
};

/***/ }),

/***/ "@grafana/data":
/*!********************************!*\
  !*** external "@grafana/data" ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__grafana_data__;

/***/ }),

/***/ "@grafana/runtime":
/*!***********************************!*\
  !*** external "@grafana/runtime" ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__grafana_runtime__;

/***/ }),

/***/ "@grafana/ui":
/*!******************************!*\
  !*** external "@grafana/ui" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__grafana_ui__;

/***/ }),

/***/ "lodash":
/*!*************************!*\
  !*** external "lodash" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_lodash__;

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_react__;

/***/ })

/******/ })});;
//# sourceMappingURL=module.js.map