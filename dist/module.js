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
    return to.concat(ar || Array.prototype.slice.call(from));
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



var APIClient =
/** @class */
function () {
  function APIClient(headers, withCredentials, url, cacheTimeout) {
    this.requestOptions = {
      headers: headers,
      withCredentials: withCredentials,
      url: url
    };
    this.cacheTimeout = cacheTimeout;
    this.cache = new memory_cache__WEBPACK_IMPORTED_MODULE_3___default.a.Cache();
  }

  APIClient.prototype.cachedGet = function (method, path, params, cacheDurationSeconds, headers, body, options) {
    return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function () {
      var cacheTime, cacheKey, cacheKeyNoTime, cachedItem, cacheKeys, i, key, cacheTimeParams, cacheStartTime, cacheEndTime, timeParams, startTime, endTime, startTimeDifference, endTimeDifference, paramString, result;
      return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"])(this, function (_a) {
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
          cacheKey = cacheKey + (cacheKey.search(/\?/) >= 0 ? '&' : '?') + params.map(function (_a) {
            var _b = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__read"])(_a, 2),
                k = _b[0],
                v = _b[1];

            return encodeURIComponent(k) + "=" + encodeURIComponent(v);
          }).join('&');
        }

        if (this.lastCacheDuration !== cacheTime) {
          this.cache.del(cacheKey);
        }

        this.lastCacheDuration = cacheTime;
        cachedItem = this.cache.get(cacheKey);

        if (!cachedItem && cacheKey.includes('?')) {
          cacheKeys = this.cache.keys();

          for (i = 0; i < cacheKeys.length; i++) {
            key = cacheKeys[i];

            if (key.includes(cacheKeyNoTime) && key.includes('?')) {
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

              if (startTimeDifference >= 0) {
                if (startTimeDifference <= cacheTime * 1000 && endTimeDifference <= cacheTime * 1000) {
                  console.log('cache item found in timerange');
                  cachedItem = this.cache.get(key);
                  break;
                }
              }
            }
          }
        }

        if (cachedItem) {
          console.log('cache item found');
          return [2
          /*return*/
          , Promise.resolve(cachedItem)];
        }

        paramString = '?' + params.map(function (_a) {
          var _b = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__read"])(_a, 2),
              k = _b[0],
              v = _b[1];

          return encodeURIComponent(k) + "=" + encodeURIComponent(v);
        }).join('&');
        result = '';

        if (method === 'GET') {
          result = Object(_grafana_runtime__WEBPACK_IMPORTED_MODULE_1__["getBackendSrv"])().get(this.requestOptions.url + path, paramString);
        } else if (method === 'POST') {
          result = Object(_grafana_runtime__WEBPACK_IMPORTED_MODULE_1__["getBackendSrv"])().post(this.requestOptions.url + path + paramString, body);
        } // Deprecated method
        //const result = getBackendSrv().datasourceRequest(options);


        this.cache.put(cacheKey, result, cacheTime * 1000);
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
  };

  APIClient.prototype.mapAlertTags = function (response) {
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
  };

  APIClient.prototype.mapChecksToValue = function (result) {
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
  };

  APIClient.prototype.mapChecksToValuePlusSuffix = function (result) {
    return _lodash2["default"].map(result, function (d, i) {
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

  APIClient.prototype.mapValueAsSuffix = function (result, addType) {
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
    response = _lodash2["default"].map(response, function (d, i) {
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
  };

  APIClient.prototype.mapOutageResponseToFrame = function (result, target) {
    return result.map(function (data) {
      var ciName = data.ci;
      console.log(ciName);
      return _Utils__WEBPACK_IMPORTED_MODULE_5__["parseResponse"](data.datapoints, ciName, target, [], _grafana_data__WEBPACK_IMPORTED_MODULE_2__["FieldType"].string);
    });
  };

  APIClient.prototype.mapTrendResponseToFrame = function (result, target) {
    return Object.keys(result[0]).map(function (data) {
      return _Utils__WEBPACK_IMPORTED_MODULE_5__["parseResponse"](result[0][data].datapoints, data, target, [], _grafana_data__WEBPACK_IMPORTED_MODULE_2__["FieldType"].number);
    }); // return result.map((data) => {
    //   return utils.parseResponse(data.datapoints, '', target, [], FieldType.number);
    // });
  };

  APIClient.prototype.mapMetricsResponseToFrame = function (result, target) {
    return result.map(function (data) {
      var seriesName = data.source + ':' + data.metricName;

      if (data.type.length > 0) {
        seriesName += ':' + data.type;
      }

      return _Utils__WEBPACK_IMPORTED_MODULE_5__["parseResponse"](data.datapoints, seriesName, target, [], _grafana_data__WEBPACK_IMPORTED_MODULE_2__["FieldType"].number);
    });
  };

  APIClient.prototype.mapAnamMetricsResponseToFrame = function (result, target) {
    var response = result.map(function (r) {
      var ciName = r.ciName;
      var metricName = r.metricName;
      return r.data.map(function (data) {
        var seriesName = ciName + ':' + metricName + ':' + data.type;

        if (result.length === 1 && (data.type === 'UPPER' || data.type === 'LOWER')) {
          seriesName = data.type;
        }

        return _Utils__WEBPACK_IMPORTED_MODULE_5__["parseAnomResponse"](data.data, seriesName, target, [], _grafana_data__WEBPACK_IMPORTED_MODULE_2__["FieldType"].number);
      });
    }); // Flattens the array

    response = [].concat.apply([], response);
    return response;
  };

  APIClient.prototype.mapTextResponseToFrame = function (result, refId) {
    var frame = new _grafana_data__WEBPACK_IMPORTED_MODULE_2__["MutableDataFrame"]({
      fields: [],
      refId: refId
    });

    if (_Utils__WEBPACK_IMPORTED_MODULE_5__["debugLevel"]() === 1) {
      _Utils__WEBPACK_IMPORTED_MODULE_5__["printDebug"]('You are Inside mapTextResponseToFrame');
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

    for (var i = 0; i < filedNames.length; i++) {
      var values = result.map(function (d) {
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

  APIClient.prototype.createTopologyFrame = function (result, refId) {
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
  };

  return APIClient;
}();



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
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../node_modules/tslib/tslib.es6.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @grafana/ui */ "@grafana/ui");
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__);



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
    var _a;

    onOptionsChange(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, options), {
      jsonData: Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, options.jsonData), (_a = {}, _a[key] = value, _a))
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
  return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_1___default.a.Fragment, null, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["Alert"], {
    title: "Need more information?",
    severity: "info",
    elevated: true
  }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["VerticalGroup"], null, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("p", null, "Local documentation can be found in Configuration => Plugins on this plugin's page"), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("p", null, "Or", ' ', react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("a", {
    href: "https://github.com/optimizca/servicenow-grafana/blob/main/README.md"
  }, "Click here to view the documentation on GitHub")))), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["InlineFieldRow"], null, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["InlineField"], {
    labelWidth: 20,
    label: "Logo URL",
    tooltip: "To access this value in each dashboard, create a variable query using namespace: global_image."
  }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["Input"], {
    defaultValue: typeof options.jsonData['imageURL'] === 'undefined' ? '' : options.jsonData['imageURL'],
    onBlur: function onBlur(v) {
      return onChangeJsonData('imageURL', v.target.value);
    },
    width: 60
  }))), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["InlineFieldRow"], null, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["InlineField"], {
    labelWidth: 20,
    label: "API Path"
  }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["Input"], {
    defaultValue: typeof options.jsonData['apiPath'] === 'undefined' ? '' : options.jsonData['apiPath'],
    onBlur: function onBlur(v) {
      return onChangeJsonData('apiPath', v.target.value);
    },
    width: 40
  }))), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["InlineFieldRow"], null, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["InlineField"], {
    labelWidth: 20,
    label: "Cache Timeout",
    tooltip: "Number of seconds to cache a request for. This can be overridden in the query panel."
  }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["Select"], {
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
  }))), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["DataSourceHttpSettings"], {
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








var DataSource =
/** @class */
function (_super) {
  Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"])(DataSource, _super);

  function DataSource(instanceSettings) {
    var _this = _super.call(this, instanceSettings) || this;

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
    _this.snowConnection = new SnowManager__WEBPACK_IMPORTED_MODULE_6__["SNOWManager"](connectionOptions);
    _this.annotations = {};
    return _this;
  }

  DataSource.prototype.metricFindQuery = function (query, options) {
    return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function () {
      var values, tableName, nameColumn, idColumn, sysparam, limit, replacedValue, cis, replacedValue, cis, replacedValue, cis, values_1, valuesObj, nested_cis, values_2, classesObj, values_3, state, sysparam, limit, tags, returnVariables, values_4, keys_1, state, sysparam, limit, tags, returnVariables;
      return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"])(this, function (_a) {
        switch (_a.label) {
          case 0:
            console.log('inside template variables metricFindQuery');

            if (query.namespace === 'global_image') {
              return [2
              /*return*/
              , [{
                label: this.globalImage,
                value: this.globalImage
              }]];
            }

            if (query.namespace === 'global_instance_name') {
              return [2
              /*return*/
              , [{
                label: this.instanceName,
                value: this.instanceName
              }]];
            }

            if (query.namespace === 'generic') {
              console.log('inside generic variable query');

              if (typeof query.rawQuery !== 'undefined') {
                values = query.rawQuery.split('||');
                tableName = typeof values[0] === 'undefined' ? '' : Object(_grafana_runtime__WEBPACK_IMPORTED_MODULE_2__["getTemplateSrv"])().replace(values[0], options.scopedVars, 'csv');
                nameColumn = typeof values[1] === 'undefined' ? '' : Object(_grafana_runtime__WEBPACK_IMPORTED_MODULE_2__["getTemplateSrv"])().replace(values[1], options.scopedVars, 'csv');
                idColumn = typeof values[2] === 'undefined' ? '' : Object(_grafana_runtime__WEBPACK_IMPORTED_MODULE_2__["getTemplateSrv"])().replace(values[2], options.scopedVars, 'csv');
                sysparam = typeof values[3] === 'undefined' ? '' : Object(_grafana_runtime__WEBPACK_IMPORTED_MODULE_2__["getTemplateSrv"])().replace(values[3], options.scopedVars, 'csv');
                limit = typeof values[4] === 'undefined' ? '9999' : Object(_grafana_runtime__WEBPACK_IMPORTED_MODULE_2__["getTemplateSrv"])().replace(values[4], options.scopedVars, 'csv');
                return [2
                /*return*/
                , this.snowConnection.getGenericVariable(tableName, nameColumn, idColumn, sysparam, limit)];
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
              , this.snowConnection.getMetricNamesInCIs('', cis)];
            }

            if (query.namespace === 'golden_metric_names') {
              console.log('inside metric name variables metricFindQuery');
              console.log(options);
              replacedValue = Object(_grafana_runtime__WEBPACK_IMPORTED_MODULE_2__["getTemplateSrv"])().replace(query.rawQuery, options.scopedVars, 'csv');
              console.log('RawQuery replacedValue= ' + replacedValue);
              cis = replacedValue.split(',');
              return [2
              /*return*/
              , this.snowConnection.getMetricNamesInCIs('GOLDEN', cis)];
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

                if (values_1[i].indexOf('$') === 0) {
                  values_1 = values_1.splice(i);
                }
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

                if (values_2[i].indexOf('$') === 0) {
                  values_2 = values_2.splice(i);
                }
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

            if (!(query.namespace === 'tagKeys')) return [3
            /*break*/
            , 3];
            console.log('inside tagKeys variable query');
            if (!(typeof query.rawQuery !== 'undefined')) return [3
            /*break*/
            , 2];
            values_3 = query.rawQuery.split('||');
            values_3.map(function (value, i) {
              values_3[i] = Object(_grafana_runtime__WEBPACK_IMPORTED_MODULE_2__["getTemplateSrv"])().replace(value, options.scopedVars, 'csv');

              if (values_3[i].indexOf('$') === 0) {
                values_3 = values_3.splice(i);
              }
            });
            state = typeof values_3[0] === 'undefined' ? 'All' : values_3[0];
            sysparam = typeof values_3[1] === 'undefined' ? '' : values_3[1];
            limit = typeof values_3[2] === 'undefined' ? '9999' : values_3[2];
            return [4
            /*yield*/
            , this.snowConnection.getAlertTags(state, sysparam, limit)];

          case 1:
            tags = _a.sent();
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
            return [2
            /*return*/
            , returnVariables];

          case 2:
            return [2
            /*return*/
            , []];

          case 3:
            if (!(query.namespace === 'tagValues')) return [3
            /*break*/
            , 6];
            console.log('inside tagKeys variable query');
            if (!(typeof query.rawQuery !== 'undefined')) return [3
            /*break*/
            , 5];
            values_4 = query.rawQuery.split('||');
            values_4.map(function (value, i) {
              values_4[i] = Object(_grafana_runtime__WEBPACK_IMPORTED_MODULE_2__["getTemplateSrv"])().replace(value, options.scopedVars, 'csv');

              if (values_4[i].indexOf('$') === 0) {
                values_4 = values_4.splice(i);
              }
            });
            keys_1 = typeof values_4[0] === 'undefined' ? '' : values_4[0];
            state = typeof values_4[1] === 'undefined' ? 'All' : values_4[1];
            sysparam = typeof values_4[2] === 'undefined' ? '' : values_4[2];
            limit = typeof values_4[3] === 'undefined' ? '9999' : values_4[3];
            return [4
            /*yield*/
            , this.snowConnection.getAlertTags(state, sysparam, limit)];

          case 4:
            tags = _a.sent();
            tags = tags.filter(function (t) {
              if (keys_1.includes(t.key)) {
                return t;
              }
            });
            returnVariables = tags.map(function (t) {
              return {
                text: t.value,
                value: t.value
              };
            });
            returnVariables.unshift({
              text: 'None',
              value: ''
            });
            console.log('tagValues variable: ', returnVariables);
            return [2
            /*return*/
            , returnVariables];

          case 5:
            return [2
            /*return*/
            , []];

          case 6:
            return [2
            /*return*/
            ];
        }
      });
    });
  };

  DataSource.prototype.query = function (options) {
    return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, Promise, function () {
      var range, from, to, promises;

      var _this = this;

      return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"])(this, function (_a) {
        range = options.range;
        from = range.from.valueOf();
        to = range.to.valueOf();
        promises = lodash__WEBPACK_IMPORTED_MODULE_3___default.a.map(options.targets, function (t) {
          if (t.hide) {
            return [];
          }

          var target = lodash__WEBPACK_IMPORTED_MODULE_3___default.a.cloneDeep(t);

          var query = lodash_defaults__WEBPACK_IMPORTED_MODULE_1___default()(target, _types__WEBPACK_IMPORTED_MODULE_5__["defaultQuery"]);
          var queryType = query.selectedQueryCategory.value;
          var cacheOverride = query.cacheOverride;

          switch (queryType) {
            case 'Topology':
              return _this.snowConnection.getTopology(target, options, cacheOverride);

            case 'Metrics':
              return _this.snowConnection.getMetrics(target, from, to, options, cacheOverride);

            case 'Alerts':
              return _this.snowConnection.getAlerts(target, from, to, options, _this.instanceName, cacheOverride);

            case 'Changes':
              return _this.snowConnection.getChanges(target, from, to, options, cacheOverride);

            case 'Live_Agent_Data':
              return _this.snowConnection.getLiveACCData(target, from, to, options, cacheOverride);

            case 'Table':
              return _this.snowConnection.queryTable(target, from, to, options, cacheOverride);

            case 'Row_Count':
              return _this.snowConnection.getRowCount(target, from, to, options, cacheOverride);

            case 'Aggregate':
              return _this.snowConnection.getAggregateQuery(target, from, to, options, cacheOverride);

            case 'Geohash_Map':
              return _this.snowConnection.getGeohashMap(target, options, cacheOverride);

            case 'Log_Data':
              return _this.snowConnection.queryLogData(target, from, to, options, cacheOverride);

            case 'Trend_Data':
              return _this.snowConnection.getTrendData(target, from, to, options, cacheOverride);

            case 'Outage_Status':
              return _this.snowConnection.getOutageStatus(target, from, to, options, cacheOverride);

            case 'Anomaly':
              return _this.snowConnection.getAnomaly(target, from, to, options, cacheOverride);

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
        message: "Data source connection failed: " + error.statusText,
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
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }




var SNOWManager =
/** @class */
function () {
  function SNOWManager(options) {
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

    this.apiClient = new APIClient__WEBPACK_IMPORTED_MODULE_0__["APIClient"](headers, withCredentials, url, cacheTimeout);
  } // Start of query methods


  SNOWManager.prototype.getTopology = function (target, options, cacheOverride) {
    var _this = this;

    if (_Utils__WEBPACK_IMPORTED_MODULE_1__["debugLevel"]() === 1) {
      console.log('isnide get Topology');
      console.log('print target');
      console.log(target);
      console.log('print options');
      console.log(options);
    }

    var startingPoint = '';

    if (target.selectedServiceList) {
      if (target.selectedServiceList.value) {
        startingPoint = _Utils__WEBPACK_IMPORTED_MODULE_1__["replaceTargetUsingTemplVarsCSV"](target.selectedServiceList.value, options.scopedVars);
      }
    }

    var child_depth = '';

    if (target.topology_child_depth) {
      child_depth = _Utils__WEBPACK_IMPORTED_MODULE_1__["replaceTargetUsingTemplVars"](target.topology_child_depth, options.scopedVars);
    }

    var parent_depth = '';

    if (target.topology_parent_depth) {
      parent_depth = _Utils__WEBPACK_IMPORTED_MODULE_1__["replaceTargetUsingTemplVars"](target.topology_parent_depth, options.scopedVars);
    }

    var sysparm = '';

    if (target.sysparam_query) {
      sysparm = _Utils__WEBPACK_IMPORTED_MODULE_1__["replaceTargetUsingTemplVarsCSV"](target.sysparam_query, options.scopedVars);
    }

    sysparm = this.removeFiltersWithAll(sysparm);
    var bodyData = "{\"targets\":[{\"target\":\"" + startingPoint + "\",\"child_depth\":\"" + child_depth + "\",\"parent_depth\":\"" + parent_depth + "\",\"sysparm_query\":\"" + sysparm + "\"}]}";

    if (_Utils__WEBPACK_IMPORTED_MODULE_1__["debugLevel"]() === 1) {
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
      _Utils__WEBPACK_IMPORTED_MODULE_1__["printDebug"]('print topology response from SNOW');
      _Utils__WEBPACK_IMPORTED_MODULE_1__["printDebug"](response);
      _Utils__WEBPACK_IMPORTED_MODULE_1__["printDebug"]('~~~~~~~~~~~~~~~~');
      return _this.apiClient.createTopologyFrame(response, target.refId);
    })["catch"](function (error) {
      console.error('topology query error: ', error);
      throw new Error(error.data.error.message);
    });
  };

  SNOWManager.prototype.getMetrics = function (target, timeFrom, timeTo, options, cacheOverride) {
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

    if (target.selectedSourceList) {
      var sourceArray = [];
      target.selectedSourceList.map(function (listItem) {
        sourceArray.push(_Utils__WEBPACK_IMPORTED_MODULE_1__["replaceTargetUsingTemplVars"](listItem.value, options.scopedVars));
      });
      sourceTarget = _Utils__WEBPACK_IMPORTED_MODULE_1__["createRegEx"](sourceArray);
      console.log('ciIds: ', sourceTarget);
    }

    if (target.selectedMetricTypeList) {
      target.selectedMetricTypeList.map(function (listItem) {
        resourceNameArray.push(_Utils__WEBPACK_IMPORTED_MODULE_1__["replaceTargetUsingTemplVars"](listItem.value, options.scopedVars));
      });
      resourceName = _Utils__WEBPACK_IMPORTED_MODULE_1__["createRegEx"](resourceNameArray);
      console.log('resourceNames: ', resourceName);
    }

    if (target.selectedMetricNameList) {
      target.selectedMetricNameList.map(function (listItem) {
        metricNameArray.push(_Utils__WEBPACK_IMPORTED_MODULE_1__["replaceTargetUsingTemplVars"](listItem.value, options.scopedVars));
      });
      metricName = _Utils__WEBPACK_IMPORTED_MODULE_1__["createRegEx"](metricNameArray);
    }

    if (target.selectedMetricAnomalyList) {
      if (target.selectedMetricAnomalyList.value) {
        metricAnomaly = _Utils__WEBPACK_IMPORTED_MODULE_1__["replaceTargetUsingTemplVars"](target.selectedMetricAnomalyList.value, options.scopedVars);

        if (metricAnomaly === 'true') {
          anomaly = true;
        }
      }
    }

    if (target.sysparam_query) {
      sysparam = _Utils__WEBPACK_IMPORTED_MODULE_1__["replaceTargetUsingTemplVarsCSV"](target.sysparam_query, options.scopedVars);
    }

    sysparam = this.removeFiltersWithAll(sysparam);
    metricName = _Utils__WEBPACK_IMPORTED_MODULE_1__["trimRegEx"](metricName);
    sourceTarget = _Utils__WEBPACK_IMPORTED_MODULE_1__["trimRegEx"](sourceTarget);
    var bodyData = "{\"targets\":[{\"target\":\"" + sourceTarget + "\",\"resourceName\":\"" + resourceName + "\",\"metricName\":\"" + metricName + "\",\"sysparm_query\":\"" + sysparam + "\"}]}";
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
      method: 'POST',
      cacheOverride: cacheOverride === '' ? null : cacheOverride
    }).then(function (response) {
      console.log('metric response: ', response);

      if (anomaly === true) {
        return _this.apiClient.mapAnamMetricsResponseToFrame(response, target);
      } else {
        return _this.apiClient.mapMetricsResponseToFrame(response, target);
      }
    })["catch"](function (error) {
      console.error('metric query error: ', error);
      throw new Error(error.data.error.message);
    });
  };

  SNOWManager.prototype.getAlerts = function (target, timeFrom, timeTo, options, instanceName, cacheOverride) {
    var _this = this;

    if (_Utils__WEBPACK_IMPORTED_MODULE_1__["debugLevel"]() === 1) {
      console.log('isnide GetAlerts');
      console.log('print target');
      console.log(target);
      console.log('print options scoped Vars');
      console.log(options.scopedVars);
    }

    var service = '';

    if (target.selectedServiceList) {
      if (target.selectedServiceList.value) {
        service = _Utils__WEBPACK_IMPORTED_MODULE_1__["replaceTargetUsingTemplVarsCSV"](target.selectedServiceList.value, options.scopedVars);
      }
    }

    var ci = '';

    if (target.selectedSourceList) {
      var sourceArray = [];
      target.selectedSourceList.map(function (listItem) {
        sourceArray.push(_Utils__WEBPACK_IMPORTED_MODULE_1__["replaceTargetUsingTemplVars"](listItem.value, options.scopedVars));
      });
      ci = _Utils__WEBPACK_IMPORTED_MODULE_1__["createRegEx"](sourceArray);
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
      sys_query = _Utils__WEBPACK_IMPORTED_MODULE_1__["replaceTargetUsingTemplVarsCSV"](target.sysparam_query, options.scopedVars);
    }

    sys_query = this.removeFiltersWithAll(sys_query);
    var tagString = '';

    if (target.tagKeys && target.tagValues) {
      var _loop_1 = function _loop_1(k) {
        if (target.tagKeys[k].value.charAt(0) === '$') {
          var key = _Utils__WEBPACK_IMPORTED_MODULE_1__["replaceTargetUsingTemplVarsCSV"](target.tagKeys[k].value, options.scopedVars);
          splitKeys = key.split(',');
          splitKeys.map(function (sk) {
            for (var v = 0; v < target.tagValues.length; v++) {
              if (target.tagValues[v].value.charAt(0) === '$') {
                var value = _Utils__WEBPACK_IMPORTED_MODULE_1__["replaceTargetUsingTemplVarsCSV"](target.tagValues[v].value, options.scopedVars);
                var splitValues = value.split(',');
                splitValues.map(function (sv) {
                  if (sk !== '' && sv !== '') {
                    console.log('tagString: ', sk + '=' + sv + ',');
                    tagString += sk + '=' + sv + ',';
                  }
                });
              } else {
                var value = target.tagValues[v].value;

                if (sk !== '' && value !== '') {
                  console.log('tagString: ', sk + '=' + value + ',');
                  tagString += sk + '=' + value + ',';
                }
              }
            }
          });
        } else {
          var key_1 = target.tagKeys[k].value;

          for (var v = 0; v < target.tagValues.length; v++) {
            if (target.tagValues[v].value.charAt(0) === '$') {
              var value = _Utils__WEBPACK_IMPORTED_MODULE_1__["replaceTargetUsingTemplVarsCSV"](target.tagValues[v].value, options.scopedVars);
              var splitValues = value.split(',');
              splitValues.map(function (sv) {
                if (key_1 !== '' && sv !== '') {
                  console.log('tagString: ', key_1 + '=' + sv + ',');
                  tagString += key_1 + '=' + sv + ',';
                }
              });
            } else {
              var value = target.tagValues[v].value;

              if (key_1 !== '' && value !== '') {
                console.log('tagString: ', key_1 + '=' + value + ',');
                tagString += key_1 + '=' + value + ',';
              }
            }
          }
        }
      };

      var splitKeys;

      for (var k = 0; k < target.tagKeys.length; k++) {
        _loop_1(k);
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
        sortBy = _Utils__WEBPACK_IMPORTED_MODULE_1__["replaceTargetUsingTemplVarsCSV"](target.sortBy.value, options.scopedVars);
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
        timerangeColumn = _Utils__WEBPACK_IMPORTED_MODULE_1__["replaceTargetUsingTemplVarsCSV"](target.grafanaTimerangeColumn.value, options.scopedVars);
      }
    }

    var bodyData = "{\"targets\":[{\"target\":\"" + bodyTarget + "\",\"sysparm_query\":\"" + sys_query + "\",\"alertType\":\"" + alertType + "\",\"alertState\":\"" + alertState + "\",\"sortBy\":\"" + sortBy + "\",\"sortDirection\":\"" + sortDirection + "\",\"limit\":" + limit + ",\"page\":" + page + ",\"tagFilters\":\"" + tagString + "\"}]}";
    var url = this.apiPath + '/v1/query/alerts';

    if (target.grafanaTimerange) {
      url += '?startTime=' + timeFrom + '&endTime=' + timeTo + '&timerangeColumn=' + timerangeColumn;
    }

    if (_Utils__WEBPACK_IMPORTED_MODULE_1__["debugLevel"]() === 1) {
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
      _Utils__WEBPACK_IMPORTED_MODULE_1__["printDebug"]('print alerts response from SNOW');
      _Utils__WEBPACK_IMPORTED_MODULE_1__["printDebug"](response);
      response = _this.apiClient.appendInstanceNameToResponse(response, instanceName);
      _Utils__WEBPACK_IMPORTED_MODULE_1__["printDebug"](response);
      return _this.apiClient.mapTextResponseToFrame(response, target.refId);
    })["catch"](function (error) {
      console.error('alert query error: ', error);
      throw new Error(error.data.error.message);
    });
  };

  SNOWManager.prototype.getChanges = function (target, timeFrom, timeTo, options, cacheOverride) {
    var _this = this;

    if (_Utils__WEBPACK_IMPORTED_MODULE_1__["debugLevel"]() === 1) {
      console.log('inside getChanges');
      console.log('print target', target);
    }

    var service = '';

    if (target.selectedServiceList) {
      if (target.selectedServiceList.value) {
        service = _Utils__WEBPACK_IMPORTED_MODULE_1__["replaceTargetUsingTemplVarsCSV"](target.selectedServiceList.value, options.scopedVars);
      }
    }

    var ci = '';

    if (target.selectedSourceList) {
      if (target.selectedSourceList.value) {
        ci = _Utils__WEBPACK_IMPORTED_MODULE_1__["replaceTargetUsingTemplVarsCSV"](target.selectedSourceList.value, options.scopedVars);
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
      sysparam = _Utils__WEBPACK_IMPORTED_MODULE_1__["replaceTargetUsingTemplVarsCSV"](target.sysparam_query, options.scopedVars);
    }

    sysparam = this.removeFiltersWithAll(sysparam);
    var sortBy = '';
    var sortDirection = '';

    if (target.sortBy && target.sortDirection) {
      if (target.sortBy.value) {
        sortBy = _Utils__WEBPACK_IMPORTED_MODULE_1__["replaceTargetUsingTemplVarsCSV"](target.sortBy.value, options.scopedVars);
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
        timerangeColumn = _Utils__WEBPACK_IMPORTED_MODULE_1__["replaceTargetUsingTemplVarsCSV"](target.grafanaTimerangeColumn.value, options.scopedVars);
      }
    }

    var bodyData = "{\"targets\":[{\"target\":\"" + bodyTarget + "\",\"sysparm_query\":\"" + sysparam + "\",\"alertType\":\"" + changeType + "\",\"sortBy\":\"" + sortBy + "\",\"sortDirection\":\"" + sortDirection + "\",\"limit\":" + limit + ",\"page\":" + page + "}]}";

    if (_Utils__WEBPACK_IMPORTED_MODULE_1__["debugLevel"]() === 1) {
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
      _Utils__WEBPACK_IMPORTED_MODULE_1__["printDebug"]('print changes response from SNOW');
      _Utils__WEBPACK_IMPORTED_MODULE_1__["printDebug"](response);
      return _this.apiClient.mapTextResponseToFrame(response, target.refId);
    })["catch"](function (error) {
      console.error('changes query error: ', error);
      throw new Error(error.data.error.message);
    });
  };

  SNOWManager.prototype.getLiveACCData = function (target, from, to, options, cacheOverride) {
    if (_Utils__WEBPACK_IMPORTED_MODULE_1__["debugLevel"]() === 1) {
      console.log('isnide getLiveACCData');
      console.log('print target');
      console.log(target);
      console.log('print options scoped Vars');
      console.log(options.scopedVars);
    }

    var osquery = '';

    if (target.live_osquery) {
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
    return this.apiClient.mapTextResponseToFrame(response, target.refId);
  };

  SNOWManager.prototype.queryTable = function (target, timeFrom, timeTo, options, cacheOverride) {
    var _this = this;

    if (_Utils__WEBPACK_IMPORTED_MODULE_1__["debugLevel"]() === 1) {
      console.log('query table');
      console.log(target);
    }

    var tableName = '';

    if (target.tableName) {
      if (target.tableName.value) {
        tableName = _Utils__WEBPACK_IMPORTED_MODULE_1__["replaceTargetUsingTemplVars"](target.tableName.value, options.scopedVars);
      }
    }

    var tableColumns = '';

    if (target.selectedtableColumns) {
      target.selectedtableColumns.map(function (listItem) {
        tableColumns += _Utils__WEBPACK_IMPORTED_MODULE_1__["replaceTargetUsingTemplVars"](listItem.value, options.scopedVars) + ',';
      });

      if (tableColumns.charAt(tableColumns.length - 1) === ',') {
        tableColumns = tableColumns.substring(0, tableColumns.length - 1);
      }
    }

    var sysparam = ''; //Checks if variable is an array

    console.log('sysparam: ', target.basic_sysparam);

    if (target.basic_sysparam.constructor.toString().indexOf('Array') !== -1) {
      for (var i = 0; i < target.basic_sysparam.length; i++) {
        var field = target.basic_sysparam[i];
        var fieldOne = '';

        if (field[1]) {
          fieldOne = _Utils__WEBPACK_IMPORTED_MODULE_1__["replaceTargetUsingTemplVarsCSV"](field[1].value, options.scopedVars);
        }

        var fieldTwo = '';

        if (field[2]) {
          fieldTwo = field[2].value;
        }

        var fieldThree = '';

        if (field[3]) {
          fieldThree = _Utils__WEBPACK_IMPORTED_MODULE_1__["replaceTargetUsingTemplVarsCSV"](field[3].value, options.scopedVars);
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
        sortBy = _Utils__WEBPACK_IMPORTED_MODULE_1__["replaceTargetUsingTemplVarsCSV"](target.sortBy.value, options.scopedVars);
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
        timerangeColumn = _Utils__WEBPACK_IMPORTED_MODULE_1__["replaceTargetUsingTemplVarsCSV"](target.grafanaTimerangeColumn.value, options.scopedVars);
      }
    }

    var bodyData = "{\"targets\":[{\"target\":\"" + tableName + "\",\"columns\":\"" + tableColumns + "\",\"sysparm\":\"" + sysparam + "\",\"limit\":" + limit + ",\"page\":" + page + ",\"sortBy\":\"" + sortBy + "\",\"sortDirection\":\"" + sortDirection + "\",\"getAlertCount\":" + getAlertCount + "}]}";
    var url = this.apiPath + '/v1/query/table';

    if (target.grafanaTimerange) {
      url += '?startTime=' + timeFrom + '&endTime=' + timeTo + '&timerangeColumn=' + timerangeColumn;
    }

    if (_Utils__WEBPACK_IMPORTED_MODULE_1__["debugLevel"]() === 1) {
      console.log(target);
      console.log(bodyData);
    }

    return this.apiClient.request({
      url: url,
      data: bodyData,
      method: 'POST',
      cacheOverride: cacheOverride === '' ? null : cacheOverride
    }).then(function (response) {
      _Utils__WEBPACK_IMPORTED_MODULE_1__["printDebug"]('print table query response from SNOW');
      _Utils__WEBPACK_IMPORTED_MODULE_1__["printDebug"](response);
      return _this.apiClient.mapTextResponseToFrame(response, target.refId);
    })["catch"](function (error) {
      console.error('table query error: ', error);
      throw new Error(error.data.error.message);
    });
  };

  SNOWManager.prototype.getRowCount = function (target, timeFrom, timeTo, options, cacheOverride) {
    var _this = this;

    var tableName = '';

    if (target.tableName) {
      if (target.tableName.value) {
        tableName = _Utils__WEBPACK_IMPORTED_MODULE_1__["replaceTargetUsingTemplVars"](target.tableName.value, options.scopedVars);
      }
    }

    var sysparam = '';

    if (target.sysparam_query) {
      sysparam = _Utils__WEBPACK_IMPORTED_MODULE_1__["replaceTargetUsingTemplVarsCSV"](target.sysparam_query, options.scopedVars);
    }

    sysparam = this.removeFiltersWithAll(sysparam);
    var timerangeColumn = 'sys_updated_on';

    if (target.grafanaTimerangeColumn) {
      if (target.grafanaTimerangeColumn.value) {
        timerangeColumn = _Utils__WEBPACK_IMPORTED_MODULE_1__["replaceTargetUsingTemplVarsCSV"](target.grafanaTimerangeColumn.value, options.scopedVars);
      }
    }

    var bodyData = "{\"targets\":[{\"target\":\"" + tableName + "\",\"sysparm\":\"" + sysparam + "\"}]}";
    var url = this.apiPath + '/v1/query/row_count';

    if (target.grafanaTimerange) {
      url += '?startTime=' + timeFrom + '&endTime=' + timeTo + '&timerangeColumn=' + timerangeColumn;
    }

    if (_Utils__WEBPACK_IMPORTED_MODULE_1__["debugLevel"]() === 1) {
      console.log(target);
      console.log(bodyData);
    }

    return this.apiClient.request({
      url: url,
      data: bodyData,
      method: 'POST',
      cacheOverride: cacheOverride === '' ? null : cacheOverride
    }).then(function (response) {
      _Utils__WEBPACK_IMPORTED_MODULE_1__["printDebug"]('print row count response from SNOW');
      _Utils__WEBPACK_IMPORTED_MODULE_1__["printDebug"](response);
      return _this.apiClient.mapTextResponseToFrame(response, target.refId);
    })["catch"](function (error) {
      console.error('row count query error: ', error);
      throw new Error(error.data.error.message);
    });
  };

  SNOWManager.prototype.getAggregateQuery = function (target, timeFrom, timeTo, options, cacheOverride) {
    var _this = this;

    var tableName = '';
    var groupBy = '';
    var type = '';
    var column = '';
    var sysparam = '';

    if (target.tableName) {
      if (target.tableName.value) {
        tableName = _Utils__WEBPACK_IMPORTED_MODULE_1__["replaceTargetUsingTemplVars"](target.tableName.value, options.scopedVars);
      }
    }

    if (typeof target.groupBy === 'string') {
      if (target.groupBy !== '') {
        groupBy = _Utils__WEBPACK_IMPORTED_MODULE_1__["replaceTargetUsingTemplVarsCSV"](target.groupBy, options.scopedVars);
      }
    } else if (target.groupBy) {
      if (target.groupBy.value) {
        groupBy = _Utils__WEBPACK_IMPORTED_MODULE_1__["replaceTargetUsingTemplVarsCSV"](target.groupBy.value, options.scopedVars);
      }
    }

    if (target.selectedAggregateType) {
      if (target.selectedAggregateType.value) {
        type = target.selectedAggregateType.value;
      }
    }

    if (target.aggregateColumn) {
      if (target.aggregateColumn.value) {
        column = _Utils__WEBPACK_IMPORTED_MODULE_1__["replaceTargetUsingTemplVarsCSV"](target.aggregateColumn.value, options.scopedVars);
      }
    }

    if (target.sysparam_query) {
      sysparam = _Utils__WEBPACK_IMPORTED_MODULE_1__["replaceTargetUsingTemplVarsCSV"](target.sysparam_query, options.scopedVars);
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
        timerangeColumn = _Utils__WEBPACK_IMPORTED_MODULE_1__["replaceTargetUsingTemplVarsCSV"](target.grafanaTimerangeColumn.value, options.scopedVars);
      }
    }

    var bodyData = "{\"targets\":[{\"target\":\"" + tableName + "\",\"type\":\"" + type + "\",\"column\":\"" + column + "\",\"groupBy\":\"" + groupBy + "\",\"sysparm\":\"" + sysparam + "\",\"limit\":" + limit + "}]}";
    var url = this.apiPath + '/v1/query/aggregate';

    if (target.grafanaTimerange) {
      url += '?startTime=' + timeFrom + '&endTime=' + timeTo + '&timerangeColumn=' + timerangeColumn;
    }

    if (_Utils__WEBPACK_IMPORTED_MODULE_1__["debugLevel"]() === 1) {
      console.log(target);
      console.log(bodyData);
    }

    return this.apiClient.request({
      url: url,
      data: bodyData,
      method: 'POST',
      cacheOverride: cacheOverride === '' ? null : cacheOverride
    }).then(function (response) {
      _Utils__WEBPACK_IMPORTED_MODULE_1__["printDebug"]('print aggregate query response from SNOW');
      _Utils__WEBPACK_IMPORTED_MODULE_1__["printDebug"](response);
      return _this.apiClient.mapTextResponseToFrame(response, target.refId);
    })["catch"](function (error) {
      console.error('aggregate query error: ', error);
      throw new Error(error.data.error.message);
    });
  };

  SNOWManager.prototype.getGeohashMap = function (target, options, cacheOverride) {
    var _this = this;

    var tableName = '';
    var groupBy = '';
    var sysparam = '';

    if (target.tableName) {
      if (target.tableName.value) {
        tableName = _Utils__WEBPACK_IMPORTED_MODULE_1__["replaceTargetUsingTemplVars"](target.tableName.value, options.scopedVars);
      }
    }

    if (typeof target.groupBy === 'string') {
      if (target.groupBy !== '') {
        groupBy = _Utils__WEBPACK_IMPORTED_MODULE_1__["replaceTargetUsingTemplVarsCSV"](target.groupBy, options.scopedVars);
      }
    } else if (_typeof(target.groupBy) === 'object') {
      if (target.groupBy !== null && target.groupBy.value !== '') {
        groupBy = _Utils__WEBPACK_IMPORTED_MODULE_1__["replaceTargetUsingTemplVarsCSV"](target.groupBy.value, options.scopedVars);
      }
    }

    if (target.sysparam_query) {
      sysparam = _Utils__WEBPACK_IMPORTED_MODULE_1__["replaceTargetUsingTemplVarsCSV"](target.sysparam_query, options.scopedVars);
    }

    sysparam = this.removeFiltersWithAll(sysparam);
    var bodyData = "{\"targets\":[{\"target\":\"" + tableName + "\",\"column\":\"" + groupBy + "\",\"sysparm\":\"" + sysparam + "\"}]}";

    if (_Utils__WEBPACK_IMPORTED_MODULE_1__["debugLevel"]() === 1) {
      console.log(target);
      console.log(bodyData);
    }

    return this.apiClient.request({
      url: this.apiPath + '/v1/query/geohash_map',
      data: bodyData,
      method: 'POST',
      cacheOverride: cacheOverride === '' ? null : cacheOverride
    }).then(function (response) {
      _Utils__WEBPACK_IMPORTED_MODULE_1__["printDebug"]('print geohash_map response from SNOW');
      _Utils__WEBPACK_IMPORTED_MODULE_1__["printDebug"](response);
      return _this.apiClient.mapTextResponseToFrame(response, target.refId);
    })["catch"](function (error) {
      console.error('geohash_map query error: ', error);
      throw new Error(error.data.error.message);
    });
  };

  SNOWManager.prototype.queryLogData = function (target, timeFrom, timeTo, options, cacheOverride) {
    var _this = this;

    var compressLog = target.compressLogs;
    var sysparam = ''; //Checks if variable is an array

    if (target.basic_sysparam.constructor.toString().indexOf('Array') !== -1) {
      for (var i = 0; i < target.basic_sysparam.length; i++) {
        var field = target.basic_sysparam[i];
        var fieldOne = '';

        if (field[1]) {
          fieldOne = _Utils__WEBPACK_IMPORTED_MODULE_1__["replaceTargetUsingTemplVarsCSV"](field[1].value, options.scopedVars);
        }

        var fieldTwo = '';

        if (field[2]) {
          fieldTwo = field[2].value;
        }

        var fieldThree = '';

        if (field[3]) {
          fieldThree = _Utils__WEBPACK_IMPORTED_MODULE_1__["replaceTargetUsingTemplVarsCSV"](field[3].value, options.scopedVars);
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
        sortBy = _Utils__WEBPACK_IMPORTED_MODULE_1__["replaceTargetUsingTemplVarsCSV"](target.sortBy.value, options.scopedVars);
        sortDirection = target.sortDirection;
      }
    }

    var elasticSearch = '';

    if (target.elasticSearch) {
      elasticSearch = _Utils__WEBPACK_IMPORTED_MODULE_1__["replaceTargetUsingTemplVarsCSV"](target.elasticSearch, options.scopedVars);
    }

    var bodyData = "{\"targets\":[{\"sysparm\":\"" + sysparam + "\",\"limit\":" + limit + ",\"page\":" + page + ",\"sortBy\":\"" + sortBy + "\",\"sortDirection\":\"" + sortDirection + "\",\"esSearch\":\"" + elasticSearch + "\",\"startTime\":" + timeFrom + ",\"endTime\":" + timeTo + ",\"compressLog\":" + compressLog + "}]}";

    if (_Utils__WEBPACK_IMPORTED_MODULE_1__["debugLevel"]() === 1) {
      console.log(target);
      console.log(bodyData);
    }

    return this.apiClient.request({
      url: this.apiPath + '/v1/query/logs',
      data: bodyData,
      method: 'POST',
      cacheOverride: cacheOverride === '' ? null : cacheOverride
    }).then(function (response) {
      _Utils__WEBPACK_IMPORTED_MODULE_1__["printDebug"]('print query log data response from SNOW');
      _Utils__WEBPACK_IMPORTED_MODULE_1__["printDebug"](response);
      return _this.apiClient.mapTextResponseToFrame(response, target.refId);
    })["catch"](function (error) {
      console.error('log query error: ', error);
      throw new Error(error.data.error.message);
    });
  };

  SNOWManager.prototype.getTrendData = function (target, timeFrom, timeTo, options, cacheOverride) {
    var _this = this;

    if (_Utils__WEBPACK_IMPORTED_MODULE_1__["debugLevel"]() === 1) {
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
        table = _Utils__WEBPACK_IMPORTED_MODULE_1__["replaceTargetUsingTemplVars"](target.tableName.value, options.scopedVars);
      }
    } //Checks if variable is an array


    if (target.basic_sysparam.constructor.toString().indexOf('Array') !== -1) {
      for (var i = 0; i < target.basic_sysparam.length; i++) {
        var field = target.basic_sysparam[i];
        var fieldOne = '';

        if (field[1]) {
          fieldOne = _Utils__WEBPACK_IMPORTED_MODULE_1__["replaceTargetUsingTemplVarsCSV"](field[1].value, options.scopedVars);
        }

        var fieldTwo = '';

        if (field[2]) {
          fieldTwo = field[2].value;
        }

        var fieldThree = '';

        if (field[3]) {
          fieldThree = _Utils__WEBPACK_IMPORTED_MODULE_1__["replaceTargetUsingTemplVarsCSV"](field[3].value, options.scopedVars);
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
      elasticSearch = _Utils__WEBPACK_IMPORTED_MODULE_1__["replaceTargetUsingTemplVarsCSV"](target.elasticSearch, options.scopedVars);
    }

    if (typeof target.groupBy === 'string') {
      if (target.groupBy !== '') {
        groupBy = _Utils__WEBPACK_IMPORTED_MODULE_1__["replaceTargetUsingTemplVarsCSV"](target.groupBy, options.scopedVars);
      }
    } else if (_typeof(target.groupBy) === 'object') {
      if (target.groupBy !== null && target.groupBy.value !== '') {
        groupBy = _Utils__WEBPACK_IMPORTED_MODULE_1__["replaceTargetUsingTemplVarsCSV"](target.groupBy.value, options.scopedVars);
      }
    }

    if (target.selectedTrendColumn) {
      if (target.selectedTrendColumn.value) {
        trendColumn = _Utils__WEBPACK_IMPORTED_MODULE_1__["replaceTargetUsingTemplVarsCSV"](target.selectedTrendColumn.value, options.scopedVars);
      }
    }

    if (target.selectedTrendBy) {
      if (target.selectedTrendBy.value) {
        trendBy = _Utils__WEBPACK_IMPORTED_MODULE_1__["replaceTargetUsingTemplVarsCSV"](target.selectedTrendBy.value, options.scopedVars);
      }
    }

    if (target.trendPeriod) {
      if (target.trendPeriod > 0) {
        period = target.trendPeriod;
      }
    }

    var bodyData = "{\"targets\":[{\"target\":\"" + table + "\",\"sysparm\":\"" + sysparam + "\",\"esSearch\":\"" + elasticSearch + "\",\"trendColumn\":\"" + trendColumn + "\",\"trendBy\":\"" + trendBy + "\",\"period\":" + period + ",\"groupBy\":\"" + groupBy + "\"}]}";

    if (_Utils__WEBPACK_IMPORTED_MODULE_1__["debugLevel"]() === 1) {
      console.log(target);
      console.log(bodyData);
    }

    return this.apiClient.request({
      url: this.apiPath + '/v1/query/trend?startTime=' + timeFrom + '&endTime=' + timeTo,
      data: bodyData,
      method: 'POST',
      cacheOverride: cacheOverride === '' ? null : cacheOverride
    }).then(function (response) {
      _Utils__WEBPACK_IMPORTED_MODULE_1__["printDebug"]('print trend data response from SNOW');
      _Utils__WEBPACK_IMPORTED_MODULE_1__["printDebug"](response);
      return _this.apiClient.mapTrendResponseToFrame(response, target);
    })["catch"](function (error) {
      console.error('trend query error: ', error);
      throw new Error(error.data.error.message);
    });
  };

  SNOWManager.prototype.getOutageStatus = function (target, timeFrom, timeTo, options, cacheOverride) {
    var _this = this;

    var ciIds = '';

    if (target.selectedServiceList) {
      if (target.selectedServiceList.value) {
        ciIds = _Utils__WEBPACK_IMPORTED_MODULE_1__["replaceTargetUsingTemplVarsCSV"](target.selectedServiceList.value, options.scopedVars);
      }
    }

    var showPercent = false;

    if (typeof target.showPercent === 'boolean') {
      showPercent = target.showPercent;
    }

    var sysparam = '';

    if (target.sysparam_query) {
      sysparam = _Utils__WEBPACK_IMPORTED_MODULE_1__["replaceTargetUsingTemplVarsCSV"](target.sysparam_query, options.scopedVars);
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

    var bodyData = "{\"targets\":[{\"target\":\"" + ciIds + "\",\"showPercent\":" + showPercent + ",\"sysparm\":\"" + sysparam + "\",\"limit\":" + limit + ",\"page\":" + page + "}]}";

    if (_Utils__WEBPACK_IMPORTED_MODULE_1__["debugLevel"]() === 1) {
      console.log(bodyData);
    }

    return this.apiClient.request({
      url: this.apiPath + '/v1/query/outage',
      data: bodyData,
      method: 'POST',
      cacheOverride: cacheOverride === '' ? null : cacheOverride
    }).then(function (response) {
      _Utils__WEBPACK_IMPORTED_MODULE_1__["printDebug"]('print outage status response from SNOW');
      _Utils__WEBPACK_IMPORTED_MODULE_1__["printDebug"](response);

      if (showPercent) {
        return _this.apiClient.mapTextResponseToFrame(response, target.refId);
      } else {
        return _this.apiClient.mapOutageResponseToFrame(response, target);
      }
    })["catch"](function (error) {
      console.error('outage query error: ', error);
      throw new Error(error.data.error.message);
    });
  };

  SNOWManager.prototype.getAnomaly = function (target, timeFrom, timeTo, options, cacheOverride) {
    var _this = this;

    if (_Utils__WEBPACK_IMPORTED_MODULE_1__["debugLevel"]() === 1) {
      console.log('query anomaly');
      console.log(target);
    }

    var tableColumns = '';

    if (target.selectedtableColumns) {
      if (target.selectedtableColumns.length > 0) {
        target.selectedtableColumns.map(function (listItem) {
          tableColumns += _Utils__WEBPACK_IMPORTED_MODULE_1__["replaceTargetUsingTemplVars"](listItem.value, options.scopedVars) + ',';
        });

        if (tableColumns.charAt(tableColumns.length - 1) === ',') {
          tableColumns = tableColumns.substring(0, tableColumns.length - 1);
        }
      }
    }

    var sysparam = ''; //Checks if variable is an array

    if (target.basic_sysparam.constructor.toString().indexOf('Array') !== -1) {
      for (var i = 0; i < target.basic_sysparam.length; i++) {
        var field = target.basic_sysparam[i];
        var fieldOne = '';

        if (field[1]) {
          fieldOne = _Utils__WEBPACK_IMPORTED_MODULE_1__["replaceTargetUsingTemplVarsCSV"](field[1].value, options.scopedVars);
        }

        var fieldTwo = '';

        if (field[2]) {
          fieldTwo = field[2].value;
        }

        var fieldThree = '';

        if (field[3]) {
          fieldThree = _Utils__WEBPACK_IMPORTED_MODULE_1__["replaceTargetUsingTemplVarsCSV"](field[3].value, options.scopedVars);
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
        sortBy = _Utils__WEBPACK_IMPORTED_MODULE_1__["replaceTargetUsingTemplVarsCSV"](target.sortBy.value, options.scopedVars);
        sortDirection = target.sortDirection;
      }
    }

    var bodyData = "{\"targets\":[{\"columns\":\"" + tableColumns + "\",\"sysparm\":\"" + sysparam + "\",\"limit\":" + limit + ",\"page\":" + page + ",\"sortBy\":\"" + sortBy + "\",\"sortDirection\":\"" + sortDirection + "\"}]}";

    if (_Utils__WEBPACK_IMPORTED_MODULE_1__["debugLevel"]() === 1) {
      console.log(target);
      console.log(bodyData);
    }

    return this.apiClient.request({
      url: this.apiPath + '/v1/query/anomaly',
      data: bodyData,
      method: 'POST',
      cacheOverride: cacheOverride === '' ? null : cacheOverride
    }).then(function (response) {
      _Utils__WEBPACK_IMPORTED_MODULE_1__["printDebug"]('print anomaly query response from SNOW');
      _Utils__WEBPACK_IMPORTED_MODULE_1__["printDebug"](response);
      return _this.apiClient.mapTextResponseToFrame(response, target.refId);
    })["catch"](function (error) {
      console.error('anomaly query error: ', error);
      throw new Error(error.data.error.message);
    });
  }; // End of query methods
  // Start variable query methods


  SNOWManager.prototype.getGenericVariable = function (tableName, nameColumn, idColumn, sysparam, limit) {
    var _this = this;

    var bodyData = "{\"targets\":[{\"tableName\":\"" + tableName + "\",\"nameColumn\":\"" + nameColumn + "\",\"idColumn\":\"" + idColumn + "\",\"sysparm\":\"" + sysparam + "\",\"limit\":" + limit + "}]}";
    console.log(bodyData);
    return this.apiClient.request({
      url: this.apiPath + '/v1/variable/generic',
      data: bodyData,
      method: 'POST'
    }).then(function (response) {
      _Utils__WEBPACK_IMPORTED_MODULE_1__["printDebug"](response);
      return _this.apiClient.mapChecksToValue(response);
    })["catch"](function (error) {
      console.error('generic variable error: ', error);
      throw new Error(error.data.error.message);
    });
  };

  SNOWManager.prototype.getMetricNamesInCIs = function (metricCategory, cis) {
    var _this = this;

    if (_Utils__WEBPACK_IMPORTED_MODULE_1__["debugLevel"]() === 1) {
      console.log('isnide getMetricsForCI');
      console.log('print target');
      console.log(metricCategory);
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
    }).then(function (response) {
      _Utils__WEBPACK_IMPORTED_MODULE_1__["printDebug"](response);
      return _this.apiClient.mapChecksToValue(response);
    })["catch"](function (error) {
      console.error('metric variable error: ', error);
      throw new Error(error.data.error.message);
    });
  };

  SNOWManager.prototype.getNestedCIS = function (bodyObj) {
    var _this = this;

    var bodyData = "{\"targets\":[{\"ci\": \"" + bodyObj.ci + "\",\n      \"parentDepth\":\"" + bodyObj.parentDepth + "\",\n      \"childDepth\":\"" + bodyObj.childDepth + "\",\n      \"sysparm\":\"" + bodyObj.sysparam + "\",\n      \"type\":\"ci\"}]}";

    if (_Utils__WEBPACK_IMPORTED_MODULE_1__["debugLevel"]() === 1) {
      console.log('get nested cis');
      console.log(bodyData);
    }

    return this.apiClient.request({
      url: this.apiPath + '/v1/variable/nested_value',
      data: bodyData,
      method: 'POST'
    }).then(function (response) {
      _Utils__WEBPACK_IMPORTED_MODULE_1__["printDebug"](response);
      return _this.apiClient.mapChecksToValue(response);
    })["catch"](function (error) {
      console.error('nested cis variable error: ', error);
      throw new Error(error.data.error.message);
    });
  };

  SNOWManager.prototype.getNestedClasses = function (bodyObj) {
    var _this = this;

    var bodyData = "{\"targets\":[{\"ci\": \"" + bodyObj.ci + "\",\n      \"parentDepth\":\"" + bodyObj.parentDepth + "\",\n      \"childDepth\":\"" + bodyObj.childDepth + "\",\n      \"sysparm\":\"" + bodyObj.sysparam + "\",\n      \"type\":\"class\"}]}";

    if (_Utils__WEBPACK_IMPORTED_MODULE_1__["debugLevel"]() === 1) {
      console.log('get nested classes');
      console.log(bodyData);
    }

    return this.apiClient.request({
      url: this.apiPath + '/v1/variable/nested_value',
      data: bodyData,
      method: 'POST'
    }).then(function (response) {
      _Utils__WEBPACK_IMPORTED_MODULE_1__["printDebug"](response);
      return _this.apiClient.mapChecksToValue(response);
    })["catch"](function (error) {
      console.error('nested classes variable error: ', error);
      throw new Error(error.data.error.message);
    });
  }; // End variable query methods
  // Start option query methods


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
      label: 'None',
      value: 'None',
      description: 'Ignore CI selection and use sysparam_query'
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
  };

  SNOWManager.prototype.getTrendByOptions = function () {
    var queryOptions = [{
      label: 'Minute',
      value: 'minute'
    }, {
      label: 'Week',
      value: 'week'
    }];
    return queryOptions;
  };

  SNOWManager.prototype.loadServiceOptions = function (input) {
    var _this = this;

    var search = input ? input : '';
    var bodyData = "{\"targets\":[{\"target\":\"cmdb_ci_service\",\"columns\":\"name:d,sys_id:v\",\"sysparm\":\"operational_status=1^name!=All^nameLIKE" + search + "\",\"limit\":100,\"sortBy\":\"name\",\"sortDirection\":\"ASC\"}]}";

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
    })["catch"](function (error) {
      console.error('loadServiceOptions error: ', error);
      throw new Error(error.data.error.message);
    });
  };

  SNOWManager.prototype.loadCIOptions = function (serviceId, input) {
    var _this = this;

    var search = input ? input : '';
    var bodyData = '';

    if (serviceId) {
      bodyData = "{\"targets\":[{\"target\":\"em_impact_graph\",\"columns\":\"child_name:d,child_id:v,child_id:d\",\"sysparm\":\"business_service=" + serviceId + "^child_nameLIKE" + search + "\",\"limit\":100,\"sortBy\":\"ci_name\",\"sortDirection\":\"ASC\"}]}";
    } else {
      bodyData = "{\"targets\":[{\"target\":\"cmdb_ci\",\"columns\":\"name:d,sys_id:v,sys_class_name:d\",\"sysparm\":\"nameLIKE" + search + "^name!=NULL\",\"limit\":100,\"sortBy\":\"cmdb_ci.name\",\"sortDirection\":\"ASC\"}]}";
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
    })["catch"](function (error) {
      console.error('loadCIOptions error: ', error);
      throw new Error(error.data.error.message);
    });
  };

  SNOWManager.prototype.loadResourceOptions = function (selectedCIS, input) {
    var _this = this;

    var bodyData = '';
    var search = input ? input : '';

    if (selectedCIS) {
      var ciArray = selectedCIS.map(function (option) {
        return option.value;
      });
      console.log(ciArray);
      bodyData = "{\"targets\":[{\"target\":\"sa_metric_map\",\"columns\":\"resource_id:d,resource_id:v\",\"sysparm\":\"cmdb_ciIN" + ciArray + "^resource_idLIKE" + search + "^resource_id!=NULL\",\"limit\":100,\"sortBy\":\"resource_id\",\"sortDirection\":\"ASC\"}]}";
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
    })["catch"](function (error) {
      console.error('loadResourceOptions error: ', error);
      throw new Error(error.data.error.message);
    });
  };

  SNOWManager.prototype.loadMetricOptions = function (selectedCIS, input) {
    var _this = this;

    var bodyData = '';
    var search = input ? input : '';

    if (typeof selectedCIS !== 'undefined') {
      var ciArray = selectedCIS.map(function (option) {
        return option.value;
      });
      console.log(ciArray);
      bodyData = "{\"targets\":[{\"target\":\"sa_metric_map\",\"columns\":\"metric_type_id.metric_type_tiny_name:d,metric_type_id:v\",\"sysparm\":\"cmdb_ciIN" + ciArray + "^metric_type_id.metric_type_tiny_nameLIKE" + search + "\",\"limit\":100,\"sortBy\":\"\",\"sortDirection\":\"ASC\"}]}";
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
    })["catch"](function (error) {
      console.error('loadMetricOptions error: ', error);
      throw new Error(error.data.error.message);
    });
  };

  SNOWManager.prototype.loadColumnChoices = function (tableName, tableColumn, input) {
    var _this = this;

    var bodyData = "{\"targets\":[{\"target\":\"sys_choice\",\"columns\":\"label,value\",\"sysparm\":\"name=" + tableName + "^element!=NULL^elementLIKE" + tableColumn + "^labelLIKE" + input + "^language=en\",\"limit\":100,\"sortBy\":\"label\",\"sortDirection\":\"ASC\"}]}";

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
      return _this.apiClient.mapChecksToValue(response);
    })["catch"](function (error) {
      console.error('loadColumnChoices error: ', error);
      throw new Error(error.data.error.message);
    });
  };

  SNOWManager.prototype.getTableColumnOptions = function (tableName) {
    var _this = this;

    if (typeof tableName === 'undefined') {
      return;
    }

    var bodyData = "{\"targets\":[{\"table\":\"" + tableName + "\"}]}";

    if (_Utils__WEBPACK_IMPORTED_MODULE_1__["debugLevel"]() === 1) {
      console.log(bodyData);
    }

    return this.apiClient.request({
      url: this.apiPath + '/v1/select/table_columns',
      data: bodyData,
      method: 'POST'
    }).then(function (response) {
      _Utils__WEBPACK_IMPORTED_MODULE_1__["printDebug"]('print getTableColumnOptions response from SNOW');
      _Utils__WEBPACK_IMPORTED_MODULE_1__["printDebug"](response);
      return _this.apiClient.mapValueAsSuffix(response, true);
    })["catch"](function (error) {
      console.error('getTableColumnOptions error: ', error);
      throw new Error(error.data.error.message);
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
      return _this.apiClient.mapValueAsSuffix(result, false);
    })["catch"](function (error) {
      console.error('loadTableOptions error: ', error);
      throw new Error(error.data.error.message);
    });
  }; // End option query methods
  // getTopologyCISummary is used by our forked novatec sdg panel


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
  };

  SNOWManager.prototype.getAlertTags = function (state, sysparam, limit) {
    var _this = this;

    if (!limit) {
      limit = 9999;
    }

    if (state === 'Active') {
      sysparam += 'state!=Closed';
    }

    var bodyData = "{\"targets\":[{\"target\":\"em_alert\",\"columns\":\"additional_info\",\"sysparm\":\"" + sysparam + "\",\"limit\":" + limit + ",\"sortBy\":\"\",\"sortDirection\":\"ASC\"}]}";
    console.log('bodyData: ', bodyData);
    return this.apiClient.request({
      url: this.apiPath + '/v1/query/table',
      data: bodyData,
      method: 'POST'
    }).then(function (response) {
      _Utils__WEBPACK_IMPORTED_MODULE_1__["printDebug"]('print getAlertTags response from SNOW');
      _Utils__WEBPACK_IMPORTED_MODULE_1__["printDebug"](response);

      var tags = _this.apiClient.mapAlertTags(response);

      _Utils__WEBPACK_IMPORTED_MODULE_1__["printDebug"](tags);
      return tags;
    })["catch"](function (error) {
      console.error('getAlertTags error: ', error);
      throw new Error(error.data.error.message);
    });
  }; // When a sysparam filter contains a *, remove that filter but leave the rest on place
  // Ex. Input: operational_status=1^clusterIN*
  // Ex. Output: operational_status=1


  SNOWManager.prototype.removeFiltersWithAll = function (sysparam) {
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
/* harmony import */ var components_SelectTags__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! components/SelectTags */ "./components/SelectTags.tsx");
/* harmony import */ var components_AlertCountChoice__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! components/AlertCountChoice */ "./components/AlertCountChoice.tsx");
/* harmony import */ var components_InputElasticSearch__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! components/InputElasticSearch */ "./components/InputElasticSearch.tsx");
/* harmony import */ var components_InputGroupBy__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! components/InputGroupBy */ "./components/InputGroupBy.tsx");
/* harmony import */ var components_InputLimit__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! components/InputLimit */ "./components/InputLimit.tsx");
/* harmony import */ var components_InputPage__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! components/InputPage */ "./components/InputPage.tsx");
/* harmony import */ var components_SelectAggregate__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! components/SelectAggregate */ "./components/SelectAggregate.tsx");
/* harmony import */ var components_SelectBasicSysparam__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! components/SelectBasicSysparam */ "./components/SelectBasicSysparam.tsx");
/* harmony import */ var components_SelectCacheTimeout__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! components/SelectCacheTimeout */ "./components/SelectCacheTimeout.tsx");
/* harmony import */ var components_SelectSortBy__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! components/SelectSortBy */ "./components/SelectSortBy.tsx");
/* harmony import */ var components_SelectTrend__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! components/SelectTrend */ "./components/SelectTrend.tsx");
/* harmony import */ var components_ShowPercentSwitch__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! components/ShowPercentSwitch */ "./components/ShowPercentSwitch.tsx");
/* harmony import */ var components_TimeRangeCheckBox__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! components/TimeRangeCheckBox */ "./components/TimeRangeCheckBox.tsx");
/* harmony import */ var components_ToggleLogCompression__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! components/ToggleLogCompression */ "./components/ToggleLogCompression.tsx");
/* harmony import */ var components_SelectCI__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! components/SelectCI */ "./components/SelectCI.tsx");
/* harmony import */ var components_SelectMetric__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! components/SelectMetric */ "./components/SelectMetric.tsx");
/* harmony import */ var components_InputOsquery__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! components/InputOsquery */ "./components/InputOsquery.tsx");
/* harmony import */ var components_InputSysparam__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! components/InputSysparam */ "./components/InputSysparam.tsx");
/* harmony import */ var components_SelectService__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! components/SelectService */ "./components/SelectService.tsx");
/* harmony import */ var components_SelectResource__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! components/SelectResource */ "./components/SelectResource.tsx");
/* harmony import */ var components_SelectAlertType__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! components/SelectAlertType */ "./components/SelectAlertType.tsx");
/* harmony import */ var components_InputChildDepth__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! components/InputChildDepth */ "./components/InputChildDepth.tsx");
/* harmony import */ var components_SelectTableName__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! components/SelectTableName */ "./components/SelectTableName.tsx");
/* harmony import */ var components_SelectAlertState__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! components/SelectAlertState */ "./components/SelectAlertState.tsx");
/* harmony import */ var components_SelectChangeType__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! components/SelectChangeType */ "./components/SelectChangeType.tsx");
/* harmony import */ var components_InputParentDepth__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(/*! components/InputParentDepth */ "./components/InputParentDepth.tsx");
/* harmony import */ var components_SelectTableColumn__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(/*! components/SelectTableColumn */ "./components/SelectTableColumn.tsx");
/* harmony import */ var components_SelectMetricAnomaly__WEBPACK_IMPORTED_MODULE_32__ = __webpack_require__(/*! components/SelectMetricAnomaly */ "./components/SelectMetricAnomaly.tsx");
/* harmony import */ var components_SelectStartingPoint__WEBPACK_IMPORTED_MODULE_33__ = __webpack_require__(/*! components/SelectStartingPoint */ "./components/SelectStartingPoint.tsx");
/* harmony import */ var _grafana_runtime__WEBPACK_IMPORTED_MODULE_34__ = __webpack_require__(/*! @grafana/runtime */ "@grafana/runtime");
/* harmony import */ var _grafana_runtime__WEBPACK_IMPORTED_MODULE_34___default = /*#__PURE__*/__webpack_require__.n(_grafana_runtime__WEBPACK_IMPORTED_MODULE_34__);



































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

  var loadColumnChoices = function loadColumnChoices(index, input) {
    return new Promise(function (resolve) {
      setTimeout(function () {
        var _a, _b;

        resolve(datasource.snowConnection.loadColumnChoices((_a = q.tableName) === null || _a === void 0 ? void 0 : _a.value, (_b = q.basic_sysparam[index][1]) === null || _b === void 0 ? void 0 : _b.value, input));
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

  var getVariables = function getVariables() {
    var variables = {};
    Object.values(Object(_grafana_runtime__WEBPACK_IMPORTED_MODULE_34__["getTemplateSrv"])().getVariables()).forEach(function (variable) {
      if (variable.type === 'adhoc' || variable.type === 'interval') {
        // These are being added to request.adhocFilters
        console.warn("Variable of type \"" + variable.type + "\" is not currently supported by this plugin");
        return;
      }

      var supportedVariable = variable;
      var variableValue = supportedVariable.current.value;

      if (variableValue === '$__all' || Object(lodash__WEBPACK_IMPORTED_MODULE_1__["isEqual"])(variableValue, ['$__all'])) {
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
  }; // const replaceVariable = (replace: string) => {
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
      content: react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_3___default.a.Fragment, null, react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(components_SelectTableName__WEBPACK_IMPORTED_MODULE_27__["SelectTableName"], {
        updateQuery: updateQuery,
        loadTableOptions: loadTableOptions,
        value: q.tableName
      }), react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(components_SelectTableColumn__WEBPACK_IMPORTED_MODULE_31__["SelectTableColumn"], {
        query: q,
        updateQuery: updateQuery,
        datasource: datasource
      }), react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(components_SelectBasicSysparam__WEBPACK_IMPORTED_MODULE_12__["SelectBasicSysparam"], {
        query: q,
        updateQuery: updateQuery,
        datasource: datasource,
        sysparamTypeOptions: sysparamTypeOptions,
        loadChoices: loadColumnChoices
      }), react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(components_SelectSortBy__WEBPACK_IMPORTED_MODULE_14__["SelectSortBy"], {
        query: q,
        updateQuery: updateQuery,
        datasource: datasource
      }), react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(components_InputLimit__WEBPACK_IMPORTED_MODULE_9__["InputLimit"], {
        defaultValue: q.rowLimit,
        updateQuery: updateQuery
      }), react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(components_InputPage__WEBPACK_IMPORTED_MODULE_10__["InputPage"], {
        defaultValue: q.page,
        updateQuery: updateQuery
      }), react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(components_AlertCountChoice__WEBPACK_IMPORTED_MODULE_6__["AlertCountChoice"], {
        value: q.getAlertCount,
        updateQuery: updateQuery
      }), react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(components_TimeRangeCheckBox__WEBPACK_IMPORTED_MODULE_17__["TimerangeCheckbox"], {
        query: q,
        updateQuery: updateQuery,
        datasource: datasource
      }))
    },
    Aggregate: {
      title: 'Aggregate',
      description: 'Group by and apply aggregate functions to table data',
      content: react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_3___default.a.Fragment, null, react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(components_SelectTableName__WEBPACK_IMPORTED_MODULE_27__["SelectTableName"], {
        updateQuery: updateQuery,
        loadTableOptions: loadTableOptions,
        value: q.tableName
      }), react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(components_InputGroupBy__WEBPACK_IMPORTED_MODULE_8__["InputGroupBy"], {
        query: q,
        updateQuery: updateQuery,
        datasource: datasource
      }), react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(components_SelectAggregate__WEBPACK_IMPORTED_MODULE_11__["SelectAggregate"], {
        query: q,
        updateQuery: updateQuery,
        datasource: datasource
      }), react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(components_InputSysparam__WEBPACK_IMPORTED_MODULE_22__["InputSysparam"], {
        updateQuery: updateQuery,
        defaultValue: q.sysparam_query
      }), react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(components_InputLimit__WEBPACK_IMPORTED_MODULE_9__["InputLimit"], {
        defaultValue: q.rowLimit,
        updateQuery: updateQuery
      }), react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(components_TimeRangeCheckBox__WEBPACK_IMPORTED_MODULE_17__["TimerangeCheckbox"], {
        query: q,
        updateQuery: updateQuery,
        datasource: datasource
      }))
    },
    Alerts: {
      title: 'Alerts',
      description: 'Get Alerts',
      content: react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_3___default.a.Fragment, null, react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(components_SelectService__WEBPACK_IMPORTED_MODULE_23__["SelectService"], {
        loadOptions: loadServiceOptions,
        value: q.selectedServiceList,
        updateQuery: updateQuery
      }), react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(components_SelectCI__WEBPACK_IMPORTED_MODULE_19__["SelectCI"], {
        loadOptions: loadCIOptions,
        value: q.selectedSourceList,
        updateQuery: updateQuery
      }), react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(components_SelectAlertType__WEBPACK_IMPORTED_MODULE_25__["SelectAlertType"], {
        options: alertTypeOptions,
        value: q.selectedAlertTypeList,
        updateQuery: updateQuery
      }), react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(components_SelectAlertState__WEBPACK_IMPORTED_MODULE_28__["SelectAlertState"], {
        options: alertStateOptions,
        value: q.selectedAlertStateList,
        updateQuery: updateQuery
      }), react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(components_InputSysparam__WEBPACK_IMPORTED_MODULE_22__["InputSysparam"], {
        updateQuery: updateQuery,
        defaultValue: q.sysparam_query
      }), react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(components_SelectTags__WEBPACK_IMPORTED_MODULE_5__["SelectTags"], {
        query: q,
        updateQuery: updateQuery,
        datasource: datasource,
        replaceMultipleVariables: replaceMultipleVariables
      }), react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(components_SelectSortBy__WEBPACK_IMPORTED_MODULE_14__["SelectSortBy"], {
        query: q,
        updateQuery: updateQuery,
        datasource: datasource
      }), react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(components_InputLimit__WEBPACK_IMPORTED_MODULE_9__["InputLimit"], {
        defaultValue: q.rowLimit,
        updateQuery: updateQuery
      }), react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(components_InputPage__WEBPACK_IMPORTED_MODULE_10__["InputPage"], {
        defaultValue: q.page,
        updateQuery: updateQuery
      }), react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(components_TimeRangeCheckBox__WEBPACK_IMPORTED_MODULE_17__["TimerangeCheckbox"], {
        query: q,
        updateQuery: updateQuery,
        datasource: datasource
      }))
    },
    Anomaly: {
      title: 'Anomaly',
      description: 'Parse values out of Alert Anomalies table',
      content: react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_3___default.a.Fragment, null, react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(components_SelectTableName__WEBPACK_IMPORTED_MODULE_27__["SelectTableName"], {
        updateQuery: updateQuery,
        loadTableOptions: loadTableOptions,
        value: q.tableName
      }), react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(components_SelectTableColumn__WEBPACK_IMPORTED_MODULE_31__["SelectTableColumn"], {
        query: q,
        updateQuery: updateQuery,
        datasource: datasource
      }), react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(components_SelectBasicSysparam__WEBPACK_IMPORTED_MODULE_12__["SelectBasicSysparam"], {
        query: q,
        updateQuery: updateQuery,
        datasource: datasource,
        sysparamTypeOptions: sysparamTypeOptions,
        loadChoices: loadColumnChoices
      }), react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(components_SelectSortBy__WEBPACK_IMPORTED_MODULE_14__["SelectSortBy"], {
        query: q,
        updateQuery: updateQuery,
        datasource: datasource
      }), react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(components_InputLimit__WEBPACK_IMPORTED_MODULE_9__["InputLimit"], {
        defaultValue: q.rowLimit,
        updateQuery: updateQuery
      }), react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(components_InputPage__WEBPACK_IMPORTED_MODULE_10__["InputPage"], {
        defaultValue: q.page,
        updateQuery: updateQuery
      }))
    },
    Changes: {
      title: 'Changes',
      description: 'Get Changes',
      content: react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_3___default.a.Fragment, null, react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(components_SelectService__WEBPACK_IMPORTED_MODULE_23__["SelectService"], {
        loadOptions: loadServiceOptions,
        value: q.selectedServiceList,
        updateQuery: updateQuery
      }), react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(components_SelectCI__WEBPACK_IMPORTED_MODULE_19__["SelectCI"], {
        loadOptions: loadCIOptions,
        value: q.selectedSourceList,
        updateQuery: updateQuery
      }), react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(components_SelectChangeType__WEBPACK_IMPORTED_MODULE_29__["SelectChangeType"], {
        options: changeTypeOptions,
        value: q.selectedChangeTypeList,
        updateQuery: updateQuery
      }), react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(components_InputSysparam__WEBPACK_IMPORTED_MODULE_22__["InputSysparam"], {
        updateQuery: updateQuery,
        defaultValue: q.sysparam_query
      }), react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(components_SelectSortBy__WEBPACK_IMPORTED_MODULE_14__["SelectSortBy"], {
        query: q,
        updateQuery: updateQuery,
        datasource: datasource
      }), react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(components_InputLimit__WEBPACK_IMPORTED_MODULE_9__["InputLimit"], {
        defaultValue: q.rowLimit,
        updateQuery: updateQuery
      }), react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(components_InputPage__WEBPACK_IMPORTED_MODULE_10__["InputPage"], {
        defaultValue: q.page,
        updateQuery: updateQuery
      }), react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(components_TimeRangeCheckBox__WEBPACK_IMPORTED_MODULE_17__["TimerangeCheckbox"], {
        query: q,
        updateQuery: updateQuery,
        datasource: datasource
      }))
    },
    Geohash_Map: {
      title: 'GeoHash Map',
      description: 'Get map data from AWS or Azure',
      content: react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_3___default.a.Fragment, null, react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(components_SelectTableName__WEBPACK_IMPORTED_MODULE_27__["SelectTableName"], {
        updateQuery: updateQuery,
        loadTableOptions: loadTableOptions,
        value: q.tableName
      }), react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(components_InputGroupBy__WEBPACK_IMPORTED_MODULE_8__["InputGroupBy"], {
        query: q,
        updateQuery: updateQuery,
        datasource: datasource
      }), react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(components_InputSysparam__WEBPACK_IMPORTED_MODULE_22__["InputSysparam"], {
        updateQuery: updateQuery,
        defaultValue: q.sysparam_query
      }))
    },
    Live_Agent_Data: {
      title: 'Live Agent Data',
      description: 'Get Live Data from your ACC Agents',
      content: react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_3___default.a.Fragment, null, react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(components_InputOsquery__WEBPACK_IMPORTED_MODULE_21__["InputOsquery"], {
        updateQuery: updateQuery,
        defaultValue: q.live_osquery
      }))
    },
    Log_Data: {
      title: 'Log Data',
      description: 'Get log data',
      content: react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_3___default.a.Fragment, null, react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(components_ToggleLogCompression__WEBPACK_IMPORTED_MODULE_18__["ToggleLogCompression"], {
        value: q.compressLogs,
        updateQuery: updateQuery
      }), react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(components_SelectBasicSysparam__WEBPACK_IMPORTED_MODULE_12__["SelectBasicSysparam"], {
        query: q,
        updateQuery: updateQuery,
        datasource: datasource,
        sysparamTypeOptions: sysparamTypeOptions,
        loadChoices: loadColumnChoices
      }), react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(components_InputElasticSearch__WEBPACK_IMPORTED_MODULE_7__["InputElasticSearch"], {
        updateQuery: updateQuery,
        defaultValue: q.elasticSearch
      }), react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(components_SelectSortBy__WEBPACK_IMPORTED_MODULE_14__["SelectSortBy"], {
        query: q,
        updateQuery: updateQuery,
        datasource: datasource
      }), react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(components_InputLimit__WEBPACK_IMPORTED_MODULE_9__["InputLimit"], {
        defaultValue: q.rowLimit,
        updateQuery: updateQuery
      }), react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(components_InputPage__WEBPACK_IMPORTED_MODULE_10__["InputPage"], {
        defaultValue: q.page,
        updateQuery: updateQuery
      }))
    },
    Metrics: {
      title: 'Metrics',
      description: 'Get Timeseries metrics',
      content: react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_3___default.a.Fragment, null, react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(components_SelectService__WEBPACK_IMPORTED_MODULE_23__["SelectService"], {
        loadOptions: loadServiceOptions,
        value: q.selectedServiceList,
        updateQuery: updateQuery
      }), react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(components_SelectCI__WEBPACK_IMPORTED_MODULE_19__["SelectCI"], {
        loadOptions: loadCIOptions,
        value: q.selectedSourceList,
        updateQuery: updateQuery
      }), react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(components_SelectResource__WEBPACK_IMPORTED_MODULE_24__["SelectResource"], {
        loadOptions: loadResourceOptions,
        value: q.selectedMetricTypeList,
        updateQuery: updateQuery
      }), react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(components_SelectMetric__WEBPACK_IMPORTED_MODULE_20__["SelectMetric"], {
        loadOptions: loadMetricOptions,
        value: q.selectedMetricNameList,
        updateQuery: updateQuery
      }), react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(components_SelectMetricAnomaly__WEBPACK_IMPORTED_MODULE_32__["SelectMetricAnomaly"], {
        options: metricAnomalyOptions,
        value: q.selectedMetricAnomalyList,
        updateQuery: updateQuery
      }), react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(components_InputSysparam__WEBPACK_IMPORTED_MODULE_22__["InputSysparam"], {
        updateQuery: updateQuery,
        defaultValue: q.sysparam_query
      }))
    },
    Outage_Status: {
      title: 'Outage Status',
      description: 'Gathers business service status over the last 90 days',
      content: react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_3___default.a.Fragment, null, react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(components_SelectService__WEBPACK_IMPORTED_MODULE_23__["SelectService"], {
        loadOptions: loadServiceOptions,
        value: q.selectedServiceList,
        updateQuery: updateQuery
      }), react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(components_ShowPercentSwitch__WEBPACK_IMPORTED_MODULE_16__["ShowPercentSwitch"], {
        value: q.showPercent,
        updateQuery: updateQuery
      }), react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(components_InputSysparam__WEBPACK_IMPORTED_MODULE_22__["InputSysparam"], {
        updateQuery: updateQuery,
        defaultValue: q.sysparam_query
      }), react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(components_InputLimit__WEBPACK_IMPORTED_MODULE_9__["InputLimit"], {
        defaultValue: q.rowLimit,
        updateQuery: updateQuery
      }), react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(components_InputPage__WEBPACK_IMPORTED_MODULE_10__["InputPage"], {
        defaultValue: q.page,
        updateQuery: updateQuery
      }))
    },
    Row_Count: {
      title: 'Row Count',
      description: 'Get row count from query',
      content: react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_3___default.a.Fragment, null, react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(components_SelectTableName__WEBPACK_IMPORTED_MODULE_27__["SelectTableName"], {
        updateQuery: updateQuery,
        loadTableOptions: loadTableOptions,
        value: q.tableName
      }), react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(components_InputSysparam__WEBPACK_IMPORTED_MODULE_22__["InputSysparam"], {
        updateQuery: updateQuery,
        defaultValue: q.sysparam_query
      }), react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(components_TimeRangeCheckBox__WEBPACK_IMPORTED_MODULE_17__["TimerangeCheckbox"], {
        query: q,
        updateQuery: updateQuery,
        datasource: datasource
      }))
    },
    Topology: {
      title: 'Topology',
      description: 'Get Topology',
      content: react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_3___default.a.Fragment, null, react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(components_SelectStartingPoint__WEBPACK_IMPORTED_MODULE_33__["SelectStartingPoint"], {
        loadOptions: loadServiceOptions,
        value: q.selectedServiceList,
        updateQuery: updateQuery
      }), react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(components_InputParentDepth__WEBPACK_IMPORTED_MODULE_30__["InputParentDepth"], {
        updateQuery: updateQuery,
        defaultValue: q.topology_parent_depth
      }), react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(components_InputChildDepth__WEBPACK_IMPORTED_MODULE_26__["InputChildDepth"], {
        updateQuery: updateQuery,
        defaultValue: q.topology_child_depth
      }), react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(components_InputSysparam__WEBPACK_IMPORTED_MODULE_22__["InputSysparam"], {
        updateQuery: updateQuery,
        defaultValue: q.sysparam_query
      }))
    },
    Trend_Data: {
      title: 'Trend Data',
      description: 'Get timeseries data based on a time trend',
      content: react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_3___default.a.Fragment, null, react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(components_SelectTableName__WEBPACK_IMPORTED_MODULE_27__["SelectTableName"], {
        updateQuery: updateQuery,
        loadTableOptions: loadTableOptions,
        value: q.tableName
      }), react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(components_SelectBasicSysparam__WEBPACK_IMPORTED_MODULE_12__["SelectBasicSysparam"], {
        query: q,
        updateQuery: updateQuery,
        datasource: datasource,
        sysparamTypeOptions: sysparamTypeOptions,
        loadChoices: loadColumnChoices
      }), react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(components_InputElasticSearch__WEBPACK_IMPORTED_MODULE_7__["InputElasticSearch"], {
        updateQuery: updateQuery,
        defaultValue: q.elasticSearch
      }), react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(components_InputGroupBy__WEBPACK_IMPORTED_MODULE_8__["InputGroupBy"], {
        query: q,
        updateQuery: updateQuery,
        datasource: datasource
      }), react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(components_SelectTrend__WEBPACK_IMPORTED_MODULE_15__["SelectTrend"], {
        query: q,
        updateQuery: updateQuery,
        trendByOptions: trendByOptions,
        datasource: datasource
      }))
    }
  };
  return react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_3___default.a.Fragment, null, react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["HorizontalGroup"], {
    justify: "space-between"
  }, react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["InlineFieldRow"], {
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
  }))), react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(components_SelectCacheTimeout__WEBPACK_IMPORTED_MODULE_13__["SelectCacheTimeout"], {
    value: q.cacheOverride,
    updateQuery: updateQuery
  })), options[(_b = q.selectedQueryCategory.value) !== null && _b !== void 0 ? _b : ''].content);
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
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @grafana/ui */ "@grafana/ui");
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__);



var VariableQueryEditor = function VariableQueryEditor(_a) {
  var onChange = _a.onChange,
      query = _a.query;

  var _b = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__read"])(Object(react__WEBPACK_IMPORTED_MODULE_1__["useState"])(query), 2),
      state = _b[0],
      setState = _b[1];

  var saveQuery = function saveQuery() {
    onChange(state, state.rawQuery + " (" + state.namespace + ")");
  };

  var handleChange = function handleChange(key, value) {
    var _a;

    setState(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, state), (_a = {}, _a[key] = value, _a)));
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
  return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_1___default.a.Fragment, null, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["InlineFieldRow"], null, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["InlineField"], {
    label: "Namespace",
    labelWidth: 20
  }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["Select"], {
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
  }))), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["InlineFieldRow"], null, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["InlineField"], {
    label: "Query",
    labelWidth: 20,
    grow: true,
    tooltip: react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("p", null, "Documentation for variables can be found", ' ', react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("a", {
      href: "https://github.com/optimizca/servicenow-grafana#variables",
      rel: "noopener noreferrer",
      target: "_blank"
    }, "(Here)"))
  }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["Input"], {
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
/*! exports provided: AlertCountChoice */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AlertCountChoice", function() { return AlertCountChoice; });
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @grafana/ui */ "@grafana/ui");
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_grafana_ui__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);


var AlertCountChoice = function AlertCountChoice(_a) {
  var value = _a.value,
      updateQuery = _a.updateQuery;
  var options = [{
    label: 'No',
    value: 'false'
  }, {
    label: 'Yes',
    value: 'true'
  }];
  return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_1___default.a.Fragment, null, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_0__["InlineFieldRow"], null, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_0__["InlineField"], {
    label: "Query Alert Count",
    labelWidth: 20,
    tooltip: "Extra query per row to get the number of alerts on a ci. Adds extra processing, use wisely!"
  }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_0__["RadioButtonGroup"], {
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
/*! exports provided: InputChildDepth */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InputChildDepth", function() { return InputChildDepth; });
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @grafana/ui */ "@grafana/ui");
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_grafana_ui__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);


var InputChildDepth = function InputChildDepth(_a) {
  var updateQuery = _a.updateQuery,
      defaultValue = _a.defaultValue;
  return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_1___default.a.Fragment, null, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_0__["InlineFieldRow"], null, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_0__["InlineField"], {
    label: "Child Depth",
    labelWidth: 20
  }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_0__["Input"], {
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
/*! exports provided: InputElasticSearch */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InputElasticSearch", function() { return InputElasticSearch; });
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @grafana/ui */ "@grafana/ui");
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_grafana_ui__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);


var InputElasticSearch = function InputElasticSearch(_a) {
  var updateQuery = _a.updateQuery,
      defaultValue = _a.defaultValue;
  return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_1___default.a.Fragment, null, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_0__["InlineFieldRow"], null, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_0__["InlineField"], {
    label: "Elastic Search Query",
    labelWidth: 20
  }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_0__["Input"], {
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
/*! exports provided: InputGroupBy */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InputGroupBy", function() { return InputGroupBy; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../node_modules/tslib/tslib.es6.js");
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @grafana/ui */ "@grafana/ui");
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);



var InputGroupBy = function InputGroupBy(_a) {
  var query = _a.query,
      updateQuery = _a.updateQuery,
      datasource = _a.datasource;

  var _b = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__read"])(Object(react__WEBPACK_IMPORTED_MODULE_2__["useState"])(query.groupBy), 2),
      chosenValue = _b[0],
      setChosenValue = _b[1];

  var _c = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__read"])(Object(react__WEBPACK_IMPORTED_MODULE_2__["useState"])([{
    label: 'Loading ...',
    value: ''
  }]), 2),
      options = _c[0],
      setOptions = _c[1];

  Object(react__WEBPACK_IMPORTED_MODULE_2__["useEffect"])(function () {
    var results = [];
    var unmounted = false;

    function getTableColumnOptions() {
      var _a;

      return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function () {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"])(this, function (_b) {
          switch (_b.label) {
            case 0:
              return [4
              /*yield*/
              , datasource.snowConnection.getTableColumnOptions((_a = query.tableName) === null || _a === void 0 ? void 0 : _a.value)];

            case 1:
              results = _b.sent();

              if (!unmounted) {
                if (results.length > 0) {
                  setOptions(results);
                }
              }

              return [2
              /*return*/
              ];
          }
        });
      });
    }

    getTableColumnOptions();
    return function () {
      unmounted = true;
    };
  }, [datasource.snowConnection, query.tableName]);
  return react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_2___default.a.Fragment, null, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["InlineFieldRow"], null, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["InlineField"], {
    labelWidth: 20,
    label: "Group By",
    tooltip: "Select a column which will be used to group the results by."
  }, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["Select"], {
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
/*! exports provided: InputLimit */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InputLimit", function() { return InputLimit; });
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @grafana/ui */ "@grafana/ui");
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_grafana_ui__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);


var InputLimit = function InputLimit(_a) {
  var updateQuery = _a.updateQuery,
      defaultValue = _a.defaultValue;
  return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_1___default.a.Fragment, null, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_0__["InlineFieldRow"], null, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_0__["InlineField"], {
    label: "Limit",
    labelWidth: 20,
    tooltip: "Limit the number of results. Expects a number between 1 - 9999"
  }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_0__["Input"], {
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
/*! exports provided: InputOsquery */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InputOsquery", function() { return InputOsquery; });
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @grafana/ui */ "@grafana/ui");
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_grafana_ui__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);


var InputOsquery = function InputOsquery(_a) {
  var updateQuery = _a.updateQuery,
      defaultValue = _a.defaultValue;
  return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_1___default.a.Fragment, null, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_0__["InlineFieldRow"], null, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_0__["InlineField"], {
    label: "Osquery",
    labelWidth: 20
  }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_0__["Input"], {
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
/*! exports provided: InputPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InputPage", function() { return InputPage; });
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @grafana/ui */ "@grafana/ui");
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_grafana_ui__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);


var InputPage = function InputPage(_a) {
  var defaultValue = _a.defaultValue,
      updateQuery = _a.updateQuery;
  return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_1___default.a.Fragment, null, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_0__["InlineFieldRow"], null, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_0__["InlineField"], {
    label: "Page",
    labelWidth: 20,
    tooltip: "Page number used for pagination. Starts at page 0"
  }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_0__["Input"], {
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
/*! exports provided: InputParentDepth */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InputParentDepth", function() { return InputParentDepth; });
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @grafana/ui */ "@grafana/ui");
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_grafana_ui__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);


var InputParentDepth = function InputParentDepth(_a) {
  var updateQuery = _a.updateQuery,
      defaultValue = _a.defaultValue;
  return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_1___default.a.Fragment, null, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_0__["InlineFieldRow"], null, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_0__["InlineField"], {
    label: "Parent Depth",
    labelWidth: 20
  }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_0__["Input"], {
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
/*! exports provided: InputSysparam */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InputSysparam", function() { return InputSysparam; });
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @grafana/ui */ "@grafana/ui");
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_grafana_ui__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);


var InputSysparam = function InputSysparam(_a) {
  var updateQuery = _a.updateQuery,
      defaultValue = _a.defaultValue;
  return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_1___default.a.Fragment, null, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_0__["InlineFieldRow"], null, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_0__["InlineField"], {
    label: "Sysparam Query",
    labelWidth: 20
  }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_0__["Input"], {
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
/*! exports provided: SelectAggregate */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SelectAggregate", function() { return SelectAggregate; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../node_modules/tslib/tslib.es6.js");
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @grafana/ui */ "@grafana/ui");
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);



var SelectAggregate = function SelectAggregate(_a) {
  var query = _a.query,
      updateQuery = _a.updateQuery,
      datasource = _a.datasource;
  var aggregationTypeOptions = datasource.snowConnection.getAggregateTypeOptions();

  var _b = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__read"])(Object(react__WEBPACK_IMPORTED_MODULE_2__["useState"])([{
    label: 'Loading ...',
    value: ''
  }]), 2),
      options = _b[0],
      setOptions = _b[1];

  Object(react__WEBPACK_IMPORTED_MODULE_2__["useEffect"])(function () {
    var results = [];
    console.log('SelectTableColumns - UseEffect');
    var unmounted = false;

    function getTableColumnOptions() {
      var _a;

      return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function () {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"])(this, function (_b) {
          switch (_b.label) {
            case 0:
              return [4
              /*yield*/
              , datasource.snowConnection.getTableColumnOptions((_a = query.tableName) === null || _a === void 0 ? void 0 : _a.value)];

            case 1:
              results = _b.sent();

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

              return [2
              /*return*/
              ];
          }
        });
      });
    }

    getTableColumnOptions();
    return function () {
      unmounted = true;
    };
  }, [datasource.snowConnection, query.tableName, query.aggregateColumn]);
  return react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_2___default.a.Fragment, null, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["InlineFieldRow"], null, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["InlineField"], {
    label: "Aggregate Function",
    labelWidth: 20,
    tooltip: "Choose your aggregation function then the column to run this function on"
  }, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["Select"], {
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
  })), react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["InlineField"], null, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["Select"], {
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
        newQuery = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__spreadArray"])([], Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__read"])(query.aggregateColumn), false);
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
/*! exports provided: SelectAlertState */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SelectAlertState", function() { return SelectAlertState; });
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @grafana/ui */ "@grafana/ui");
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_grafana_ui__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);


var SelectAlertState = function SelectAlertState(_a) {
  var options = _a.options,
      value = _a.value,
      updateQuery = _a.updateQuery;
  return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_1___default.a.Fragment, null, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_0__["InlineFieldRow"], null, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_0__["InlineField"], {
    label: "Alert State Filter",
    labelWidth: 20
  }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_0__["Select"], {
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
/*! exports provided: SelectAlertType */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SelectAlertType", function() { return SelectAlertType; });
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @grafana/ui */ "@grafana/ui");
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_grafana_ui__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);


var SelectAlertType = function SelectAlertType(_a) {
  var options = _a.options,
      value = _a.value,
      updateQuery = _a.updateQuery;
  return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_1___default.a.Fragment, null, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_0__["InlineFieldRow"], null, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_0__["InlineField"], {
    label: "Alert Type Filter",
    labelWidth: 20
  }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_0__["Select"], {
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
/*! exports provided: SelectBasicSysparam */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SelectBasicSysparam", function() { return SelectBasicSysparam; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../node_modules/tslib/tslib.es6.js");
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @grafana/ui */ "@grafana/ui");
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);



var SelectBasicSysparam = function SelectBasicSysparam(_a) {
  var query = _a.query,
      updateQuery = _a.updateQuery,
      datasource = _a.datasource,
      sysparamTypeOptions = _a.sysparamTypeOptions,
      loadChoices = _a.loadChoices;

  var _b = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__read"])(Object(react__WEBPACK_IMPORTED_MODULE_2__["useState"])([{
    label: 'Loading ...',
    value: ''
  }]), 2),
      columnOptions = _b[0],
      setColumnOptions = _b[1];

  Object(react__WEBPACK_IMPORTED_MODULE_2__["useEffect"])(function () {
    var results = [];
    var unmounted = false;

    function getTableColumnOptions() {
      var _a;

      return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function () {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"])(this, function (_b) {
          switch (_b.label) {
            case 0:
              return [4
              /*yield*/
              , datasource.snowConnection.getTableColumnOptions((_a = query.tableName) === null || _a === void 0 ? void 0 : _a.value)];

            case 1:
              results = _b.sent();

              if (!unmounted) {
                if (results.length > 0) {
                  setColumnOptions(results);
                }
              }

              return [2
              /*return*/
              ];
          }
        });
      });
    }

    getTableColumnOptions();
    return function () {
      unmounted = true;
    };
  }, [datasource.snowConnection, query.tableName]);

  var values = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__spreadArray"])([], Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__read"])(query.basic_sysparam), false);

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

  var _loop_1 = function _loop_1(i) {
    fields.push(react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_2___default.a.Fragment, null, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["InlineFieldRow"], null, i !== 0 && react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["InlineField"], null, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["RadioButtonGroup"], {
      options: radioOptions,
      value: typeof values[i][4] !== 'undefined' ? values[i][4].value : null,
      onChange: function onChange(v) {
        return updateValue(i, 4, {
          label: v,
          value: v
        });
      }
    })), react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["InlineField"], {
      label: i === 0 ? 'Sysparam Query' : undefined,
      labelWidth: i === 0 ? 20 : undefined
    }, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["Select"], {
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
    })), react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["InlineField"], null, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["Select"], {
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
    })), react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["InlineField"], null, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["AsyncSelect"], {
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
    })), i > 0 && react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["InlineField"], null, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["ToolbarButton"], {
      icon: "trash-alt",
      variant: "destructive",
      iconOnly: true,
      onClick: function onClick() {
        return deleteRow(i);
      }
    }))), i === length - 1 && react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["InlineFieldRow"], null, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["InlineField"], null, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["ToolbarButton"], {
      icon: "plus",
      variant: "primary",
      onClick: function onClick() {
        return addRow();
      }
    })))));
  };

  for (var i = 0; i < length; i++) {
    _loop_1(i);
  }

  return react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_2___default.a.Fragment, null, fields);
};

/***/ }),

/***/ "./components/SelectCI.tsx":
/*!*********************************!*\
  !*** ./components/SelectCI.tsx ***!
  \*********************************/
/*! exports provided: SelectCI */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SelectCI", function() { return SelectCI; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../node_modules/tslib/tslib.es6.js");
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @grafana/ui */ "@grafana/ui");
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);



var SelectCI = function SelectCI(_a) {
  var loadOptions = _a.loadOptions,
      value = _a.value,
      updateQuery = _a.updateQuery;
  return react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_2___default.a.Fragment, null, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["InlineFieldRow"], null, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["InlineField"], {
    label: "CI",
    labelWidth: 20
  }, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["AsyncSelect"], {
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
        newQuery = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__spreadArray"])([], Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__read"])(value), false);
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
/*! exports provided: SelectCacheTimeout */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SelectCacheTimeout", function() { return SelectCacheTimeout; });
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @grafana/ui */ "@grafana/ui");
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_grafana_ui__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);


var SelectCacheTimeout = function SelectCacheTimeout(_a) {
  var value = _a.value,
      updateQuery = _a.updateQuery;
  var cacheOptions = ['5s', '30s', '60s', '2m', '5m', '15m', '30m'];
  return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_1___default.a.Fragment, null, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_0__["InlineFieldRow"], null, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_0__["InlineField"], null, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_0__["RefreshPicker"], {
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
/*! exports provided: SelectChangeType */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SelectChangeType", function() { return SelectChangeType; });
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @grafana/ui */ "@grafana/ui");
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_grafana_ui__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);


var SelectChangeType = function SelectChangeType(_a) {
  var options = _a.options,
      value = _a.value,
      updateQuery = _a.updateQuery;
  return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_1___default.a.Fragment, null, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_0__["InlineFieldRow"], null, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_0__["InlineField"], {
    label: "Change Type Filter",
    labelWidth: 20
  }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_0__["Select"], {
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
/*! exports provided: SelectMetric */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SelectMetric", function() { return SelectMetric; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../node_modules/tslib/tslib.es6.js");
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @grafana/ui */ "@grafana/ui");
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);



var SelectMetric = function SelectMetric(_a) {
  var loadOptions = _a.loadOptions,
      value = _a.value,
      updateQuery = _a.updateQuery;
  return react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_2___default.a.Fragment, null, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["InlineFieldRow"], null, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["InlineField"], {
    label: "Metric Name",
    labelWidth: 20
  }, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["AsyncSelect"], {
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
        newQuery = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__spreadArray"])([], Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__read"])(value), false);
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
/*! exports provided: SelectMetricAnomaly */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SelectMetricAnomaly", function() { return SelectMetricAnomaly; });
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @grafana/ui */ "@grafana/ui");
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_grafana_ui__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);


var SelectMetricAnomaly = function SelectMetricAnomaly(_a) {
  var options = _a.options,
      value = _a.value,
      updateQuery = _a.updateQuery;
  return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_1___default.a.Fragment, null, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_0__["InlineFieldRow"], null, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_0__["InlineField"], {
    label: "Anomaly",
    labelWidth: 20
  }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_0__["Select"], {
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
/*! exports provided: SelectResource */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SelectResource", function() { return SelectResource; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../node_modules/tslib/tslib.es6.js");
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @grafana/ui */ "@grafana/ui");
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);



var SelectResource = function SelectResource(_a) {
  var loadOptions = _a.loadOptions,
      value = _a.value,
      updateQuery = _a.updateQuery;
  return react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_2___default.a.Fragment, null, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["InlineFieldRow"], null, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["InlineField"], {
    label: "Resource ID",
    labelWidth: 20
  }, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["AsyncSelect"], {
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
        newQuery = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__spreadArray"])([], Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__read"])(value), false);
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
/*! exports provided: SelectService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SelectService", function() { return SelectService; });
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @grafana/ui */ "@grafana/ui");
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_grafana_ui__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);


var SelectService = function SelectService(_a) {
  var loadOptions = _a.loadOptions,
      value = _a.value,
      updateQuery = _a.updateQuery;
  return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_1___default.a.Fragment, null, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_0__["InlineFieldRow"], null, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_0__["InlineField"], {
    label: "Service",
    labelWidth: 20
  }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_0__["AsyncSelect"], {
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
/*! exports provided: SelectSortBy */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SelectSortBy", function() { return SelectSortBy; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../node_modules/tslib/tslib.es6.js");
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @grafana/ui */ "@grafana/ui");
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);



var SelectSortBy = function SelectSortBy(_a) {
  var query = _a.query,
      updateQuery = _a.updateQuery,
      datasource = _a.datasource;
  var sortDirectionOptions = [{
    label: 'ASC',
    value: 'ASC',
    icon: 'arrow-up'
  }, {
    label: 'DESC',
    value: 'DESC',
    icon: 'arrow-down'
  }];

  var _b = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__read"])(Object(react__WEBPACK_IMPORTED_MODULE_2__["useState"])([{
    label: 'Loading ...',
    value: ''
  }]), 2),
      options = _b[0],
      setOptions = _b[1];

  Object(react__WEBPACK_IMPORTED_MODULE_2__["useEffect"])(function () {
    var results = [];
    console.log('SelectTableColumns - UseEffect');
    var unmounted = false;

    function getTableColumnOptions() {
      var _a;

      return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function () {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"])(this, function (_b) {
          switch (_b.label) {
            case 0:
              return [4
              /*yield*/
              , datasource.snowConnection.getTableColumnOptions((_a = query.tableName) === null || _a === void 0 ? void 0 : _a.value)];

            case 1:
              results = _b.sent();

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

              return [2
              /*return*/
              ];
          }
        });
      });
    }

    getTableColumnOptions();
    return function () {
      unmounted = true;
    };
  }, [datasource.snowConnection, query.tableName, query.sortBy]);
  return react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_2___default.a.Fragment, null, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["InlineFieldRow"], null, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["InlineField"], {
    label: "Sort By",
    labelWidth: 20
  }, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["Select"], {
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
  })), react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["InlineField"], null, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["RadioButtonGroup"], {
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
/*! exports provided: SelectStartingPoint */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SelectStartingPoint", function() { return SelectStartingPoint; });
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @grafana/ui */ "@grafana/ui");
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_grafana_ui__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);


var SelectStartingPoint = function SelectStartingPoint(_a) {
  var loadOptions = _a.loadOptions,
      value = _a.value,
      updateQuery = _a.updateQuery;
  return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_1___default.a.Fragment, null, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_0__["InlineFieldRow"], null, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_0__["InlineField"], {
    label: "Starting Point",
    labelWidth: 20
  }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_0__["AsyncSelect"], {
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
/*! exports provided: SelectTableColumn */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SelectTableColumn", function() { return SelectTableColumn; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../node_modules/tslib/tslib.es6.js");
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @grafana/ui */ "@grafana/ui");
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);



var SelectTableColumn = function SelectTableColumn(_a) {
  var query = _a.query,
      updateQuery = _a.updateQuery,
      datasource = _a.datasource;

  var _b = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__read"])(Object(react__WEBPACK_IMPORTED_MODULE_2__["useState"])(query.selectedtableColumns), 2),
      chosenValue = _b[0],
      setChosenValue = _b[1];

  var _c = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__read"])(Object(react__WEBPACK_IMPORTED_MODULE_2__["useState"])([{
    label: 'Loading ...',
    value: ''
  }]), 2),
      options = _c[0],
      setOptions = _c[1];

  Object(react__WEBPACK_IMPORTED_MODULE_2__["useEffect"])(function () {
    var results = [];
    console.log('SelectTableColumns - UseEffect');
    var unmounted = false;

    function getTableColumnOptions() {
      var _a;

      return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function () {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"])(this, function (_b) {
          switch (_b.label) {
            case 0:
              return [4
              /*yield*/
              , datasource.snowConnection.getTableColumnOptions((_a = query.tableName) === null || _a === void 0 ? void 0 : _a.value)];

            case 1:
              results = _b.sent();

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

              return [2
              /*return*/
              ];
          }
        });
      });
    }

    getTableColumnOptions();
    return function () {
      unmounted = true;
    };
  }, [datasource.snowConnection, query.tableName, chosenValue]);
  return react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_2___default.a.Fragment, null, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["InlineFieldRow"], null, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["InlineField"], {
    labelWidth: 20,
    label: "Table Columns",
    tooltip: "Leave columns blank to return all columns in the dictionary"
  }, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["Select"], {
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
    prefix: react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["Icon"], {
      name: "columns"
    }),
    className: "min-width-10 max-width-30",
    onChange: function onChange(v) {
      setChosenValue(v);
      updateQuery('selectedtableColumns', v);
    },
    onCreateOption: function onCreateOption(v) {
      var newQuery = [];

      if (typeof chosenValue !== 'undefined') {
        newQuery = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__spreadArray"])([], Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__read"])(chosenValue), false);
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
/*! exports provided: SelectTableName */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SelectTableName", function() { return SelectTableName; });
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @grafana/ui */ "@grafana/ui");
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_grafana_ui__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);


var SelectTableName = function SelectTableName(_a) {
  var loadTableOptions = _a.loadTableOptions,
      value = _a.value,
      updateQuery = _a.updateQuery;
  return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_1___default.a.Fragment, null, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_0__["InlineFieldRow"], null, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_0__["InlineField"], {
    label: "Table Name",
    labelWidth: 20
  }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_0__["AsyncSelect"], {
    value: value,
    isClearable: true,
    maxMenuHeight: 200,
    isSearchable: true,
    defaultValue: value,
    defaultOptions: true,
    menuPlacement: "bottom",
    allowCustomValue: true,
    backspaceRemovesValue: true,
    prefix: react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_0__["Icon"], {
      name: "table"
    }),
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
/*! exports provided: SelectTags */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SelectTags", function() { return SelectTags; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../node_modules/tslib/tslib.es6.js");
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @grafana/ui */ "@grafana/ui");
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! lodash */ "lodash");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_3__);




var SelectTags = function SelectTags(_a) {
  var query = _a.query,
      updateQuery = _a.updateQuery,
      datasource = _a.datasource,
      replaceMultipleVariables = _a.replaceMultipleVariables;

  var _b = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__read"])(Object(react__WEBPACK_IMPORTED_MODULE_2__["useState"])([{
    label: 'Loading...',
    value: ''
  }]), 2),
      keyOptions = _b[0],
      setKeyOptions = _b[1];

  var _c = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__read"])(Object(react__WEBPACK_IMPORTED_MODULE_2__["useState"])([{
    label: 'Loading...',
    value: ''
  }]), 2),
      valueOptions = _c[0],
      setValueOptions = _c[1];

  Object(react__WEBPACK_IMPORTED_MODULE_2__["useEffect"])(function () {
    var keys = [];
    var values = [];
    var tags = [];
    console.log('Use Effect: SelectTags Component');
    console.log('query', query);

    function getKeyOptions() {
      return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function () {
        var selectedAlertStateList, sysparam_query, rowLimit, _loop_1, i, newSelectedValues;

        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"])(this, function (_a) {
          switch (_a.label) {
            case 0:
              selectedAlertStateList = query.selectedAlertStateList, sysparam_query = query.sysparam_query, rowLimit = query.rowLimit;
              sysparam_query = replaceMultipleVariables(sysparam_query);
              console.log('replaced sysparam: ', sysparam_query);
              return [4
              /*yield*/
              , datasource.snowConnection.getAlertTags(selectedAlertStateList, sysparam_query, rowLimit)];

            case 1:
              tags = _a.sent();
              console.log('Tags: ', tags);

              _loop_1 = function _loop_1(i) {
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
                _loop_1(i);
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
              }); // Removes any tagValues that are not currently in the list

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

                    if (!Object(lodash__WEBPACK_IMPORTED_MODULE_3__["isEqual"])(newSelectedValues, query.tagValues)) {
                      updateQuery('tagValues', newSelectedValues);
                    }
                  }
                }
              }

              setKeyOptions(keys);
              setValueOptions(values);
              return [2
              /*return*/
              ];
          }
        });
      });
    }

    getKeyOptions();
  }, [datasource.snowConnection, query, updateQuery, replaceMultipleVariables]);
  var customKeyOptions = keyOptions;

  if (typeof query.tagKeys !== 'undefined') {
    customKeyOptions = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__spreadArray"])(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__spreadArray"])([], Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__read"])(keyOptions), false), [query.tagKeys], false);
    customKeyOptions = [].concat.apply([], customKeyOptions);
  }

  var customValueOptions = valueOptions;

  if (typeof query.tagValues !== 'undefined') {
    customValueOptions = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__spreadArray"])(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__spreadArray"])([], Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__read"])(valueOptions), false), [query.tagValues], false);
    customValueOptions = [].concat.apply([], customValueOptions);
  }

  return react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_2___default.a.Fragment, null, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["InlineFieldRow"], null, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["InlineField"], {
    label: "Tag Keys",
    labelWidth: 20,
    tooltip: "Filter by tags located in additional info"
  }, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["Select"], {
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
        newValue = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__spreadArray"])([], Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__read"])(query.tagKeys), false);
        newValue.push(customValue);
      } else {
        newValue = [customValue];
      }

      updateQuery('tagKeys', newValue);
    },
    maxMenuHeight: 200
  })), react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["InlineField"], {
    label: "Tag Values",
    labelWidth: 20
  }, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["Select"], {
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
        newValue = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__spreadArray"])([], Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__read"])(query.tagValues), false);
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
/*! exports provided: SelectTrend */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SelectTrend", function() { return SelectTrend; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../node_modules/tslib/tslib.es6.js");
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @grafana/ui */ "@grafana/ui");
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);



var SelectTrend = function SelectTrend(_a) {
  var updateQuery = _a.updateQuery,
      trendByOptions = _a.trendByOptions,
      query = _a.query,
      datasource = _a.datasource;

  var _b = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__read"])(Object(react__WEBPACK_IMPORTED_MODULE_2__["useState"])([{
    label: 'Loading ...',
    value: ''
  }]), 2),
      options = _b[0],
      setOptions = _b[1];

  Object(react__WEBPACK_IMPORTED_MODULE_2__["useEffect"])(function () {
    var results = [];
    var unmounted = false;

    function getTableColumnOptions() {
      var _a;

      return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function () {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"])(this, function (_b) {
          switch (_b.label) {
            case 0:
              return [4
              /*yield*/
              , datasource.snowConnection.getTableColumnOptions((_a = query.tableName) === null || _a === void 0 ? void 0 : _a.value)];

            case 1:
              results = _b.sent();

              if (!unmounted) {
                if (results.length > 0) {
                  setOptions(results);
                }
              }

              return [2
              /*return*/
              ];
          }
        });
      });
    }

    getTableColumnOptions();
    return function () {
      unmounted = true;
    };
  }, [datasource.snowConnection, query.tableName]);
  return react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_2___default.a.Fragment, null, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["InlineFieldRow"], null, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["InlineField"], {
    label: "Trend",
    labelWidth: 20
  }, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["Select"], {
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
  })), react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["InlineField"], null, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["Select"], {
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
  })), react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["InlineField"], null, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["Input"], {
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
/*! exports provided: ShowPercentSwitch */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ShowPercentSwitch", function() { return ShowPercentSwitch; });
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @grafana/ui */ "@grafana/ui");
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_grafana_ui__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);


var ShowPercentSwitch = function ShowPercentSwitch(_a) {
  var value = _a.value,
      updateQuery = _a.updateQuery;
  var switchOptions = [{
    label: 'False',
    value: false
  }, {
    label: 'True',
    value: true
  }];
  return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_1___default.a.Fragment, null, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_0__["InlineFieldRow"], null, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_0__["InlineField"], {
    label: "Show Uptime %",
    labelWidth: 20
  }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_0__["RadioButtonGroup"], {
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
/*! exports provided: TimerangeCheckbox */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TimerangeCheckbox", function() { return TimerangeCheckbox; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../node_modules/tslib/tslib.es6.js");
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @grafana/ui */ "@grafana/ui");
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);



var TimerangeCheckbox = function TimerangeCheckbox(_a) {
  var query = _a.query,
      updateQuery = _a.updateQuery,
      datasource = _a.datasource;

  var _b = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__read"])(Object(react__WEBPACK_IMPORTED_MODULE_2__["useState"])([{
    label: 'Loading ...',
    value: ''
  }]), 2),
      options = _b[0],
      setOptions = _b[1];

  Object(react__WEBPACK_IMPORTED_MODULE_2__["useEffect"])(function () {
    var results = [];
    console.log('SelectTableColumns - UseEffect');
    var unmounted = false;

    function getTableColumnOptions() {
      var _a;

      return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function () {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"])(this, function (_b) {
          switch (_b.label) {
            case 0:
              return [4
              /*yield*/
              , datasource.snowConnection.getTableColumnOptions((_a = query.tableName) === null || _a === void 0 ? void 0 : _a.value)];

            case 1:
              results = _b.sent();

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

              return [2
              /*return*/
              ];
          }
        });
      });
    }

    getTableColumnOptions();
    return function () {
      unmounted = true;
    };
  }, [datasource.snowConnection, query.tableName, query.grafanaTimerangeColumn]);
  return react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_2___default.a.Fragment, null, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["InlineFieldRow"], null, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["InlineField"], {
    label: "Grafana Timerange",
    labelWidth: 20,
    tooltip: "If selected, only results that fit inbetween your Grafana Timerange will be returned"
  }, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["InlineSwitch"], {
    value: query.grafanaTimerange,
    onChange: function onChange(v) {
      return updateQuery('grafanaTimerange', v.target.checked);
    }
  })), query.grafanaTimerange && react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["InlineField"], null, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["Select"], {
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
/*! exports provided: ToggleLogCompression */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ToggleLogCompression", function() { return ToggleLogCompression; });
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @grafana/ui */ "@grafana/ui");
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_grafana_ui__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);


var ToggleLogCompression = function ToggleLogCompression(_a) {
  var value = _a.value,
      updateQuery = _a.updateQuery;
  return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_1___default.a.Fragment, null, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_0__["InlineFieldRow"], null, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_0__["InlineField"], {
    label: "Compress Logs",
    labelWidth: 20
  }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_0__["InlineSwitch"], {
    value: value,
    onChange: function onChange(v) {
      return updateQuery('compressLogs', v.target.checked);
    }
  }))));
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