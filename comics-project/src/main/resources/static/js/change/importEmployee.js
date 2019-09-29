window.files = null;

$(document).ready(function() {

	$('#importExcelEmployee').on('click', function() {
		uploadFile();
	});

});
$(document).ready(function() {
	$("#importEmpl").click(function() {
		$("#employeeModal").modal({
			backdrop : "static"
		});
	});
});

function uploadFile() {
	files = $('#fileField')[0].files;
	var uploadUrl = "/importdataEmpl";

	var fileFormData = new FormData();

	var check = $('#fileField').val();
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
				openPage('hr/employee.html');

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
