$(document).ready(
		function() {

			var url = "/api/termshr";
			$.getJSON(url, function(data) {
				data.forEach(function(f) {
					var tblRow = "<option value=\"" + f.id + "\">" + f.name
							+ "</option>";
					$(tblRow).appendTo("#term select");
				});
			});
			$('#submit').click(function(e) {
				var xhttp = new XMLHttpRequest();
				var term = $('#term select').val();
				var checkProject = $('#checkProject').is(':checked');
				var checkHr = $('#checkHr').is(':checked');
				if (checkProject == false && checkHr == false) {
					alert("Please check to checkbox !");
				} else if (checkProject == true && checkHr == false) {
					var url = "/exportprojectlist/" + term;
					downloadFileExcel(url);

				} else if (checkProject == false && checkHr == true) {
					var url = "/exporthrallocation/" + term;
					downloadFileExcel(url);
				} else {
					var url = "/exportboth/" + term;
					downloadFileExcel(url);
				}
			});
		});
