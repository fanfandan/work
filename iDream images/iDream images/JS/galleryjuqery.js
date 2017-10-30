$(document).ready(function(){

    //上面

    let ul=$('.dh');
    let li=$('ul>li');
    let a=$('li>a');
    a.on('mouseenter',function () {
        $(this).find('.active1').show();
    })
    a.on('mouseleave',function () {
        $(this).find('.active1').hide();
    })

    $('.img1').hover(function(){
            $(this).removeClass('grayscale');
            $('img',this).css({transform:'scale(1.2,1.2)'});
        },
        function(){
            $('.img1').addClass('grayscale');
            $('img',this).css({transform:'scale(1,1)'});
        });

    //图片点击打开
    $('.img1').on('click',function () {
        let src=$(this).find('img').attr('src');
        console.log(src)
        $('.centerImg').addClass('activei');
        $('.centerImg').find('img').attr('src',src);
    });

    $('.cha').on('click',function () {
        $('.centerImg').removeClass('activei');
    });

})