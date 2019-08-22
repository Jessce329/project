

$(function () {
    function init() {
        $.ajax({
            type: 'get',
            url: '/getAllCate',
            dataType: 'json',
            success: function (res) {
                $('tbody').html(template('cateListTemp', res));
            }
        })
    }
    init();
    //添加按钮的委托事件
    $('tbody').on('click', '.btnedit', function () {
        //使用自定义属性的意义在于能直接获取到对象
        var obj = $(this).data();
        console.log(obj);
        $('#id').val(obj.id);
        $('#name').val(obj.name);
        $('#slug').val(obj.slug);
        $(".optinfo").val('编辑分类数据');
        $('.btnAdd').hide();
        $('.btnEdit').show();

    });

    //编辑提交事件
    $('.btnEdit').on('click', function () {
        console.log($('form').serialize());
        $.ajax({
            type: 'post',
            url: '/editCate',
            data: $('form').serialize(),
            dataType: 'json',
            success: function (res) {
                if (res.code == 200) {
                    $('.alert-danger >span').text(res.msg);
                    $('.alert-danger').fadeIn(500).delay(3000).fadeOut(500);

                    $('.optinfo').text('添加分类数据');
                    $('.btnAdd').show();
                    $('.btnEdit').hide();

                    $('[name="id"]').val('');
                    $('[name="name"]').val('');
                    $('[name="slug"]').val('');
                    init();
                }
            }
        })
    })

    //新增提交事件
    $('.btnAdd').on('click', function () {
        $.ajax({
            type: 'post',
            url: '/addCate',
            data: $('form').serialize(),
            dataType: 'json',
            success: function (res) {
                if (res.code == 200) {
                    $('.alert-danger > span').text(res.msg);
                    $('.alert-danger').fadeIn(500).delay(300).fadeOut(500);

                    $('[name="name"]').val('');
                    $('[name="slug"]').val('');
                    init();
                }
            }
        })
    })

    //删除数据类型事件
    $(".btndel").on('click', function () {
        if (confirm('确定要删除吗?')) {
            let id = $(this).data('id');
            $.ajax({
                type: 'get',
                url: '/deldelCateById',
                dataType: 'json',
                success: function (res) {
                    $('.alert-danger>span').text(res.msg);
                    $('.alert-danger').fadeIn(500).delay(300).fadeOut(500);
                    init();
                }
            })
        }
    })
})