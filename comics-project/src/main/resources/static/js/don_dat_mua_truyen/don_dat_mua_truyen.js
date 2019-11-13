window.truyen = null;
var idList = [];
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
    function loadDataTable() {
        var url = "/comics/don-dat-mua-truyen";
        $.getJSON(url, function (data) {
            var index = 1;
            for (x of data) {
                x.tongTien = Number(x.tongTien.toFixed(1)).toLocaleString();
                if (x.trangThai == 1)
                    x.trangThai = "Chưa giao hàng";
                else if (x.trangThai == 2)
                    x.trangThai = "Đang giao hàng";
                else if (trangThai == 3)
                    x.trangThai = "Đã nhận hàng"
                x.index = index++;
            }
            renderData(data);
        });
    };



});

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
            { searchable: false, title: "Xem chi tiết", data: 'donDatMuaTruyenId' },
            { searchable: false, title: "Cập nhật trạng thái", data: 'donDatMuaTruyenId' }

        ],
        columnDefs: [{
            targets: 4,
            searchable: false,
            orderable: false,
            className: 'dt-body-center',
            render: function (data, type, row) {
                return '<button type="button" id="detail" data-toggle="modal" class="btn btn-success" onClick="showDetail(' + row.donDatMuaTruyenId + ')">Xem chi tiết</button>';
            }
        },
        {
            targets: 5,
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
}
var message = "This is Tuyen";
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