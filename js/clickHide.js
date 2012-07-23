/**
 * 点击隐藏(失去焦点后,点击元素以外区域后,元素隐藏)
 * @constructor
 * @author putaoshu@126.com
 * @date 2012-02-08
 * @param {Object} obj 主对象
 * @example 
vui.clickhide($('#test'))
vui.clickHide($('#test'))
 */

vui.clickhide = vui.clickHide = function(obj){
	var $this = $(obj);
	var mouseInsideTag = false;
	
	$this.show();

	$this.hover(function(){ 
        mouseInsideTag=true; 
    }, function(){ 
        mouseInsideTag=false; 
    });

    $("html,body").mouseup(function(){ 
        if(!mouseInsideTag) $this.hide();
    });
}

