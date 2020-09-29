define(["pagination", 'jlazyload'], function () {
    return {
        // 主播推荐数据
        init: function () {
            // 本周热卖
            $.ajax({
                url: 'http://localhost/smart_shop/php/listdata.php',
                dataType: "json"
            }).done(function (data) {
                console.log();
                let strhtml = "";
                $.each(data, function (index, value) {
                    if (index < 6) {
                        strhtml += `
                        <div class="listTv"><img src="${value.url}" alt=""><span>${value.title}</span><span>￥${value.price}</span></div>
                        `;
                    }
                })
                $('.list_hot').html(strhtml);
            });

            // 懒加载
            $(function () { //和拼接的元素放在一起。
                $("img.lazy").lazyload({
                    effect: "fadeIn" //图片显示方式
                });
            });

            // 列表渲染

            //1.渲染列表页的数据-默认渲染第一页
            //排序的变量
            let array_default = []; //排序前的li数组，默认数组
            let array = []; //排序中的数组
            let prev = null; //前一个价格
            let next = null; //后一个价格
            const $list = $('.pv_shop_list_content');
            $.ajax({
                url: 'http://localhost/smart_shop/php/listdata.php',
                dataType: 'json'
            }).done(function (data) {
                console.log(data)
                let $strhtml = '';
                $.each(data, function (index, value) {
                    $strhtml += `
                    <div>
                    <a href="detail.html?sid=${value.sid}" target="_blank">
                    <span class="img"><img class="lazy" data-original="${value.url}" alt=""></span>
                        <span>${value.title}</span>
                        <span class="price">￥${value.price}</span>
                        <span>积分${value.price}</span>
                        </a>
                    </div>
                    `;
                });
                $list.html($strhtml);

                //重置数组
                array_default = []; //排序前的li数组
                array = []; //排序中的数组
                prev = null;
                next = null;
                //将页面的li元素追加到两个数组中。
                $('.pv_shop_list_content div').each(function (index, element) {
                    array[index] = $(this);
                    array_default[index] = $(this);
                });

                //懒加载
                $(function () {
                    $("img.lazy").lazyload({
                        effect: "fadeIn"
                    });
                });
            });

            //2.分页思路
            //告知后端当前请求的是第几页数据。将当前的页面页码传递给后端(get)
            $('.page').pagination({
                pageCount: 4, //总的页数 - 后端传入的。
                jump: true, //是否开启跳转到指定的页数，布尔值。
                coping: true, //是否开启首页和尾页，布尔值。
                prevContent: '上一页',
                nextContent: '下一页',
                homePage: '首页',
                endPage: '尾页',
                callback: function (api) {
                    console.log(api.getCurrent()); //获取的页码给后端
                    $.ajax({
                        url: 'http://localhost/smart_shop/php/listdata.php',
                        data: {
                            page: api.getCurrent() //传输页面
                        },
                        dataType: 'json'
                    }).done(function (data) {
                        let $strhtml = '';
                        $.each(data, function (index, value) {
                            $strhtml += `
                            <div>
                            <a href="detail.html?sid=${value.sid}" target="_blank">
                            <span class="img"><img class="lazy" data-original="${value.url}" alt=""></span>
                                <span>${value.title}</span>
                                <span class="price">￥${value.price}</span>
                                <span>积分${value.price}</span>
                                </a>
                            </div>
                            `;
                        });
                        $list.html($strhtml);

                        //重置数组
                        array_default = []; //排序前的li数组
                        array = []; //排序中的数组
                        prev = null;
                        next = null;
                        //将页面的li元素追加到两个数组中。
                        $('.pv_shop_list_content div').each(function (index, element) {
                            array[index] = $(this);
                            array_default[index] = $(this);
                        });


                        //懒加载
                        $(function () {
                            $("img.lazy").lazyload({
                                effect: "fadeIn"
                            });
                        });
                    });
                }
            });


            //3.排序
            //默认排序：如果已经排序了，恢复最初的排序。
            $('.list_default').on('click', function () {
                $.each(array_default, function (index, value) {
                    $('.pv_shop_list_content').append(value);
                });
                return;
            });

            //升序
            $('.list_up').on('click', function () {
                for (let i = 0; i < array.length - 1; i++) {
                    for (let j = 0; j < array.length - i - 1; j++) {
                        prev = parseFloat(array[j].find('.price').html().substring(1)); //获取上一个价格
                        next = parseFloat(array[j + 1].find('.price').html().substring(1)); //获取下一个价格
                        //通过价格的判断，改变的是li的位置。
                        if (prev > next) {
                            let temp = array[j];
                            array[j] = array[j + 1];
                            array[j + 1] = temp;
                        }
                    }
                }
                $.each(array, function (index, value) {
                    $('.pv_shop_list_content').append(value);
                });
            });

            // 降序
            $('.list_down').on('click', function () {
                for (let i = 0; i < array.length - 1; i++) {
                    for (let j = 0; j < array.length - i - 1; j++) {
                        prev = parseFloat(array[j].find('.price').html().substring(1)); //获取上一个价格
                        next = parseFloat(array[j + 1].find('.price').html().substring(1)); //获取下一个价格
                        //通过价格的判断，改变的是li的位置。
                        if (prev < next) {
                            let temp = array[j];
                            array[j] = array[j + 1];
                            array[j + 1] = temp;
                        }
                    }
                }
                $.each(array, function (index, value) {
                    $('.pv_shop_list_content').append(value);
                });
            });





        }
    }
})