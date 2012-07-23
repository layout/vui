/**
 * 选中文件名中非扩展名部分
 * @constructor
 * @author putaoshu@126.com
 * @date 2012-06-14
 * @param {Object} obj 主对象
 * @param {String} 'all' 全部选中
 * @require  vui.selectCode
 * @example  vui.selectFileName($('#rename'));
 */

 vui.selectFileName = function(obj,all){
	var filename = obj.value;
	 var lastDotPlace = filename.lastIndexOf('.');
	 if (lastDotPlace==-1 || all == 'all'){
		lastDotPlace = filename.length;
	 }

	 //to select code
	 vui.selectCode(obj,0,lastDotPlace);
}

