/**
 * 模拟滚动条
 * @constructor
 * @author putaoshu@126.com
 * @date 2012-07-13
 * @param {Object} obj 主对象
 * @param {Object} options 组件配置
 * @param {Number} options.top null top

 * @param {Number} options.wrapWidth 500 主体宽度
 * @param {Number} options.wrapHeight 200 主体高度
 * @param {Number} options.wrapClass  isScrollWrap 主体class
 * @param {Number} options.scrollWidth 20 滚动条宽度
 * @param {Number} options.scrollMinHeight 50 滚动条最小高度
 * @param {Number} options.scrollClass isScroll 滚动条class
 * @param {Number} options.step 5 滚动条步进值
 * @param {Number} options.setScrollOnce false 重新设置滚动条高度Tag

 * @example 
vui.isScroll($('#content'));
vui.isScroll($('#content'),{setScrollOnce:true});//重置滚动条
 */
vui.isScroll = function(obj,options){
	 options = $.extend({
	 	wrapWidth : 500,//主体宽度
		wrapHeight : 200,//主体高度
		wrapClass : 'isScrollWrap',//主体class

		scrollWidth : 20,//滚动条宽度
		scrollMinHeight : 50,//滚动条最小高度
		scrollClass : 'isScroll',//滚动条class
		step :5, //滚动条步进值

		setScrollOnce:false //重新设置滚动条高度Tag
	 },options);

	 var o={
		init:function(){
			//配置信息绑定到obj上
			obj.data('data',options);
			
			if (options.setScrollOnce){
				options = obj.data('data');
				this.setScrollHeight();
				this.dragInit();
			}else{
				this.setInit();
			}
		},
		setInit:function(){
			this.styleInit();
			this.createWrap();
			this.createScroll();
			this.setScrollHeight();
			this.bind();
			this.dragInit();
		},
		bind:function(){
			var self = this;
			var mousewheelEvent = 'mousewheel';
			if (vui.browser.firefox){
				mousewheelEvent = 'DOMMouseScroll';
			}
			$('.'+options.wrapClass).bind(mousewheelEvent,function(event){
				var stepValue;
				var wheelValue = event.wheelDelta;
				//to down wheelValue<0 ; to up wheelValue>0
				if (vui.browser.firefox){
					wheelValue = - event.detail;
				}
			
				self.step(wheelValue);
				 event.preventDefault();
			});
		},
		//滚动条top --. 主体top
		setContentTop:function(scrollTopValue){
			 var H = obj.outerHeight();//主体高度
			var h1 = options.wrapHeight;//可视区域高度
			var h2 = this.getElementHeight($('.'+options.scrollClass));//滚动条高度
			var top = [( H - h1) / (h1-h2)] * scrollTopValue;
			obj.css({top:-top});
		},
		//拖拽init
		dragInit:function(){
			var self = this;
			vui.drag($('.'+options.scrollClass),{
				lockX:true,
				maxTop:0,
				maxBottom:options.wrapHeight-this.getElementHeight($('.'+options.scrollClass)),
				drag:self.drag
			});
		},
		//拖拽回调
		drag:function(top){
			o.setContentTop(top);
		},
		scrollTopValue:0,
		//鼠标滑轮滑动
		step:function(wheelValue){
			var H = obj.outerHeight();//主体高度
			var h1 = options.wrapHeight;//可视区域高度
			var h2 = this.getElementHeight($('.'+options.scrollClass));//滚动条高度

			var stepNumber = options.step * parseInt( (H-h1) / h1);//整除数
			var scrollStepValue = ( 1 / stepNumber ) * (h1-h2);

			if (wheelValue<0){
				this.scrollTopValue += scrollStepValue;
			}else{
				this.scrollTopValue -= scrollStepValue;
			}
			
			if (this.scrollTopValue>(h1-h2) && wheelValue<0){
				this.scrollTopValue=(h1-h2);
			}

			if (this.scrollTopValue<0 && wheelValue>0){
				this.scrollTopValue=0;
			}
			
			$('.'+options.scrollClass).css({top:this.scrollTopValue});
			this.setContentTop(this.scrollTopValue);
		},
				
		setScrollHeight:function(){
			var heightTemp =  obj.outerHeight() - options.wrapHeight;
			if (heightTemp<0){
				this.hide();
			}else{
				
				var H = obj.outerHeight();//主体所有高度
				var h1 = options.wrapHeight;//可视区域高度
				var h2 = parseInt ( ( h1 * h1 ) / H ); //滚动条高度
				if (h2<options.scrollMinHeight){
					h2 = options.scrollMinHeight;
				}
				$('.'+options.scrollClass).css({height:h2});
				this.show();
			}
		},

		getElementHeight:function(element){
			 var currentHeight = element.css('height');
			 var height = parseFloat(currentHeight.slice(0,currentHeight.length-2));
			 return height;
		},
		
		createWrap:function(){
			 var div = $(document.createElement('div'));
			 div.addClass(options.wrapClass);
			 obj.after(div);
			 div.append(obj);
			var $this = this;
			 var isScrollWrapCss = {
				position:'relative',
				overflow:'hidden',
				width:options.wrapWidth,
				height:options.wrapHeight,
				border:'2px solid blue'
			 };
			 div.css(isScrollWrapCss);
		},
		createScroll:function(){
			 var div = $(document.createElement('div'));
			 div.addClass(options.scrollClass);
			 obj.after(div);

			 var isScrollCss = {
				position:'absolute',
				right:0,
				top:0,
				width:options.scrollWidth,
				backgroundColor:'#333'
			 };
			 div.css(isScrollCss);
		},
		styleInit:function(){
			 obj.css({position:'absolute',left:0,top:0}) 
		},

		show:function(){
			 $('.'+options.scrollClass).show();
		},
		hide:function(){
			 $('.'+options.scrollClass).hide();
		}
	 }
	 
	 o.init();
}

