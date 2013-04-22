/**
 * 转义引号
 * @param {String} content
 * @param {Mixed} quota_style 引号转义方式
 * 	1: SINGLE <a href='qq'>q</a> --> <a href=\'qq\'>q</a>
 *  2: DOUBLE(默认) <a href="qq">q</a> --> <a href=\"qq\">q</a>
 */
vui.quote = function(content, quote_style){
	if(typeof quote_style == 'undefined'){
		quote_style = 2;
	}
	//单引号
	if(quote_style == 1){
		content = content.replace(/'/g, '\\\'');
	}
	else if(quote_style == 2){
		content = content.replace(/"/g, '\\"');
	}
	return content;
}