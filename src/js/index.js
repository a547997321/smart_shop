var html = $.ajax({
    url: 'http://localhost/smart_shop/php/indexTv.php',
    dateType:"json"
}).done(function(data){
    console.log(data);
})