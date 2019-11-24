$(document).ready(function () {
    $('#to-mau-anh').on("click", function () {
        $('#toMauModal').modal({ backdrop: 'static', keyboard: false });
    })

    $(":file").change(function () {
        var fileName = $(this).val().split('\\').pop();
        $('#file-name').text(fileName);
        $("img").show();

        if (this.files && this.files[0]) {
            var reader = new FileReader();
            reader.onload = imageIsLoaded;
            reader.readAsDataURL(this.files[0]);
        }
    });

    

    function imageIsLoaded(e) {
        $('#myImg').attr('src', e.target.result);
    };
});