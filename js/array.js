/**
 * 数字转成数组
 * @constructor
 * @name vui.numberToArray
 * @author putaoshu@126.com
 * @date 2012-02-08
 * @param {Number} o number主体
 * @return {Array} 数组
 * @requires vui.isString() ; vui.isNumber()
 */
vui.numberToArray=function(o){
	if (vui.isString(o)){
		o = parseInt(o);
	}
	if(vui.isNumber(o)) o = [o];
	return o;
}

/**
 * 返回数组中某个元素的位置
 * @constructor
 * @name vui.indexOf
 * @author putaoshu@126.com
 * @date 2012-07-03
 * @param {Array} o Array主体
 * @param {All} value 待检测的元素
 * @return 若存在此元素返回该元素的位置,若不存在则返回-1
 * @requires vui.isArray()
 */
vui.indexOf = function (o,value){
	 if (vui.isArray(o)){
		var result;
		for (var i=0;i<o.length;i++){
			if (o[i]==value){
				result = i;
				break
			}else{
				result = -1;
			}
		}
		return result;
	 }
}