function getFormData($form) {
    var unindexed_array = $form.serializeArray();
    var indexed_array = {};
    $.map(unindexed_array, function (n, i) {
      indexed_array[n['name']] = n['value'];
    });
    return indexed_array;
  }
  $(document).ready(function () {
    
    $("#submit").on('click', function () {
    });
    
    $("#cancel").on('click', function () {
      // window.open("/employee", "_self");
      openPage("nha_xuat_ban/nha_xuat_ban.html");
    });
    
    $("#form").submit(function (event) {
      return false;
    });
    
    // form submit status
   
    $('#form').on('status.field.bv', function (e, data) { formIsValid = true;
    $('.form-group', $(this)).each(function () {
    
    if (!($(this).hasClass('skip-validate'))){ formIsValid = formIsValid &&
    $(this).hasClass('has-success'); } }); if (formIsValid) { $('#submit',
    $(this)).attr('disabled', false); } else { $('#submit',
    $(this)).attr('disabled', true); } });
       
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
        // send ajax
        var data = getFormData($("form"));
        console.log(data);
        /*data.grade = { id: data.grade };*/
        $.ajax({
          url: '/comics/management/nha-xuat-ban', // url where to submit the request
          type: "POST", // type of action POST || GET
          contentType: "application/json", // data type
          data: JSON.stringify(data), // post data || get data
          success: function (result) {
            $('#create-nha-xuat-ban-success').modal('show');
          },
          error: function (xhr, resp, text) {
            console.log(xhr, resp, text);
            $('#create-nha-xuat-ban-error').modal('show');
          }
        });
      })
  });
  
  function closeModalSuccess() {
    $('#create-nha-xuat-ban-success').modal('hide');
    $(".modal-backdrop").remove();
    openPage('nha_xuat_ban/nha_xuat_ban.html');
  }
  
  function closeModalError() {
    $('#create-nha-xuat-ban-error').modal('hide');
    $(".modal-backdrop").remove();
    openPage('nha_xuat_ban/create_nha_xuat_ban.html');
  }