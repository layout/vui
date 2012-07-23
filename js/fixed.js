/**
 *  position fixed (兼容IE6)
 * @constructor
 * @author putaoshu@126.com
 * @date 2012-07-03 
 * @param {Object} obj 主对象
 * @param {Object} options 组件配置
 * @param {Number} options.top null top
 * @param {Number} options.bottom null bottom
 * @param {Number} options.left null left
 * @param {Number} options.right null right
 * @param {Number} options.zIndex null right
 * @param {Number} options.place null 方位选择:topLeft,topRight,topCenter,bottomLeft,bottomRight,bottomCenter
 * @see  top,bottom,left,right需要指定两项并且和place参数不能同时设置
 * @example 
vui.fixed($('#test'),{place:'bottomRight'})
vui.fixed($('#test'),{
	top:1,
	left:1
})
 */

vui.fixed=function(obj,options){
	 options = $.extend({
		top : null,
		bottom :null,
		left : null,
		right : null,
		place : null,//topLeft,topRight,topCenter,bottomLeft,bottomRight,bottomCenter
		zIndex : 2
	},options);
	
	var o = {
		isIe6 : vui.browser.ie6,
		init:function (){
			//check place
			var placeArray = ['topLeft','topRight','topCenter','bottomLeft','bottomRight','bottomCenter'];
			if(options.place && vui.indexOf(placeArray,options.place) == -1){
				alert('place param error');
				return;
			}
			
			//style init
			var positionValue = 'fixed';
			if (this.isIe6){
				positionValue = 'absolute';
			}
			obj.css({position:positionValue,zIndex:options.zIndex,top:'',bottom:'',left:'',right:''});
			
			this.set();
			this.bindResize();
			this.bindScroll();
		},
		set:function (){
			//do
			if (options.place){
				this.place();
			}else{
				this.normal();
			} 
		},
		//精确定位
		normal:function (){
			var css = {};
			 if (options.top != null){
				css.top = this.isIe6 ? (options.top + this.css.scrollTop()) : options.top
			 }
			if (options.left != null){
				css.left = this.isIe6 ? (options.left + this.css.scrollLeft()) : options.left
			 }
			if (options.bottom != null){
				if (this.isIe6){
					css.top = this.css.top() - options.bottom;
				}else{
					css.bottom = options.bottom;
				}
			 }
			if (options.right != null){
				if (this.isIe6){
					css.left = this.css.left() - options.right;
				}else{
					css.right = options.right;
				}
			 }
			 obj.css(css);
		},
		//方位定位
		place:function (){
			var place = options.place;
			this[place]();
		},
		bindScroll:function (){
			var $this = this;
			$(window).bind('scroll',function(){
				 $this.set();
			})
		},
		bindResize:function (){
			var $this = this;
			$(window).resize(function(){
					$this.set();
			});
		},
		css:{
			center:function (){
				 return ( $(window).width() ) /2 + this.scrollLeft() - ( obj.outerWidth() /2);
			},
			top:function (){
				 return $(window).height()+this.scrollTop() - obj.outerHeight();
			},
			left:function (){
				 return $(window).width() + this.scrollLeft() - obj.outerWidth();
			},
			scrollTop:function (){
				 return $(document).scrollTop();
			},
			scrollLeft:function (){
				 return $(document).scrollLeft();
			}
		},
		bottomLeft:function (){
			 if (this.isIe6){
				var left  = this.css.scrollLeft();
				var top = this.css.top();
				obj.css({left:left,top:top});
			}else{
				obj.css({left:0,bottom:0});
			}
		},
		bottomCenter:function (){
			 if (this.isIe6){
				var left  = this.css.center();
				var top = this.css.top();
				obj.css({left:left,top:top});
			}else{
				obj.css({left:'50%',bottom:0,marginLeft:-obj.outerWidth()/2});
			}
		},
		bottomRight:function (){
			if (this.isIe6){
				var left  = this.css.left();
				var top = this.css.top();
				obj.css({left:left,top:top});
			}else{
				obj.css({right:0,bottom:0});
			}
		},
		topLeft:function (){
			 if (this.isIe6){
				var left  = this.css.scrollLeft();
				var top = this.css.scrollTop();
				obj.css({left:left,top:top});
			}else{
				obj.css({left:0,top:0});
			}
		},
		topCenter:function (){
			 if (this.isIe6){
				var left  = this.css.center();
				var top = this.css.scrollTop();
				obj.css({left:left,top:top});
			}else{
				obj.css({left:'50%',top:0,marginLeft:-obj.outerWidth()/2});
			}
		},
		topRight:function (){
			 if (this.isIe6){
				var left  = this.css.left();
				var top = $(document).scrollTop();
				obj.css({left:left,top:top});
			}else{
				obj.css({right:0,top:0});
			}
		}
	}

	o.init();
}

