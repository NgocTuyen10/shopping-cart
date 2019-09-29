//Get URL param to find project id
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
    //Load group option
    var groupUrl = "/api/groupshr";
    // send ajax
    $.ajax({
      url: groupUrl, // url where to submit the request
      type: "GET", // type of action POST || GET
      contentType: "application/json", // data type
      success: function (data) {
        data.forEach(function (f) {
          var tblRow = "<option value=\"" + f.id + "\">" + f.name + "</option>";
          $(tblRow).appendTo("#group select");          
        });
        $("#group select").val(project.group.id);
      }
    });
    //Load term option
    var termUrl = "/api/termshr";
    // send ajax
    $.ajax({
      url: termUrl, // url where to submit the request
      type: "GET", // type of action POST || GET
      contentType: "application/json", // data type
      success: function (data) {
        data.forEach(function (f) {
          var tblRow = "<option value=\"" + f.id + "\">" + f.name + "</option>";
          $(tblRow).appendTo("#term select");          
        });
        $("#term select").val(project.term.id);
      }
    });
    //Load rank option
    var rankUrl = "/api/rankshr";
    $.ajax({
      url: rankUrl, // url where to submit the request
      type: "GET", // type of action POST || GET
      contentType: "application/json", // data type
      success: function (data) {
        data.forEach(function (f) {
          var tblRow = "<option value=\"" + f.id + "\">" + f.name + "</option>";
          $(tblRow).appendTo("#rank select");          
        });
        $("#rank select").val(project.rank.id);
      }
    });
    // Load leader
    var leaderUrl = "/api/employees";
    $.ajax({
      url: leaderUrl, // url where to submit the request
      type: "GET", // type of action POST || GET
      contentType: "application/json", // data type
      success: function (data) {
        data.forEach(function (f) {
          var tblRow = "<option value=\"" + f.id + "\">" + f.name + "(" + f.employeeCode + ")</option>";
          $(tblRow).appendTo("#leader select");          
        });
        $("#leader select").val(project.leader.id);
      }
    });
    //Load project information
    document.getElementsByName("projectId")[0].value = project.projectId;
    document.getElementsByName("name")[0].value = project.name;
    document.getElementsByName("shortName")[0].value = project.shortName;
    document.getElementsByName("budget")[0].value = project.budget;
    document.getElementsByName("startDate")[0].value = project.startDate;
    document.getElementsByName("endDate")[0].value = project.endDate;
  });
  // click on button submit
  $("#submit").on('click', function () {
  });
  //click cancel button
  $("#cancel").on('click', function () {
    openPage('hr/project.html')
  });
  // $('#form').on('status.field.bv', function (e, data) {
  //   formIsValid = true;
  //   $('.form-group', $(this)).each(function () {
  //     formIsValid = formIsValid && $(this).hasClass('has-success');
  //     
  //   });
  //   if (formIsValid) {
  //     $('#submit', $(this)).attr('disabled', false);
  //   } else {
  //     $('#submit', $(this)).attr('disabled', true);
  //   }
  // });
  //Validate form
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
          // stringLength: {
          //   min: 2,
          //   max: 40
          // },
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
            max: 1000000,
            message: 'The budget must be between 0 and 1000000'
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
      //var id = getUrlParameter('id');
      var id = window.project.id;
      var editUrl = "/api/projectshr/" + id;
      var data = getFormData($("form"));
      data.group = { id: data.group };
      data.rank = { id: data.rank };
      data.term = { id: data.term };
      data.leader = { id: data.leader };
      // send ajax
      $.ajax({
        url: editUrl, // url where to submit the request
        type: "PUT", // type of action POST || GET
        contentType: "application/json", // data type
        data: JSON.stringify(data), // post data || get data
        success: function (result) {
          $('#edit-project-success').modal('show');
        },
        error: function (xhr, resp, text) {
          console.log(xhr, resp, text);
          $('#edit-project-error').modal('show');
        }
      });
    });
});

function closeModalSuccess() {
  $('#edit-project-success').modal('hide');
  $(".modal-backdrop").remove();
  openPage('hr/project.html');
}

function closeModalError() {
  $('#edit-project-error').modal('hide');
  $(".modal-backdrop").remove();
  openPage('hr/project.html');
}