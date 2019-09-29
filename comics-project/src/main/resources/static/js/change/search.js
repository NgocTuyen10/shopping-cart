var resultData = [];
var searchData = [];
$(document).ready(function () {
	// $(function () {
	// 	//Sync ajax, load drop box
	// 	$.ajaxSetup({
	// 		async: false
	// 	});

	// 	//Load PTname option
	// 	// var termUrl = "/api/projectshr";
	// 	// $.getJSON(termUrl, function (data) {
	// 	// 	searchData = data;
	// 	// 	data.forEach(function (f) {
	// 	// 		var tblRow = "<option value=\"" + f.id + "\">" + f.name + "</option>";
	// 	// 		$(tblRow).appendTo("#selectPT");
	// 	// 	});
	// 	// });
	// });
	search();
});
// function clearFunction() {
// 	var dropDown = document.getElementById("selectPT");
// 	dropDown.selectedIndex = 0;
// 	$("textarea#change-textarea").val('');
// 	$("textarea#before-textarea").val('');
// 	$("textarea#after-textarea").val('');
// 	$("textarea#evidence-textarea").val('');
// 	$("input#input-year").val('');
// 	$("input#input-result").val('');
// 	$("input#input-week").val('');
// }
function search() {
	var ptName;
	var ptLeader;
	var projectIdSelected = $('#selectPT').val();
	searchData.forEach(function (f) {
		if (f.id == projectIdSelected){
			ptName = f.name;
			ptLeader = f.leader.id;
		}
	});

	var reqData = {
		page: 1,
		ptName: ptName,
		ptLeader: ptLeader,
		week: 0
	}
	var searchProjectUrl = "/search";
	postJson(searchProjectUrl, reqData, function (data) {
		renderData(data);
	});
}
function renderData(data) {
	$('#datatable').DataTable({
		destroy: true,
		data: data,
		columns: [
			{ title: "PT Name", data: 'ptName' },
			{ title: "PT Lead", data: 'ptLeader' },
			{ title: "Change", data: 'change' },
			{ title: "Before", data: 'before' },
			{ title: "After", data: 'after' },
			{ title: "Result", data: 'result' },
			{ title: "Week", data: 'week' },
			{ title: "Year", data: 'year' },
			{ title: "Evidence", data: 'evidence' },
		]
	});
}
