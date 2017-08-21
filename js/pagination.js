;(function(window,document,undefined) {
	function Pagination() {
		this.prebtn = document.getElementById("pre");
		this.nextbtn = document.getElementById("next");
		this.pageNum = document.getElementById("pageNum");
		this.obj = {page:1};
		this.maxPage;
	}
	Pagination.prototype = {
		pre: function() {
			if (this.obj.page <= 1) {
				this.obj.page = 1;
			}
			else {
				this.obj.page = this.obj.page - 1;
			}
			return this.obj.page;
		},
		next: function() {
			if(this.obj.page >= this.maxPage) {
				this.obj.page = this.maxPage
			}
			else {
				this.obj.page = this.obj.page + 1;
			}
			return this.obj.page;
		},
		init: function(callback) {
			var me = this;
			this.prebtn.addEventListener("click",function(e){
				var page = me.pre();
				callback(page);
			})
			this.nextbtn.addEventListener("click",function(e){
				var page = me.next();
				callback(page);
			})
				/*var num = this.maxPage + 1;
				console.log(num)
				var arr = new Array(num);
					arr = arr.join("1,");
					arr = arr.split(",");
					arr.pop();
					arr = arr.map(function(item,index) {
						return (index+1)
					})
				var compiled = _.template('<% _.forEach(info, function(user) { %><li><a class="item"><%- user %></a></li><% }); %>');
				var result = compiled({ 'info': arr});
				console.log(result)
				this.pageNum.innerHTML = result;*/
		}
	}
	window.Pagination = Pagination;
	
}(window,document,undefined))

var page = new Page();
page.getInfo(1);

var pagi = new Pagination();
pagi.init(function(pages){
	page.getInfo(pages);
	pagi.maxPage = page.maxPage;
})
