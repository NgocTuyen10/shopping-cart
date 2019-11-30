//Get URL param to find employee id
var getUrlParameter = function getUrlParameter(sParam) {
  var sPageURL = window.location.search.substring(1),
    sURLVariables = sPageURL.split('&'),
    sParameterName,
    i;
  for (i = 0; i < sURLVariables.length; i++) {
    sParameterName = sURLVariables[i].split('=');
    if (sParameterName[0] === sParam) {
      return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
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
  //Load employee information
  document.getElementsByName("ten")[0].value = truyen.ten;
  document.getElementsByName("maTruyen")[0].value = truyen.maTruyen;
  document.getElementsByName("donGiaBan")[0].value = truyen.donGiaBan;
  document.getElementsByName("loaiMau")[0].value = truyen.loaiMau;
  $("#the-loai select").val(truyen.theLoai.theLoaiId);
  $("#tac-gia select").val(truyen.tacGia.tacGiaId);
  $("#dich-gia select").val(truyen.dichGia.dichGiaId);
  $("#nha-xuat-ban select").val(truyen.nhaXuatBan.nhaXuatBanId);
  $("#dau-truyen select").val(truyen.dauTruyen).dauTruyenId;
});
// click on button submit
$("#submit").on('click', function () {
});
//click cancel button
$("#cancel").on('click', function () {
  //   window.open("/employee", "_self");
  openPage("hr/employee.html");
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
    var id = truyen.truyenId;
    var editUrl = "/comics/truyen/edit/" + id;
    var data = getFormData($("form"));
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
    // send ajax
    var editUrl = "/comics/truyen/edit/" + data.truyenId;
    $.ajax({
      url: editUrl, // url where to submit the request
      type: "PUT", // type of action POST || GET
      contentType: "application/json", // data type
      data: JSON.stringify(data), // post data || get data
      success: function (result) {
        $('#edit-truyen-success').modal({ backdrop: "static" });
      },
      error: function (xhr, resp, text) {
        console.log(xhr, resp, text);
        openPage('truyen/edit_truyen.html');
      }
    });
  });


function closeModalSuccess() {
  $('#edit-truyen-success').modal('hide');
  $(".modal-backdrop").remove();
  openPage('truyen/truyen.html');
}

function closeModalError() {
  $('#edit-truyen-error').modal('hide');
  $(".modal-backdrop").remove();
  openPage('truyen/truyen.html');
}