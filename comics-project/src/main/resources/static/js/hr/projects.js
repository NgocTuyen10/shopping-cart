window.project = null;
var idList = [];
$(document).ready(function() {
	// if ($("#overlay")) {
	// 	setTimeout(function () {
	// 		$("#overlay").remove();
	// 		$(".modal-backdrop").remove();
	// 	}, 1000);
	// }
	loadDataTable();
	function loadDataTable() {
		disableButton();
		var url = "/api/projectshr";
		$.getJSON(url, function(data) {
			renderData(data);
		});
	};
	// click on button edit
	$("#edit").on('click', function() {
		openPage('hr/edit_project.html');
		var id = idList[0];
		// Load project information
		var projectUrl = "/api/projectshr/" + id;
		$.getJSON(projectUrl, function(data) {
			window.project = data;
		});
	});
	$("#delete").on('click', function() {
		//-----------------------------------
		// Declare Variables
		//-----------------------------------
		// delete
		var del = document.getElementById('del');
		var deleteClose = document.getElementById('del-close');
		var deleteOK = document.getElementById('del-ok');
		//-----------------------------------
		// Button Actions
		//-----------------------------------
		// close del on click
		del.showModal();
		deleteClose.addEventListener('click', function () {
			del.close();
		});
		deleteOK.addEventListener('click', function () {
			del.close();
			var idJson = "{\"id\": [" + idList + "]}";
			$.ajax({
				url : '/api/projectshr/delete', // url where to submit the
												// request
				type : "PUT", // type of action POST || GET
				contentType : "application/json", // data type
				data : idJson, // post data || get data
				success : function(result) {
					$('#delete-project-success').modal('show');
					idList = [];
					loadDataTable();
				},
				error : function(xhr, resp, text) {
					console.log(xhr, resp, text);
					$('#delete-project-error').modal('show');
				}
			});
			openPage("hr/project.html");
		});
	});
});
function checkAll() {
	$('input:checkbox').prop('checked',
			$('#checkbox-select-all').prop('checked'));
	idList = [];
	if ($('#checkbox-select-all').prop('checked')) {
		for (var i = 1; i < $('input:checkbox').length; i++) {
			idList.push($('input:checkbox')[i].value);
		}
	}
	disableButton();
}
function checkRow(value) {
	if (idList.indexOf(value) > -1) {
		idList.splice(idList.indexOf(value), 1);
	} else {
		idList.push(value);
	}
	disableButton();
}
function disableButton() {
	if (idList.length != 1) {
		document.getElementById("edit").disabled = true;
	} else {
		document.getElementById("edit").disabled = false;
	}
	if (idList.length > 0) {
		document.getElementById("delete").disabled = false;
	} else {
		document.getElementById("delete").disabled = true;
	}
};
function renderData(data) {
	var table = $('#datatable')
			.DataTable(
					{
						"dom" : '<"top"l>rt<"bottom"p><"clear">',
						// "bInfo": false,
						data : data,
						destroy : true,
						"aLengthMenu" : [ [ 10, 20, 30 ], [ 10, 20, 30 ] ],
						"pageLength " : 10,
						columns : [
								{
									searchable : false,
									title : "<input type='checkbox' class='checkbox' name='select_all' id='checkbox-select-all' onClick='checkAll()'>",
									data : 'id'
								}, {
									title : "Project ID",
									data : 'projectId'
								}, {
									title : "Name",
									data : 'name'
								}, {
									title : "Short Name",
									data : 'shortName'
								}, {
									searchable : false,
									title : "Group",
									data : 'group.name'
								}, {
									searchable : false,
									title : "Term",
									data : 'term.name'
								}, {
									searchable : false,
									title : "Rank",
									data : 'rank.name'
								}, {
									searchable : false,
									title : "Budget",
									data : 'budget'
								}, {
									searchable : false,
									title : "Start Date",
									data : 'startDate'
								}, {
									searchable : false,
									title : "End Date",
									data : 'endDate'
								} ],
						columnDefs : [ {
							targets : 0,
							searchable : false,
							orderable : false,
							className : 'dt-body-center',
							render : function(data, type, full, meta) {
								return '<input type="checkbox" class="checkbox" name="checkbox-item" onClick="checkRow(this.value)" value="'
										+ $('<div/>').text(data).html() + '">';
							}
						} ],
						order : [ [ 1, 'asc' ] ]
					});
	// Search button click
	$('#mySearchButton').on('keyup click', function() {
		table.search($('#mySearchText').val(), true, false).draw();
	});
}
