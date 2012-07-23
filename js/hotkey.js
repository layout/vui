/**
 * 快捷键设置
 * @name vui.hotkey
 * @constructor
 * @author putaoshu@126.com
 * @date 2012-04-18
 * @param {String} event keydown 其它为keypress|keyup
 * @param {String} key 键值esc,enter...
 * @param {String} name 快捷键对应回调时会用的名称
 * @param {Function} callback 回调函数
 * @example
vui.hotkey({event:'keydown',key:'enter',name:'hotkeyName'},function(){
	 alert('todo');
});
 */
//所有回调函数集
vui.hotkeyArray = {};

vui.hotkey = function(opt,callback){
	opt.event = opt.event.toLowerCase();
	opt.key = opt.key.toLowerCase();
	var typeReg=/^keypress|keydown|keyup$/;
	if(!typeReg.test(opt.event)){
		return;
	};

	//特殊键的对照
	var keyMap = { 
		27: 'esc', 9: 'tab', 32:'space', 13: 'enter', 8:'backspace', 145: 'scrollclock', 
		20: 'capslock', 144: 'numlock', 19:'pause', 45:'insert', 36:'home', 46:'delete',
		35:'end', 33: 'pageup', 34:'pagedown', 37:'left', 38:'up', 39:'right',40:'down', 
		112:'f1',113:'f2', 114:'f3', 115:'f4', 116:'f5', 117:'f6', 118:'f7', 119:'f8', 
		120:'f9', 121:'f10', 122:'f11', 123:'f12', 191: '/', 17:'ctrl', 16:'shift',
		109:'-',107:'=',219:'[',221:']',220:'\\',222:'\'',187:'=',188:',',189:'-',190:'.',191:'/',
		96: '0', 97:'1', 98: '2', 99: '3', 100: '4', 101: '5', 102: '6', 103: '7',
		104: '8', 105: '9', 106: '*', 110: '.', 111 : '/',
		65:'a',66:'b',67:'c',68:'d',69:'e',70:'f',71:'g',72:'h',73:'i',74:'j',75:'k',76:'l',
		77:'m',78:'n',79:'o',80:'p',81:'q',82:'r',83:'s',84:'t',85:'u',86:'v',87:'w',88:'x',89:'y',90:'z'
	};

	//绑定的函数入库
	vui.hotkeyArray[opt.name] = callback;

	$(document).bind(opt.event,function(event){
		var whichNum=0;
		$.each(keyMap,function(i){
			if (keyMap[i]==opt.key){
				whichNum = i;
				//vui.hotkeyArray[i]();
				return false;
			}
		})

		if(event.which == whichNum){
			vui.hotkeyArray[opt.name]();
			//$.each(vui.hotkeyArray,function(i){
			//	//vui.hotkeyArray[i]();
			//	this.apply();
			//})
		};

	});
}

//移除hotkey
vui.unhotkey = function(hotkeyName){
	//从回调函数集移除
	delete vui.hotkeyArray[hotkeyName];
}

