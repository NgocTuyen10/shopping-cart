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
              var url = "/comics/management/dich-gia";
              $.ajax({
                url: url, // url where to submit the request
                type: "GET", // type of action POST || GET
                contentType: "application/json", // data type
                success: function (data) {
                }
              });
      });
      //Load employee information
      document.getElementsByName("ten")[0].value = dichGia.ten;
      document.getElementsByName("maDichGia")[0].value = dichGia.maDichGia;
      document.getElementsByName("ngaySinh")[0].value = dichGia.ngaySinh;
      document.getElementsByName("diaChi")[0].value = dichGia.diaChi;
    });
    // click on button submit
    $("#submit").on('click', function () {
    });
    //click cancel button
    $("#cancel").on('click', function () {
      //   window.open("/employee", "_self");
      openPage("dich_gia/dich_gia.html");
    });
    $('#form').bootstrapValidator({
      // To use feedback icons, ensure that you use Bootstrap v3.1.0 or later
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
          },
          fields: {
            maDichGia: {
                validators: {
                  stringLength: {
                    max: 10
                  },
                  regexp: {
                      regexp: /^[a-zA-Z0-9_.-]+$/i,
                    message: 'Mã dịch giả chỉ gồm kỹ tự số và chữ'
                  },
                  notEmpty: {
                    message: 'Mã dịch giả không được để trống.'
                  }
                }
              },
              ten: {
                validators: {
                  stringLength: {
                    max: 40
                  },
                  notEmpty: {
                    message: 'Tên dịch giả không được để trống.'
                  },
                  regexp: {
                    regexp: /^[AĂÂÁẮẤÀẰẦẢẲẨÃẴẪẠẶẬĐEÊÉẾÈỀẺỂẼỄẸỆIÍÌỈĨỊOÔƠÓỐỚÒỒỜỎỔỞÕỖỠỌỘỢUƯÚỨÙỪỦỬŨỮỤỰYÝỲỶỸỴAĂÂÁẮẤÀẰẦẢẲẨÃẴẪẠẶẬĐEÊÉẾÈỀẺỂẼỄẸỆIÍÌỈĨỊOÔƠÓỐỚÒỒỜỎỔỞÕỖỠỌỘỢUƯÚỨÙỪỦỬŨỮỤỰYÝỲỶỸỴAĂÂÁẮẤÀẰẦẢẲẨÃẴẪẠẶẬĐEÊÉẾÈỀẺỂẼỄẸỆIÍÌỈĨỊOÔƠÓỐỚÒỒỜỎỔỞÕỖỠỌỘỢUƯÚỨÙỪỦỬŨỮỤỰYÝỲỶỸỴAĂÂÁẮẤÀẰẦẢẲẨÃẴẪẠẶẬĐEÊÉẾÈỀẺỂẼỄẸỆIÍÌỈĨỊOÔƠÓỐỚÒỒỜỎỔỞÕỖỠỌỘỢUƯÚỨÙỪỦỬŨỮỤỰYÝỲỶỸỴAĂÂÁẮẤÀẰẦẢẲẨÃẴẪẠẶẬĐEÊÉẾÈỀẺỂẼỄẸỆIÍÌỈĨỊOÔƠÓỐỚÒỒỜỎỔỞÕỖỠỌỘỢUƯÚỨÙỪỦỬŨỮỤỰYÝỲỶỸỴAĂÂÁẮẤÀẰẦẢẲẨÃẴẪẠẶẬĐEÊÉẾÈỀẺỂẼỄẸỆIÍÌỈĨỊOÔƠÓỐỚÒỒỜỎỔỞÕỖỠỌỘỢUƯÚỨÙỪỦỬŨỮỤỰYÝỲỶỸỴA-Zaăâáắấàằầảẳẩãẵẫạặậđeêéếèềẻểẽễẹệiíìỉĩịoôơóốớòồờỏổởõỗỡọộợuưúứùừủửũữụựyýỳỷỹỵaăâáắấàằầảẳẩãẵẫạặậđeêéếèềẻểẽễẹệiíìỉĩịoôơóốớòồờỏổởõỗỡọộợuưúứùừủửũữụựyýỳỷỹỵaăâáắấàằầảẳẩãẵẫạặậđeêéếèềẻểẽễẹệiíìỉĩịoôơóốớòồờỏổởõỗỡọộợuưúứùừủửũữụựyýỳỷỹỵaăâáắấàằầảẳẩãẵẫạặậđeêéếèềẻểẽễẹệiíìỉĩịoôơóốớòồờỏổởõỗỡọộợuưúứùừủửũữụựyýỳỷỹỵaăâáắấàằầảẳẩãẵẫạặậđeêéếèềẻểẽễẹệiíìỉĩịoôơóốớòồờỏổởõỗỡọộợuưúứùừủửũữụựyýỳỷỹỵaăâáắấàằầảẳẩãẵẫạặậđeêéếèềẻểẽễẹệiíìỉĩịoôơóốớòồờỏổởõỗỡọộợuưúứùừủửũữụựyýỳỷỹỵa-z ]+$/i,
                    message: 'Tên chỉ gồm chữ cái và số'
                  }
                }
              },
              ngaySinh: {
                validators: {
                  date: {
                    message: 'Sai định dạng ngày. VD 1997/01/24',
                    format: 'YYYY/MM/DD'
                  },
                  notEmpty: {
                    message: 'Không được để trống.'
                  },
                  callback: {
                    message: 'The date is not in the range: 18 year old to 60 year old',
                    callback: function (value, validator) {
                      var m = new moment(value, 'YYYY-MM-DD', true);
                      var currentMoment = moment();
                      var stopWorkTime = moment(new Date());
                      var startWorkTime = moment(new Date());
                      stopWorkTime.set({ 'year': currentMoment.year() - 60, 'month': currentMoment.month() + 1, 'date': currentMoment.date() });
                      stopWorkTime = stopWorkTime.format('YYYY-MM-DD');
                      startWorkTime.set({ 'year': currentMoment.year() - 18, 'month': currentMoment.month() + 1, 'date': currentMoment.date() });
                      startWorkTime = startWorkTime.format('YYYY-MM-DD');
                      if (!m.isValid()) {
                        return false;
                      }
                      return m.isAfter(stopWorkTime) && m.isBefore(startWorkTime);
                    }
                  }
                }
              },
              diaChi: {
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
        var id = dichGia.dichGiaId;
        var editUrl = "/comics/management/dich-gia/edit/" + id;
        var data = getFormData($("form"));
        // send ajax
        $.ajax({
          url: editUrl, // url where to submit the request
          type: "PUT", // type of action POST || GET
          contentType: "application/json", // data type
          data: JSON.stringify(data), // post data || get data
          success: function (result) {
            $('#edit-dich-gia-success').modal({backdrop: "static"});
          },
          error: function (xhr, resp, text) {
            console.log(xhr, resp, text);
            openPage('dich_gia/edit_dich_gia.html');
          }
        });
      });
  
  
  function closeModalSuccess() {
    $('#edit-dich-gia-success').modal('hide');
    $(".modal-backdrop").remove();
    openPage('dich_gia/dich_gia.html');
  }
  
  function closeModalError() {
    $('#edit-dich-gia-error').modal('hide');
    $(".modal-backdrop").remove();
    openPage('dich_gia/dich_gia.html');
  }