/**
 * 表单中的默认字符,点击后隐藏这些字符
 * @constructor
 * @author putaoshu@126.com
 * @param {Object} obj 主对象
 * @date 2012-02-08
 * @example &lt;input type="text" defaultchars="搜索大家共享的文件"&gt;
 */

vui.defaultchars = function(obj){
	var $this = $(obj);
	if($this.val()) return;
	var $defaultchars = $this.attr('defaultchars');
	$this.val($defaultchars);
	$this.focusin(function(){
		if ($this.val() == $defaultchars) $this.val('');
	}).focusout(function(){
		if ($this.val() == '') $this.val($defaultchars);
	});
}