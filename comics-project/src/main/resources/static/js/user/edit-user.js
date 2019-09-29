//Get URL param to find user id
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
    //Sync ajax, load drop box
    //Load employee option
    var gradeUrl = "/api/employees";
    $.getJSON(gradeUrl, function (data) {
      data.forEach(function (f) {
        var tblRow = "<option value=\"" + f.id + "\">" + f.name + "</option>";
        $(tblRow).appendTo("#employee select");
      });
      $("#employee select").val(user.employee.id);
      //Load user information
      document.getElementsByName("userName")[0].value = user.userName;
      document.getElementsByName("language")[0].value = user.language;
      var roleArrGet = user.roles;
      var roleArr = [];
      roleArrGet.forEach(role => {
        roleArr.push(role.id);
      });
      $("#roles").val(roleArr);
      $("#roles").multiselect("refresh");
      document.getElementsByName("description")[0].value = user.description;
    });
  });
  // click on button submit
  $("#submit").on('click', function () {
  });
  //click cancel button
  $("#cancel").on('click', function () {
    openPage("user/user.html");
  });
  $('#form')
    .find('[name="roles"]')
    .multiselect({
      // Re-validate the multiselect field when it is changed
      onChange: function (element, checked) {
        $('#form').bootstrapValidator('revalidateField', 'roles');
      }
    })
    .end()
    .bootstrapValidator({
      // To use feedback icons, ensure that you use Bootstrap v3.1.0 or later
      excluded: ':disabled',
      feedbackIcons: {
        valid: 'glyphicon glyphicon-ok',
        invalid: 'glyphicon glyphicon-remove',
        validating: 'glyphicon glyphicon-refresh'
      },
      fields: {
        userName: {
          validators: {
            notEmpty: {
              message: 'User name is required.'
            },
            stringLength: {
              max: 40
            },
            regexp: {
              regexp: /^[AĂÂÁẮẤÀẰẦẢẲẨÃẴẪẠẶẬĐEÊÉẾÈỀẺỂẼỄẸỆIÍÌỈĨỊOÔƠÓỐỚÒỒỜỎỔỞÕỖỠỌỘỢUƯÚỨÙỪỦỬŨỮỤỰYÝỲỶỸỴAĂÂÁẮẤÀẰẦẢẲẨÃẴẪẠẶẬĐEÊÉẾÈỀẺỂẼỄẸỆIÍÌỈĨỊOÔƠÓỐỚÒỒỜỎỔỞÕỖỠỌỘỢUƯÚỨÙỪỦỬŨỮỤỰYÝỲỶỸỴAĂÂÁẮẤÀẰẦẢẲẨÃẴẪẠẶẬĐEÊÉẾÈỀẺỂẼỄẸỆIÍÌỈĨỊOÔƠÓỐỚÒỒỜỎỔỞÕỖỠỌỘỢUƯÚỨÙỪỦỬŨỮỤỰYÝỲỶỸỴAĂÂÁẮẤÀẰẦẢẲẨÃẴẪẠẶẬĐEÊÉẾÈỀẺỂẼỄẸỆIÍÌỈĨỊOÔƠÓỐỚÒỒỜỎỔỞÕỖỠỌỘỢUƯÚỨÙỪỦỬŨỮỤỰYÝỲỶỸỴAĂÂÁẮẤÀẰẦẢẲẨÃẴẪẠẶẬĐEÊÉẾÈỀẺỂẼỄẸỆIÍÌỈĨỊOÔƠÓỐỚÒỒỜỎỔỞÕỖỠỌỘỢUƯÚỨÙỪỦỬŨỮỤỰYÝỲỶỸỴAĂÂÁẮẤÀẰẦẢẲẨÃẴẪẠẶẬĐEÊÉẾÈỀẺỂẼỄẸỆIÍÌỈĨỊOÔƠÓỐỚÒỒỜỎỔỞÕỖỠỌỘỢUƯÚỨÙỪỦỬŨỮỤỰYÝỲỶỸỴA-Zaăâáắấàằầảẳẩãẵẫạặậđeêéếèềẻểẽễẹệiíìỉĩịoôơóốớòồờỏổởõỗỡọộợuưúứùừủửũữụựyýỳỷỹỵaăâáắấàằầảẳẩãẵẫạặậđeêéếèềẻểẽễẹệiíìỉĩịoôơóốớòồờỏổởõỗỡọộợuưúứùừủửũữụựyýỳỷỹỵaăâáắấàằầảẳẩãẵẫạặậđeêéếèềẻểẽễẹệiíìỉĩịoôơóốớòồờỏổởõỗỡọộợuưúứùừủửũữụựyýỳỷỹỵaăâáắấàằầảẳẩãẵẫạặậđeêéếèềẻểẽễẹệiíìỉĩịoôơóốớòồờỏổởõỗỡọộợuưúứùừủửũữụựyýỳỷỹỵaăâáắấàằầảẳẩãẵẫạặậđeêéếèềẻểẽễẹệiíìỉĩịoôơóốớòồờỏổởõỗỡọộợuưúứùừủửũữụựyýỳỷỹỵaăâáắấàằầảẳẩãẵẫạặậđeêéếèềẻểẽễẹệiíìỉĩịoôơóốớòồờỏổởõỗỡọộợuưúứùừủửũữụựyýỳỷỹỵa-z0-9._-]+$/i,
              message: 'The name can consist of alphabetical, Vietnamese characters , number, hyphen, underscore, dot'
            }
          }
        },
        employee: {
          validators: {
            notEmpty: {
              message: 'Employee is required.'
            }
          }
        },
        language: {
          validators: {
            notEmpty: {
              message: 'Language is required.'
            }
          }
        },
        roles: {
          validators: {
            callback: {
              message: 'Please choose at least 1 role',
              callback: function (value, validator) {
                // Get the selected options
                var options = validator.getFieldElements('roles').val();
                return (options != null && options.length >= 1);
              }
            }
          }
        }
      }
    })
    .on('success.form.bv', function (e) {
      // // Prevent form submission
      // e.preventDefault();
      var id = user.id;
      var editUrl = "/api/users/" + id;
      var data = getFormData($("form"));
      data.employee = { id: data.employee };
      var roleArr = $("#roles").val();
      var tmp = {};
      var roles = [];
      roleArr.forEach(role => {
        tmp = { id: role };
        roles.push(tmp);
      });
      data.roles = roles;
      data.language = data.language;
      // send ajax
      $.ajax({
        url: editUrl, // url where to submit the request
        type: "PUT", // type of action POST || GET
        contentType: "application/json", // data type
        data: JSON.stringify(data), // post data || get data
        success: function (result) {
          $('#overlay').modal('show');
          openPage("user/user.html");
        },
        error: function (xhr, resp, text) {
          console.log(xhr, resp, text);
          openPage('user/edit_user.html');
        }
      });
    });
});

function closeModalSuccess() {
  $('#edit-user-success').modal('hide');
  $(".modal-backdrop").remove();
  openPage('user/user.html');
}

function closeModalError() {
  $('#edit-user-error').modal('hide');
  $(".modal-backdrop").remove();
  openPage('user/user.html');
}