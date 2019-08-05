$(function () {
    $('.btnLogin').on('click', function () {
        $.ajax({
            type: 'post',
            url: '/login',
            data: $("form").serialize(),
            dataType: 'json',
            success: function (res) {
                if (res.code == 400) {
                    $('.alert-danger > span').text(res.msg);
                    $('.alert-danger').fadeIn(500).delay(200).fadeOut(500);
                } else {
                    location.href = '/admin'
                }
            }
        })
    })
});