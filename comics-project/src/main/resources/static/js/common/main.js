$(document).ready(function() {
	var menuClicked = $(".the-loai").text();
	$(".menu-click").each(function() {
		if ($(this).text() === menuClicked) {
			$(this).addClass("menu-clicked");
		}
	})
})