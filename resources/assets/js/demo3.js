window.$ = require('jquery');
window.jQuery = window.$;
window.jquery = window.$;
let width = $('.hover-blob').width();
let count = Math.round(width/50 + 4);
let blob = "<div class=\"blob\"></div>";
let append = "";
for(let i = 0; i < count; i++){
    append +=blob;
}
$('.hover-blob').append(append);
$('.hover-blob .blob').each(function (index) {
    if(index !== 0){
        $(this).css({
            transform: "matrix(1, 0, 0, 1, 0, 0)",
            // left: width/(count-1)/width * 100 * index+ "%"
            left: width/(count)/width * 100 * index+ "%"
        });
    }
});
let timeout = null;
let cursore = {
    pageX: 0,
    pageY: 0
};
function calcHypotenuse(a, b) {
    return(Math.sqrt((a * a) + (b * b)));
}
let colors = ["rgb(0, 30, 255)", "rgb(255, 0, 0)", "rgb(13, 208, 27)", "rgb(255, 0, 252)"];

let hoverItems = null;
let active = false;
let vi = 1;
let blobFun = ()=>{
    let firstItem = $(hoverItems[0]);
    let firstItemX = (firstItem.offset().left + 25) - cursore.pageX;
    let firstItemY = (firstItem.offset().top + 25) - cursore.pageY;
    let rand = Math.sin(vi);
    if(rand < 0.5){
        rand = 1;
    }
    hoverItems.each(function (index) {
        if(index === 1 || index === hoverItems.length-1){
            $(this).css({
                transform: `translate3d(${-1*firstItemX/7 - rand * 4}px,${-1*firstItemY/7 + rand * 4}px, 0px) scale(${rand}, ${rand})`
            });
        }
        else
        if(index !== 0){
            $(this).css({
                transform: `translate3d(${-1*firstItemX/7}px,${-1*firstItemY/7}px, 0px)`
            });
        }
    });
    firstItem.css({
        transform: `translate3d(${-1*firstItemX/2}px,${-1*firstItemY*2}px, 0px) scale(${rand}, ${rand})`
    });
    hoverItems.each(function (index) {
        if(index !== 0){
            $(this).css({
                transform: `matrix(1, 0, 0, 1, ${-1*firstItemX/7}, ${-1*firstItemY/7})`
            });
        }
    });
    firstItem.css({
        transform: `matrix(0.75, 0, 0, 0.75, ${-1*firstItemX/2}, ${-1*firstItemY})`
    });
    if(active){
        // setTimeout(blobFun, 300);
    }else{
        hoverItems.each(function (index) {
            if(index !== 0){
                $(this).css({
                    transform: `matrix(1, 0, 0, 1, 0, 0)`,
                    opacity: 0
                });
            }
        });
        firstItem.css({
            transform: `matrix(0.75, 0, 0, 0.75, 0, 0)`,
            opacity: 0
        });
    }
};
$(document).mousemove(function(e){
    vi += 1;
    if(vi > 1000){vi = 1;}
    cursore.pageX = e.pageX; // положения по оси X
    cursore.pageY = e.pageY; // положения по оси Y
    if(active){
        setTimeout(blobFun, 0);
    }
});
$('.header__item').hover(function () {
    let blobs = $(this).find('.blob');
    let colorT = $(blobs[0]).css('background-color');
    let index = colors.indexOf(colorT);
    let color = colors[index+1];
    if(!color){color = colors[0];}
    blobs.css({
        backgroundColor: color,
        opacity: 1
    });
    hoverItems = $(this).find('.blob');
    active = true;
    blobFun();
}, function () {
    active = false;
});