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
  // click on button submit
  $("#submit").on('click', function () {
  });
  //click cancel button
  $("#cancel").on('click', function () {
    openPage("user/user.html");
  });
  $('#form').bootstrapValidator({
    // To use feedback icons, ensure that you use Bootstrap v3.1.0 or later
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    fields: {
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
      confirmpassword: {
        validators: {
          notEmpty: {
            message: 'Confirm password is required.'
          },
          callback: {
            message: 'Confirm password not match password',
            callback: function (value, validator) {
              var password = $('input[name="password"]').val();
              return (value == password);
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
      var resetPasswordUrl = "/api/users/resetpassword/" + id;
      var data = getFormData($("form"));
      // send ajax
      $.ajax({
        url: resetPasswordUrl, // url where to submit the request
        type: "PUT", // type of action POST || GET
        contentType: "application/json", // data type
        data: JSON.stringify(data), // post data || get data
        success: function (result) {
          $('#resetpassword-success').modal('show');
        },
        error: function (xhr, resp, text) {
          console.log(xhr, resp, text);
          $('#resetpassword-error').modal('show');          
        }
      });
    });
});

function closeModalSuccess() {
  $('#resetpassword-success').modal('hide');
  $(".modal-backdrop").remove();
  openPage('user/user.html');
}

function closeModalError() {
  $('#resetpassword-error').modal('hide');
  $(".modal-backdrop").remove();
  openPage('user/resetpassword.html');
}