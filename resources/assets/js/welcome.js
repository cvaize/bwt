window.$ = require('jquery');
window.jQuery = window.$;
window.jquery = window.$;
require('jquery-mousewheel');
// require('tocca');
// window._ = require('lodash');

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
app.orientation = true; //true - горизонтально, false - вертикально
app.row = $('#row');
app.blocks = $('#row >div');
app.touch = {
    pageX: 0,
    pageY: 0
};
app.menu = {};
app.menu.s = $('#menu');
app.menu.open = false;
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
};
function calcHypotenuse(a, b) {
    return(Math.sqrt((a * a) + (b * b)));
}
app.logo.containers = [];
app.logo.aniItemsCount = 4;
app.logo.aniItems = {};
app.logo.state = {
    current: 0,//Нумерация начинается с 0
    final: 0,//Нумерация начинается с 0
    headSteps: 2,//Нумерация начинается с 1
    timeout: {
        head: 200,
        items: 200
    },
    aim: 0,
    transition: 'top .2s ease-in, left .2s ease-in',
    animationClassIn: 'slideInDownC faster',
    animationClassOut: 'slideOutUpC faster',
    ready: true
};
app.logo.initConvert = function(){
    app.logo.state = {
        current: 0,//Нумерация начинается с 0
        final: 0,//Нумерация начинается с 0
        headSteps: 2,//Нумерация начинается с 1
        timeout: {
            head: 200,
            items: 200
        },
        aim: 0,
        transition: 'top .2s ease-in, left .2s ease-in',
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
            app.logo.containers[i].left = widthOld+"px";
            item.css('left', widthOld+"px");
            widthOld = widthOld + $(app.logo.containers[i].head).width();
        }else{
            widthOld = $(app.logo.containers[i].head).width();
        }
        item.css('transition', app.logo.state.transition);
    }
    app.logo.setParameters();
    let y = 0;
    for(let i = 0; i<app.logo.containers.length; i++){
        app.logo.containers[i].items = app.logo.containers[i].items.sort(compareRandom);

        for(let j = 0; j<app.logo.containers[i].items.length; j++){
            if(y < app.logo.aniItemsCount){
                if(!app.logo.aniItems[y]){app.logo.aniItems[y] = [];}
                app.logo.aniItems[y].push(app.logo.containers[i].items[j]);

                y++;
            }else{
                y = 0;
                if(!app.logo.aniItems[y]){app.logo.aniItems[y] = [];}
                app.logo.aniItems[y].push(app.logo.containers[i].items[j]);
                y++;
            }
        }
    }
    app.logo.state.final = (app.logo.aniItemsCount + app.logo.state.headSteps);
};
app.logo.recursiveTransform = function(){
    if(app.logo.state.ready && app.logo.state.current !== app.logo.state.aim && !app.menu.open){
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
                        if(app.logo.aniItems[index]){
                            for(let i = 0; i<app.logo.aniItems[index].length; i++){
                                let item = $(app.logo.aniItems[index][i]);
                                item.animateCss(app.logo.state.animationClassIn);
                                item.css('opacity', '1');
                            }
                        }
                        // for(let i = 0; i<app.logo.containers.length; i++){
                        //     let item = $(app.logo.containers[i].items[index]);
                        //     item.animateCss(app.logo.state.animationClassIn);
                        //     item.css('opacity', '1');
                        // }
                    break;
            }
            if(app.logo.state.current >= 3){
                let timeout = null;
                clearTimeout(timeout);
                timeout = setTimeout(function () {
                    if(app.logo.state.current >= app.logo.state.final){
                        app.menu.open = true;
                    }
                    app.menu.s.css('left', 0);
                    app.border.s.css('display', 'block');

                }, 0);
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
                    if(app.logo.aniItems[index]){
                        for(let i = 0; i<app.logo.aniItems[index].length; i++){
                            let item = $(app.logo.aniItems[index][i]);
                            item.animateCss(app.logo.state.animationClassOut);
                            item.css('opacity', '0');
                        }
                    }
                    //     for(let i = 0; i<app.logo.containers.length; i++){
                    //         let item = $(app.logo.containers[i].items[index]);
                    //         item.animateCss(app.logo.state.animationClassOut);
                    //         item.css('opacity', '0');
                    //     }
                    break;
            }
            if(app.logo.state.current <= 4){
                let timeout = null;
                clearTimeout(timeout);
                timeout = setTimeout(function () {
                    app.menu.open = false;
                    app.menu.s.css('left', "-"+app.menu.s.css('width'));
                    app.border.s.css('display', 'none');
                }, 0);
            }
            app.logo.state.current--;
        }

        if(app.logo.state.current < app.logo.state.headSteps){
            setTimeout(function () {
                app.logo.state.ready = true;
                app.logo.recursiveTransform();
            }, app.logo.state.timeout.head);
            app.logo.state.ready = false;
        }else{
            if(app.logo.state.current <= app.logo.state.final){
                setTimeout(function () {
                    app.logo.state.ready = true;
                    app.logo.recursiveTransform();
                }, app.logo.state.timeout.items);
                app.logo.state.ready = false;
            }else{
                app.logo.state.ready = true;
            }
        }
    }
};
app.logo.transform = function(cursor){
    let x = app.logo.centerPosition.left - cursor.x;
    let y = app.logo.centerPosition.top - cursor.y;
    let hypotenuse = calcHypotenuse(x, y);
    let widthWindow = $(window).width();
    let hypotenuseChunk = hypotenuse/(widthWindow/50);
    hypotenuseChunk = hypotenuseChunk - 5;
    if(hypotenuseChunk <= app.logo.state.final){
        app.logo.state.aim = Math.round(app.logo.state.final-hypotenuseChunk);
        app.logo.recursiveTransform();
    }else{
        app.logo.state.aim = 0;
        app.logo.recursiveTransform();
    }
};
app.changeOrientation = function () {
    if($(app.blocks[0]).width() === app.document.width()){
        app.orientation = false;
        $('html, body').css('overflow', 'auto');
        app.row.addClass('js-column');
    }else{
        app.orientation = true;
        $('html, body').css('overflow', 'hidden');
        app.row.removeClass('js-column');
    }
};

app.setBlurBlock = function (elements) {
    elements.find('text').css('opacity', 1);
    setTimeout(()=>{
        elements.addClass('active');
    }, 300);
    let newElements = elements.find('feGaussianBlur');
    let deviation = 0;
    let fun = ()=>{
        let val = 5*(Math.sin(deviation+=0.1)+1);
        newElements.attr('stdDeviation', val);
        if(val <= 9){
            setTimeout(fun, 0);
        }else{
            newElements.attr('stdDeviation', 10);
        }
    };
    setTimeout(fun, 0);
};

app.unSetBlurBlock = function (elements) {
    elements.find('text').css('opacity', 0);
    setTimeout(()=>{
        elements.removeClass('active');
    }, 300);
    let newElements = elements.find('feGaussianBlur');
    let deviation = 10;
    let fun = ()=>{
        let val = 5*(Math.sin(deviation+=0.1)+1);
        newElements.attr('stdDeviation', val);
        if(val > 1){
            setTimeout(fun, 0);
        }else{
            newElements.attr('stdDeviation', 0);
        }
    };
    setTimeout(fun, 0);
};
app.init = function(){
    app.menu.open = false;
    app.changeOrientation();
    app.logo.initConvert();
};
app.bind = function () {
    window.addEventListener("touchstart", function(e) {
        app.touch.pageX = 0;
        app.touch.pageY = 0;
    });
    window.addEventListener("touchend", function(e) {
        app.touch.pageX = 0;
        app.touch.pageY = 0;
    });
    window.addEventListener("touchmove", function(e) {
        if(app.orientation){
            event.preventDefault();
            let touch = e.touches[0];
            if(app.touch.pageX === 0){
                app.touch.pageX = touch.pageX;
            }
            if(app.touch.pageY === 0){
                app.touch.pageY = touch.pageY;
            }
            console.log(-1*(touch.pageX - app.touch.pageX));
            let set = app.row.scrollTop() + -1*(touch.pageX - app.touch.pageX)*1.5;
            app.row.scrollTop(set);

            app.touch.pageX = touch.pageX;
            app.touch.pageY = touch.pageY;

        }

    }, {passive: false} );
    $(document).on('mousemove', function(e){
        let X = e.pageX; // положения по оси X
        let Y = e.pageY; // положения по оси Y
        app.logo.transform({x:X, y:Y});
        console.log(app.row.scrollLeft());
    });
    $('.img-blur__link').on('click', function(event) {
        let img = $(this).find('.img-blur');
        if(!img.hasClass('active')){
            event.preventDefault();
            app.setBlurBlock(img);
        }
    });
    $('#logo').on('click', function(event) {
        if(app.logo.state.current <= app.logo.state.final){
            event.preventDefault();
            app.logo.state.aim = app.logo.state.final;
            app.logo.recursiveTransform();
        }
    });
    $('.border').on('click', function(event) {
        event.preventDefault();
        app.menu.open = false;
        app.logo.state.aim = 0;
        app.logo.recursiveTransform();
    });
    $('.img-blur').hover(function () {
        app.setBlurBlock($(this));
    }, function () {
        app.unSetBlurBlock($(this));
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

















