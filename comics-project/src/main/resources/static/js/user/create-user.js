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
    var url = "/api/employees";
    $.getJSON(url, function (data) {
      data.forEach(function (f) {
        var tblRow = "<option value=\"" + f.id + "\">" + f.name + "</option>";
        $(tblRow).appendTo("#employee select");
      });
    });
  });
  document.getElementsByName("description")[0].value = "";
  $("#submit").on('click', function () {
  });
  $("#cancel").on('click', function () {
    openPage("user/user.html");
  });
  $("#form").submit(function (event) {
    return false;
  });
  //form submit status
  $('#form').on('status.field.bv', function (e, data) {
    formIsValid = true;
    $('.form-group', $(this)).each(function () {

      if (!($(this).hasClass('skip-validate'))) {
        formIsValid = formIsValid && $(this).hasClass('has-success');
      }
    });
    if (formIsValid) {
      $('#submit', $(this)).attr('disabled', false);
    } else {
      $('#submit', $(this)).attr('disabled', true);
    }
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
              min: 6,
              max: 64              
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
        password: {
          validators: {
            notEmpty: {
              message: 'Password is required.'
            },
            stringLength: {
              max: 64,
              min: 8
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
      // send ajax
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
      $.ajax({
        url: '/api/users', // url where to submit the request
        type: "POST", // type of action POST || GET
        contentType: "application/json", // data type
        data: JSON.stringify(data), // post data || get data
        success: function (result) {
          $('#create-user-success').modal('show');
        },
        error: function (xhr, resp, text) {
          console.log(xhr, resp, text);
          $('#create-user-error').modal('show');
        }
      });
    })
});

function closeModalSuccess() {
  $('#create-user-success').modal('hide');
  $(".modal-backdrop").remove();
  openPage('user/user.html');
}

function closeModalError() {
  $('#create-user-error').modal('hide');
  $(".modal-backdrop").remove();
  openPage('user/create_user.html');
}