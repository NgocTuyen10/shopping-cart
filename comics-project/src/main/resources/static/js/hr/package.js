var idList = [];

$(document).ready(function() {
	
	
	loadDataTable();
	function loadDataTable() {
		disableButton();
		var url = "/api/projectshr";
		$.getJSON(url, function(data) {
			renderData(data);
		});
	};
});

function disableButton() {
	if (idList != 1)
		document.getElementById("edit").disabled = true;
	else
		document.getElementById("edit").disabled = false;

	if (idList.length > 0)
		document.getElementById("delete").disabled = false;
	else
		document.getElementById("delete").disabled = true;
}

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