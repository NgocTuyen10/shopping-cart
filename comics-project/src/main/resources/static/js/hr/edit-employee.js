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
	        var url = "/comics/bophan";
	        $.ajax({
	          url: url, // url where to submit the request
	          type: "GET", // type of action POST || GET
	          contentType: "application/json", // data type
	          success: function (data) {
	            data.forEach(function (f) {
	            	var tblRow = "<option value=\"" + f.boPhanId + "\">" + f.ten + "</option>";
	            	$(tblRow).appendTo("#bo-phan select");
	            });
	            $("#bo-phan select").val(nhanVien.boPhan.boPhanId);
	          }
	        });
	});
    //Load employee information
    document.getElementsByName("ten")[0].value = nhanVien.ten;
    document.getElementsByName("soDienThoai")[0].value = nhanVien.soDienThoai;
    document.getElementsByName("ngaySinh")[0].value = nhanVien.ngaySinh;
    document.getElementsByName("luongThang")[0].value = nhanVien.luongThang;
    $("#gioi-tinh select").val(nhanVien.gioiTinh);
    $("#bo-phan select").val(nhanVien.boPhan);
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
	      soDienThoai: {
	        validators: {
	          stringLength: {
	            min:10,
	            max: 10,
	            message: 'Số điện thoại gồm 10 chữ số'
	          },
	          regexp: {
	            regexp: /^[0-9]+$/i,
	            message: 'The phone number can consist of number only'
	          },
	          notEmpty: {
	            message: 'Phone number code is required.'
	          }
	        }
	      },
	      ten: {
	        validators: {
	          stringLength: {
	            max: 40
	          },
	          notEmpty: {
	            message: 'Employee name is required.'
	          },
	          regexp: {
	            regexp: /^[AĂÂÁẮẤÀẰẦẢẲẨÃẴẪẠẶẬĐEÊÉẾÈỀẺỂẼỄẸỆIÍÌỈĨỊOÔƠÓỐỚÒỒỜỎỔỞÕỖỠỌỘỢUƯÚỨÙỪỦỬŨỮỤỰYÝỲỶỸỴAĂÂÁẮẤÀẰẦẢẲẨÃẴẪẠẶẬĐEÊÉẾÈỀẺỂẼỄẸỆIÍÌỈĨỊOÔƠÓỐỚÒỒỜỎỔỞÕỖỠỌỘỢUƯÚỨÙỪỦỬŨỮỤỰYÝỲỶỸỴAĂÂÁẮẤÀẰẦẢẲẨÃẴẪẠẶẬĐEÊÉẾÈỀẺỂẼỄẸỆIÍÌỈĨỊOÔƠÓỐỚÒỒỜỎỔỞÕỖỠỌỘỢUƯÚỨÙỪỦỬŨỮỤỰYÝỲỶỸỴAĂÂÁẮẤÀẰẦẢẲẨÃẴẪẠẶẬĐEÊÉẾÈỀẺỂẼỄẸỆIÍÌỈĨỊOÔƠÓỐỚÒỒỜỎỔỞÕỖỠỌỘỢUƯÚỨÙỪỦỬŨỮỤỰYÝỲỶỸỴAĂÂÁẮẤÀẰẦẢẲẨÃẴẪẠẶẬĐEÊÉẾÈỀẺỂẼỄẸỆIÍÌỈĨỊOÔƠÓỐỚÒỒỜỎỔỞÕỖỠỌỘỢUƯÚỨÙỪỦỬŨỮỤỰYÝỲỶỸỴAĂÂÁẮẤÀẰẦẢẲẨÃẴẪẠẶẬĐEÊÉẾÈỀẺỂẼỄẸỆIÍÌỈĨỊOÔƠÓỐỚÒỒỜỎỔỞÕỖỠỌỘỢUƯÚỨÙỪỦỬŨỮỤỰYÝỲỶỸỴA-Zaăâáắấàằầảẳẩãẵẫạặậđeêéếèềẻểẽễẹệiíìỉĩịoôơóốớòồờỏổởõỗỡọộợuưúứùừủửũữụựyýỳỷỹỵaăâáắấàằầảẳẩãẵẫạặậđeêéếèềẻểẽễẹệiíìỉĩịoôơóốớòồờỏổởõỗỡọộợuưúứùừủửũữụựyýỳỷỹỵaăâáắấàằầảẳẩãẵẫạặậđeêéếèềẻểẽễẹệiíìỉĩịoôơóốớòồờỏổởõỗỡọộợuưúứùừủửũữụựyýỳỷỹỵaăâáắấàằầảẳẩãẵẫạặậđeêéếèềẻểẽễẹệiíìỉĩịoôơóốớòồờỏổởõỗỡọộợuưúứùừủửũữụựyýỳỷỹỵaăâáắấàằầảẳẩãẵẫạặậđeêéếèềẻểẽễẹệiíìỉĩịoôơóốớòồờỏổởõỗỡọộợuưúứùừủửũữụựyýỳỷỹỵaăâáắấàằầảẳẩãẵẫạặậđeêéếèềẻểẽễẹệiíìỉĩịoôơóốớòồờỏổởõỗỡọộợuưúứùừủửũữụựyýỳỷỹỵa-z ]+$/i,
	            message: 'The name can consist of alphabetical, Vietnamese characters and spaces only'
	          }
	        }
	      },
	      ngaySinh: {
	        validators: {
	          date: {
	            message: 'The date is not valid format',
	            format: 'YYYY/MM/DD'
	          },
	          notEmpty: {
	            message: 'Date of birth is required.'
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
	      /*
			 * email: { validators: { notEmpty: { message: 'Email is required.' },
			 * regexp: { regexp:
			 * /^[_A-Za-z0-9-\.]+@[_A-Za-z0-9-\-]+(\.[_A-Za-z0-9-\\]+){1,2}/i,
			 * message: 'Please supply a valid email address' } } },
			 */
	      luong: {
			validators: {
		    stringLength: {
		             max :40
		            },
		            regexp: {
		              regexp: /^[0-9]+$/i,
		              message: 'Bonus can consist of number only'
		            },
		            notEmpty: {
		              message: 'Bonus is required.'
		            }
		      }
	      },
	      boPhan: {
	        validators: {
	          notEmpty: {
	            message: 'Group is required.'
	          }
	        }
	      },
	      gioiTinh: {
	        validators: {
	          notEmpty: {
	            message: 'Sex is required.'
	          }
	        }
	      }
	    }
	  })
    .on('success.form.bv', function (e) {
      // // Prevent form submission
      // e.preventDefault();
      var id = nhanVien.nhanVienId;
      var editUrl = "/comics/management/nhanvien/edit/" + id;
      var data = getFormData($("form"));
      data.boPhan = { boPhanId: data.boPhan };
      // send ajax
      $.ajax({
        url: editUrl, // url where to submit the request
        type: "PUT", // type of action POST || GET
        contentType: "application/json", // data type
        data: JSON.stringify(data), // post data || get data
        success: function (result) {
          $('#edit-employee-success').modal({backdrop: "static"});
        },
        error: function (xhr, resp, text) {
          console.log(xhr, resp, text);
          openPage('hr/edit_employee.html');
        }
      });
    });


function closeModalSuccess() {
  $('#edit-employee-success').modal('hide');
  $(".modal-backdrop").remove();
  openPage('hr/employee.html');
}

function closeModalError() {
  $('#edit-employee-error').modal('hide');
  $(".modal-backdrop").remove();
  openPage('hr/employee.html');
}