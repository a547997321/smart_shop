define(['jlazyload'], function () {
    return {
        // 主播推荐数据
        init: function () {
            // 主播推荐
            $.ajax({
                url: 'http://localhost/smart_shop/php/listdata.php',
                dataType: "json"
            }).done(function (data) {
                let strhtml = "";
                $.each(data, function (index, value) {
                    if (index < 6) {
                        strhtml += `
                        <div class="listTv"><img class="lazy" data-original="${value.url}" alt=""><span>${value.title}</span><span>￥${value.price}</span></div>
                        `;
                    }
                })
                $('.TvreboRight').html(strhtml);

                // 懒加载
                $(function () { //和拼接的元素放在一起。
                    $("img.lazy").lazyload({
                        effect: "fadeIn" //图片显示方式
                    });
                });
            });

            // 团购接口
            $.ajax({
                url: 'http://localhost/smart_shop/php/listdata.php',
                dataType: "json"
            }).done(function (data) {
                let strhtml = "";
                $.each(data, function (index, value) {
                    if (index < 3) {
                        strhtml += `
                        <div class="listTv"><img src="${value.url}" alt=""><span>${value.title}</span><span>￥${value.price}</span></div>
                        `;
                    }
                })
                $('.indexTvrebosliderBoxContent').html(strhtml);
                // 懒加载
                $(function () { //和拼接的元素放在一起。
                    $("img.lazy").lazyload({
                        effect: "fadeIn" //图片显示方式
                    });
                });
            });

            // 食品饮料
            $.ajax({
                url: 'http://localhost/smart_shop/php/listdata.php',
                dataType: "json"
            }).done(function (data) {
                let strhtml = "";
                $.each(data, function (index, value) {
                    if (index < 8) {
                        strhtml += `
                        <div class="listTv"><img src="${value.url}" alt=""><span>${value.title}</span><span>￥${value.price}</span></div>
                        `;
                    }
                })
                $('.hindexProjectListBoxRight').html(strhtml);
                // 懒加载
                $(function () { //和拼接的元素放在一起。
                    $("img.lazy").lazyload({
                        effect: "fadeIn" //图片显示方式
                    });
                });
            });

            // 懒加载
            $(function () { //和拼接的元素放在一起。
                $("img.lazy").lazyload({
                    effect: "fadeIn" //图片显示方式
                });
            });

            // 楼梯效果
            $(function () {
                const $loutili = $('.louti'); //包含回到顶部
                const $louceng = $('.louceng');

                $(window).on('scroll', function() {
                    let $top = $(window).scrollTop(); //滚动条离顶部的距离
            
                    //4.拖动滚动条，给对应楼梯添加标识(对应哪个楼层)
                    $louceng.each(function(index, element) {
                        let $loucengtop = $(element).offset().top + $(element).height() / 3; //楼层top值
                        console.log($loucengtop);
                        //如果楼层top的值大于滚动条的top值，添加active.
                        if ($loucengtop > $top) {
                            $loutili.removeClass('active'); //所有的楼梯移除类。
                            $loutili.eq(index).addClass('active'); //当前第一个满足条件的添加active
                            return false; //循环结束
                        }
                    });
                    document.title = $top;
                });

                $loutili.not('.last').on('click', function () {
                    //如何获取当前点击楼梯的索引：$(this).index()
                    $(this).addClass('active').siblings().removeClass('active');
                    let $loucengtop = $louceng.eq($(this).index() - 2).offset().top;
                    console.log($(this).index());
                    //将获取的楼层top给滚动条(document.documentElement.scrollTop)
                    $('html,body').animate({
                        scrollTop: $loucengtop
                    });
                });
            })

            // 浏览器固定导航  小轮播图
            $(function () {
                var imgLeath = $(".lunboimg").length;
                var liLeath = $(".lunboli").length;
                // 显示图片的下标 (全局变量)
                var n = 0;
                //设置定时器timer
                var timer = setInterval(time, 4000);
                // 轮播函数
                // index 为 隐藏图片 ondex为显示的图片
                function time() {
                    n++;
                    if (n == imgLeath) {
                        n = 0;
                    }
                    for (var i = 0; i < imgLeath; i++) {
                        $("#img-box img").eq(i).fadeTo(0, 0);
                    }
                    $("#img-box img").eq((n)).delay(50).fadeTo(500, 1);
                }
                // 当鼠标移入框内 轮播图停止
                $("#img-box").mouseover(function () {
                    clearInterval(timer);
                });
                //当鼠标移出框内 轮播图进行
                $("#img-box").mouseout(function () {
                    timer = setInterval(time, 4000);
                });

                //点击li序号  图片就切换到那一张
                for (var i = 0; i < liLeath; i++) {
                    //闭包问题
                    (function (i) {
                        $("#img-num li").eq(i).click(function () {
                            // i为切换图片的下标
                            console.log(i);
                            //把 (i-1) 传给 n 因为在 time() 函数中 要进行 n++
                            n = (i - 1);
                            time();
                        });
                    })(i)
                }
            });

        }
    }
})