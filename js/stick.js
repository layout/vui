/**
 * stick
 * @constructor
 * @author putaoshu@126.com
 * @date 2012-03-20
 * @param {Object} options 组件配置
 * @param {Object} options.obj null 粘到那个元素上
 * @param {Object} options.stickTo null 被粘的对象
 * @param {Boolean} options.resize true 窗口有变更自动更新
 * @param {Boolean} options.autoShow false 主体元素有被遮挡时,把主体转移到上面
 * @param {Object} options.css
 * @param {Number} options.css.type 0 输入偏移量,1为默认输入
 * @param {String} options.css.position 'absolute' position
 * @param {Number}  options.css.top 0 向上的偏移量
 * @param {Number}  options.css.left 0 向左的偏移量
 * @param {Number}  options.css.zIndex 2 zIndex
 * @example 
vui.stick({
	stick:$('#more'),
	stickTo:$('#moreOperateLayer'),
	autoShow:true,
	css:{
		top:3,
		left:0,
		zIndex:20
	}
});
 */

vui.stick = function(options) {

	options = $.extend({
		stick :null,
		stickTo : null,
		resize : true,//窗口有变更自动更新
		autoShow : false,//自适应:即在主体元素有被遮挡时,把主体转移到上面
		css:{
			type:0,
			position:'absolute',
			top : 0,
			left : 0,
			zIndex : 2
		}
	},options);

	function getStyle(){
		var offsetResult = {};
		if (options.css.type){
			offsetResult = {
				top: options.css.top,
				left: options.css.left
			}

			//自适应:即在主体元素有被遮挡时,把主体转移到上面
			if (options.autoShow){
				var docHeight = $(window).height()+$(document).scrollTop();
				var coreTop = offsetResult.top+options.stickTo.outerHeight();
				if (coreTop>docHeight){
					offsetResult.top = offsetResult.top - options.stickTo.outerHeight();
				}
			}

		}else{
			offsetResult = {
				top: options.stick.offset().top + options.css.top + options.stick.outerHeight(),
				left: options.stick.offset().left + options.css.left
			}

			//自适应:即在主体元素有被遮挡时,把主体转移到上面
			if (options.autoShow){
				var docHeight = $(window).height()+$(document).scrollTop();
				var coreTop = offsetResult.top+options.stickTo.outerHeight();
				if (coreTop>docHeight){
					offsetResult.top = options.stick.offset().top - options.stickTo.outerHeight();
				}
			}
		}
		
		return offsetResult;
	}

	options.stickTo.css({position:'absolute',zIndex:options.css.zIndex,top:getStyle().top,left:getStyle().left}).show();

	if (options.resize){
		$(window).resize(function(){
			options.stickTo.css(getStyle());
		});
	}
}

