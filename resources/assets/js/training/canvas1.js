window.$ = require('jquery');
window.jQuery = window.$;
window.jquery = window.$;

(function ($) {
    let canvas = document.getElementById('canvas');
    let ctx = canvas.getContext('2d');
    ctx.fillStyle = "red";
    ctx.fillRect(100, 50, 100, 50);
    ctx.fillStyle = "blue";
    ctx.fillRect(150, 75, 100, 50);

    ctx.clearRect(0, 0, 400, 200);

    ctx.strokeStyle = "yellow";
    ctx.lineWidth = 10;
    ctx.rect(100, 50, 100, 50);
    ctx.rect(200, 120, 100, 50);
    ctx.stroke();
    ctx.fillStyle = "green";
    ctx.fill();

})($);