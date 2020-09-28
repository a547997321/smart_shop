define([], function () {
    return {
        // 主播推荐数据
        init: function () {
            // 本周热卖
            $.ajax({
                url: 'http://192.168.13.66/projectname/php/listdata.php',
                dataType: "json"
            }).done(function (data) {
                console.log(data);
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


        }
    }
})