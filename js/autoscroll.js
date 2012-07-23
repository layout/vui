/**
 * 自动页面滚动至某元素
 * @constructor
 * @author putaoshu@126.com
 * @date 2012-03-12
 * @param {Object} obj 主对象
 * @param {Number} time 页面滚动至某元素所需时间
 * @example vui.autoscroll($('#goTop'),100)
 */

vui.autoscroll= function(obj,time){
	var $this = $(obj);
	if(!time) time = 500;
	var $top = $this.offset().top;
	$('html,body').animate({
		scrollTop:$top
	},time);
}

