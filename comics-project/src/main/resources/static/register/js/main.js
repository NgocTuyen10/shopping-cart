(function($) {

	function getFormData($form) {
		var unindexed_array = $form.serializeArray();
		var indexed_array = {};
		$.map(unindexed_array, function(n, i) {
			indexed_array[n['name']] = n['value'];
		});
		return indexed_array;
	}

	$(".toggle-password").click(function() {

		$(this).toggleClass("zmdi-eye zmdi-eye-off");
		var input = $($(this).attr("toggle"));
		if (input.attr("type") == "password") {
			input.attr("type", "text");
		} else {
			input.attr("type", "password");
		}
	});
	
	$(document).on("click", "input[name='regis']", function() {
//	$("input[name='submit']").click(function() {
		event.preventDefault();
		console.log("AAAAAAAAAAAAAAAA");

		var data = getFormData($("form"));

		$.ajax({
			url : '/comics/create-account', // url where to submit the
			type : "POST", // type of action POST || GET
			contentType : "application/json", // data type
			data : JSON.stringify(data), // post data || get
			success : function(result) {
				console.log("AAAAAAA");
				window.location.href = "/comics";
			},
			error : function(xhr, resp, text) {
				
			}
		});
	});

})(jQuery);