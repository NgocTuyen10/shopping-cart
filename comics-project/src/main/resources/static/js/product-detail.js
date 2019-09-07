$(document).ready(function() {
	
});


function getDetail(maTruyen) {
	var api_url = "/comics/truyen/" + maTruyen;
	$.ajax({
		url : api_url,
		type: "GET",
		contentType : "application/json",
		data: {
			maTruyen: maTruyen
		}
		dataType : 'json',
		success : function(data) {
			console.log("success");
		}
	});
}
