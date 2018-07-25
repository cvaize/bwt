window.$ = require('jquery');
window.jQuery = window.$;
window.jquery = window.$;
require('jquery-mousewheel');
require('tocca');

//html2canvas -> Делать снимок и узнавать цвет пикселей для рекурсивной корректировки цвета

const app = {};
app.document = $(document);
app.welcome = $('#welcome');
app.orientation = false; //true - горизонтально, false - вертикально
if(app.orientation){
    app.scroll = $(document).scrollLeft();
}else{
    app.scroll = $(document).scrollTop();
}
app.row = $('#row');
app.blocks = $('#row >div');
app.blocksStartPositionRight = 0;
app.offsetRow = 0;
app.scrollMode = 0; // 0 - Мод простого скрола, 1 - мод последовательного скрола
app.width = 0; //При app.orientation = false; становится height
app.touch = {
    pageX: 0,
    pageY: 0
};
app.logo = {};
app.logo.position = {top:0, left:0};
app.logo.centerPosition = {top:0, left:0};
app.logo.width = 0;
app.logo.height = 0;
app.logo.setParameters = function(){
    let logo = $('#logo');
    app.logo.position = logo.position();
    app.logo.width = logo.width();
    app.logo.height = logo.height();
    app.logo.centerPosition = {top:(app.logo.position.top+app.logo.height/2), left:(app.logo.position.left+app.logo.width/2)};
};
function calcHypotenuse(a, b) {
    return(Math.sqrt((a * a) + (b * b)));
}
app.logo.transform = function(cursor){
    let x = app.logo.centerPosition.left - cursor.x;
    let y = app.logo.centerPosition.top - cursor.y;
    let hypotenuse = calcHypotenuse(x, y);
    console.log(hypotenuse);
};
app.logo.setParameters();
app.setBlocksStartPositionRight = function () {
    let widthBlock = $(app.blocks[0]).width();
    let countBlockOnMainWindow = Math.floor(app.welcome.width()/widthBlock);
    app.blocksStartPositionRight = widthBlock * countBlockOnMainWindow - widthBlock;
};
app.changeWidth = function () {
    let element = $(app.blocks[app.blocks.length - 1]);
    if(app.orientation){
        app.width = $(element[0]).position().left + element.width();
    }else{
        app.width = $(element[0]).position().top + element.height();
    }
};
app.setOffsetRow = function (val) {
    let r = 'left';
    let t = 'top';
    if(!app.orientation){ r = 'top'; t = 'left';}
    app.offsetRow = val;
    app.row.css(r, val+"px");
    app.row.css(t, "auto");

};
app.changeOrientation = function () {
    let saveOrientation = app.orientation;
    if($(app.blocks[0]).width() === app.welcome.width()){
        app.orientation = false;
    }else{
        app.orientation = true;
    }
    if(saveOrientation !== app.orientation){
        app.setOffsetRow(0);
    }
};
app.changeOrientation();
app.blocksBlurChank = 10;
app.changeMouseHoverBlock = function (x, y) {
    if(app.orientation){
        let r = 30;
        let widthBlock = $(app.blocks[0]).width()/r;
        app.blocks.each(function (index, value) {
            let blur = ($(value).position().left - x)/widthBlock;
            if(blur < 0){
                blur = (($(value).position().left + widthBlock*r) - x)/widthBlock;
                if(blur < 0){
                    blur = -1*blur;
                }
            }
            if(blur > app.blocksBlurChank){
                blur = app.blocksBlurChank;
            }
            $(value).find('.img-blur').css("filter", "blur("+blur+"px)");
            $(value).find('.img-blur').css("-webkit-filter", "blur("+blur+"px)");
        });
    }else{
        app.blocks.find('.img-blur').css("filter", "blur("+app.blocksBlurChank+"px)");
        app.blocks.find('.img-blur').css("-webkit-filter", "blur("+app.blocksBlurChank+"px)");
    }
};
app.setScroll = function(val){

    let width = app.welcome.width();
    if(!app.orientation){ width = app.welcome.height(); }
    console.log('setScroll - 1',val);
    if(val > (app.width - width)){
        val = (app.width - width);
    }
    if(val < 0){ val = 0; }
    console.log('setScroll - 2',val);
    app.scroll = val;

    if(app.scrollMode === 0){
        app.setOffsetRow(-1*val);
    }
    if(app.scrollMode === 1){
        let widthBlock = $(app.blocks[0]).width();
        app.setOffsetRow(-1*Math.ceil(val/widthBlock) * widthBlock);
    }
    // app.document.scrollLeft(val);
};
app.init = function(){
    app.changeOrientation();
    let r = 'right';
    let t = 'top';
    let l = 'left';
    let b = 'bottom';

    if(!app.orientation){
        r = 'bottom';
        t = 'right';
        l = 'left';
        b = 'top';
    }
    app.setBlocksStartPositionRight();
    app.logo.setParameters();
    app.blocks.each(function (index, value) {
        let set = app.blocksStartPositionRight + -1*$(value).width()*index;
        // if(index === 0){
        //     set = app.blocksStartPositionRight;
        // }
        if(!app.orientation){
            set = -1*$(value).height()*index;
        }
        $(value).css(r, set);
        $(value).css(t, 0);
        $(value).css(l, 'auto');
        $(value).css(b, 'auto');
    });
    app.changeWidth();
};
app.bind = function () {
    // let scroll = app.scroll;
    $(document).on('mousewheel', function(event) {
        console.log(event.deltaX, event.deltaY, event.deltaFactor);
        app.setScroll(app.scroll + event.deltaY*event.deltaFactor);
    });
    $(document).on('mousemove', function(e){
        let X = e.pageX; // положения по оси X
        let Y = e.pageY; // положения по оси Y
        // console.log("X: " + X + " Y: " + Y); // вывод результата в консоль
        app.changeMouseHoverBlock(X, Y);
        app.logo.transform({x:X, y:Y});
    });
    $(document).on('click', function(event) {
        let target = $(event.target);
        //Отслеживание blur и активация ссылок после снятия blur
        if(target.hasClass('img-blur__link') || target.hasClass('img-blur')){
            // console.log(target.parent('.img-blur__link'));
            target = (target.hasClass('img-blur'))? target: target.find('.img-blur');

            let blur = target.css('filter');
            let blurW = target.css('-webkit-filter');

            let images = $('.img-blur');
            images.css("filter", "blur("+app.blocksBlurChank+"px)");
            images.css("-webkit-filter", "blur("+app.blocksBlurChank+"px)");

            target.css("filter", blur);
            target.css("-webkit-filter", blurW);

            if(target.css('filter')){
                if(target.css('filter') !== 'none' && target.css('filter') !== 'blur(0px)'){
                    event.preventDefault();
                    target.attr("data-blur", 0);
                }
            }else if(target.css('-webkit-filter')){
                if(target.css('-webkit-filter') !== 'none' && target.css('-webkit-filter') !== 'blur(0px)'){
                    event.preventDefault();
                    target.attr("data-blur", 0);
                }
                console.log('-webkit-filter');
            }
        }
    });
    // $(document).on('scroll', function () {
    //     if(app.orientation){
    //         scroll = app.document.scrollLeft();
    //     }else{
    //         scroll = app.document.scrollTop();
    //     }
    //
    //     app.setScroll(scroll);
    //     console.log('scroll',scroll);
    // });
    // $(document).on('swipeup',function (e,data){
    //     console.log('swipeup');
    //     console.log(data.x);
    //     console.log(data.y);
    //     console.log(data.distance.x);
    //     console.log(data.distance.y);
    // });
    // $(document).on('swipedown',function (e,data){
    //     console.log('swipedown');
    //     console.log(data.x);
    //     console.log(data.y);
    //     console.log(data.distance.x);
    //     console.log(data.distance.y);
    // });
    // $(document).on('swipeleft',function (e,data){
    //     console.log('swipeleft');
    //     console.log(data.x);
    //     console.log(data.y);
    //     console.log(data.distance.x);
    //     console.log(data.distance.y);
    // });
    // $(document).on('swiperight',function (e,data){
    //     console.log('swiperight');
    //     console.log(data.x);
    //     console.log(data.y);
    //     console.log(data.distance.x);
    //     console.log(data.distance.y);
    // });
    $(document).on('touchend', function(e) {
        console.log('touchend');
        app.touch.pageX = 0;
        app.touch.pageY = 0;
    });
    $(document).on('touchstart', function(e) {
        console.log('touchstart');
        app.touch.pageX = 0;
        app.touch.pageY = 0;
    });
    $(document).on('touchmove', function(e) {
        let touch = e.touches[0];
        console.log('touchmove',touch.pageX + " - " + touch.pageY);
        if(app.touch.pageX === 0){
            app.touch.pageX = touch.pageX;
        }
        if(app.touch.pageY === 0){
            app.touch.pageY = touch.pageY;
        }
        if(app.orientation){
            app.setScroll(app.scroll + -1*(touch.pageX - app.touch.pageX));
        }else{
            app.setScroll(app.scroll + -1*(touch.pageY - app.touch.pageY));
        }
        app.touch.pageX = touch.pageX;
        app.touch.pageY = touch.pageY;
    });
    let timeout = null;
    $(window).resize(function() {
        clearTimeout(timeout);
        timeout = setTimeout(function () {
            app.init();
        }, 500);
    });
};
app.bind();
app.init();

















