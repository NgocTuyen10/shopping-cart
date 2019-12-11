

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

    // $(function () {
    //     var url = "/comics/nha-cung-cap";
    //     $.getJSON(url, function (data) {
    //         data.forEach(function (f) {
    //             var tblRow = "<option value=\"" + f.nhaCungCapId + "\">" + f.ten + "</option>";
    //             $(tblRow).appendTo("#nha-cung-cap select");
    //         });
    //     });
    // });
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
            { title: "Mã cuốn truyện", data: 'cuonTruyenId' },
            { title: "Tên truyện", data: 'truyen.ten' },
            { title: "Đơn giá nhập", data: 'donGiaNhap' },
            { title: "Ngày nhập", data: 'ngayNhap' },
            { title: "Nhà cung cấp", data: 'nhaCungCap.ten' },
            { title: "Trạng thái", data: 'trangThaiBan' },
            { searchable: false, title: "", data: 'cuonTruyenId' }

        ],
        columnDefs: [
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
                    return '<button type="button" id="cap-nhap-cuon-truyen" class="btn btn-success" onClick="capNhapCuonTruyen(' + row.cuonTruyenId + ')">Cập nhật</button>';
                }
            }

        ],
        order: [[1, 'desc']]
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

function clearText() {
    $('#ten_khach_hang').text("");
    $('#so_dien_thoai').text("");
    $('#dia_chi').text("");
    $('#tong_tien').text("");
}
function updateCuonTruyen() {
    var data = {
        "cuonTruyenId": $('#cuon_truyen_id_update').text(),
        "trangThaiBan": $("#select_trang_thai_cuon_truyen").val()
    };
    $.ajax({
        url: '/comics/management/cuon-truyen/update-state', // url where to submit the request
        type: "POST", // type of action POST || GET
        contentType: "application/json", // data type
        data: JSON.stringify(data), // post data || get data
        success: function (result) {
            loadDataTable();
            console.log("Done");
            closeUpdateCuonTruyenModal();
        },
        error: function (xhr, resp, text) {
            console.log(xhr, resp, text);
            $('#create-tac-gia-error').modal('show');
        }
    });
}
function capNhapCuonTruyen(cuonTruyenId) {

    var url = "/comics/management/cuon-truyen/" + cuonTruyenId;
    $.getJSON(url, function (data) {
        console.log(data);
        // var tongTien = Number(data.tongTien.toFixed(1)).toLocaleString() + " đ";
        var donGiaNhap = Number(data.donGiaNhap.toFixed(1)).toLocaleString() + " đ";
        $('#cuon_truyen_id_update').text(data.cuonTruyenId);
        $('#ten_cuon_truyen_modal').text(data.truyen.ten);
        $('#don_gia_nhap_update').text(donGiaNhap);
        $('#ngay_nhap_update').text(data.ngayNhap);
        $('#nha_cung_cap_update').text(data.nhaCungCap.ten);

        $("#select_trang_thai_cuon_truyen").val(data.trangThaiBan);
    });
    $('#updateCuonTruyenModal').modal({ backdrop: 'static', keyboard: false });
}

function closeUpdateCuonTruyenModal() {
    $(".modal-backdrop").remove();
    $('#updateCuonTruyenModal').modal('toggle');
}

function loadDataTable() {
    var url = "/comics/management/cuon-truyen";
    console.log("Come here");
    $.getJSON(url, function (data) {
        for (x of data) {
            if (x.trangThaiBan == 1) {
                x.trangThaiBan = "Chưa bán";
            }
            else if (x.trangThaiBan == 2) {
                x.trangThaiBan = "Đang giao hàng";
            }

            else if (x.trangThaiBan == 3) {
                x.trangThaiBan = "Đã bán";
            }
            x.donGiaNhap = Number(x.donGiaNhap.toFixed(1)).toLocaleString() + " đ";
            x.index = 0;
        }
        renderData(data);
    });
};
