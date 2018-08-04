window.$ = require('jquery');
window.jQuery = window.$;
window.jquery = window.$;

(function ($) {
    let canvas = document.getElementById('canvas');
    let ctx = canvas.getContext('2d');
    let colorInput = document.getElementById('color');
    let numberInput = document.getElementById('number');
    let widthDot = numberInput.value;
    let color = colorInput.value;
    colorInput.oninput = function(event){
        color = event.target.value;
    };
    numberInput.oninput = function(event){
        widthDot = event.target.value;
    };
    canvas.onmousedown = function(){
        canvas.onmousemove = function (event) {
            let x = event.offsetX;
            let y = event.offsetY;
            ctx.beginPath();
            ctx.arc(x - widthDot/2, y - widthDot/2, widthDot, 0, 2 * Math.PI);
            ctx.fillStyle = color;
            ctx.fill();
            // ctx.fillRect(x - widthDot/2, y - widthDot/2, widthDot, widthDot);
        }
    };
    canvas.onmouseup = function(){
        canvas.onmousemove = null;
    };


})($);