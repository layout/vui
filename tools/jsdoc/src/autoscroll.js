/**
 * 自动滚动到页面中的某元素区域
 * @constructor
 * @author putaoshu@126.com
 * @date 2012-03-12
 */

vui.autoscroll= function(obj,time){
	var $this = $(obj);
	if(!time) time = 500;
	var $top = $this.offset().top;
	$('html,body').animate({
		scrollTop:$top
	},time);
}