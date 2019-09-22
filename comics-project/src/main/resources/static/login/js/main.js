(function($) {
	"use strict";

	/*
	 * ================================================================== [
	 * Focus input ]
	 */
	$('.input100').each(function() {
		$(this).on('blur', function() {
			if ($(this).val().trim() != "") {
				$(this).addClass('has-val');
			} else {
				$(this).removeClass('has-val');
			}
		})
	})

	/*
	 * ================================================================== [
	 * Validate ]
	 */
	var input = $('.validate-input .input100');

	$('.validate-form').on('submit', function() {
		var check = true;

		for (var i = 0; i < input.length; i++) {
			if (validate(input[i]) == false) {
				showValidate(input[i]);
				check = false;
			}
		}
		if (check == true) {
			var username = $('#username').val();
			var password = $('#password').val();
			var accountDTO = {
				"username" : username,
				"password" : password
			};
			console.log(JSON.stringify(accountDTO));
			$.ajax({
				url : '/comics/find-account', // url where to submit the
				type : "POST", // type of action POST || GET
				contentType : "application/json", // data type
				data : JSON.stringify(accountDTO), // post data || get
				success : function(result) {
					console.log("AAAAAAA");
					window.location.href = "/comics";
				},
				error : function(xhr, resp, text) {
					$('#username').val("");
					$('#password').val("");
					$('#login-error').modal('show');
				}
			});
		}
		event.preventDefault();
		return check;
	});

	$('.validate-form .input100').each(function() {
		$(this).focus(function() {
			hideValidate(this);
		});
	});

	function validate(input) {
		if ($(input).attr('name') == 'username') {
			if ($(input)
					.val()
					.trim()
					.match(
							/^(?=.{4,40}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/) == null) {
				return false;
			}
		} else {
			if ($(input).val().trim() == '') {
				return false;
			}
		}
	}

	function showValidate(input) {
		var thisAlert = $(input).parent();

		$(thisAlert).addClass('alert-validate');
	}

	function hideValidate(input) {
		var thisAlert = $(input).parent();

		$(thisAlert).removeClass('alert-validate');
	}

	/*
	 * ================================================================== [ Show
	 * pass ]
	 */
	var showPass = 0;
	$('.btn-show-pass').on('click', function() {
		if (showPass == 0) {
			$(this).next('input').attr('type', 'text');
			$(this).find('i').removeClass('zmdi-eye');
			$(this).find('i').addClass('zmdi-eye-off');
			showPass = 1;
		} else {
			$(this).next('input').attr('type', 'password');
			$(this).find('i').addClass('zmdi-eye');
			$(this).find('i').removeClass('zmdi-eye-off');
			showPass = 0;
		}

	});

})(jQuery);

function closeModalError() {
	  $('#login-error').modal('hide');
	  $(".modal-backdrop").remove();
//	  openPage('hr/create_employee.html');
	}

