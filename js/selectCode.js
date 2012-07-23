/**
 * 选中文字
 * @constructor
 * @author putaoshu@126.com
 * @date 2012-06-14
 * @param {Object} obj 主对象
 * @param {Number} start 开始位置
 * @param {Number} last 结束位置
 * @see 应用对象input,textarea dom
 * @example  vui.selectCode($('#rename'),0,3);
 */

 vui.selectCode = function(obj,start,last){
	var objLength = obj.value.length;
	if (start<0 || last<0){
		return;
	}

	if (start>objLength){
		start=objLength;
	}

	if (last>objLength){
		last=objLength;
	}

	 if (obj.createTextRange){
		//IE
		var range = obj.createTextRange();
		range.moveStart("character",-objLength);              
		range.moveEnd("character",-objLength);
		range.moveStart('character',start);
		range.moveEnd('character',last);
		range.select();
 	 }else{
		//other
		obj.setSelectionRange(start,last);
		obj.focus();
	 }
}

