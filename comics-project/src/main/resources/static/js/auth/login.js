function login() {
	var json = {
		"username" : $('#username').val(),
		"password" : $('#password').val()
	};
	var URL = "/login";
	$.ajax({
		url : URL,
		type : "POST",
		data : JSON.stringify(json),
		contentType : "application/json",
		xhrFields : {
			withCredentials : true
		},
		success : function(data, statusText, request) {
			
			var token = request.getResponseHeader('X-Auth-Token');
			window.localStorage.setItem('token', token);
			var json = JSON.parse(data);
			var role = json.authorities[0].authority;
			var id = json.accountId;
			console.log(role);
			window.localStorage.setItem('role', role);
			window.localStorage.setItem('account_id', id);
			window.location.href = "/comics/management";
		},
		error : function(request, textStatus, errorThrown) {
			$("#loginfail").modal({
				backdrop : "static"
			});
		}
	});
}

$(document).ready(function() {
	$("#login").on('click', function() {
		login();
	});
});
