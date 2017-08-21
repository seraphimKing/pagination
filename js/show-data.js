//表格组件（用于数据获取和显示）
;(function(window,document,undefined) {
	function Page(options) {
		var defaultOptions = {
			url: 'js/page-data.json',//q=请求数据网址
			page: 1,	//第几页
			num: 3		//一页总共多少行
		}
		this.options = _.extend({},defaultOptions, options);
		
		var box = document.getElementById("box"); //挂载数据
		this.box = box;
		this.num = this.options.num;	//多少数据
		this.page = this.options.page;	//当前页
		this.url = this.options.url; //访问数据地址
		this.length;
		this.maxPage;
		
	}
	Page.prototype = {
		createXHR: function() {
			var xmlhttp;
			if(window.ActiveXObject) { //如果当前浏览器为IE
				xmlhttp = new ActiveXObject();
			}
			else if(window.XMLHttpRequest) { //其他浏览器
				xmlhttp = new XMLHttpRequest;
			}
			else {
				alert("your brower does not support xmlhttp")
			}
			return xmlhttp;
		},
		getInfo: function(page) {
			var xmlhttp = this.createXHR();
			var me = this;
			xmlhttp.onreadystatechange = function() {
				if(xmlhttp.readyState == 4 && xmlhttp.status == 200) {
					var info = JSON.parse(xmlhttp.responseText);	//获取回来的json数据
					me.length = info.people.length;
					me.maxPage = Math.ceil(me.length/me.options.num);
					me.dealData(info,page);
				}
			}
			xmlhttp.open("get",me.url);
			xmlhttp.send();
		},
		dealData: function(info,page) {
			this.page = page || 1;
			var i = (this.page - 1) * this.num; 
			var len = this.num + i;
			var curItems = info.people.slice(i,len);
			var compiled = _.template('<% _.forEach(info, function(user) { %><tr><td><%- user.firstName %></td><td><%- user.lastName %></td><td><%- user.email %></td><td><a class="delete">删除</a><a class="editor">编辑</a></td></tr><% }); %>');
			var result = compiled({ 'info': curItems});
			this.box.innerHTML = result;
		}
	}
	window.Page = Page;
}(window,document,undefined))

