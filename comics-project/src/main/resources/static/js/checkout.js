function getFormData($form) {
	var unindexed_array = $form.serializeArray();
	var indexed_array = {};
	$.map(unindexed_array, function (n, i) {
		indexed_array[n['name']] = n['value'];
	});
	return indexed_array;
}

$(document)
	.ready(
		function () {

			$("#submit").on('click', function () {
			});
			$("#form").submit(function (event) {
				return false;
			});
			showCheckoutButton();
			function showCheckoutButton() {
				var cartArray = [];
				cartArray = JSON.parse(localStorage.getItem('shoppingCart'));
				if (cartArray.length == 0) {
					$('#submit').attr("disabled", true);
					$('#ten-kh').attr("disabled", true);
					$('#sodt-kh').attr("disabled", true);
					$('#email-kh').attr("disabled", true);
					$('#diachi-kh').attr("disabled", true);
					$('#date').attr("disabled", true);
				}
			}
			$('#form')
				.bootstrapValidator(
					{
						// To use feedback icons, ensure that
						// you use Bootstrap v3.1.0 or later
						feedbackIcons: {
							valid: 'glyphicon glyphicon-ok',
							invalid: 'glyphicon glyphicon-remove',
							validating: 'glyphicon glyphicon-refresh'
						},
						fields: {

							ten: {
								validators: {
									stringLength: {
										max: 40
									},
									regexp: {
										regexp: /^[AĂÂÁẮẤÀẰẦẢẲẨÃẴẪẠẶẬĐEÊÉẾÈỀẺỂẼỄẸỆIÍÌỈĨỊOÔƠÓỐỚÒỒỜỎỔỞÕỖỠỌỘỢUƯÚỨÙỪỦỬŨỮỤỰYÝỲỶỸỴAĂÂÁẮẤÀẰẦẢẲẨÃẴẪẠẶẬĐEÊÉẾÈỀẺỂẼỄẸỆIÍÌỈĨỊOÔƠÓỐỚÒỒỜỎỔỞÕỖỠỌỘỢUƯÚỨÙỪỦỬŨỮỤỰYÝỲỶỸỴAĂÂÁẮẤÀẰẦẢẲẨÃẴẪẠẶẬĐEÊÉẾÈỀẺỂẼỄẸỆIÍÌỈĨỊOÔƠÓỐỚÒỒỜỎỔỞÕỖỠỌỘỢUƯÚỨÙỪỦỬŨỮỤỰYÝỲỶỸỴAĂÂÁẮẤÀẰẦẢẲẨÃẴẪẠẶẬĐEÊÉẾÈỀẺỂẼỄẸỆIÍÌỈĨỊOÔƠÓỐỚÒỒỜỎỔỞÕỖỠỌỘỢUƯÚỨÙỪỦỬŨỮỤỰYÝỲỶỸỴAĂÂÁẮẤÀẰẦẢẲẨÃẴẪẠẶẬĐEÊÉẾÈỀẺỂẼỄẸỆIÍÌỈĨỊOÔƠÓỐỚÒỒỜỎỔỞÕỖỠỌỘỢUƯÚỨÙỪỦỬŨỮỤỰYÝỲỶỸỴAĂÂÁẮẤÀẰẦẢẲẨÃẴẪẠẶẬĐEÊÉẾÈỀẺỂẼỄẸỆIÍÌỈĨỊOÔƠÓỐỚÒỒỜỎỔỞÕỖỠỌỘỢUƯÚỨÙỪỦỬŨỮỤỰYÝỲỶỸỴA-Zaăâáắấàằầảẳẩãẵẫạặậđeêéếèềẻểẽễẹệiíìỉĩịoôơóốớòồờỏổởõỗỡọộợuưúứùừủửũữụựyýỳỷỹỵaăâáắấàằầảẳẩãẵẫạặậđeêéếèềẻểẽễẹệiíìỉĩịoôơóốớòồờỏổởõỗỡọộợuưúứùừủửũữụựyýỳỷỹỵaăâáắấàằầảẳẩãẵẫạặậđeêéếèềẻểẽễẹệiíìỉĩịoôơóốớòồờỏổởõỗỡọộợuưúứùừủửũữụựyýỳỷỹỵaăâáắấàằầảẳẩãẵẫạặậđeêéếèềẻểẽễẹệiíìỉĩịoôơóốớòồờỏổởõỗỡọộợuưúứùừủửũữụựyýỳỷỹỵaăâáắấàằầảẳẩãẵẫạặậđeêéếèềẻểẽễẹệiíìỉĩịoôơóốớòồờỏổởõỗỡọộợuưúứùừủửũữụựyýỳỷỹỵaăâáắấàằầảẳẩãẵẫạặậđeêéếèềẻểẽễẹệiíìỉĩịoôơóốớòồờỏổởõỗỡọộợuưúứùừủửũữụựyýỳỷỹỵa-z ]+$/i,
										message: 'Họ tên gồm các ký tự alphabetical và dấu cách.'
									},
									notEmpty: {
										message: 'Họ tên không được trống!'
									}
								}
							},

							soDienThoai: {
								validators: {
									stringLength: {
										min: 10,
										max: 10,
										message: 'Số điện thoại gồm 10 chữ số'
									},
									regexp: {
										regexp: /^[0-9]+$/i,
										message: 'Chỉ gồm các chữ số'
									},
									notEmpty: {
										message: 'Số điện thoại không thể để trống.'
									}
								}
							},

							email: {
								validators: {
									notEmpty: {
										message: 'Email không được để trống.'
									},
									regexp: {
										regexp: /^[_A-Za-z0-9-\.]+@[_A-Za-z0-9-\-]+(\.[_A-Za-z0-9-\\]+){1,2}/i,
										message: 'Email không hợp lệ'
									}
								}
							},
							diaChi: {
								validators: {
									stringLength: {
										max: 100
									},
									notEmpty: {
										message: 'Địa chỉ không được để trống.'
									}
								}
							},
							ngaySinh: {
								validators: {
									date: {
										message: 'Ngày sinh theo định dạng:',
										format: 'YYYY/MM/DD'
									}
								}
							}
						}

					}).on('success.form.bv', function (e) {
						// // Prevent form submission
						e.preventDefault();
						// send ajax
						console.log("This is shopping cart");
						var data = getFormData($("form"));
						var khachHang = data;
						var truyens = [];

						var i = 0;
						for (i; i < cart.length; i++) {
							var item = {
								truyenId: cart[i].truyenid,
								soLuong: cart[i].count
							};
							truyens.push(item);
						}
						var total = shoppingCart.totalCart();
						var cartData = {
							"truyens": truyens,
							"khachHang": khachHang,
							"total": total
						}
						$.ajax({
							url: '/comics/don-dat-mua-truyen', // url where
							// to submit
							// the
							// request
							type: "POST", // type of action POST ||
							// GET
							contentType: "application/json", // data
							// type
							data: JSON.stringify(cartData), // post
							// data
							// ||
							// get
							// data
							success: function (result) {
								shoppingCart.clearCart();
								displayCart();
							},
							error: function (xhr, resp, text) {

							}
						});
					})

		});