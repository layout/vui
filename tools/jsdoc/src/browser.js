/**
 * 浏览器测试
 * @constructor    
 * @author putaoshu@126.com
 * @date 2012-02-08
 * @example vui.browser.ie;
 * @note
 * ff3.6.20 mozilla/5.0 (windows; u; windows nt 6.1; zh-cn; rv:1.9.2.20) gecko/20110803 firefox/3.6.20
 * chrome16.0 mozilla/5.0 (windows nt 6.1) applewebkit/535.7 (khtml, like gecko) chrome/16.0.912.63 safari/535.7
 * safari5.04 mozilla/5.0 (windows nt 6.1) applewebkit/534.51.22 (khtml, like gecko) version/5.0.4 safari/533.20.27
 * opear11.6 opera/9.80 (windows nt 6.1; u; zh-cn) presto/2.10.229 version/11.61
 */

vui.browser ={
	ua:navigator.userAgent.toLowerCase(),
	ie: /msie/.test(navigator.userAgent.toLowerCase()),
	ie6: /msie 6/.test(navigator.userAgent.toLowerCase()),
	ie7: /msie 7/.test(navigator.userAgent.toLowerCase()),
	ie8: /msie 8/.test(navigator.userAgent.toLowerCase()),
	ie9: /msie 9/.test(navigator.userAgent.toLowerCase()),
	firefox: /firefox\/(\d+\.\d+)/i.test(navigator.userAgent.toLowerCase()),
	chrome: /chrome\/(\d+\.\d+)/i.test(navigator.userAgent.toLowerCase()),
	opera: /opera/.test(navigator.userAgent.toLowerCase()),
	//safari: /safari/.test(navigator.userAgent.toLowerCase()),
	webkit: /webkit/.test(navigator.userAgent.toLowerCase())
}