define([], function () {
    return {
        // 主播推荐数据
        init: function () {
            // 主播推荐
            $.ajax({
                url: 'http://192.168.13.47/smart_shop/php/indexTv.php',
                dataType: "json"
            }).done(function (data) {
                console.log(data);
                let strhtml = "";
                $.each(data, function (index, value) {
                    strhtml += `
                    <div class="listTv"><img src="${value.url}" alt=""><span>${value.introduce}</span><span>￥${value.price}</span></div>
                    `
                })
                $('.TvreboRight').html(strhtml);
            });

            // 团购接口
            $.ajax({
                url: 'http://192.168.13.47/smart_shop/php/indexTv.php',
                dataType: "json"
            }).done(function (data) {
                console.log(data);
                let strhtml = "";
                $.each(data, function (index, value) {
                    if (index < 3) {
                        strhtml += `
                        <div class="listTv"><img src="${value.url}" alt=""><span>${value.introduce}</span><span>￥${value.price}</span></div>
                        `;
                    }
                })
                $('.indexTvrebosliderBoxContent').html(strhtml);
            });

        }
    }
})