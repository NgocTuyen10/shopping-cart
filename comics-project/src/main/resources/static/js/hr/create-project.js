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
    var url = "/api/groupshr";
    $.getJSON(url, function (data) {
      data.forEach(function (f) {
        var tblRow = "<option value=\"" + f.id + "\">" + f.name + "</option>";
        $(tblRow).appendTo("#group select");
      });
    });
  });
  $(function () {
    var url = "/api/termshr";
    $.getJSON(url, function (data) {
      data.forEach(function (f) {
        var tblRow = "<option value=\"" + f.id + "\">" + f.name + "</option>";
        $(tblRow).appendTo("#term select");
      });
    });
  });
  $(function () {
    var url = "/api/rankshr";
    $.getJSON(url, function (data) {
      data.forEach(function (f) {
        var tblRow = "<option value=\"" + f.id + "\">" + f.name + "</option>";
        $(tblRow).appendTo("#rank select");
      });
    });
  });
  // Load leader
  $(function () {
    var url = "/api/employees";
    $.getJSON(url, function (data) {
      data.forEach(function (f) {
        var tblRow = "<option value=\"" + f.id + "\">" + f.name + "(" + f.employeeCode + ")</option>";
        $(tblRow).appendTo("#leader select");
      });
    });
  });
  // click on button submit
  $("#submit").on('click', function () {
  });
  $("#cancel").on('click', function () {
    openPage('hr/project.html');
  });
});
// Validate form
$(document).ready(function () {
  $("#form").submit(function (event) {
    return false;
  });
  //form submit status
  $('#form').on('status.field.bv', function (e, data) {
    formIsValid = true;
    $('.form-group', $(this)).each(function () {
      formIsValid = formIsValid && $(this).hasClass('has-success');
    });
    if (formIsValid) {
      $('#submit', $(this)).attr('disabled', false);
    } else {
      $('#submit', $(this)).attr('disabled', true);
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
      projectId: {
        validators: {
          // stringLength: {
          //   min: 1,
          //   max: 40
          // },
          // notEmpty: {
          //   message: 'Project id is required. '
          // },
          regexp: {
            regexp: /^[a-zA-Z0-9._-]+$/i,
            message: 'The project id can consist of alphabetical , "._-" and number only'
          }
        }
      },
      name: {
        validators: {
          // stringLength: {
          //   min: 2,
          //   max: 40
          // },
          notEmpty: {
            message: 'Project name is required.'
          },
          regexp: {
            regexp: /^[ \(\)a-zA-Z0-9._-]+$/i,
            message: 'The project name can consist of alphabetical, number, "._-()" and space only'
          }
        }
      },
      shortName: {
        validators: {
          stringLength: {
            min: 2,
            max: 40
          },
          notEmpty: {
            message: 'Short name is required.'
          },
          regexp: {
            regexp: /^[ \(\)a-zA-Z0-9._-]+$/i,
            message: 'The project short name code can consist of alphabetical, number, "._-()" and space only'
          }
        }
      },
      group: {
        validators: {
          notEmpty: {
            message: 'Group is required.'
          }
        }
      },
      term: {
        validators: {
          notEmpty: {
            message: 'Term is required.'
          }
        }
      },
      rank: {
        validators: {
          notEmpty: {
            message: 'Rank is required.'
          }
        }
      },
      leader: {
        validators: {
          notEmpty: {
            message: 'Leader is required.'
          }
        }
      },
      budget: {
        validators: {
          between: {
            min: 0,
            max: 1000000000000,
            message: 'The budget must be between 0 and 1000000000000'
          },
          notEmpty: {
            message: 'Budget is required.'
          }
        }
      },
      startDate: {
        validators: {
          date: {
            message: 'The date is not valid',
            format: 'YYYY/MM/DD'
          },
          notEmpty: {
            message: 'Start date is required.'
          },
          callback: {
            message: 'Start date must be later than 1900/01/01 date',
            callback: function (value, validator) {
              var startDate = "1900-01-01";
              var m = new moment(value, 'YYYY-MM-DD', true);
              if (!m.isValid()) {
                return false;
              }
              return m.isAfter(startDate);
            }
          }
        }
      },
      endDate: {
        validators: {
          date: {
            message: 'The date is not valid',
            format: 'YYYY/MM/DD'
          },
          notEmpty: {
            message: 'End date is required.'
          },
          callback: {
            message: 'End date must be later than start date',
            callback: function (value, validator) {
              var startDate = $('input[name="startDate"]').val();
              var m = new moment(value, 'YYYY-MM-DD', true);
              if (!m.isValid()) {
                return false;
              }
              return m.isAfter(startDate);
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
      data.group = { id: data.group };
      data.rank = { id: data.rank };
      data.term = { id: data.term };
      data.leader = { id: data.leader };
      $.ajax({
        url: '/api/projectshr', // url where to submit the request
        type: "POST", // type of action POST || GET
        contentType: "application/json", // data type
        data: JSON.stringify(data), // post data || get data
        success: function (result) {
          $('#create-project-success').modal('show');
        },
        error: function (xhr, resp, text) {
          console.log(xhr, resp, text);
          $('#create-project-error').modal('show');
        }
      });
    });
});

function closeModalSuccess() {
  $('#create-project-success').modal('hide');
  $(".modal-backdrop").remove();
  openPage('hr/project.html');
}

function closeModalError() {
  $('#create-project-error').modal('hide');
  $(".modal-backdrop").remove();
  openPage('hr/create_project.html');
}