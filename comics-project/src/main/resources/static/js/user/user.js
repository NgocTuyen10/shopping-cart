window.user = null;
var idList = [];
$(document).ready(function () {
  // if (window.modal) {
  //   setTimeout(function () {
  //     // $("#overlay").remove();
  //     // $(".modal-backdrop").remove();
  //     $("#overlay").modal("hide");
  //     $(".modal-backdrop").remove();
  //     window.modal = false;
  //   }, 1000);
  // }
  loadDataTable();
  function loadDataTable() {
    var url = "/api/users";
    disableButton();
    $.getJSON(url, function (data) {
      renderData(data);
    });
  };
  // click on button create
  $("#create").on('click', function () {
    //    window.open("/user/create", "_self");
    openPage("user/create_user.html");
  });
  // click on button edit
  $("#edit").on('click', function () {
    openPage('user/edit_user.html');
    var id = idList[0];
    //Load project information
    var projectUrl = "/api/users/" + id;
    $.getJSON(projectUrl, function (data) {
      window.user = data;
    });
  });
  // click on button edit
  $("#resetpassword").on('click', function () {
    openPage('user/resetpassword.html');
    var id = idList[0];
    //Load project information
    var projectUrl = "/api/users/" + id;
    $.getJSON(projectUrl, function (data) {
      window.user = data;
    });
  });
  $("#delete").on('click', function () {
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
      console.log(idJson);
      $.ajax({
        url: '/api/users/delete', // url where to submit the request
        type: "PUT", // type of action POST || GET
        contentType: "application/json", // data type
        data: idJson, // post data || get data
        success: function (result) {
          $('#delete-user-success').modal('show');
          idList = [];
          loadDataTable();
        },
        error: function (xhr, resp, text) {
          console.log(xhr, resp, text);
          $('#delete-user-error').modal('show');
        }
      });
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
    document.getElementById("resetpassword").disabled = true;
  } else {
    document.getElementById("edit").disabled = false;
    document.getElementById("resetpassword").disabled = false;
  }
  if (idList.length > 0) {
    document.getElementById("delete").disabled = false;
  } else {
    document.getElementById("delete").disabled = true;
  }
};
//Render language from language id
function renderLanguage(id) {
  if (id == 1) return "English";
  if (id == 2) return "Japanese";
  if (id == 3) return "Vietnamese";
  else return "";
}
function renderData(data) {
  var table = $('#datatable').DataTable({
    "dom": '<"top"l>rt<"bottom"p><"clear">',
    // "bInfo": false,
    data: data,
    destroy: true,
    "aLengthMenu": [[10, 20, 30], [10, 20, 30]],
    "pageLength ": 10,
    columns: [
      { searchable: false, title: "<input type='checkbox' class='checkbox' name='select_all' id='checkbox-select-all' onClick='checkAll()'>", data: 'id' },
      { title: "User Name", data: 'userName' },
      { searchable: false, title: "Language", "data": null, "render": function (data, type, row) { return renderLanguage(data["language"]) } },
      { searchable: false, title: "Description", data: 'description' },
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