/**
 *  数字类型转化为数组类型
 * @constructor
 * @id STK.core.evt.addEvent
 * @alias STK.core.evt.addEvent
 * @param {Node} sNode
 * @param {String} sEventType
 * @param {Function} oFunc
 * @return {Boolean} TRUE/FALSE
 * @constructor
 * @author putaoshu@126.com
 * @date 2012-07-03
 * @example 
 * vui.numberToArray(number2);
 * vui.numberToArray(number);
 */

vui.numberToArray=function(o){
	if (vui.isString(o)){
		o = parseInt(o);
	}
	if(vui.isNumber(o)) o = [o];
	return o;
}

/**
 * vui array indexOf 返回数组中元素的位置,若不存在此元素则返回-1
 * @constructor
 * @constructor
 * @author putaoshu@126.com
 * @date 2012-07-03
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