/**
 * 对话框
 * @constructor
 * @author putaoshu@126.com
 * @date 2012-03-13
 * @param {Object} options 组件配置

 * @param {Object} options.message  主对象
 * @param {Boolean} options.mask  true 是否有遮罩层
 * @param {Number} options.opacity   0.15 遮罩层透明度
 * @todo {Boolean} options.drag   false 
 * @param {String} options.maskClass vuiDialogMask 遮罩层样式
 * @param {String} options.dialogClass vuiDialog 对话框主体样式
 * @param {Object} options.close  true 是否采用vui.undialog关闭浮层
 * @param {Boolean} options.maskIframe false 遮罩层用iframe做底
 * @param {Boolean} options.appendType true true 直接先append到body
 * @param {Object} options.stick null  需要粘在某个元素上
 * @param {Boolean} options.autoClientX false 浮层宽度为当前窗口宽度
 * @param {Boolean} options.autoClientY false 浮层高度为当前窗口高度
 * @param {Boolean} options.fixed true 浮层是否fixed

 * @param {Object} options.css  主体样式配置
 * @param {Number} options.css.width   null 主体宽度
 * @param {Number} options.css.height  null 主体高度
 * @param {Number} options.css.top   null 主体top
 * @param {Number} options.css.left   null 主体left
 * @param {Number} options.css.zIndex 9998 主体zIndex

 * @param {Function}  callback 回调函数
 * @example 
vui.dialog({message:$('#dialog')});

vui.dialog({
	message:"&lt;h2 &gt;标题 &lt;/h2&gt;",
	css:{
		top:'10px',
		left:'20px',
		width:'300px',
		zIndex:'10000'
	}
});

vui.dialog({
	message:$('#userGuide'),
	opacity:0.5,
	stick: $('#picModeOpt'), //粘到某个元素上
	css:{
		top : -17,
		left : -365,
		zIndex:10
	}
});

 * @2012-05-28 浮层宽度为当前窗口宽度 autoClientX:true
 * @todo 拖动;
 */
vui.dialog  =  function(options,callback){
	var $this = '';
	options = $.extend({
		message : null,
		mask : true,
		opacity : 0.15,
		drag : false,
		maskClass:'vuiDialogMask',
		dialogClass:'vuiDialog',
		close:true,//是否采用vui.undialog关闭浮层
		maskIframe:false,
		appendType:true,//true:直接先append到body
		stick:null,//需要粘在某个元素上
		autoClientX:false,//浮层宽度为当前窗口宽度
		autoClientY:false,//浮层高度为当前窗口高度
		fixed:true, //浮层fixed与否
		css : {
			width : null,
			height :null,
			top : null,
			left : null,
			zIndex:9998
		}
	},options);

	//插入模式
	var insideTag = vui.isObject(options.message);
	var stickDom = options.stick;

	//加遮照层
	var maskObj;
	
	if (options.mask){
		maskObj = $(document.createElement("div"));
		maskObj.attr('class',options.maskClass);
		maskObj.addClass('vuiMaskLayer');
		maskObj.css({
			position:"absolute",zIndex:options.css.zIndex,left:0,top:0,opacity:options.opacity,backgroundColor:"#000",
			width:vui.pageSize().docWidth,
			height:vui.pageSize().docHeight
		});
		if (!$('.'+options.maskClass)[0]) maskObj.appendTo('body');
		
		//ie6 select bug 
		if (vui.browser.ie6 || options.maskIframe){
			maskObj.append('<iframe src="javascript:;" class="vuiSelectBug" frameBorder="0" style="width:100%;height:100%;position:absolute;z-index:'+(options.css.zIndex+1)+';opacity:0;filter:alpha(opacity=0);top:0;left:0;">');
		}
		
		//自适应窗口
		$(window).resize(function(){
			var currentCSS = {
				width:vui.pageSize().docWidth,
				height:vui.pageSize().docHeight
			}
			$('.'+options.maskClass).css(currentCSS);
		});
	}
	
	//开始始 appendTo body
	if(insideTag){
		if (options.appendType){
			options.message.appendTo('body');
		}
		options.message.css({top:0,left:0})
	}
	
	//垂直距中
	var dialogObj = $(document.createElement("div"));

	if (vui.isString(options.message)){
		dialogObj.append(options.message);
		$this = dialogObj.children().first();
	}else if(insideTag){
		$this = options.message;
	}else{
		dialogObj.append($this);
	}

	//兼容IE6
	$this.css({'float':'left',position:'',top:'',bottom:'',left:'',right:''});

	autoClient();
	dialogObj.attr('class',options.dialogClass);
	if(!insideTag) dialogObj.appendTo('body');
	
	if (insideTag) dialogObj =	options.message;

	var dialogObjCss = {
		position:  'absolute' ,
		zIndex:options.css.zIndex+2,
		display:"block"
	}
	
	//setStyle
	function setStyle(){
		autoClient();
		var tag = vui.browser.ie6 ;
		var currentCSS = {
			position: tag ? 'absolute' : "fixed" ,
			top:(options.css.top == null) ? ($(window).height() - $this.height() ) / 2 + (tag ? $(window).scrollTop() :0 ) : options.css.top,
			left:(options.css.left == null) ?  ($(window).width() - $this.width() ) / 2 + (tag ? $(window).scrollLeft() :0 )  : options.css.left
		}
		
		if (!options.fixed){
			currentCSS.position = 'absolute' ;
		}
		dialogObj.css(currentCSS);
	}

	//窗口自适应的dom
	if (stickDom){
		dialogObjCss.left = stickDom.offset().left+options.css.left;
		dialogObjCss.top = stickDom.offset().top+options.css.top;
	}

	//浮层宽和高为当前窗口宽和高
	function autoClient(){
		if (options.autoClientX){
			$this.css({width:$(window).width()});
		}
		if (options.autoClientY){
			$this.css({height:$(window).height()});
		}
	}

	//样式最终设定
	dialogObj.css(dialogObjCss);
	if (!stickDom) setStyle();

	
	//fixed (IE6模拟)
	if (vui.browser.ie6 && !stickDom){
		if (options.fixed){
			$(window).bind('scroll',function(){
				setStyle();
			});
		}
	}

	//窗口自适应
	$(window).resize(function(){
		if (stickDom){
			dialogObj.css({
				left : stickDom.offset().left+options.css.left,
				top : stickDom.offset().top+options.css.top
			});
		}else{
			setStyle();
		}
	});

	//默认.dialogclose可以移除浮层
	$('.dialogclose',dialogObj).click(function(){
		dialogObj.remove();
		maskObj.remove();
	});

	$(window).data('dialog.options.close',options.close);
	$(window).data('dialog.maskObj',maskObj);
	$(window).data('dialog.dialogObj',dialogObj);	

	if (callback){
		callback(); 
	}
	
	if (options.close){
		vui.preventScroll.init();
	}
}

//兼容unblockUI
vui.undialog = function(){
	if ($(window).data('dialog.maskObj') && ( $(window).data('dialog.options.close')==true ) ){
		$(window).data('dialog.maskObj').remove();
		$(window).data('dialog.dialogObj').remove();
		var maskLayer = $('.vuiMaskLayer:last');
		if (!maskLayer.is(':visible') || maskLayer.css('visibility')=='hidden'){
			vui.preventScroll.destroy();
		}
	}
};

