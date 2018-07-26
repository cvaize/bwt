window.$ = require('jquery');
window.jQuery = window.$;
window.jquery = window.$;
require('jquery-mousewheel');
require('tocca');
window._ = require('lodash');

//html2canvas -> Делать снимок и узнавать цвет пикселей для рекурсивной корректировки цвета
function compareRandom(a, b) {
    return Math.random() - 0.5;
}
$.fn.extend({
    animateCss: function(animationName, callback) {
        var animationEnd = (function(el) {
            var animations = {
                animation: 'animationend',
                OAnimation: 'oAnimationEnd',
                MozAnimation: 'mozAnimationEnd',
                WebkitAnimation: 'webkitAnimationEnd',
            };

            for (var t in animations) {
                if (el.style[t] !== undefined) {
                    return animations[t];
                }
            }
        })(document.createElement('div'));

        this.addClass('animated ' + animationName).one(animationEnd, function() {
            $(this).removeClass('animated ' + animationName);

            if (typeof callback === 'function') callback();
        });

        return this;
    },
});

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
app.menu = {};
app.menu.s = $('#menu');
app.border = {};
app.border.s = $('#border');
app.logo = {};
app.logo.position = {top:0, left:0};
app.logo.centerPosition = {top:0, left:0};
app.logo.width = 0;
app.logo.height = 0;
app.logo.s = $('#logo');
app.logo.original = app.logo.s.html();
app.logo.setParameters = function(){
    app.logo.position = app.logo.s.position();
    app.logo.width = app.logo.s.width();
    app.logo.height = app.logo.s.height();
    let widthWindow = $(window).width();
    app.logo.centerPosition = {top:(app.logo.position.top+app.logo.height + widthWindow/40), left:(app.logo.position.left+app.logo.width + widthWindow/40)};
    console.log(app.logo.centerPosition);
};
function calcHypotenuse(a, b) {
    return(Math.sqrt((a * a) + (b * b)));
}
app.logo.containers = [];
app.logo.state = {
    current: 0,//Нумерация начинается с 0
    final: 0,//Нумерация начинается с 0
    headSteps: 2,//Нумерация начинается с 1
    timeout: {
        head: 300,
        items: 300
    },
    aim: 0,
    transition: 'top .3s ease-in, left .3s ease-in',
    animationClassIn: 'slideInDown faster',
    animationClassOut: 'slideOutUp faster',
    ready: true
};
app.logo.initConvert = function(){
    app.logo.state = {
        current: 0,//Нумерация начинается с 0
        final: 0,//Нумерация начинается с 0
        headSteps: 2,//Нумерация начинается с 1
        timeout: {
            head: 300,
            items: 300
        },
        aim: 0,
        transition: 'top .3s ease-in, left .3s ease-in',
        animationClassIn: 'slideInDown faster',
        animationClassOut: 'slideOutUp faster',
        ready: true
    };
    app.logo.containers = [];
    app.menu.s.css('left', "-"+app.menu.s.css('width'));
    app.border.s.css('display', 'none');
    app.logo.s.html(app.logo.original);
    let text = app.logo.s.text().replace(/(\n)/g, "").replace(/^\s*/, "").replace(/\s*$/, "").split(' ');
    let gLogoString = "";
    for(let i = 0; i<text.length; i++){
        if(app.logo.state.final < (text[i].length - 1 + app.logo.state.headSteps)){
            app.logo.state.final = (text[i].length - 1 + app.logo.state.headSteps);
            console.log(app.logo.state.final);
        }
        let idLogo = 'logo__'+i;
        let object = {head:"#"+idLogo, items:[], left:0};
        gLogoString = gLogoString + "<span id='"+idLogo+"' class='logo' style='transition: none'>";
        for(let j = 0; j<text[i].length; j++){
            let id = "logo__"+i+"__"+j;
            if(j !== 0){object.items.push("#"+id);}
            let classItem = "logo__items";
            if(j === 0){
                classItem = "logo__head"
            }
            gLogoString = gLogoString + "<span id='"+id+"' class='logo "+classItem+"'>" + text[i].slice(j,j+1) + "</span>";
        }
        app.logo.containers.push(object);
        gLogoString = gLogoString + "</span>";
    }
    app.logo.s.html(gLogoString);
    let widthOld = null;
    for(let i = 0; i<app.logo.containers.length; i++){
        let item = $(app.logo.containers[i].head);
        if(widthOld){
            app.logo.containers[i].left = widthOld+i+"px";
            item.css('left', widthOld+i+"px");
            widthOld = widthOld + $(app.logo.containers[i].head).width();
        }else{
            widthOld = $(app.logo.containers[i].head).width();
        }
        item.css('transition', app.logo.state.transition);
    }
    app.logo.setParameters();

    for(let i = 0; i<app.logo.containers.length; i++){
        app.logo.containers[i].items = app.logo.containers[i].items.sort(compareRandom);
    }

    console.log(app.logo.containers);
};
app.logo.recursiveTransform = function(){
    if(app.logo.state.ready && app.logo.state.current !== app.logo.state.aim){
        console.log('app.logo.recursiveTransform', app.logo.state.current, app.logo.state.aim);
        if(app.logo.state.aim > app.logo.state.current){    // Разворачиание логотипа
            switch (app.logo.state.current){
                case 0:
                    for(let i = 0; i<app.logo.containers.length; i++){
                        let item = $(app.logo.containers[i].head);
                        item.css('top', item.height()*i);
                    }
                    break;
                case 1:
                    for(let i = 0; i<app.logo.containers.length; i++){
                        let item = $(app.logo.containers[i].head);
                        item.css('top', item.height()*i);
                        item.css('left', 0);
                    }
                    break;
                default:
                    let index = app.logo.state.current - app.logo.state.headSteps;
                        $('.logo__items').css('display', 'block');
                        for(let i = 0; i<app.logo.containers.length; i++){
                            let item = $(app.logo.containers[i].items[index]);
                            item.animateCss(app.logo.state.animationClassIn);
                            item.css('opacity', '1');
                        }
                    break;
            }
            if(app.logo.state.current >= 5){
                app.menu.s.css('left', 0);
                app.border.s.css('display', 'block');
            }
            app.logo.state.current++;
        }else{                                              // Сворачивание логотипа
            switch (app.logo.state.current){
                case 1:
                    for(let i = 0; i<app.logo.containers.length; i++){
                        let item = $(app.logo.containers[i].head);
                        item.css('top', 0);
                        item.css('left', app.logo.containers[i].left);
                    }
                    break;
                case 2:
                    $('.logo__items').css('display', 'inline');
                    for(let i = 0; i<app.logo.containers.length; i++){
                        let item = $(app.logo.containers[i].head);
                        item.css('top', item.height()*i);
                        item.css('left', app.logo.containers[i].left);
                    }
                    break;
                default:
                    let index = app.logo.state.current - app.logo.state.headSteps - 1;
                        for(let i = 0; i<app.logo.containers.length; i++){
                            let item = $(app.logo.containers[i].items[index]);
                            item.animateCss(app.logo.state.animationClassOut);
                            item.css('opacity', '0');
                        }
                    break;
            }
            app.menu.s.css('left', "-"+app.menu.s.css('width'));
            app.border.s.css('display', 'none');
            app.logo.state.current--;
        }

        if(app.logo.state.current < app.logo.state.headSteps){
            setTimeout(function () {
                app.logo.state.ready = true;
                app.logo.recursiveTransform();
            }, app.logo.state.timeout.head);
        }else{
            setTimeout(function () {
                app.logo.state.ready = true;
                app.logo.recursiveTransform();
            }, app.logo.state.timeout.items);
        }
        app.logo.state.ready = false;
    }
};
app.logo.transform = function(cursor){
    let x = app.logo.centerPosition.left - cursor.x;
    let y = app.logo.centerPosition.top - cursor.y;
    let hypotenuse = calcHypotenuse(x, y);
    let widthWindow = $(window).width();
    let hypotenuseChunk = hypotenuse/(widthWindow/60);
    hypotenuseChunk = hypotenuseChunk - 5;
    if(hypotenuseChunk <= app.logo.state.final){
        app.logo.state.aim = Math.round(app.logo.state.final-hypotenuseChunk);
        console.log(Math.round(app.logo.state.final-hypotenuseChunk));
        app.logo.recursiveTransform();
    }else{
        app.logo.state.aim = 0;
        app.logo.recursiveTransform();
    }
};
app.logo.initConvert();
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
    app.logo.initConvert();
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
        if(target.hasClass('logo')){
            if(app.logo.state.current !== app.logo.state.final + 4){
                event.preventDefault();
                app.logo.state.aim = app.logo.state.final + 4;
                app.logo.recursiveTransform();
            }
        }
        if(target.hasClass('border')){
            event.preventDefault();
            app.logo.state.aim = 0;
            app.logo.recursiveTransform();
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

















