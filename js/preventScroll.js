/**
 * 阻止鼠标滑轮滑动
 * @constructor
 * @name vui.preventScroll
 * @author putaoshu@126.com
 * @date 2012-05-14
 * @example vui.preventScroll.init();
 */

vui.preventScroll={
	 /** @lends vui.preventScroll*/
	//mousewheel事件:兼容FF
	mousewheelEvent : (/Firefox/i.test(navigator.userAgent))? "DOMMouseScroll" : "mousewheel",
	isIE: document.attachEvent ? true : false,
	/**
	 * 初始化
	 * @name vui.preventScroll.init
	 */
	init:function(){
		if(this.isIE){ 
			document.attachEvent("on" + this.mousewheelEvent,this.handler,false);
		}else{ 
			document.addEventListener(this.mousewheelEvent,this.handler,false);
		}
	},
	/**
	 * 移除阻止事件
	 * @name vui.preventScroll.destroy
	 */
	destroy:function(){
		if(this.isIE){ 
			document.detachEvent("on" + this.mousewheelEvent,this.handler,false);
		}else{
			document.removeEventListener(this.mousewheelEvent,this.handler,false);
		}
	},
	handler:function(event){
		if(vui.preventScroll.isIE){
			event.returnValue = false;
		}else{
			event.preventDefault();
		}
	}
}

