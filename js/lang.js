/**
 * lang
 * @constructor
 * @author putaoshu@126.com
 * @date 2012-03-14
 * @example vui.isEmpty('abc')
 */

/**
 * @name vui.isArray
 * @param {All} obj 主体
 * @return {Boolean} true/false
 */
vui.isArray = function(obj){
	return Object.prototype.toString.apply(obj) === '[object Array]';
}

/**
 * @name vui.isEmpty
 * @param {All} obj 主体
 * @return {Boolean} true/false
 */
vui.isEmpty = function (obj) {
    return obj === null || typeof obj === 'undefined' || 
			 obj === 0 || obj === false || obj === '' || 
			(typeof obj.length === 'number' && obj.length === 0);
  };

/**
 * @name vui.isNumber
 * @param {All} obj 主体
 * @return {Boolean} true/false
 */
vui.isNumber = function(obj){
	 return typeof(obj) === 'number';
}

/**
 * @name vui.isString
 * @param {All} obj 主体
 * @return {Boolean} true/false
 */
vui.isString = function(obj){
	 return typeof(obj) === 'string';
}

/**
 * @name vui.isBoolean
 * @param {All} obj 主体
 * @return {Boolean} true/false
 */
vui.isBoolean = function(obj){
	 return typeof(obj) === 'boolean';
}

/**
 * @name vui.isObject
 * @param {All} obj 主体
 * @return {Boolean} true/false
 */
vui.isObject = function(obj){
	 return typeof(obj) === 'object';
}

/**
 * @name vui.isFunction
 * @param {All} obj 主体
 * @return {Boolean} true/false
 */
vui.isFunction = function(obj){
	 return typeof(obj) === 'function';
}

/**
 * @name vui.isUndefined
 * @param {All} obj 主体
 * @return {Boolean} true/false
 */
vui.isUndefined = function(obj){
	 return o === undefined;
}

/**
 * @name vui.isNull
 * @param {All} obj 主体
 * @return {Boolean} true/false
 */
vui.isNull = function(obj){
	 return o === null;
}

