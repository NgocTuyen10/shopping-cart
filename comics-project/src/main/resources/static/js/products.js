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
											+ items[i].donGiaBan
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
											+"<button class='btn primary-btn my-cart-btn'"
											+ "data-id='"+items[i].truyenId+"' data-name='"+ items[i].ten +"' data-summary='"+ items[i].moTa+"'" 
											+ "data-price='"+items[i].donGiaNhap+"' data-quantity='1' data-image='"+ items[i].anh+"'>"
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
						$.ajax({
							url : url_get,
							type : "GET",
							contentType : "application/json",
							dataType : 'json',
							success : function(data) {
								console.log("Success");
							}
						});

					});
					
					
/*					$(document).on('click', '.show-detail', function(e) {

						//do whatever
//						window.location.href = '/comics/'+ maTruyen;
						var maTruyen = $(this).val();
						window.location.href = '/comics/truyen/' + maTruyen;
						$.ajax({
							url : url_get,
							type : "GET",
							contentType : "application/json",
							dataType : 'json',
							success : function(data) {
								console.log("Success");
							}
						});
					});*/
					
					/*Shopping cart*/
					/*var goToCartIcon = function($addTocartBtn){
					      var $cartIcon = $(".my-cart-icon");
					      var $image = $('<img width="30px" height="30px" src="' + $addTocartBtn.data("image") + '"/>').css({"position": "fixed", "z-index": "999"});
					      $addTocartBtn.prepend($image);
					      var position = $cartIcon.position();
					      $image.animate({
					        top: position.top,
					        left: position.left
					      }, 500 , "linear", function() {
					        $image.remove();
					      });
					    }
					$(document).on('click', '.my-cart-btn', function(e) {
					    $('.my-cart-btn').myCart({
					      currencySymbol: '$',
					      classCartIcon: 'my-cart-icon',
					      classCartBadge: 'my-cart-badge',
					      classProductQuantity: 'my-product-quantity',
					      classProductRemove: 'my-product-remove',
					      classCheckoutCart: 'my-cart-checkout',
					      affixCartIcon: true,
					      showCheckoutModal: true,
					      numberOfDecimals: 2,
					      cartItems: [],
					      clickOnAddToCart: function($addTocart){
					        goToCartIcon($addTocart);
					      },
					      afterAddOnCart: function(products, totalPrice, totalQuantity) {
					        console.log("afterAddOnCart", products, totalPrice, totalQuantity);
					      },
					      clickOnCartIcon: function($cartIcon, products, totalPrice, totalQuantity) {
					        console.log("cart icon clicked", $cartIcon, products, totalPrice, totalQuantity);
					      },
					      checkoutCart: function(products, totalPrice, totalQuantity) {
					        var checkoutString = "Total Price: " + totalPrice + "\nTotal Quantity: " + totalQuantity;
					        checkoutString += "\n\n id \t name \t summary \t price \t quantity \t image path";
					        $.each(products, function(){
					          checkoutString += ("\n " + this.id + " \t " + this.name + " \t " + this.summary + " \t " + this.price + " \t " + this.quantity + " \t " + this.image);
					        });
					        alert(checkoutString)
					        console.log("checking out", products, totalPrice, totalQuantity);
					      },
					      getDiscountPrice: function(products, totalPrice, totalQuantity) {
					        console.log("calculating discount", products, totalPrice, totalQuantity);
					        return totalPrice * 0.5;
					      }
					    });
					});
					
					    $("#addNewProduct").click(function(event) {
					      var currentElementNo = $(".row").children().length + 1;
					      $(".row").append('<div class="col-md-3 text-center"><img src="images/img_empty.png" width="150px" height="150px"><br>product ' + currentElementNo + ' - <strong>$' + currentElementNo + '</strong><br><button class="btn btn-danger my-cart-btn" data-id="' + currentElementNo + '" data-name="product ' + currentElementNo + '" data-summary="summary ' + currentElementNo + '" data-price="' + currentElementNo + '" data-quantity="1" data-image="images/img_empty.png">Add to Cart</button><a href="#" class="btn btn-info">Details</a></div>')
					    });*/

				});
