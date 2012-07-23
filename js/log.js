/**
 * console.log方法(兼容IE)
 * @constructor
 * @author putaoshu@126.com
 * @param {All} text
 * @example vui.log('a')
 * @date 2012-02-08
 */

vui.log = function(text) {
	window.console && console.log(text);
}

