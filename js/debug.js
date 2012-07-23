/**
 * 检测URL中是否含有'debug'
 * @constructor
 * @author putaoshu@126.com
 * @date 2012-04-17
 * @return {Boolean} true/false
 */

vui.debug=function(){
	return /debug/.test(location.search);
}

