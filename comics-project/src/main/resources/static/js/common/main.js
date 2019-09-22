$(document).ready(function() {
	var menuClicked = $(".the-loai").text();
	$(".menu-click").each(function() {
		if ($(this).text() === menuClicked) {
			$(this).addClass("menu-clicked");
		}
	})

	$(document).on('click', '.add-to-cart-detail', function() {
		// $('.add-to-cart').click(function(event) {
		event.preventDefault();
		var truyenid = $(this).data('truyenid');
		var name = $(this).data('name');
		var price = Number($(this).data('price'));
		shoppingCart.addItemToCart(truyenid, name, price, 1);
		var myToast = $.toast({
			heading : 'Success',
			icon : 'success',
			hideAfter : 1000,
			stack : 3,
			position : 'bottom-right',
			loader : false
		});

		displayCart();
	});

	/*if (typeof variable !== 'undefined') {
		var username = [[${message}]];
		$('#acc-login').text(${username});
	}*/

})