window.files = null;

$(document).ready(function() {

	$('#importExcelProject').on('click', function() {
		uploadFile();
	});

});
$(document).ready(function() {
	$("#importPro").click(function() {
		$("#projectModal").modal({
			backdrop : "static"
		});
	});
});

function uploadFile() {
	files = $('#myFileField')[0].files;
	var uploadUrl = "/importdataPro";

	var fileFormData = new FormData();
	var check = $('#myFileField').val();

	for (var index = 0; index < files.length; index++) {

		fileFormData.append("file", files[index]);
	}
	if (check) {

		$.ajax({

			url : uploadUrl,

			type : 'POST',

			data : fileFormData,
			enctype : 'multipart/form-data',
			headers : {
				'Content-Type' : undefined
			},

			cache : false,

			contentType : false,

			processData : false,

			success : function() {
				// Handle upload success
				// ...
				$(".modal-backdrop").remove();
				openPage('hr/project.html');

			},
			error : function() {
				// Handle upload error
				// ...
				$(".modal-backdrop").remove();
			}

		});
	} else {
		alert("Please chooose file!");
	}

}
