
$(document).ready(function () {
    var imgLeath = $("img").length;
    var liLeath = $("li").length;
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
        for(var i=0; i<imgLeath; i++) {
            $("#img-box img").eq(i).fadeTo(0,0);
        }
        $("#img-box img").eq((n)).delay(50).fadeTo(500, 1);
    }
    // 当鼠标移入框内 轮播图停止
    $("#img-box").mouseover(function(){
        clearInterval(timer);
    });
    //当鼠标移出框内 轮播图进行
    $("#img-box").mouseout(function(){
        timer = setInterval(time,4000);
    });

    //点击li序号  图片就切换到那一张
    for(var i=0; i<liLeath; i++) {
        //闭包问题
        (function(i){
            $("#img-num li").eq(i).click(function(){
                // i为切换图片的下标
                console.log(i);
                //把 (i-1) 传给 n 因为在 time() 函数中 要进行 n++
                n = (i-1);
                time();
            });
        })(i)
    }
})