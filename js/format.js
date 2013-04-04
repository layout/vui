/**
 * 对目标字符串进行格式化
 * @constructor
 * @name vui.format
 * @author putaoshu@126.com
 * @date 2013-4-4
 * @param {String} source 目标字符串
 * @param {Object} opts 组件配置
 * @returns {String} 格式化后的字符串
 * @example 
vui.format('<div class="#{myClassName}"></div>',{myClassName:'menu'})
 */

vui.format = function (source, opts) {
    source = String(source);
    var data = Array.prototype.slice.call(arguments,1), toString = Object.prototype.toString;
    if(data.length){
	    data = data.length == 1 ? 
	    	/* ie 下 Object.prototype.toString.call(null) == '[object Object]' */
	    	(opts !== null && (/\[object Array\]|\[object Object\]/.test(toString.call(opts))) ? opts : data) 
	    	: data;
    	return source.replace(/#\{(.+?)\}/g, function (match, key){
	    	var replacer = data[key];
	    	// chrome 下 typeof /a/ == 'function'
	    	if('[object Function]' == toString.call(replacer)){
	    		replacer = replacer(key);
	    	}
	    	return ('undefined' == typeof replacer ? '' : replacer);
    	});
    }
    return source;
}

