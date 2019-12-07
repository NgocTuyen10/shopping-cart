function logout() {
	localStorage.clear();
	location.reload();
	//$("body").load("/views/auth/login.html");
	window.location= "/comics/management-login"
}

$(document).ready(function() {

	// read data from local storage
	var role = window.localStorage.getItem('role');
	console.log(role);
	if (role != "ROLE_ADMIN" && role != "ROLE_GROUP_LEADER")
		$('#attempLi').hide();
	else
		$('#attempLi').show();

	$('#logout').click(function(e) {
		logout();
	});
	$('#arrangement-resource').click(function(e) {
		var url = "/export/arrangement-resource";
		openFilePDF(url);
	});
	$('#resource-pool').click(function(e) {
		var url = "/export/resource-pool";
		openFilePDF(url);
	});
	$('#download-excel').click(function(e) {
		var url = "/download";
		downloadFileExcel(url);
	});
});