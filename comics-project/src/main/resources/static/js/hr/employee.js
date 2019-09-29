window.employee = null;
var idList = [];
$(document).ready(function () {
  
  $.ajaxSetup({
		// Handle authorization global
		beforeSend : function(xhr) {
			var token = localStorage.getItem('token');
			console.log(token);
			xhr.setRequestHeader('X-Auth-Token', token);
		},
		// Handle error global
		complete : function(xhr) {
			var status = xhr.status;
			if (status == 403) {
				xhr.setRequestHeader("X-Auth-Token", "");
				$("body").load("/views/auth/login.html")
			} else if (status == 401)
				openPage("dashboard.html");
		}
  });
  loadDataTable();
  function loadDataTable() {
    var url = "/management/nhanvien";
    disableButton();
    $.getJSON(url, function (data) {
    	for(x of data){
	    	if(x.gioiTinh == "1")
	    		x.gioiTinh ="Nam";
    		else
    			x.gioiTinh ="Nữ";
    	}
      renderData(data);
    });
  };
  // click on button create
  $("#create").on('click', function () {
    // window.open("/employee/create", "_self");
    openPage("hr/create_employee.html");
  });
  // click on button edit
  $("#edit").on('click', function () {
    // window.open("/employee/edit?id=" + idList[0], "_self");
    openPage('hr/edit_employee.html');
    var id = idList[0];
    // Load employee information
    var projectUrl = "/management/nhanvien/" + id;
    $.getJSON(projectUrl, function (data) {
      window.nhanVien = data;
      console.log(window.nhanVien);
    });
  });
  $("#delete").on('click', function () {
    // -----------------------------------
    // Declare Variables
    // -----------------------------------
    // delete
    var del = document.getElementById('del');
    var deleteClose = document.getElementById('del-close');
    var deleteOK = document.getElementById('del-ok');
    // -----------------------------------
    // Button Actions
    // -----------------------------------
    // close del on click
    del.showModal();
    deleteClose.addEventListener('click', function () {
      del.close();
    });
    deleteOK.addEventListener('click', function () {
      del.close();
      var idJson = "{\"id\": [" + idList + "]}";
      console.log(idJson);
      $.ajax({
        url: '/management/nhanvien/delete', // url where to submit the request
        type: "PUT", // type of action POST || GET
        contentType: "application/json", // data type
        data: idJson, // post data || get data
        success: function (result) {
          $('#delete-employee-success').modal('show');
          idList = [];
          loadDataTable();
        },
        error: function (xhr, resp, text) {
          console.log(xhr, resp, text);
          $('#delete-employee-error').modal('show');
        }
      });
      // openPage("hr/employee.html");
    });
  });

});
function checkAll() {
  $('input:checkbox').prop('checked', $('#checkbox-select-all').prop('checked'));
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
  var table = $('#datatable').DataTable({
    "dom": '<"top"l>rt<"bottom"p><"clear">',
    // "bInfo": false,
    data: data,
    destroy: true,
    "aLengthMenu": [[10, 20, 30], [10, 20, 30]], // number of items will be
													// show
    "pageLength ": 10,
    columns: [
      { searchable: false, title: "<input type='checkbox' class='checkbox' name='select_all' id='checkbox-select-all' onClick='checkAll()'>", data: 'nhanVienId' },
      { title: "Họ tên", data: 'ten' },
      { title: "Số điện thoại", data: 'soDienThoai' },
      { searchable: false, title: "Ngày sinh", data: 'ngaySinh' },
      { title: "Lương", data: 'luongThang' },
      { searchable: false, title: "Giói tính", data: 'gioiTinh' },
      { searchable: false, title: "Bộ phận", data: 'boPhan.ten' }
     
    ],
    columnDefs: [{
      targets: 0,
      searchable: false,
      orderable: false,
      className: 'dt-body-center',
      render: function (data, type, full, meta) {
        return '<input type="checkbox" class="checkbox" name="checkbox-item" onClick="checkRow(this.value)" value="' + $('<div/>').text(data).html() + '">';
      }
    }],
    order: [[1, 'asc']]
  });
  // Search button click
  $('#mySearchButton').on('keyup click', function () {
    table.search($('#mySearchText').val(), true, false).draw();
  });
}