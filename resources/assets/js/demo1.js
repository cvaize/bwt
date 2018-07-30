window.$ = require('jquery');
window.jQuery = window.$;
window.jquery = window.$;
$(document).on('mousemove', function(e){
    let X = e.pageX; // положения по оси X
    let Y = e.pageY; // положения по оси Y
    $('circle').attr({
        cx: X,
        cy: Y
    });
});