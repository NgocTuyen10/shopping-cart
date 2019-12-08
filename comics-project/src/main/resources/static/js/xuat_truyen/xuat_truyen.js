window.truyenId = null;
var idList = [];
$(document).ready(function () {

    // $.ajaxSetup({
    //     // Handle authorization global
    //     beforeSend: function (xhr) {
    //         var token = localStorage.getItem('token');
    //         console.log(token);
    //         xhr.setRequestHeader('X-Auth-Token', token);
    //     },
    //     // Handle error global
    //     complete: function (xhr) {
    //         var status = xhr.status;
    //         if (status == 403) {
    //             xhr.setRequestHeader("X-Auth-Token", "");
    //             $("body").load("/views/auth/login.html")
    //         } else if (status == 401)
    //             openPage("dashboard.html");
    //     }
    // });
    loadDataTable();
    function loadDataTable() {
        var url = "/comics/truyen-hoa-don-xuat";
        $.getJSON(url, function (data) {
            for (x of data) {
                x.donGiaBan = Number(x.donGiaBan.toFixed(1)).toLocaleString() + " đ";
                x.index = 0;
            }
            renderData(data);
        });
    };
    $(function () {
        var url = "/comics/nha-cung-cap";
        $.getJSON(url, function (data) {
            data.forEach(function (f) {
                var tblRow = "<option value=\"" + f.nhaCungCapId + "\">" + f.ten + "</option>";
                $(tblRow).appendTo("#nha-cung-cap select");
            });
        });
    });
    $("#create").on('click', function () {
        // window.open("/employee/create", "_self");
        openPage("hr/create_employee.html");
    });
    // click on button edit
    $("#edit").on('click', function () {
        // window.open("/employee/edit?id=" + idList[0], "_self");
        openPage('hr/edit_employee.html');
        var id = idList[0];
        // Load employee information
        var projectUrl = "/comics/management/nhanvien/" + id;
        $.getJSON(projectUrl, function (data) {
            window.nhanVien = data;
            console.log(window.nhanVien);
        });
    });

});
function checkAll() {
    $('input:checkbox').prop('checked', $('#checkbox-select-all').prop('checked'));
    idList = [];
    if ($('#checkbox-select-all').prop('checked')) {
        for (var i = 1; i < $('input:checkbox').length; i++) {
            idList.push($('input:checkbox')[i].value);
        }
    }
    disableButton();
}
function checkRow(value) {
    if (idList.indexOf(value) > -1) {
        idList.splice(idList.indexOf(value), 1);
    } else {
        idList.push(value);
    }
    disableButton();
}
function disableButton() {
    if (idList.length != 1) {
        document.getElementById("edit").disabled = true;
    } else {
        document.getElementById("edit").disabled = false;
    }
};

function renderData(data) {
    var table = $('#datatable').DataTable({
        "dom": '<"top"l>rt<"bottom"p><"clear">',
        // "bInfo": false,
        data: data,
        destroy: true,
        "aLengthMenu": [[10, 20, 30], [10, 20, 30]], // number of items will be
        // show
        "pageLength ": 10,
        columns: [
            { searchable: false, title: "<input type='checkbox' class='checkbox' name='select_all' id='checkbox-select-all' onClick='checkAll()'>", data: 'truyenId' },

            { title: "Số thứ tự", data: 'index' },
            { title: "Mã truyện", data: 'maTruyen' },
            { title: "Tên truyện", data: 'tenTruyen' },
            { title: "Số lượng còn", data: 'soLuongCon' },
            { title: "Đơn giá bán", data: 'donGiaBan' },
            { title: "Đầu truyện", data: 'tuaTruyen' },
            { searchable: false, title: "", data: 'truyenId' }

        ],
        columnDefs: [
            {
                targets: 0,
                searchable: false,
                orderable: false,
                className: 'dt-body-center',
                render: function (data, type, full, meta) {
                    return '<input type="checkbox" class="checkbox" name="checkbox-item" onClick="checkRow(this.value)" value="' + $('<div/>').text(data).html() + '">';
                }
            },
            {
                searchable: false,
                orderable: false,
                targets: 1
            },
            {
                targets: 7,
                searchable: false,
                orderable: false,
                className: 'dt-body-center',
                render: function (data, type, row) {
                    return '<button type="button" id="them-vao-hoa-don" class="btn btn-success" onClick="nhapHang(' + row.truyenId + ')">Nhập hàng</button>';
                }
            }

        ],
        order: [[1, 'asc']]
    });
    // Search button click
    $('#mySearchButton').on('keyup click', function () {
        table.search($('#mySearchText').val(), true, false).draw();
    });

    table.on('order.dt search.dt', function () {
        table.column(1, { search: 'applied', order: 'applied' }).nodes().each(function (cell, i) {
            cell.innerHTML = i + 1;
        });
    }).draw();

}
function showDetail(donDatMuaTruyenId) {
    var url = "/comics/don-dat-mua-truyen-view/" + donDatMuaTruyenId;
    $.getJSON(url, function (data) {
        //show detail data here
        console.log(data);
        data.item
        var i = 0;
        var tongTien = 0;
        var truyenHoaDonDTOs = data.truyenHoaDonDTOs;
        console.log(truyenHoaDonDTOs);
        var itemsData = [];
        for (i; i < truyenHoaDonDTOs.length; i++) {
            itemsData.push("<tr><td>" + truyenHoaDonDTOs[i].ten + "</td ><td>" + Number(truyenHoaDonDTOs[i].donGiaBan.toFixed(1)).toLocaleString() + " đ" + "</td> <td>" + truyenHoaDonDTOs[i].soLuong + "</td><td>" + Number((truyenHoaDonDTOs[i].soLuong * truyenHoaDonDTOs[i].donGiaBan).toFixed(1)).toLocaleString() + " đ" + "</td></tr >");
            tongTien += truyenHoaDonDTOs[i].soLuong * truyenHoaDonDTOs[i].donGiaBan;
        }
        tongTien = Number(tongTien.toFixed(1)).toLocaleString() + " đ";
        $("#table-body").append(itemsData);
        $('#myModal').modal({ backdrop: 'static', keyboard: false });
        $('#ten_khach_hang').text(data.khachHang.ten);
        $('#so_dien_thoai').text(data.khachHang.soDienThoai);
        $('#dia_chi').text(data.khachHang.diaChi);
        $('#tong_tien').text(tongTien);
    });
}
function closeModal() {
    $("#table-body").empty();
    clearText();
    $('#myModal').modal('toggle');
}
function clearText() {
    $('#ten_khach_hang').text("");
    $('#so_dien_thoai').text("");
    $('#dia_chi').text("");
    $('#tong_tien').text("");
}
function nhapHang(truyenId) {
    var url = "/comics/truyen-hoa-don-xuat-view/" + truyenId;
    $.getJSON(url, function (data) {
        console.log(data);

        var donGiaBan = Number(data.donGiaBan.toFixed(1)).toLocaleString() + " đ";
        $('#ma-truyen').text(data.maTruyen);
        $('#ten-truyen').text(data.tenTruyen);
        $('#so-luong-con').text(data.soLuongCon);
        $('#don-gia-ban').text(donGiaBan);
        $('#dau-truyen').text(data.tuaTruyen);
        window.truyenId = truyenId;
    });
    // alert(truyenId);
    $('#nhapHangModal').modal({ backdrop: 'static', keyboard: false });
}

function closeNhapHangModal() {
    $(".modal-backdrop").remove();
    $('#nhapHangModal').modal('toggle');
}

function themMoi() {
    var data = {
        "truyenId": window.truyenId,
        "soLuong": $("#so-luong-nhap-value").val(),
        "donGiaNhap": $("#don-gia-nhap-value").val(),
        "nhaCungCapId": $("#nha-cung-cap-value").val()
    };
    console.log(data);
    $.ajax({
        url: '/comics/truyen-hoa-don-xuat', // url where to submit the request
        type: "POST", // type of action POST || GET
        contentType: "application/json", // data type
        data: JSON.stringify(data), // post data || get data
        success: function (result) {
            closeNhapHangModal();
            openPage('xuat_truyen/xuat_truyen.html');
        },
        error: function (xhr, resp, text) {
            console.log(xhr, resp, text);
            $('#create-tac-gia-error').modal('show');
        }
    });

}