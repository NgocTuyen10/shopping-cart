var uploadResult = null;
window.files = null;
$(document).ready(function () {
	$('#upload-file').on('click', function() {
		$("#upload-result").html('');
		uploadFile();
	});
});
function uploadFile() {
	files = $('#myFileField')[0].files;
	var uploadUrl = "/filesUpload";
	var fileFormData = new FormData();
	for (var index = 0; index< files.length; index++){
		fileFormData.append("files", files[index]);
	}
	
	$.ajax({
        url: uploadUrl,
        type: 'POST',
        data: fileFormData,
        headers: {'Content-Type': undefined},
        cache: false,
        contentType: false,
        processData: false,
        success: function (response) {
        	uploadResult = response;
            renderResult(uploadResult);
        }
    });
}
function renderResult(result) {
	var html = "";
	if (result == null) {
		return;
	} else {
		result.forEach(function(item) {
			html+= "File Name: <span>" + item.fileName + "</span><br>";
			if (item.state ==  'Fail!') {
				html+= "State: <span style='color: red;'>" + item.state + "</span><br>";
			} else {
				html+= "State: <span style='color: green;'>" + item.state + "</span><br>";
			}
			
			item.status.forEach(function(sta) {
				html+= "Status: <div class='list-group-item'>" +
					"<span style='color: red;'>" + sta + "</span></div><br>";
			});
		});
	}
	$("#upload-result").append(html);
}
