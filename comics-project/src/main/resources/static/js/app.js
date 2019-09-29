function openPage(pageName) {
	$("#content").load("/views/" + pageName);
}

function downloadFileExcel(url) {
	$.ajax({
		url : url,
		type : 'GET',
		contentType : 'application/octet-stream',
		xhrFields : {
			responseType : 'blob'
		},
		success : function(response, status, xhr) {
			var filename = "";
			var disposition = xhr.getResponseHeader('Content-Disposition');
			console.log(disposition);
			if (disposition) {
				var filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
				var matches = filenameRegex.exec(disposition);
				if (matches !== null && matches[1])
					filename = matches[1].replace(/['"]/g, '');
			}
			var linkelem = document.createElement('a');
			try {
				var blob = new Blob([ response ], {
					type : 'application/octet-stream'
				});
				if (typeof window.navigator.msSaveBlob !== 'undefined') {
					// IE workaround for "HTML7007: One or more blob URLs were
					// revoked by closing the blob for which they were created.
					// These URLs will no longer resolve as the data backing the
					// URL has been freed."
					window.navigator.msSaveBlob(blob, filename);
				} else {
					var URL = window.URL || window.webkitURL;
					var downloadUrl = URL.createObjectURL(blob);
					if (filename) {
						// use HTML5 a[download] attribute to specify filename
						var a = document.createElement("a");

						// safari doesn't support this yet
						if (typeof a.download === 'undefined') {
							window.location = downloadUrl;
						} else {
							a.href = downloadUrl;
							a.download = filename;
							document.body.appendChild(a);
							a.target = "_blank";
							a.click();
						}
					} else {
						window.location = downloadUrl;
					}
				}
			} catch (ex) {
				console.log(ex);
			}
		}
	});
}

function openFilePDF(url) {
	$.ajax({
		url : url,
		type : 'GET',
		contentType : 'application/pdf',
		xhrFields : {
			responseType : 'blob'
		},
		success : function(response, status, xhr) {
			var filename = "arrangement_resource";
			var disposition = xhr.getResponseHeader('Content-Disposition');
			console.log(disposition);
			if (disposition) {
				var filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
				var matches = filenameRegex.exec(disposition);
				if (matches !== null && matches[1])
					filename = matches[1].replace(/['"]/g, '');
			}
			var linkelem = document.createElement('a');
			try {
				var blob = new Blob([ response ], {
					type : 'application/pdf'
				});
				if (typeof window.navigator.msSaveBlob !== 'undefined') {
					// IE workaround for "HTML7007: One or more blob URLs were
					// revoked by closing the blob for which they were created.
					// These URLs will no longer resolve as the data backing the
					// URL has been freed."
					window.navigator.msSaveBlob(blob, filename);
				} else {
					var URL = window.URL || window.webkitURL;
					var downloadUrl = URL.createObjectURL(blob);
					if (filename) {
						// use HTML5 a[download] attribute to specify filename
						var a = document.createElement("a");
						// safari doesn't support this yet
						if (typeof a.download === 'undefined') {
							window.location = downloadUrl;
						} else {
							a.href = downloadUrl;
							a.download = filename;
							document.body.appendChild(a);
							a.target = "_blank";
							a.click();
						}
					} else {
						window.location = downloadUrl;
					}
				}
			} catch (ex) {
				console.log(ex);
			}
		}
	});
}

function postJson(url, postData, callBackFunction) {
	$.ajax({
		type : 'POST',
		url : url,
		data : JSON.stringify(postData),
		success : callBackFunction,
		contentType : "application/json",
		dataType : 'json'
	});
}

$(document).ready(function() {
	// 1. check local storage storage have token have token? if not load login
	// 2. if have token -> redirect to dashboard
	// Filter client side
//	var token = window.localStorage.getItem('token');
//	if (token) {
//		openPage("dashboard.html");
//	} else {
//		$("body").load("views/auth/login.html")
//	}

	/*
	 * $.ajaxSetup({ // Handle authorization global beforeSend : function(xhr) {
	 * xhr.setRequestHeader('X-Auth-Token', token); }, // Handle error global
	 * complete : function(xhr) { var status = xhr.status; if (status == 403) {
	 * xhr.setRequestHeader("X-Auth-Token", "");
	 * $("body").load("views/auth/login.html") } else if (status == 401)
	 * openPage("dashboard.html"); } });
	 */
});
