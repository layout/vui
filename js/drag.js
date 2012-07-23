/**
 * vui 拖拽
 * @constructor
 * @author putaoshu@126.com
 * @date 2012-07-19
 * @param {Object} obj 主对象
 * @param {Object} options 组件配置
 * @param {Boolean} options.lockX   false 锁定X
 * @param {Boolean} options.lockY   false 锁定Y
 * @param {Function} options.start   null 开始拖动回调
 * @param {Function} options.drag   null 拖动中回调
 * @param {Function} options.end   null 结束拖动回调
 * @param {Number} options.maxLeft null max left
 * @param {Number} options.maxRight null max right
 * @param {Number} options.maxTop null max top
 * @param {Number} options.maxBottom null max bottom
 * @example vui.drag($('.content'),{
	 lockX:true,
	 maxTop:0,
	 maxBottom:200
});
 */
 
vui.drag = function(obj,options){
	options = $.extend({
		lockX : false,//锁定X
		lockY : false,//锁定Y
		start : null,//开始拖动回调
		drag : null,//拖动中回调
		end : null,//结束拖动回调
		maxLeft:null,
		maxRight:null,
		maxTop:null,
		maxBottom:null
	},options);

	 var o = {
		dragging:null,
		init:function(){
			 this.bind();
		},
		diffX:0,
		diffY:0,
		unbind:function(){
			 $(document).unbind('mousedown').unbind('mousemove').unbind('mouseup');
		},
		bind:function(){
			 var self = this;
			$(document).bind('mousedown',function(event){
				  if (event.target.className == obj.attr('class') ){
					self.dragging = true;
					self.diffX = event.clientX - obj.offset().left;
					self.diffY = event.clientY - obj.offset().top;
					if(options.start != null){
						options.start.call();
					}
				 }
			})
			.bind('mousemove',function(event){
				if (self.dragging){
					var top,left;
					if (!options.lockY){
						top  = event.clientY - self.diffY;
						if (options.maxTop!=null && top < options.maxTop){
							top = options.maxTop;
						}
						if (options.maxBottom!=null && top > options.maxBottom){
							top = options.maxBottom;
						}
						obj.css({top:top})
					}
					if (!options.lockX){
						left  = event.clientX - self.diffX;
						if (options.maxLeft!=null && top < options.maxLeft){
							top = options.maxLeft;
						}
						if (options.maxRight!=null && top > options.maxRight){
							top = options.maxRight;
						}
						obj.css({left:left})
					}
					var arg = [top,left];
					if (top==undefined){
						arg = left;
					}
					if (left==undefined){
						arg = top;
					}
					if(options.drag != null){
						options.drag.call(null,arg);
					}
				}
			})
			.bind('mouseup',function(event){
				 if(options.end != null){
					options.end.call();
				}
				 self.dragging = false;
			});
		}
	 }
	 o.init();
}

