function getFormData($form) {
  var unindexed_array = $form.serializeArray();
  var indexed_array = {};
  $.map(unindexed_array, function (n, i) {
    indexed_array[n['name']] = n['value'];
  });
  return indexed_array;
}
$(document).ready(function () {

  $('#example-getting-started').multiselect({
    includeSelectAllOption: true,
    selectAllValue: 'select-all-value'
  });
  // The loai
  $(function () {
    var url = "/comics/management/the-loai";
    $.getJSON(url, function (data) {
      console.log("AAAA");
      data.forEach(function (f) {
        var tblRow = "<option value=\"" + f.theLoaiId + "\">" + f.ten + "</option>";
        $(tblRow).appendTo("#the-loai select");
      });
    });
  });
  // Tac gia
  $(function () {
    var url = "/comics/management/tac-gia";
    $.getJSON(url, function (data) {
      console.log("AAAA");
      data.forEach(function (f) {
        var tblRow = "<option value=\"" + f.tacGiaId + "\">" + f.ten + "</option>";
        $(tblRow).appendTo("#tac-gia select");
      });
      $('#select-tac-gia').multiselect({
        includeSelectAllOption: true,
        selectAllValue: 'select-all-value'
      });
    });
  });

  //Dich gia
  $(function () {
    var url = "/comics/management/dich-gia";
    $.getJSON(url, function (data) {
      console.log("AAAA");
      data.forEach(function (f) {
        var tblRow = "<option value=\"" + f.dichGiaId + "\">" + f.ten + "</option>";
        $(tblRow).appendTo("#dich-gia select");
      });
      $('#select-dich-gia').multiselect({
        includeSelectAllOption: true,
        selectAllValue: 'select-all-value'
      });
    });
  });

  //Nha xuat ban
  $(function () {
    var url = "/comics/management/nha-xuat-ban";
    $.getJSON(url, function (data) {
      data.forEach(function (f) {
        var tblRow = "<option value=\"" + f.nhaXuatBanId + "\">" + f.ten + "</option>";
        $(tblRow).appendTo("#nha-xuat-ban select");
      });
    });
  });

  $(function () {
    var url = "/comics/management/dau-truyen";
    $.getJSON(url, function (data) {
      data.forEach(function (f) {
        var tblRow = "<option value=\"" + f.dauTruyenId + "\">" + f.tuaTruyen + "</option>";
        $(tblRow).appendTo("#dau-truyen select");
      });
    });
  });

  $("#submit").on('click', function () {
  });

  $("#cancel").on('click', function () {
    // window.open("/employee", "_self");
    openPage("hr/employee.html");
  });

  $("#form").submit(function (event) {
    return false;
  });

  // form submit status

  $('#form').on('status.field.bv', function (e, data) {
    formIsValid = true;
    $('.form-group', $(this)).each(function () {

      if (!($(this).hasClass('skip-validate'))) {
        formIsValid = formIsValid &&
          $(this).hasClass('has-success');
      }
    }); if (formIsValid) {
      $('#submit',
        $(this)).attr('disabled', false);
    } else {
      $('#submit',
        $(this)).attr('disabled', true);
    }
  });

  $('#form').bootstrapValidator({
    // To use feedback icons, ensure that you use Bootstrap v3.1.0 or later
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    fields: {
      donGiaBan: {
        validators: {
          regexp: {
            regexp: /^[0-9]+$/i,
            message: 'Trường này chỉ gồm chữ số.'
          },
          notEmpty: {
            message: 'Trường này bắt buộc.'
          }
        }
      },
      ten: {
        validators: {
          stringLength: {
            max: 40
          },
          notEmpty: {
            message: 'Trường này bắt buộc.'
          },
          regexp: {
            regexp: /^[AĂÂÁẮẤÀẰẦẢẲẨÃẴẪẠẶẬĐEÊÉẾÈỀẺỂẼỄẸỆIÍÌỈĨỊOÔƠÓỐỚÒỒỜỎỔỞÕỖỠỌỘỢUƯÚỨÙỪỦỬŨỮỤỰYÝỲỶỸỴAĂÂÁẮẤÀẰẦẢẲẨÃẴẪẠẶẬĐEÊÉẾÈỀẺỂẼỄẸỆIÍÌỈĨỊOÔƠÓỐỚÒỒỜỎỔỞÕỖỠỌỘỢUƯÚỨÙỪỦỬŨỮỤỰYÝỲỶỸỴAĂÂÁẮẤÀẰẦẢẲẨÃẴẪẠẶẬĐEÊÉẾÈỀẺỂẼỄẸỆIÍÌỈĨỊOÔƠÓỐỚÒỒỜỎỔỞÕỖỠỌỘỢUƯÚỨÙỪỦỬŨỮỤỰYÝỲỶỸỴAĂÂÁẮẤÀẰẦẢẲẨÃẴẪẠẶẬĐEÊÉẾÈỀẺỂẼỄẸỆIÍÌỈĨỊOÔƠÓỐỚÒỒỜỎỔỞÕỖỠỌỘỢUƯÚỨÙỪỦỬŨỮỤỰYÝỲỶỸỴAĂÂÁẮẤÀẰẦẢẲẨÃẴẪẠẶẬĐEÊÉẾÈỀẺỂẼỄẸỆIÍÌỈĨỊOÔƠÓỐỚÒỒỜỎỔỞÕỖỠỌỘỢUƯÚỨÙỪỦỬŨỮỤỰYÝỲỶỸỴAĂÂÁẮẤÀẰẦẢẲẨÃẴẪẠẶẬĐEÊÉẾÈỀẺỂẼỄẸỆIÍÌỈĨỊOÔƠÓỐỚÒỒỜỎỔỞÕỖỠỌỘỢUƯÚỨÙỪỦỬŨỮỤỰYÝỲỶỸỴA-Zaăâáắấàằầảẳẩãẵẫạặậđeêéếèềẻểẽễẹệiíìỉĩịoôơóốớòồờỏổởõỗỡọộợuưúứùừủửũữụựyýỳỷỹỵaăâáắấàằầảẳẩãẵẫạặậđeêéếèềẻểẽễẹệiíìỉĩịoôơóốớòồờỏổởõỗỡọộợuưúứùừủửũữụựyýỳỷỹỵaăâáắấàằầảẳẩãẵẫạặậđeêéếèềẻểẽễẹệiíìỉĩịoôơóốớòồờỏổởõỗỡọộợuưúứùừủửũữụựyýỳỷỹỵaăâáắấàằầảẳẩãẵẫạặậđeêéếèềẻểẽễẹệiíìỉĩịoôơóốớòồờỏổởõỗỡọộợuưúứùừủửũữụựyýỳỷỹỵaăâáắấàằầảẳẩãẵẫạặậđeêéếèềẻểẽễẹệiíìỉĩịoôơóốớòồờỏổởõỗỡọộợuưúứùừủửũữụựyýỳỷỹỵaăâáắấàằầảẳẩãẵẫạặậđeêéếèềẻểẽễẹệiíìỉĩịoôơóốớòồờỏổởõỗỡọộợuưúứùừủửũữụựyýỳỷỹỵa-z ]+$/i,
            message: 'The name can consist of alphabetical, Vietnamese characters and spaces only'
          }
        }
      },
      maTruyen: {
        validators: {
          stringLength: {
            max: 40
          },
          notEmpty: {
            message: 'Trường này bắt buộc.'
          },
          regexp: {
            regexp: /^[a-zA-Z0-9_.-]+$/i,
            message: 'The name can consist of alphabetical, Vietnamese characters and spaces only'
          }
        }
      },
      theLoai: {
        validators: {
          notEmpty: {
            message: 'Trường này bắt buộc.'
          }
        }
      },
      denTrang: {
        validators: {
          notEmpty: {
            message: 'Trường này bắt buộc.'
          }
        }
      },
      tacGias: {
        validators: {
          notEmpty: {
            message: 'Trường này bắt buộc.'
          }
        }
      },
      dichGias: {
        validators: {
          notEmpty: {
            message: 'Trường này bắt buộc.'
          }
        }
      },
      nhaXuatBan: {
        validators: {
          notEmpty: {
            message: 'Trường này bắt buộc.'
          }
        }
      },
      dauTruyenId: {
        validators: {
          notEmpty: {
            message: 'Trường này bắt buộc.'
          }
        }
      }
    }
  })
    .on('success.form.bv', function (e) {
      // // Prevent form submission
      // e.preventDefault();
      // send ajax
      var data = getFormData($("form"));

      // var i = 0;
      // for (i; i < data.tacGias; i++) {
      //   var item = {
      //     truyenId: cart[i].truyenid,
      //     soLuong: cart[i].count
      //   };
      //   truyens.push(item);
      // }
      // var total = shoppingCart.totalCart();
      // var cartData = {
      //   "truyens": truyens,
      //   "khachHang": khachHang,
      //   "total": total
      // }


      var dichGias = [];

      $("#select-dich-gia :selected").each(function () {
        var dichGiaId = Number($(this).val());
        var dichGia = {
          "dichGiaId": dichGiaId
        };
        dichGias.push(dichGia);
      });

      var tacGias = [];
      $("#select-tac-gia :selected").each(function () {
        var tacGiaId = Number($(this).val());
        var tacGia = {
          "tacGiaId": tacGiaId
        };
        tacGias.push(tacGia);
      });


      data.dichGias = dichGias;
      data.tacGias = tacGias;
      data.theLoai = Number(data.theLoai);
      data.nhaXuatBan = Number(data.nhaXuatBan);
      // console.log(selectedValues);
      console.log(data);
      /*data.grade = { id: data.grade };*/
      $.ajax({
        url: '/comics/truyen', // url where to submit the request
        type: "POST", // type of action POST || GET
        contentType: "application/json", // data type
        data: JSON.stringify(data), // post data || get data
        success: function (result) {
          $('#create-truyen-success').modal('show');
        },
        error: function (xhr, resp, text) {
          console.log(xhr, resp, text);
          $('#create-truyen-error').modal('show');
        }
      });
    })
});

function closeModalSuccess() {
  $('#create-truyen-success').modal('hide');
  $(".modal-backdrop").remove();
  openPage('truyen/truyen.html');
}

function closeModalError() {
  $('#create-truyen-error').modal('hide');
  $(".modal-backdrop").remove();
  openPage('truyen/create_truyen.html');
}