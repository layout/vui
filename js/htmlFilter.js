/**
 * html转义
 * @param {String} content
 * @param {Mixed} type 引号转义方式
 *  过滤掉全部html标签(默认)
 * 	1: 转义单引号&html标签
 *  2: 转义双引号&html标签
 *  3: 转义单双引号&html标签
 */
vui.HTMLFilter=function(content,type){
	if (typeof type == 'undefined'){
		content = content.replace(/<\/?[^>]*>/g,''); //去除HTML tag
		content.value = content.replace(/[ | ]*\n/g,'\n'); //去除行尾空白
		//content = content.replace(/\n[\s| | ]*\r/g,'\n'); //去除多余空行
	}

	if(type == 1 || type == 3){
		//单引号
		content = content.replace(/'/g, '&#039;');
	}
	if(type == 2 || type == 3){
		//多引号
		content = content.replace(/&/g, "&amp;").replace(/</g, '&lt;').replace(/>/g, '&gt;');
		content = content.replace(/"/g, '&quot');
	}
	return content;
}