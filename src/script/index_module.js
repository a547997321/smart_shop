define([], function () {
    return {
        // 主播推荐数据
        init: function () {
            // 主播推荐
            $.ajax({
                url: 'http://192.168.13.66/projectname/php/listdata.php',
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
                url: 'http://192.168.13.66/projectname/php/listdata.php',
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
            });

            // 食品饮料
            $.ajax({
                url: 'http://192.168.13.66/projectname/php/listdata.php',
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
            });

            // 懒加载
            $(function () { //和拼接的元素放在一起。
                $("img.lazy").lazyload({
                    effect: "fadeIn" //图片显示方式
                });
            });

            // 楼梯效果
            $(function(){
                const $loutili = $('.louti');//包含回到顶部
                const $louceng = $('.louceng');

                $loutili.not('.last').on('click',function(){
                    //如何获取当前点击楼梯的索引：$(this).index()
                    $(this).addClass('active').siblings().removeClass('active');
                    let $loucengtop = $louceng.eq($(this).index()-2).offset().top;
                    console.log($(this).index());
                    //将获取的楼层top给滚动条(document.documentElement.scrollTop)
                    $('html,body').animate({
                        scrollTop: $loucengtop
                    });
                });
            })

            $()

        }
    }
})