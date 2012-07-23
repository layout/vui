/**
 * 下拉菜单
 * @constructor
 * @author putaoshu@126.com
 * @date 2012-03-14
 * @param {Object} options 组件配置
 * @param {Object} options.menuTop $('#menuTop') 点击元素
 * @param {Object} options.menu $('#menu') 菜单主体
 * @param {Boolean} options.autoShow false 主体元素有被遮挡时,把主体转移到上面
 * @param {Object} options.css 
 * @param {Number} options.css.left 菜单left值
 * @param {Number} options.css.top 菜单top值
 * @requires vui.stick()
 */

vui.menu = function(options) {
	options = $.extend({
		menuTop : $('#menuTop'),//点击元素ID
		menu : $('#menu'),//菜单主体ID
		type : 'click', //click || hover
		autoShow : false,//自适应:即在主体元素有被遮挡时,把主体转移到上面
		css : {
			left:null,
			top:null
		}
	},options); 

	var o = {		
		init:function(){
			options.menu.appendTo('body');
			if(options.type == 'click'){
				o.clickhide();
				options.menuTop.mouseup(function(){
					if (o.showTag){
						o.close();
					}else{
						o.show();
					}
					return false;
					
				})
			}else if(options.type == 'hover'){
				options.menuTop.click(function(){
					o.show();
				})
				options.menuTop.bind('mouseover',function(){
					o.show();
				})
			}
		},
		showTag:false,
		show:function(){
			
			var $left,$top;
			if (options.css.left != null || options.css.top != null){
				vui.stick({stick:options.menuTop,stickTo:options.menu,autoShow:options.autoShow,css:{type:1,top:options.css.top,left:options.css.left}});
			}else{
				vui.stick({stick:options.menuTop,autoShow:options.autoShow,stickTo:options.menu});
			}
			o.showTag=true;
		},
		close:function(){
			  options.menu.hide();
			  o.showTag=false;
		},
		mouseInsideTag : false,
		clickhide:function(){
			
			options.menu.click(function(){
				o.close();
			})
			
			options.menu.hover(function(){ 
				o.mouseInsideTag=true; 
			}, function(){ 
				o.mouseInsideTag=false; 
			});

			$("html,body").mouseup(function(){ 
				if(o.mouseInsideTag){
					o.show();
				}else{
					o.close();
				}
			});
		}
	}

	o.init();
}

