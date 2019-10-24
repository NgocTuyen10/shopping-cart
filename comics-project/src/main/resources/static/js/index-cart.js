$(document).ready(function() {
//	$('.add-to-cart').click(function(event) {
//		event.preventDefault();
//		var truyenid = $(this).data('truyenid');
//		var name = $(this).data('name');
//		var price = Number($(this).data('price'));
//		shoppingCart.addItemToCart(truyenid, name, price, 1);
//		var myToast = $.toast({
//			heading : 'Success',
//			icon : 'success',
//			hideAfter : 1000,
//			stack : 3,
//			position : 'bottom-right',
//			loader : false
//		});
//
//		displayCart();
//	});
	var priceEls = document.getElementsByClassName("don-gia-ban");
	for (var i = 0; i < priceEls.length; i++) {
	  var price = parseInt(priceEls[i].innerText);
	  price = Number(price.toFixed(1)).toLocaleString();
	  priceEls[i].innerHTML = price + " đ";
	}	
});