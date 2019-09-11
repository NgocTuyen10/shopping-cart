$(document).ready(function() {

	$("#submit").on('click', function() {
	});
	$("#form").submit(function(event) {
		return false;
	});

	$('#form').on('status.field.bv', function(e, data) {
		formIsValid = true;
		$('.form-group', $(this)).each(function() {

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
	      hoTen: {
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
		 email: { validators: { notEmpty: { message: 'Email is required.' },
		 regexp: { regexp: /^[_A-Za-z0-9-\.]+@[_A-Za-z0-9-\-]+(\.[_A-Za-z0-9-\\]+){1,2}/i,
		 message: 'Please supply a valid email address' } } },
	    },
	    diaChi: {
	        validators: {
	          stringLength: {
	            max: 100
	          },
	          notEmpty: {
	            message: 'Address is required.'
	          },
	          regexp: {
	            regexp: /^[AĂÂÁẮẤÀẰẦẢẲẨÃẴẪẠẶẬĐEÊÉẾÈỀẺỂẼỄẸỆIÍÌỈĨỊOÔƠÓỐỚÒỒỜỎỔỞÕỖỠỌỘỢUƯÚỨÙỪỦỬŨỮỤỰYÝỲỶỸỴAĂÂÁẮẤÀẰẦẢẲẨÃẴẪẠẶẬĐEÊÉẾÈỀẺỂẼỄẸỆIÍÌỈĨỊOÔƠÓỐỚÒỒỜỎỔỞÕỖỠỌỘỢUƯÚỨÙỪỦỬŨỮỤỰYÝỲỶỸỴAĂÂÁẮẤÀẰẦẢẲẨÃẴẪẠẶẬĐEÊÉẾÈỀẺỂẼỄẸỆIÍÌỈĨỊOÔƠÓỐỚÒỒỜỎỔỞÕỖỠỌỘỢUƯÚỨÙỪỦỬŨỮỤỰYÝỲỶỸỴAĂÂÁẮẤÀẰẦẢẲẨÃẴẪẠẶẬĐEÊÉẾÈỀẺỂẼỄẸỆIÍÌỈĨỊOÔƠÓỐỚÒỒỜỎỔỞÕỖỠỌỘỢUƯÚỨÙỪỦỬŨỮỤỰYÝỲỶỸỴAĂÂÁẮẤÀẰẦẢẲẨÃẴẪẠẶẬĐEÊÉẾÈỀẺỂẼỄẸỆIÍÌỈĨỊOÔƠÓỐỚÒỒỜỎỔỞÕỖỠỌỘỢUƯÚỨÙỪỦỬŨỮỤỰYÝỲỶỸỴAĂÂÁẮẤÀẰẦẢẲẨÃẴẪẠẶẬĐEÊÉẾÈỀẺỂẼỄẸỆIÍÌỈĨỊOÔƠÓỐỚÒỒỜỎỔỞÕỖỠỌỘỢUƯÚỨÙỪỦỬŨỮỤỰYÝỲỶỸỴA-Zaăâáắấàằầảẳẩãẵẫạặậđeêéếèềẻểẽễẹệiíìỉĩịoôơóốớòồờỏổởõỗỡọộợuưúứùừủửũữụựyýỳỷỹỵaăâáắấàằầảẳẩãẵẫạặậđeêéếèềẻểẽễẹệiíìỉĩịoôơóốớòồờỏổởõỗỡọộợuưúứùừủửũữụựyýỳỷỹỵaăâáắấàằầảẳẩãẵẫạặậđeêéếèềẻểẽễẹệiíìỉĩịoôơóốớòồờỏổởõỗỡọộợuưúứùừủửũữụựyýỳỷỹỵaăâáắấàằầảẳẩãẵẫạặậđeêéếèềẻểẽễẹệiíìỉĩịoôơóốớòồờỏổởõỗỡọộợuưúứùừủửũữụựyýỳỷỹỵaăâáắấàằầảẳẩãẵẫạặậđeêéếèềẻểẽễẹệiíìỉĩịoôơóốớòồờỏổởõỗỡọộợuưúứùừủửũữụựyýỳỷỹỵaăâáắấàằầảẳẩãẵẫạặậđeêéếèềẻểẽễẹệiíìỉĩịoôơóốớòồờỏổởõỗỡọộợuưúứùừủửũữụựyýỳỷỹỵa-z ]+$/i,
	            message: 'The name can consist of alphabetical, Vietnamese characters and spaces only'
	          }
	        }
	      }
	  }).on('success.form.bv', function (e) {
	      // // Prevent form submission
	      // e.preventDefault();
	      // send ajax
	      var data = getFormData($("form"));
	      /*data.trangThai = true;*/
	      console.log(data);
	      /*data.grade = { id: data.grade };*/
	      $.ajax({
	        url: '/khach-hang/', // url where to submit the request
	        type: "POST", // type of action POST || GET
	        contentType: "application/json", // data type
	        data: JSON.stringify(data), // post data || get data
	        success: function (result) {
	          
	        },
	        error: function (xhr, resp, text) {
	          
	        }
	      });
	    })
	
});