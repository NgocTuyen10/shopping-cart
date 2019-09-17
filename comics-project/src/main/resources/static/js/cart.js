// ************************************************
// Shopping Cart API
// ************************************************

var shoppingCart = (function() {
	// =============================
	// Private methods and propeties
	// =============================
	cart = [];

	// Constructor
	function Item(truyenid, name, price, count) {
		this.truyenid = truyenid;
		this.name = name;
		this.price = price;
		this.count = count;
	}

	// Save cart
	function saveCart() {
		localStorage.setItem('shoppingCart', JSON.stringify(cart));
	}

	// Load cart
	function loadCart() {
		cart = JSON.parse(localStorage.getItem('shoppingCart'));
	}
	if (localStorage.getItem("shoppingCart") != null) {
		loadCart();
	}

	// =============================
	// Public methods and propeties
	// =============================
	var obj = {};

	// Add to cart
	obj.addItemToCart = function(truyenid, name, price, count) {
		for ( var item in cart) {
			if (cart[item].truyenid === truyenid) {
				cart[item].count++;
				saveCart();
				return;
			}
		}
		var item = new Item(truyenid, name, price, count);
		cart.push(item);
		saveCart();
	}

	// Set count from item
	obj.setCountForItem = function(truyenid, count) {
		for ( var i in cart) {
			if (cart[i].truyenid == truyenid) {
				cart[i].count = count;
				break;
			}
		}
		saveCart();
	};

	// Remove item from cart
	obj.removeItemFromCart = function(truyenid) {
		for ( var item in cart) {
			if (cart[item].truyenid === truyenid) {
				cart[item].count--;
				if (cart[item].count === 0) {
					cart.splice(item, 1);
				}
				break;
			}
		}
		saveCart();
	}

	// Remove all items from cart
	obj.removeItemFromCartAll = function(truyenid) {
		for ( var item in cart) {
			if (cart[item].truyenid === truyenid) {
				cart.splice(item, 1);
				break;
			}
		}
		saveCart();
	}

	// Clear cart
	obj.clearCart = function() {
		cart = [];
		saveCart();
	}

	// Count cart
	obj.totalCount = function() {
		var totalCount = 0;
		for ( var item in cart) {
			totalCount += cart[item].count;
		}
		return totalCount;
	}

	// Total cart
	obj.totalCart = function() {
		var totalCart = 0;
		for ( var item in cart) {
			totalCart += cart[item].price * cart[item].count;
		}
		return Number(totalCart.toFixed(2));
	}

	// List cart
	obj.listCart = function() {
		var cartCopy = [];
		for (i in cart) {
			item = cart[i];
			itemCopy = {};
			for (p in item) {
				itemCopy[p] = item[p];

			}
			itemCopy.total = Number(item.price * item.count).toFixed(2);
			cartCopy.push(itemCopy)
		}
		return cartCopy;
	}

	// cart : Array
	// Item : Object/Class
	// addItemToCart : Function
	// removeItemFromCart : Function
	// removeItemFromCartAll : Function
	// clearCart : Function
	// countCart : Function
	// totalCart : Function
	// listCart : Function
	// saveCart : Function
	// loadCart : Function
	return obj;
})();

// *****************************************
// Triggers / Events
// *****************************************
// Add item
$('#page-index').on('click', '.add-to-cart', function() {
	/* $('.add-to-cart').click(function(event) { */
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
});

// Clear items
$('.clear-cart').click(function() {
	shoppingCart.clearCart();
	displayCart();
});

function displayCart() {
	var cartArray = shoppingCart.listCart();
	var output = "";
	for ( var i in cartArray) {

		output += "<tr>"
				+ "<td class='thumb'><img src='' alt=''></td>"
				+ "<td class='details'>"
				+ "<a href='#'>"
				+ cartArray[i].name
				+ "</a>"
				+ "</td>"
				+ "<td class='price text-center'><strong>"
				+ cartArray[i].price
				+ "</strong><br><del class='font-weak'></del></td>"
				+ "<td class='qty text-center'><input class='input number-input' type='number' min='1' value='" 
				+ cartArray[i].count
				+ "' id='"+ cartArray[i].truyenid+ "'"
				+"></td>"
				+ "<td class='total text-center'><strong class='primary-color'>"
				+ cartArray[i].total
				+ "</strong></td>"
				+ "<td class='text-right'><button class='delete-item main-btn icon-btn'+ data-name='"
				+ cartArray[i].truyenid
				+ "'><i class='fa fa-close'></i></button></td>" + "</tr>";
	}
	$('.show-cart').html(output);
	$('.total-cart').html(shoppingCart.totalCart());
	$('.total-count').html(shoppingCart.totalCount());
}

// Delete item button

$(document).on('click', '.delete-item', function(e) {
	/* $('.show-cart').on("click", ".delete-item", function(event) { */
	var truyenid = $(this).data('name')
	shoppingCart.removeItemFromCartAll(truyenid);
	displayCart();
})

/*// -1
$('.show-cart').on("click", ".minus-item", function(event) {
	var truyenid = $(this).data('name')
	shoppingCart.removeItemFromCart(truyenid);
	displayCart();
})
// +1
$('.show-cart').on("click", ".plus-item", function(event) {
	var truyenid = $(this).data('name')
	shoppingCart.addItemToCart(truyenid);
	displayCart();
})

// Item count input
$('.show-cart').on("change", ".item-count", function(event) {
	var truyenid = $(this).data('name');
	var count = Number($(this).val());
	shoppingCart.setCountForItem(truyenid, count);
	displayCart();
});*/

displayCart();

// Increase and decrease product count
$(document).on('change', '.number-input', function(e) {
	var truyenid = $(this).attr('id');
	var count = Number($(this).val());
	shoppingCart.setCountForItem(truyenid, count);
	displayCart();
});

