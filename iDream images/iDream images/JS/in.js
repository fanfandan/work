$(function(){


    //轮播图
    /*let banli=$('.banul>li');
    let bandli=$('.bandian>li');
    console.log(banli)
    let imgw1=banli.width();
    let now1=next1=0;
    let t =setInterval(fn,2000);
    function fn() {
        next1++;
        if(next1==banli.length){
            next1=0;
        }
        bandli.eq(now1).css({background:'#dfdcdc'});
        bandli.eq(next1).css({background:'red'});

        banli.eq(next1).css('left',imgw1);
        banli.eq(now1).animate({left:-imgw1});
        banli.eq(next1).animate({left:0});
        now1=next1;
    }*/
    let n=0;
    let timer=null;
    function move(){
        clearInterval(timer);
        timer=setInterval(function(){
            n++;
            if(n>=$('.banul li').length){
                n=0;
            }
            $('.banul li').eq(n).fadeIn(600).siblings().hide();
            $('.bandian li').eq(n).addClass('active').siblings().removeClass('active');
            }, 2000);
    }
    move();
    $('.bandian li').mouseenter(function(){
        clearInterval(timer);
        n=$('.bandian li').index(this);
        $('.banul li').eq(n).fadeIn(600).siblings().hide();
        $('.bandian li').eq(n).addClass('active').siblings().removeClass('active');
        move();
    })
})