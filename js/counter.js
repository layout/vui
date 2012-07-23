/**
 * 简单计数
 * @constructor
 * @name vui.counter
 * @author dong<dongdong4@staff.sina.com.cn>
 */
vui.counter={
	 /** @lends vui.counter*/
	k:[],
	v:[],

	/**
	 * 获取 
	 * @name vui.counter.get
	 * @param {String} name
	 * @return {String} 获取该键对应的值
	 */
	get:function(name){
		var i=this.k.indexOf(name);
		if(i<0){
			return 0;
		}
		return this.v[i];
	},

	/**
	 * 增加 
	 * @name vui.counter.inc
	 * @param {String} name
	 * @return {Void} 键加1
	 */
	inc:function(name){
		var i=this.k.indexOf(name);
		if(i<0){
			this.k.push(name);
			this.v.push(1);
			return 1;
		}
		else{
			this.v[i]++;
			return this.v[i];
		}
	},

	/**
	 * 减少 
	 * @name vui.counter.dec
	 * @param {String} name
	 * @return {Void} 键减1
	 */
	dec:function(name){
		var i=this.k.indexOf(name);
		if(i<0){
			return 0;
		}
		else{
			if(this.v[i]>0){
				this.v[i]--;
			}
			return this.v[i];
		}
	}
};

