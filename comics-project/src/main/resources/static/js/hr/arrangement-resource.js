$(document).ready(function () {
  var CURRENT_EMPLOYEE_ID = 0;
  var CURRENT_PROJECT_ID = 0;
  var STARTDATE = "1990-01-01";
  var ENDDATE = "2030-01-01";
  var CURRENT_TASK_ID = "";
  //Size of each sub group
  var SUB_GROUP_SIZE = 5;
  //Store term list from database
  var TERM_LIST = [];
  //Store all project 
  var groups = [];
  var projects = [];
  //Store filter project 
  var filterGroups = [];
  // Modal mode: create (1) and edit (0)
  var MODAL_MODE = 1;
  //Load right panel
  $(function () {
    getTreeData();
    // Load left panel
    getLeftData();
  });
  function getTreeData() {
    $.ajax({
      url: '/api/groupshr', // url where to submit the request
      type: "GET", // type of action POST || GET
      contentType: "application/json", // data type
      success: function (data) {
        groups = [];
        data.forEach(function (group) {
          if (!groups[group.id]) {
            groups[group.id] = {};
            groups[group.id].id = group.id;
            groups[group.id].name = group.name;
            groups[group.id].projects = [];
          }
        });
        return $.ajax({
          url: '/api/projectshr', // url where to submit the request
          type: "GET", // type of action POST || GET
          contentType: "application/json", // data type
          success: function (data1) {
            projects = data1;
            data1.forEach(function (project) {
              groups[project.group.id].projects.push(project);
            });
            // Draw tree
            drawProject(groups);
          },
          error: function (xhr, resp, text) {
            console.log(xhr, resp, text);
            $('#cannot-load-data-error').modal('show');
          }
        });
      },
      error: function (xhr, resp, text) {
        console.log(xhr, resp, text);
        $('#cannot-load-data-error').modal('show');
      }
    });
  }
  //Add event for drop on project tree
  function addDropEventProjectTree() {
    $(".projects").droppable({
      drop: function (event, ui) {
        MODAL_MODE = 1;
        var tmp = ui.helper.children('tr');
        var tmp3 = $("#employee-code");
        var tmp4 = $("#project-id");
        // var tmp2 = $("#datatable2 tbody");
        //Get Id , Name, Effort
        // var htmlString = "<tr><td style=\"display:none;\">" + tmp.children('td')[0].innerHTML + "</td><td>" + tmp.children('td')[2].innerHTML + "</td><td>" + tmp.children('td')[5].innerHTML + "</td></tr>";
        // tmp2.append(htmlString);
        //Employee id : 622
        tmp3.text(tmp.children('td')[1].innerHTML);
        //Project Id : FD12
        tmp4.text(this.childNodes[1].textContent);
        this.classList.add("selected-project");
        CURRENT_EMPLOYEE_ID = parseInt(tmp.children('td')[0].innerHTML);
        CURRENT_PROJECT_ID = parseInt(this.childNodes[0].textContent);
        //Get list assigned
        var urlString = "/api/employees/assigned/";
        var urlString = urlString + CURRENT_EMPLOYEE_ID + "/" + CURRENT_PROJECT_ID;
        // Draw all task has been assigned to this employee
        $("#assigned-effort tbody tr").remove();
        $.ajax({
          url: urlString, // url where to submit the request
          type: "GET", // type of action POST || GET
          contentType: "application/json", // data type
          success: function (result) {
            result.forEach(function (f) {
              var tblRow = "<tr>";
              tblRow += "<td style=\"display:none;\">" + f.id + "</td>"
                + "<td>" + f.startDate + "</td>"
                + "<td>" + f.endDate + "</td>"
                + "<td>" + f.effort + "</td>"
                + "<td>" + f.effortType + "</td>";;
              projects.forEach(function (p) {
                if (p.id == f.projectId) {
                  tblRow += "<td>" + p.name + "</td>";
                }
              });
              tblRow += "</tr>"
              $(tblRow).appendTo("#assigned-effort tbody");
              // window.location.reload(false); 
            });
          },
          error: function (xhr, resp, text) {
            console.log(xhr, resp, text);
            $('#load-employee-task-error').modal('show');
          }
        });
        modal.showModal();
      }
    });
  }
  function addClickOnEmployeeInProjectNodeTreeEvent() {
    // Click action for delete employee from node
    $(".employee-project-node").on('click', function a() {
      clickOnEmployeeInProjectNodeTreeEvent(this);
    });
  }
  function clickOnEmployeeInProjectNodeTreeEvent(element) {
    //open edit task dialog
    modal.showModal();
    //Edit, create use same dialog
    MODAL_MODE = 0;
    element.parentElement.classList.add("selected-project");
    //Employee id : 622
    var tmp3 = $("#employee-code");
    //Project Id : FD12
    var tmp4 = $("#project-id");
    tmp3.text(element.innerText.split("|")[0]); //Ex: 101|MinhPv(90)
    tmp4.text(element.parentElement.childNodes[1].textContent);
    //Get employee id
    //Previous element is id
    var str = element.previousElementSibling.textContent;
    CURRENT_EMPLOYEE_ID = parseInt(str);
    CURRENT_PROJECT_ID = parseInt(element.parentElement.childNodes[0].textContent);
    // var obj = { employeeId: CURRENT_EMPLOYEE_ID, projectId: CURRENT_PROJECT_ID, assign: false };
    var urlString = "/api/employees/assigned/";
    var urlString = urlString + CURRENT_EMPLOYEE_ID + "/" + CURRENT_PROJECT_ID;
    // Draw all task has been assigned to this employee
    $("#assigned-effort tbody tr").remove();
    var flagGetFirstTask = true;
    $.ajax({
      url: urlString, // url where to submit the request
      type: "GET", // type of action POST || GET
      contentType: "application/json", // data type
      success: function (result) {
        result.forEach(function (f) {
          var tblRow = "<tr>";
          tblRow += "<td style=\"display:none;\">" + f.id + "</td>"
            + "<td>" + f.startDate + "</td>"
            + "<td>" + f.endDate + "</td>"
            + "<td>" + f.effort + "</td>"
            + "<td>" + f.effortType + "</td>";
          projects.forEach(function (p) {
            if (p.id == f.projectId) {
              tblRow += "<td>" + p.name + "</td>";
            }
          });
          tblRow += "</tr>"
          $(tblRow).appendTo("#assigned-effort tbody");
          // add event click on row to select task
          $("#assigned-effort tr").not('thead tr').on('click', function () {
            CURRENT_TASK_ID = parseInt(this.children[0].innerHTML);
            $("#startDate_modal").val(this.children[1].innerHTML);
            $("#endDate_modal").val(this.children[2].innerHTML);
            $("#effort").val(this.children[3].innerHTML);
            $("#effort-type").val(this.children[4].innerHTML);
            document.getElementById("modal-ok").disabled = false;
            // add class to css
            $(".selected-task").removeClass("selected-task");
            this.classList.add("selected-task");
          });
          if (flagGetFirstTask) {
            // click on one task as default
            $("#assigned-effort tr").not('thead tr')[0].click();
            flagGetFirstTask = false;
          }
          //Validate to active button submit
          $("#form").data('bootstrapValidator').resetForm();
          $("#form").data('bootstrapValidator').validate();
          // window.location.reload(false); 
        });
      },
      error: function (xhr, resp, text) {
        console.log(xhr, resp, text);
        $('#load-employee-task-error').modal('show');
      }
    });
  }
  //Add function toggle group
  function addGroupToggle() {
    var groups = $('.groups');
    var currentGroup;
    for (i = 0; i < groups.length; i++) {
      currentGroup = groups.eq(i);
      var createClickHandler = function (element) {
        return function () {
          // element.closest('li').find('ul').slideToggle();
          element.siblings().slideToggle("fast");
        };
      };
      currentGroup.click(createClickHandler(currentGroup));
    };
  };
  // Add term option
  $(function () {
    var url = "/api/termshr";
    $.getJSON(url, function (data) {
      TERM_LIST = data;
      data.forEach(function (f) {
        var tblRow = "<option value=\"" + f.id + "\">" + f.name + "</option>";
        $(tblRow).appendTo("#term-select");
      });
    });
  });
  function getLeftDataWithDateOption() {
    //clear data table
    $("#datatable tbody tr").remove();
    // send ajax
    var startDate = $('input[name="startDate"]').val();
    var endDate = $('input[name="endDate"]').val();
    if (!startDate) { startDate = STARTDATE; document.getElementsByName("startDate")[0].value = startDate }
    else { STARTDATE = startDate };
    if (!endDate) { endDate = ENDDATE; document.getElementsByName("endDate")[0].value = endDate }
    else { ENDDATE = endDate };
    var obj = { startDate: startDate, endDate: endDate };
    $.ajax({
      url: '/api/employees/searchdate', // url where to submit the request
      type: "PUT", // type of action POST || GET
      contentType: "application/json", // data type
      data: JSON.stringify(obj), // post data || get data
      success: function (result) {
        result.forEach(function (f) {
          var tblRow = "<tr class=\"row2\">";
          tblRow += "<td class=\"p\" style=\"display:none;\">" + f.employeeId + "</td>"
            + "<td>" + f.employeeCode + "</td>"
            + "<td>" + f.employeeName + "</td>"
            + "<td>" + f.resourceType + "</td>"
            + "<td>" + f.effort + "%</td>"
            + "</tr>"
          $(tblRow).appendTo("#datatable tbody");
          $("#datatable tr").draggable({
            zIndex: 100,
            helper: function () {
              var selected = $(this);
              var container = $('<div/>').attr('id', 'draggingContainer');
              container.append(selected.clone());
              return container;
            }
          });
        });
      },
      error: function (xhr, resp, text) {
        console.log(xhr, resp, text);
        $('#cannot-load-data-error').modal('show');
      }
    });
  };
  function getLeftDataWithTermOption() {
    //clear data table
    $("#datatable tbody tr").remove();
    // send ajax
    var startDate = TERM_LIST.find(x => x.id == $('#term-select').val()).startDate;
    var endDate = TERM_LIST.find(x => x.id == $('#term-select').val()).endDate;
    var obj = { startDate: startDate, endDate: endDate };
    $.ajax({
      url: '/api/employees/searchdate', // url where to submit the request
      type: "PUT", // type of action POST || GET
      contentType: "application/json", // data type
      data: JSON.stringify(obj), // post data || get data
      success: function (result) {
        result.forEach(function (f) {
          var tblRow = "<tr class=\"row2\">";
          tblRow += "<td class=\"p\" style=\"display:none;\">" + f.employeeId + "</td>"
            + "<td>" + f.employeeCode + "</td>"
            + "<td>" + f.employeeName + "</td>"
            + "<td>" + f.resourceType + "</td>"
            + "<td>" + f.effort + "%</td>"
            + "</tr>"
          $(tblRow).appendTo("#datatable tbody");
          $("#datatable tr").draggable({
            zIndex: 100,
            helper: function () {
              var selected = $(this);
              var container = $('<div/>').attr('id', 'draggingContainer');
              container.append(selected.clone());
              return container;
            }
          });
        });
      },
      error: function (xhr, resp, text) {
        console.log(xhr, resp, text);
        $('#cannot-load-data-error').modal('show');
      }
    });
  };
  function getLeftDataWithMonthOption() {
    //clear data table
    $("#datatable tbody tr").remove();
    // send ajax
    var month = $('#month-select').val();
    var date = new Date(month);
    var startDate = new Date(date.getFullYear(), date.getMonth(), 1);
    startDate = moment(new Date(startDate)).format('YYYY-MM-DD');
    var endDate = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    endDate = moment(new Date(endDate)).format('YYYY-MM-DD');
    var obj = { startDate: startDate, endDate: endDate };
    $.ajax({
      url: '/api/employees/searchdate', // url where to submit the request
      type: "PUT", // type of action POST || GET
      contentType: "application/json", // data type
      data: JSON.stringify(obj), // post data || get data
      success: function (result) {
        result.forEach(function (f) {
          var tblRow = "<tr class=\"row2\">";
          tblRow += "<td class=\"p\" style=\"display:none;\">" + f.employeeId + "</td>"
            + "<td>" + f.employeeCode + "</td>"
            + "<td>" + f.employeeName + "</td>"
            + "<td>" + f.resourceType + "</td>"
            + "<td>" + f.effort + "%</td>"
            + "</tr>"
          $(tblRow).appendTo("#datatable tbody");
          $("#datatable tr").draggable({
            zIndex: 100,
            helper: function () {
              var selected = $(this);
              var container = $('<div/>').attr('id', 'draggingContainer');
              container.append(selected.clone());
              return container;
            }
          });
        });
      },
      error: function (xhr, resp, text) {
        console.log(xhr, resp, text);
        $('#cannot-load-data-error').modal('show');
      }
    });
  };
  function getLeftDataWithNameOption() {
    //clear data table
    $("#datatable tbody tr").remove();
    var searchString = $('#filter_text').val();
    searchString = '/api/employees/search/' + searchString;
    // send ajax
    $.ajax({
      url: searchString, // url where to submit the request
      type: "GET", // type of action POST || GET
      contentType: "application/json", // data type
      success: function (result) {
        result.forEach(function (f) {
          var tblRow = "<tr class=\"row2\">";
          //search employee (use search in management screen)
          if (f.employeeId == null) { f.employeeId = f.id; }
          if (f.effort == null) { f.effort = "..."; }
          if (f.employeeName == null) { f.employeeName = f.name; }
          //Generate table
          tblRow += "<td class=\"p\" style=\"display:none;\">" + f.employeeId + "</td>"
            + "<td>" + f.employeeCode + "</td>"
            + "<td>" + f.employeeName + "</td>"
            + "<td>" + f.resourceType + "</td>"
            + "<td>" + f.effort + "%</td>"
            + "</tr>"
          $(tblRow).appendTo("#datatable tbody");
          //Add Drag row event
          $("#datatable tr").draggable({
            zIndex: 100,
            helper: function () {
              var selected = $(this);
              var container = $('<div/>').attr('id', 'draggingContainer');
              container.append(selected.clone());
              return container;
            }
          });
        });
      },
      error: function (xhr, resp, text) {
        console.log(xhr, resp, text);
        $('#cannot-load-data-error').modal('show');
      }
    });
  };
  function getLeftData() {
    if ($('#find-select').val() == "by-name") { getLeftDataWithNameOption(); }
    else if ($('#find-select').val() == "by-date") { getLeftDataWithDateOption() }
    else if ($('#find-select').val() == "by-term") { getLeftDataWithTermOption() }
    else if ($('#find-select').val() == "by-month") { getLeftDataWithMonthOption() };
  }
  function drawProject(groups) {
    $("#root li").remove();
    groups.forEach(function (group) {
      if (group) {
        var tblRow;
        tblRow = "<li><a class=\"groups\">" + group.name + "</a>";
        if (group.projects.length > 0) {
          //draw line connect group
          tblRow = tblRow + "<ul class=\"groupstogle\">";
          //count: cut big group to subgroup
          var count = 0;
          group.projects.forEach(function (project) {
            if (count % SUB_GROUP_SIZE == 0) {
              var subGroupName = "SG" + Math.floor(count / SUB_GROUP_SIZE);
              tblRow = tblRow + "<li><a class=\"groups subgroup\">" + subGroupName;
              tblRow = tblRow + "</a><ul class=\"groupstogle subgroupstogle\">";
            }
            tblRow = tblRow + "<li><a class=\"projects\">"
              + "<p style=\"display: none;\">" + project.id + "</p>"
              + "<p>" + project.name + "(" + project.shortName + ")</p>"
              + "<p>Total resource: " + project.totalResource + "(mm)</p>"
              + "<p>Spent effort: " + project.spentEffort + "(mm)</p>"
              + "<p>Remaining effort: " + project.remainingEffort + "(mm)</p>"
              + "<p>Budget: " + project.budget + "(mm)</p>"
              + "<p>" + project.startDate + "</p>"
              + "<p>" + project.endDate + "</p>";
            $.ajax({
              async: false,
              url: '/api/projectshr/searchdate/' + project.id, // url where to submit the request
              type: "GET", // type of action POST || GET
              contentType: "application/json", // data type
              success: function (result) {
                result.forEach(function (employee) {
                  tblRow += "<p style=\"display: none;\">" + employee.employeeId + "</p>"
                  tblRow += "<p class=\"employee-project-node\">" + employee.employeeCode + "|" + employee.employeeName + "(" + employee.effort + ")</p>";
                });
              },
              error: function (xhr, resp, text) {
                console.log(xhr, resp, text);
                $('#load-employee-task-error').modal('show');
              }
            });
            tblRow = tblRow + "</a>";
            tblRow = tblRow + "</li>";
            if (count % SUB_GROUP_SIZE == (SUB_GROUP_SIZE - 1)) {
              tblRow = tblRow + "</ul>";
              tblRow = tblRow + "</li>";
            }
            count++;
          });
          tblRow = tblRow + "</ul>";  //close groupstogle
          tblRow = tblRow + "</li>";  //close group li          
        }
        $(tblRow).appendTo("#root");
        var groupHasProject = $("li").has("ul");
        var i;
        for (i = 0; i < groupHasProject.length; i++) {
          // Only group has project highlight
          if (groupHasProject[i].getElementsByClassName('projects').length != 0) {
            groupHasProject[i].getElementsByTagName("a")[0].setAttribute("style", "background-color: #808080;");
          }
        }
      }
    });
    addDropEventProjectTree();
    addClickOnEmployeeInProjectNodeTreeEvent();
    addGroupToggle();
    $('.subgroupstogle').hide();
  }
  $("#filter").click(function () {
    getLeftData();
    reDrawWithFindOption();
  });
  function reDrawWithFindOption() {
    $.when(getTreeData()).done(function (a1) {
      if ($('#find-select').val() == "by-term") {
        filterGroupByTerm();
        drawProject(filterGroups);
      }
      if ($('#find-select').val() == "by-date") {
        filterGroupByDate();
        drawProject(filterGroups);
      }
      if ($('#find-select').val() == "by-name") {
        drawProject(groups);
      }
      if ($('#find-select').val() == "by-month") {
        filterGroupByMonth();
        drawProject(filterGroups);
      }
    });
  }
  //Filter right panel by term
  function filterGroupByTerm() {
    filterGroups = JSON.parse(JSON.stringify(groups));
    groups.forEach(function (group) {
      filterGroups[group.id].projects = [];
      if (group) {
        group.projects.forEach(function (project) {
          if (project.term.id == $('#term-select').val()) {
            filterGroups[group.id].projects.push(project);
          }
        });
      }
    });
  }
  //Filter right panel by date
  function filterGroupByDate() {
    filterGroups = JSON.parse(JSON.stringify(groups));
    groups.forEach(function (group) {
      filterGroups[group.id].projects = [];
      if (group) {
        group.projects.forEach(function (project) {
          var startDate = $('input[name="startDate"]').val();
          var endDate = $('input[name="endDate"]').val();
          var projectStartDate = new moment(project.startDate, 'YYYY-MM-DD', true);
          var projectEndDate = new moment(project.endDate, 'YYYY-MM-DD', true);
          if (((projectStartDate.isAfter(startDate) || projectStartDate.isSame(startDate, 'date')) && (projectStartDate.isBefore(endDate) || projectStartDate.isSame(endDate, 'date')))
            || ((projectEndDate.isAfter(startDate) || projectEndDate.isSame(startDate, 'date')) && (projectEndDate.isBefore(endDate) || projectEndDate.isSame(endDate, 'date')))
            || ((projectStartDate.isBefore(startDate) || projectStartDate.isSame(startDate, 'date')) && (projectEndDate.isAfter(endDate) || projectStartDate.isSame(endDate, 'date')))) {
            filterGroups[group.id].projects.push(project);
          }
        });
      }
    });
  }
  function filterGroupByMonth() {
    filterGroups = JSON.parse(JSON.stringify(groups));
    groups.forEach(function (group) {
      filterGroups[group.id].projects = [];
      if (group) {
        group.projects.forEach(function (project) {
          var month = $('#month-select').val();
          var date = new Date(month);
          var startDate = new Date(date.getFullYear(), date.getMonth(), 1);
          startDate = moment(new Date(startDate)).format('YYYY-MM-DD');
          var endDate = new Date(date.getFullYear(), date.getMonth() + 1, 0);
          endDate = moment(new Date(endDate)).format('YYYY-MM-DD');
          var projectStartDate = new moment(project.startDate, 'YYYY-MM-DD', true);
          var projectEndDate = new moment(project.endDate, 'YYYY-MM-DD', true);
          if (((projectStartDate.isAfter(startDate) || projectStartDate.isSame(startDate, 'date')) && (projectStartDate.isBefore(endDate) || projectStartDate.isSame(endDate, 'date')))
            || ((projectEndDate.isAfter(startDate) || projectEndDate.isSame(startDate, 'date')) && (projectEndDate.isBefore(endDate) || projectEndDate.isSame(endDate, 'date')))
            || ((projectStartDate.isBefore(startDate) || projectStartDate.isSame(startDate, 'date')) && (projectEndDate.isAfter(endDate) || projectStartDate.isSame(endDate, 'date')))) {
            filterGroups[group.id].projects.push(project);
          }
        });
      }
    });
  }
  $('#find-select').change(function () {
    $('.find-option').hide();
    $('#' + $(this).val()).show();
  });
  function checkValidTaskInfor() {
    var result = true;
    if (document.getElementsByName("startDate_modal")[0].value == "") result = false;
    if (document.getElementsByName("endDate_modal")[0].value == "") result = false;
    if (document.getElementsByName("effort")[0].value == "") result = false;
    if ($("#form").data('bootstrapValidator').isValid() == false) result = false;
    return result;
  }
  function resetForm() {
    document.getElementsByName("startDate_modal")[0].value = "";
    document.getElementsByName("endDate_modal")[0].value = "";
    document.getElementsByName("effort")[0].value = "";
    document.getElementById("modal-ok").disabled = true;
  }
  $("#form").submit(function (event) {
    return false;
  });
  $('#form').on('status.field.bv', function (e, data) {
    if (checkValidTaskInfor()) {
      document.getElementById("modal-ok").disabled = false;
    } else {
      document.getElementById("modal-ok").disabled = true;
    }
  });
  $('#form').bootstrapValidator({
    // To use feedback icons, ensure that you use Bootstrap v3.1.0 or later
    fields: {
      startDate_modal: {
        validators: {
          notEmpty: {
            message: 'Start date is required.'
          }
        }
      },
      endDate_modal: {
        validators: {
          notEmpty: {
            message: 'End date is required.'
          },
          callback: {
            message: 'End date cannot before today and after start date',
            callback: function (value, validator) {
              var m = new moment(value, 'YYYY-MM-DD', true);
              var currentMoment = moment();
              var startDate = new moment(document.getElementsByName("startDate_modal")[0].value, 'YYYY-MM-DD', true);
              return ((m.isAfter(currentMoment) || m.isSame(currentMoment, 'date')) && (m.isAfter(startDate) || m.isSame(startDate, 'date')));
            }
          }
        }
      },
      effort: {
        validators: {
          notEmpty: {
            message: 'Effort is required.'
          },
          callback: {
            message: 'Effort percent must between 0%, 100%',
            callback: function (value, validator) {
              return (value >= 0 && value <= 100);
            }
          }
        }
      }
    }
  })
  //-----------------------------------
  // Declare Variables
  //-----------------------------------
  // Modal
  var modal = document.getElementById('modal');
  var modalClose = document.getElementById('modal-close');
  var modalOK = document.getElementById('modal-ok');
  //-----------------------------------
  // Button Actions
  //-----------------------------------
  // close modal on click
  modalClose.addEventListener('click', function () {
    resetForm();
    $("#form").data('bootstrapValidator').resetForm();
    modal.close();
    //Delete class selected-project after update employee info in project
    $(".selected-project").removeClass("selected-project");
  });
  // This function only update one project
  function reloadProjectInfor() {
    // selected-project mark selected project node
    var element = $(".selected-project")[0];
    // employee infor start at 9 <p> tag
    while (element.children.length > 0) {
      element.removeChild(element.lastChild);
    }
    var tblRow = "";
    $.ajax({
      url: '/api/projectshr/' + CURRENT_PROJECT_ID, // url where to submit the request
      type: "GET", // type of action POST || GET
      contentType: "application/json", // data type
      success: function (project) {
        tblRow += "<p style=\"display: none;\">" + project.id + "</p>"
          + "<p>" + project.name + "(" + project.shortName + ")</p>"
          + "<p>Total resource: " + project.totalResource + "(mm)</p>"
          + "<p>Spent effort: " + project.spentEffort + "(mm)</p>"
          + "<p>Remaining effort: " + project.remainingEffort + "(mm)</p>"
          + "<p>Budget: " + project.budget + "(mm)</p>"
          + "<p>" + project.startDate + "</p>"
          + "<p>" + project.endDate + "</p>";
        $.ajax({
          url: '/api/projectshr/searchdate/' + CURRENT_PROJECT_ID, // url where to submit the request
          type: "GET", // type of action POST || GET
          contentType: "application/json", // data type
          success: function (result) {
            result.forEach(function (employee) {
              tblRow += "<p style=\"display: none;\">" + employee.employeeId + "</p>"
              tblRow += "<p class=\"employee-project-node\">" + employee.employeeCode + "|" + employee.employeeName + "(" + employee.effort + ")</p>";
            });
            $(tblRow).appendTo(element);
            // var employeeList = element.getElementsByClassName("employee-project-node");
            // for (let employee of employeeList) {
            //   employee.click(function(){clickOnEmployeeInProjectNodeTreeEvent(employee);});
            //   // employee.click(function(){alert('aaa')});
            // }
            addClickOnEmployeeInProjectNodeTreeEvent();
            //Delete class selected-project after update employee info in project
            $(".selected-project").removeClass("selected-project");
          },
          error: function (xhr, resp, text) {
            console.log(xhr, resp, text);
            $('#load-employee-task-error').modal('show');
          }
        });
      },
      error: function (xhr, resp, text) {
        console.log(xhr, resp, text);
        $('#cannot-load-data-error').modal('show');
      }
    });
  }
  modalOK.addEventListener('click', function () {
    if (checkValidTaskInfor()) {
      var projectId = CURRENT_PROJECT_ID;
      var employeeId = CURRENT_EMPLOYEE_ID;
      var effort = parseInt($('input[name="effort"]').val());
      var effortType = $('#effort-type').val();
      var startDate = $('input[name="startDate_modal"]').val();
      var endDate = $('input[name="endDate_modal"]').val();
      var assign = true;
      // if create new task
      if (MODAL_MODE) {
        var obj = { projectId: projectId, employeeId: employeeId, effort: effort, effortType: effortType, startDate: startDate, endDate: endDate, assign: assign };
        $.ajax({
          url: '/api/projectshr/assign', // url where to submit the request
          type: "POST", // type of action POST || GET
          contentType: "application/json", // data type
          data: JSON.stringify(obj), // post data || get data
          success: function (result) {
            if (result == "") {
              $('#create-task-error').modal('show');
            } else {
              resetForm();
            }
            getLeftData();
            reloadProjectInfor();
          },
          error: function (xhr, resp, text) {
            console.log(xhr, resp, text);
            $('#assign-task-error').modal('show');
          }
        });
      } else {
        var obj = { id: CURRENT_TASK_ID, projectId: projectId, employeeId: employeeId, effort: effort, effortType: effortType, startDate: startDate, endDate: endDate, assign: assign };
        $.ajax({
          url: '/api/projectshr/assign', // url where to submit the request
          type: "PUT", // type of action POST || GET
          contentType: "application/json", // data type
          data: JSON.stringify(obj), // post data || get data
          success: function (result) {
            if (result == "") {
              $('#edit-task-error').modal('show');
            } else {
              resetForm();
            }
            getLeftData();
            reloadProjectInfor();
          },
          error: function (xhr, resp, text) {
            console.log(xhr, resp, text);
            $('#assign-task-error').modal('show');
          }
        });
      }
    }
    modal.close();
  });
});
function closeModalCreateError() {
  $('#create-task-error').modal('hide');
  $(".modal-backdrop").remove();
  modal.showModal();
}
function closeModalEditError() {
  $('#edit-task-error').modal('hide');
  $(".modal-backdrop").remove();
  modal.showModal();
}
function closeModalAssignError() {
  $('#assign-task-error').modal('hide');
  $(".modal-backdrop").remove();
  modal.showModal();
}
function closeModalLoadDataError() {
  $('#cannot-load-data-error').modal('hide');
  $(".modal-backdrop").remove();
}
function closeLoadEmployeeTaskError() {
  $('#load-employee-task-error').modal('hide');
  $(".modal-backdrop").remove();
}
