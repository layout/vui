/**
 * 节流函数
 * @form https://github.com/documentcloud/underscore/blob/master/underscore.js
 * @param {Function} func 要节流的函数
 * @param {Number} wait 延时时间
 * @example 
	var main= function(){
		//todo
	};
	var throttled = throttle(main,200);
	$(window).on('scroll',throttled);
 */

vui.throttle = function(func, wait) {
	var context, args, timeout, result;
    var previous = 0;
    var later = function() {
      previous = new Date;
      timeout = null;
      result = func.apply(context, args);
    };
    return function() {
      var now = new Date;
      var remaining = wait - (now - previous);
      context = this;
      args = arguments;
      if (remaining <= 0) {
        clearTimeout(timeout);
        timeout = null;
        previous = now;
        result = func.apply(context, args);
      } else if (!timeout) {
        timeout = setTimeout(later, remaining);
      }
      return result;
    };
}
