/**
 * focusClass
 * @constructor
 * @author putaoshu@126.com
 * @date 2012-03-12
 * @param {Object} obj 主对象
 * @param {String} styleclass 样式名称
 */

vui.focusclass = vui.focusClass = function(obj,styleclass){
	var $this = $(obj);
	$this.focus(function(){
		$this.toggleClass(styleclass); 
	}).blur(function(){
		$this.toggleClass(styleclass);
	});
}

