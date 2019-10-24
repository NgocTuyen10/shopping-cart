let items = null;
const size = 9;
var page = 0;
var maTheLoai = "";
var totalPage = 0;
$(document)
		.ready(
				function() {

					var pathname = window.location.pathname.split('/');
					maTheLoai = pathname[pathname.length - 1];
					initPageFistTime(maTheLoai, 0, size);

					function initPageFistTime(maTheLoai, page, size) {
						var url_get = "/comics/truyen/paging";
						$.ajax({
							url : url_get,
							type : "GET",
							contentType : "application/json",
							data : {
								maTheLoai : maTheLoai,
								page : page,
								size : size
							},
							dataType : 'json',
							success : function(data) {
								if (data.content) {
									items = data.content;
									showProducts(items);
									totalPage = data.totalPages;
									$('#pagination-here').bootpag({
										total : totalPage,
										page : 1,
										maxVisible : 5,
										leaps : true
									});
								}
							},
							error : function(jqXHR, textStatus, errorThrown) {
								console.log(jqXHR);
								console.log(textStatus);
								console.log(errorThrown);
							}
						});
					}
					function initPage(maTheLoai, page, size) {
						var url_get = "/comics/truyen/paging";
						$.ajax({
							url : url_get,
							type : "GET",
							contentType : "application/json",
							data : {
								maTheLoai : maTheLoai,
								page : page,
								size : size
							},
							dataType : 'json',
							success : function(data) {
								if (data.content) {
									items = data.content;
									showProducts(items);

								}
							},
							error : function(jqXHR, textStatus, errorThrown) {
								console.log(jqXHR);
								console.log(textStatus);
								console.log(errorThrown);
							}
						});
					}

					function showProducts(items) {
						let products = [];
						for (var i = 0; i < items.length; i++) {
							var donGiaBan = Number(items[i].donGiaBan.toFixed(1)).toLocaleString() +" đ";
							products
									.push("<div class='col-md-4 col-sm-6 col-xs-6' >"
											+ "<div class='product product-single'>"
											+ "<div class='product-thumb'>"
											+ "<button class='show-detail main-btn quick-view' value="
											+ items[i].maTruyen
											+ "><i class='fa fa-search-plus'></i>Quick view</button>"

											/*
											 * + "<a class='main-btn
											 * quick-view'
											 * th:href='@{/comics/truyen(maTruyen =" +
											 * items[i].maTruyen + ")}'>"
											 */
											+ "<i class='fa fa-search-plus'></i>Quick view"
											+ "</a>"
											+ "<img "
											+ "src="
											+ items[i].anh
											+ " alt='' class='size-image'>"
											+ "</div>	<div class='product-body'>"
											+ "<h3 class='product-price'>"
											+ donGiaBan
											+ "</h3>"
											+ "<div class='product-rating'><i class='fa fa-star'></i> <i class='fa fa-star'></i> <i 	class='fa fa-star-o empty'></i>		</div> "
											+ "<h2 class='product-name'>"
											+ "<a href='#'>"
											+ items[i].ten
											+ "</a>"
											+ "</h2>	<div class='product-btns'><button class='main-btn icon-btn'><i class='fa fa-heart'></i>	</button>	<button class='main-btn icon-btn'>"
											+ "<i class='fa fa-exchange'></i>"
											/*+ "</button>"
											+ "<button class='primary-btn add-to-cart'> "
											+ "<i class='fa fa-shopping-cart'></i> Add to Cart"
											+ "</button>"*/
											+"<button class='btn primary-btn add-to-cart'"
											+ "data-truyenid='"+items[i].truyenId+"' data-name='"+ items[i].ten +"'" 
											+ "data-price='"+items[i].donGiaBan+"'>"
											+ "Add to Cart</button>"
											+ "</div> </div>	</div>	</div>");
						}
						$('#page-index').append(products);
					}

					function clearPage() {
						$("#page-index").empty();
					}

					$('#pagination-here').bootpag({
						total : totalPage,
						page : 1,
						maxVisible : 5,
						leaps : true
					});

					$('#pagination-here').on("page", function(event, num) {
						// show / hide content or pull via ajax etc
						clearPage();
						initPage(maTheLoai, num - 1, size);
					});

					// Show detail product on a new page
					$('#page-index').on('click', '.show-detail', function() {
						
						var maTruyen = $(this).val();
//						window.location.href = '/comics/'+ maTruyen;
						window.location.href = '/comics/truyen/' + maTruyen;
						/*$.ajax({
							url : url_get,
							type : "GET",
							contentType : "application/json",
							dataType : 'json',
							success : function(data) {
								console.log("Success");
							}
						});*/

					});
					
					$('#showCart').click(function(){
						window.location.href = '/comics/checkout';
					});
					

				});
