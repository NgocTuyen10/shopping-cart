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
        var url = "/comics/truyen-hoa-don-xuat";
        $.getJSON(url, function (data) {
            for (x of data) {
                x.donGiaBan = Number(x.donGiaBan.toFixed(1)).toLocaleString() + " đ";
                x.index = 0;
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
            { title: "Mã truyện", data: 'maTruyen' },
            { title: "Tên truyện", data: 'tenTruyen' },
            { title: "Số lượng còn", data: 'soLuongCon' },
            { title: "Đơn giá bán", data: 'donGiaBan' },
            { title: "Đầu truyện", data: 'tuaTruyen' },
            { searchable: false, title: "", data: 'truyenId' }

        ],
        columnDefs: [
            {
                searchable: false,
                orderable: false,
                targets: 0
            },
            {
                targets: 6,
                searchable: false,
                orderable: false,
                className: 'dt-body-center',
                render: function (data, type, row) {
                    return '<button type="button" id="them-vao-hoa-don" class="btn btn-success" onClick="themVaoHoaDon(' + row.truyenId + ')">Thêm vào hóa đơn</button>';
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
function themVaoHoaDon(truyenId) {
    alert(truyenId);
}