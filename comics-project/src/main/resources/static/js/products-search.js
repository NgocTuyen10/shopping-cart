// let items = null;
const sizeSearch = 9;
var pageSearch = 0;
var totalPageSearch = 0;
// var totalPage = 0;
let seachingText = null;
$(document)
    .ready(
        function () {

            seachingText = sessionStorage.getItem("searchingText");
            // window.searchingText = "";
            initSearchingPageFistTime(seachingText, 0, sizeSearch);

            function initSearchingPageFistTime(seachingText, pageSearch, sizeSearch) {
                var url_get = "/comics/truyen/searching";
                $.ajax({
                    url: url_get,
                    type: "GET",
                    contentType: "application/json",
                    data: {
                        text: seachingText,
                        page: pageSearch,
                        size: sizeSearch
                    },
                    dataType: 'json',
                    success: function (data) {
                        console.log(data);
                        if (data.content) {
                            items = data.content;
                            showProducts(items);
                            totalPageSearch = data.totalPages;
                            $('#pagination-here-search').bootpag({
                                total: totalPageSearch,
                                page: 1,
                                maxVisible: 5,
                                leaps: true
                            });
                        }
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        console.log(jqXHR);
                        console.log(textStatus);
                        console.log(errorThrown);
                    }
                });

            }
            function initSearchingPage(text, pageSearch, sizeSearch) {
                var url_get = "/comics/truyen/searching";
                $.ajax({
                    url: url_get,
                    type: "GET",
                    contentType: "application/json",
                    data: {
                        text: seachingText,
                        page: pageSearch,
                        size: sizeSearch
                    },
                    dataType: 'json',
                    success: function (data) {
                        if (data.content) {
                            items = data.content;
                            showProducts(items);

                        }
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        console.log(jqXHR);
                        console.log(textStatus);
                        console.log(errorThrown);
                    }
                });
            }

            $('#page-index-search').on('click', '.show-detail', function () {

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

            function showProducts(items) {
                let products = [];
                for (var i = 0; i < items.length; i++) {
                    var donGiaBan = Number(items[i].donGiaBan.toFixed(1)).toLocaleString() + " đ";
                    products
                        .push("<div class='col-md-4 col-sm-6 col-xs-6' >"
                            + "<div class='product product-single'>"
                            + "<div class='product-thumb'>"
                            + "<button class='show-detail main-btn quick-view' value="
                            + items[i].maTruyen
                            + "><i class='fa fa-search-plus'></i>CHI TIẾT</button>"

							/*
							 * + "<a class='main-btn
							 * quick-view'
							 * th:href='@{/comics/truyen(maTruyen =" +
							 * items[i].maTruyen + ")}'>"
							 */
                            + "<i class='fa fa-search-plus'></i>CHI TIẾT"
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
                            + "<button class='btn primary-btn add-to-cart'"
                            + "data-truyenid='" + items[i].truyenId + "' data-name='" + items[i].ten + "'"
                            + "data-price='" + items[i].donGiaBan + "'>"
                            + "THÊM VÀO GIỎ</button>"
                            + "</div> </div>	</div>	</div>");
                }
                $('#page-index-search').append(products);
            }

            function clearSearchingPage() {
                $("#page-index-search").empty();
            }
            $('#pagination-here-search').bootpag({
                total: totalPageSearch,
                page: 1,
                maxVisible: 5,
                leaps: true
            });

            $('#pagination-here-search').on("page", function (event, num) {
                // show / hide content or pull via ajax etc
                console.log(num);
                clearSearchingPage();
                initSearchingPage(seachingText, num - 1, size);
            });

            $(document).on('click', '.add-to-cart', function (e) {
                event.preventDefault();
                var truyenid = $(this).data('truyenid');
                var name = $(this).data('name');
                var price = Number($(this).data('price'));
                shoppingCart.addItemToCart(truyenid, name, price, 1);
                var myToast = $.toast({
                    heading: 'Success',
                    icon: 'success',
                    hideAfter: 1000,
                    stack: 3,
                    position: 'bottom-right',
                    loader: false
                });

                displayCart();
            })


        });
