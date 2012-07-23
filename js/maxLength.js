/**
 * 字符限制(默认140字)
 * @constructor
 * @author putaoshu@126.com
 * @date 2012-03-13
 * @param {Object} options 组件配置
 * @param {Number} options.max 140 字符数
 * @param {String} options.numClass 数字显示class
 * @param {String} options.btnClass 提交按钮class
 * @param {String} options.errorClass 提示错误的class
 * @example 
$("#nickname").maxLength({
	max:140,
	numClass : 'num',
	btnClass : 'btn',
	errorClass : 'error'
});

 */
vui.maxlength = vui.maxLength = function(options){
	var $this = $(this);

	options = $.extend({
		maxCharacters : 140,
		numClass : 'num',
		btnClass : 'btn',
		errorClass : 'W_error'
	},options)

	var $num = $('.'+options.numClass);
	var $btn = $('.'+options.btnClass);

	/**
	 * 字符串长度处理(长度1:2字母=1汉字)
	 * @param {String} str 需要进行处理的字符串
	 * @return {Number} 返回长度
	 * @example
		var nStrLength = getLength("中");	//return 1
		var nStrLength = getLength("aa");	//return 1
	 */
	function getLength(str){		
		var regexp = new RegExp('(http://)+(([-A-Za-z0-9]+(\.[-A-Za-z0-9]+)*(\.[-A-Za-z]{2,5}))|([0-9]{1,3}(\.[0-9]{1,3}){3}))(:[0-9]*)?(/[-A-Za-z0-9_\$\.\+\!\*\(\),;:@&=\?/~\#\%]*)*', 'gi')
		var len = str.length;
		if (len > 0){
			var min=41,max=140,tmp=str;
			var urls = str.match(regexp) || [];
			var urlCount = 0;
			for(var i=0,len=urls.length;i<len;i++){
				var count = byteLength(urls[i]);
				if(count>min){
					urlCount += count<=max?21:(21+ (count-max)/2);
					tmp = tmp.replace(urls[i],'');
				}
			};
			return Math.ceil(urlCount + byteLength(tmp) / 2)
		}else{
			return 0;
		}
	};

	/**
	 * 将unicode字符计算为2个
	 * @param {String} str 需要进行处理的字符串
	 * @return {Number} 返回长度
	 * @for byteLength
	 * @example
		var nStrLength = Core.String.byteLength("中");	//return 2
	 */
	function byteLength(str){
		if(typeof str == "undefined"){
			return 0;
		}
		var aMatch = str.match(/[^\x00-\x80]/g);
		return (str.length + (!aMatch ? 0 : aMatch.length));
	};
	
	
	function maxlength(){
		 var $thisLength = getLength($this.val());
		
		if($thisLength > options.maxCharacters){
			$num.html('<em>已超过</em><span class="errorNum">' + ($thisLength-options.maxCharacters) +'</span><em>字</em>' );
			$('span',$num).addClass(options.errorClass);
			$btn.attr('disabled','disabled');
		}else{
			$num.html('<em>还可以输入</em>' + (options.maxCharacters - $thisLength)  +'<em>字</em>');
			$('span',$num).removeClass(options.errorClass);
			$btn.attr('disabled','');
		}

		if($thisLength == 0){
			$btn.attr('disabled','disabled');
		}
	}

	//初始化
	maxlength();

	$this.keyup(function(){
		maxlength();
	});

};

