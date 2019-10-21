//Get URL param to find employee id
var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = window.location.search.substring(1),
      sURLVariables = sPageURL.split('&'),
      sParameterName,
      i;
    for (i = 0; i < sURLVariables.length; i++) {
      sParameterName = sURLVariables[i].split('=');
      if (sParameterName[0] === sParam) {
        return sParameaterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
      }
    }
  };
  //Get form data
  function getFormData($form) {
    var unindexed_array = $form.serializeArray();
    var indexed_array = {};
    $.map(unindexed_array, function (n, i) {
      indexed_array[n['name']] = n['value'];
    });
    return indexed_array;
  }
  $(document).ready(function () {
      $(function () {
              var url = "/comics/management/nha-xuat-ban";
              $.ajax({
                url: url, // url where to submit the request
                type: "GET", // type of action POST || GET
                contentType: "application/json", // data type
                success: function (data) {
                }
              });
      });
      //Load employee information
      document.getElementsByName("ten")[0].value = nhaXuatBan.ten;
      document.getElementsByName("maNhaXuatBan")[0].value = nhaXuatBan.maNhaXuatBan;
      document.getElementsByName("thongTin")[0].value = nhaXuatBan.thongTin;
    });
    // click on button submit
    $("#submit").on('click', function () {
    });
    //click cancel button
    $("#cancel").on('click', function () {
      //   window.open("/employee", "_self");
      openPage("nha_xuat_ban/nha_xuat_ban.html");
    });
    $('#form').bootstrapValidator({
      // To use feedback icons, ensure that you use Bootstrap v3.1.0 or later
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
          },
          fields: {
            maNhaXuatBan: {
                validators: {
                  stringLength: {
                    max: 10
                  },
                  regexp: {
                      regexp: /^[a-zA-Z0-9_.-]+$/i,
                    message: 'Mã tác giả chỉ gồm kỹ tự số và chữ'
                  },
                  notEmpty: {
                    message: 'Mã tác giả không được để trống.'
                  }
                }
              },
              ten: {
                validators: {
                  stringLength: {
                    max: 40
                  },
                  notEmpty: {
                    message: 'Tên tác giả không được để trống.'
                  },
                  regexp: {
                    regexp: /^[AĂÂÁẮẤÀẰẦẢẲẨÃẴẪẠẶẬĐEÊÉẾÈỀẺỂẼỄẸỆIÍÌỈĨỊOÔƠÓỐỚÒỒỜỎỔỞÕỖỠỌỘỢUƯÚỨÙỪỦỬŨỮỤỰYÝỲỶỸỴAĂÂÁẮẤÀẰẦẢẲẨÃẴẪẠẶẬĐEÊÉẾÈỀẺỂẼỄẸỆIÍÌỈĨỊOÔƠÓỐỚÒỒỜỎỔỞÕỖỠỌỘỢUƯÚỨÙỪỦỬŨỮỤỰYÝỲỶỸỴAĂÂÁẮẤÀẰẦẢẲẨÃẴẪẠẶẬĐEÊÉẾÈỀẺỂẼỄẸỆIÍÌỈĨỊOÔƠÓỐỚÒỒỜỎỔỞÕỖỠỌỘỢUƯÚỨÙỪỦỬŨỮỤỰYÝỲỶỸỴAĂÂÁẮẤÀẰẦẢẲẨÃẴẪẠẶẬĐEÊÉẾÈỀẺỂẼỄẸỆIÍÌỈĨỊOÔƠÓỐỚÒỒỜỎỔỞÕỖỠỌỘỢUƯÚỨÙỪỦỬŨỮỤỰYÝỲỶỸỴAĂÂÁẮẤÀẰẦẢẲẨÃẴẪẠẶẬĐEÊÉẾÈỀẺỂẼỄẸỆIÍÌỈĨỊOÔƠÓỐỚÒỒỜỎỔỞÕỖỠỌỘỢUƯÚỨÙỪỦỬŨỮỤỰYÝỲỶỸỴAĂÂÁẮẤÀẰẦẢẲẨÃẴẪẠẶẬĐEÊÉẾÈỀẺỂẼỄẸỆIÍÌỈĨỊOÔƠÓỐỚÒỒỜỎỔỞÕỖỠỌỘỢUƯÚỨÙỪỦỬŨỮỤỰYÝỲỶỸỴA-Zaăâáắấàằầảẳẩãẵẫạặậđeêéếèềẻểẽễẹệiíìỉĩịoôơóốớòồờỏổởõỗỡọộợuưúứùừủửũữụựyýỳỷỹỵaăâáắấàằầảẳẩãẵẫạặậđeêéếèềẻểẽễẹệiíìỉĩịoôơóốớòồờỏổởõỗỡọộợuưúứùừủửũữụựyýỳỷỹỵaăâáắấàằầảẳẩãẵẫạặậđeêéếèềẻểẽễẹệiíìỉĩịoôơóốớòồờỏổởõỗỡọộợuưúứùừủửũữụựyýỳỷỹỵaăâáắấàằầảẳẩãẵẫạặậđeêéếèềẻểẽễẹệiíìỉĩịoôơóốớòồờỏổởõỗỡọộợuưúứùừủửũữụựyýỳỷỹỵaăâáắấàằầảẳẩãẵẫạặậđeêéếèềẻểẽễẹệiíìỉĩịoôơóốớòồờỏổởõỗỡọộợuưúứùừủửũữụựyýỳỷỹỵaăâáắấàằầảẳẩãẵẫạặậđeêéếèềẻểẽễẹệiíìỉĩịoôơóốớòồờỏổởõỗỡọộợuưúứùừủửũữụựyýỳỷỹỵa-z ]+$/i,
                    message: 'Tên chỉ gồm chữ cái và số'
                  }
                }
              },
              thongTin: {
                  validators: {
                    stringLength: {
                      max: 40
                    },
                    notEmpty: {
                      message: 'Trường này không được để trống.'
                    }
                  }
                }
          }
        })
      .on('success.form.bv', function (e) {
        // // Prevent form submission
        // e.preventDefault();
        var id = tacGia.tacGiaId;
        var editUrl = "/comics/management/nha-xuat-ban/edit/" + id;
        var data = getFormData($("form"));
        // send ajax
        $.ajax({
          url: editUrl, // url where to submit the request
          type: "PUT", // type of action POST || GET
          contentType: "application/json", // data type
          data: JSON.stringify(data), // post data || get data
          success: function (result) {
            $('#edit-nha-xuat-ban-success').modal({backdrop: "static"});
          },
          error: function (xhr, resp, text) {
            console.log(xhr, resp, text);
            openPage('nha_xuat_ban/edit_nha_xuat_ban.html');
          }
        });
      });
  
  
  function closeModalSuccess() {
    $('#edit-nha-xuat-ban-success').modal('hide');
    $(".modal-backdrop").remove();
    openPage('nha_xuat_ban/nha_xuat_ban.html');
  }
  
  function closeModalError() {
    $('#edit-nha-xuat-ban-error').modal('hide');
    $(".modal-backdrop").remove();
    openPage('nha_xuat_ban/nha_xuat_ban.html');
  }