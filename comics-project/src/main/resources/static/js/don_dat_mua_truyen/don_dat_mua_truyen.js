window.truyen = null;
var idList = [];
var truyen;
$(document).ready(function () {

    $.ajaxSetup({
        // Handle authorization global
        beforeSend: function (xhr) {
            var token = localStorage.getItem('token');
            console.log(token);
            xhr.setRequestHeader('X-Auth-Token', token);
        },
        // Handle error global
        complete: function (xhr) {
            var status = xhr.status;
            if (status == 403) {
                xhr.setRequestHeader("X-Auth-Token", "");
                $("body").load("/views/auth/login.html")
            } else if (status == 401)
                openPage("dashboard.html");
        }
    });
    loadDataTable();

    $(document).on('change', '#select_trang_thai_don', function (event) {
        event.preventDefault();
        $('#updateModal').prop("disabled", false);
    });



});

function loadDataTable() {
    var url = "/comics/don-dat-mua-truyen";
    $.getJSON(url, function (data) {
        for (x of data) {
            x.tongTien = Number(x.tongTien.toFixed(1)).toLocaleString();
            if (x.trangThai == 1)
                x.trangThai = "Đã xác nhận";
            else if (x.trangThai == 2)
                x.trangThai = "Đang giao hàng";
            else if (x.trangThai == 3)
                x.trangThai = "Đã nhận"
            x.index = 0;
        }
        renderData(data);
    });
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
            // { searchable: false, title: "<input type='checkbox' class='checkbox' name='select_all' id='checkbox-select-all' onClick='checkAll()'>", data: 'truyenId' },

            { title: "Số thứ tự", data: 'index' },
            { title: "Mã hóa đơn", data: 'donDatMuaTruyenId' },
            { title: "Tổng tiền", data: 'tongTien' },
            { title: "Ngày đặt truyện", data: 'ngayDat' },
            { title: "Trạng thái", data: 'trangThai' },
            { searchable: false, title: "Xem chi tiết", data: 'donDatMuaTruyenId' },
            { searchable: false, title: "Cập nhật trạng thái", data: 'donDatMuaTruyenId' }

        ],
        columnDefs: [{
            targets: 5,
            searchable: false,
            orderable: false,
            className: 'dt-body-center',
            render: function (data, type, row) {
                return '<button type="button" id="detail" data-toggle="modal" class="btn btn-success" onClick="showDetail(' + row.donDatMuaTruyenId + ')">Xem chi tiết</button>';
            }
        },
        {
            targets: 6,
            searchable: false,
            orderable: false,
            className: 'dt-body-center',
            render: function (data, type, row) {
                return '<button type="button" id="update" class="btn btn-success" onClick="updateState(' + row.donDatMuaTruyenId + ')">Cập nhật trạng thái</button>';
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
        table.column(0, { search: 'applied', order: 'applied' }).nodes().each(function (cell, i) {
            cell.innerHTML = i + 1;
        });
    }).draw();
}
function showDetail(donDatMuaTruyenId) {
    var url = "/comics/don-dat-mua-truyen-view/" + donDatMuaTruyenId;
    $.getJSON(url, function (data) {
        //show detail data here
        var i = 0;
        var tongTien = 0;
        var truyenHoaDonDTOs = data.truyenHoaDonDTOs;
        var itemsData = [];
        for (i; i < truyenHoaDonDTOs.length; i++) {
            itemsData.push("<tr><td>" + truyenHoaDonDTOs[i].ten + "</td ><td>" + Number(truyenHoaDonDTOs[i].donGiaBan.toFixed(1)).toLocaleString() + " đ" + "</td> <td>" + truyenHoaDonDTOs[i].soLuong + "</td><td>" + Number((truyenHoaDonDTOs[i].soLuong * truyenHoaDonDTOs[i].donGiaBan).toFixed(1)).toLocaleString() + " đ" + "</td></tr >");
            tongTien += truyenHoaDonDTOs[i].soLuong * truyenHoaDonDTOs[i].donGiaBan;
        }
        tongTien = Number(tongTien.toFixed(1)).toLocaleString() + " đ";
        $("#table-body").append(itemsData);
        $('#detailModal').modal({ backdrop: 'static', keyboard: false });
        $('#ten_khach_hang').text(data.khachHang.ten);
        $('#so_dien_thoai').text(data.khachHang.soDienThoai);
        $('#dia_chi').text(data.khachHang.diaChi);
        $('#tong_tien').text(tongTien);
    });
}

function updateState(donDatMuaTruyenId) {
    var url = "/comics/don-dat-mua-truyen/" + donDatMuaTruyenId;
    $.getJSON(url, function (data) {

        var tongTien = Number(data.tongTien.toFixed(1)).toLocaleString() + " đ";
        $('#don_dat_truyen_update').text(data.donDatMuaTruyenId);
        $('#tong_tien_update_modal').text(tongTien);
        $('#ngay_dat').text(data.ngayDat);
        $("#select_trang_thai_don").val(data.trangThai);
    });
    $('#updateModal').modal({ backdrop: 'static', keyboard: false });
}
function print() {

}
function update() {
    var data = {
        "donDatMuaTruyenId": $('#don_dat_truyen_update').text(),
        "trangThai": $("#select_trang_thai_don").val()
    };
    $.ajax({
        url: '/comics/don-dat-mua-truyen/update-state', // url where to submit the request
        type: "POST", // type of action POST || GET
        contentType: "application/json", // data type
        data: JSON.stringify(data), // post data || get data
        success: function (result) {
            loadDataTable();
            console.log("Done");
            closeUpdateModal();
        },
        error: function (xhr, resp, text) {
            console.log(xhr, resp, text);
            $('#create-tac-gia-error').modal('show');
        }
    });

}

function closeDetailModal() {
    $("#table-body").empty();
    clearText();
    $('#detailModal').modal('toggle');
}
function closeUpdateModal() {
    // $("#table-body").empty();
    $('#updateModal').modal('toggle');
}
function clearText() {
    $('#ten_khach_hang').text("");
    $('#so_dien_thoai').text("");
    $('#dia_chi').text("");
    $('#tong_tien').text("");
}