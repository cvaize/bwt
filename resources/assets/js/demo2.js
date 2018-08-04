window.$ = require('jquery');
window.jQuery = window.$;
window.jquery = window.$;
let active = false;
let timeout = null;
let cursore = {
    pageX: 0,
    pageY: 0
};
function calcHypotenuse(a, b) {
    return(Math.sqrt((a * a) + (b * b)));
}
let colors = ["rgb(0, 30, 255)", "rgb(255, 0, 0)", "rgb(13, 208, 27)", "rgb(255, 0, 252)"];
let blob = ()=>{
    $('.blob').each(function (index) {
        let t = $(this);
        let pos = $('.hover-blob').offset();
        let posX = pos.left + $(this).position().left + 25;
        let posY = pos.top + $(this).position().top + 25;
        let pageX = (cursore.pageX < 0)? -1*cursore.pageX: cursore.pageX;
        let pageY = (cursore.pageY < 0)? -1*cursore.pageY: cursore.pageY;
        let disX = posX - pageX;
        let disY = posY - pageY;
        let disXn = 0;
        let disYn = 0;
        (disX < 0)? disXn = -1*disX: disXn = disX;
        (disY < 0)? disYn = -1*disY: disYn = disY;
        // console.log(disX, disY, pos, cursore);
        t.css({
            opacity: 1,
            transform: `translate3d(${Math.sin(disXn)}px,${Math.sin(disYn)}px, 0px)`,
            // width: disX+"px",
            // height: disY+"px"
        });
        t.css({
            transform: `matrix(1, 0, 0, 1, ${-1*disX/7}, ${-1*disY/7})`
        });
    });
    timeout = setTimeout(blob, 0);
};
$(document).mousemove(function(e){
    cursore.pageX = e.pageX; // положения по оси X
    cursore.pageY = e.pageY; // положения по оси Y
    // if(active){
    //     setTimeout(blob, 0);
    // }
});
$('.header__link').hover(function () {

    let colorT = $($('.blob')[0]).css('background-color');
    let index = colors.indexOf(colorT);
    let color = colors[index+1];
    if(!color){color = colors[0];}

    $('.blob').each(function () {
        let t = $(this);
        let pos = t.offset();
        let posX = pos.left - 25;
        let posY = pos.top - 25;
        let disX = posX - cursore.pageX;
        let disY = posY - cursore.pageY;

        (disX < 0)? disX = disX * -1: null;
        (disY < 0)? disY = disY * -1: null;
        t.css({
            backgroundColor: color,
            opacity: 1,
            transform: `matrix(1, 0, 0, 1, ${disX/7}, ${disY/7})`
        });
        // console.log(disX, disY, hy);
    });
    // active = true;
    blob();
}, function () {
    // active = false;
    clearTimeout(timeout);
    $('.blob').each(function () {
        let t = $(this);
        t.css({
            opacity: 0,
            transform: "matrix(1, 0, 0, 1, 0, 0)"
        });
    });
});