window.$ = require('jquery');
window.jQuery = window.$;
window.jquery = window.$;
// Определение контекста рисования
var canvas = document.getElementById("canvas"),
    context = canvas.getContext("2d");
// рисуем первый красный прямоугольник
context.beginPath();
context.moveTo(30, 20);
context.lineTo(130, 20);
context.lineTo(130, 110);
context.lineTo(30, 110);
context.closePath();
context.strokeStyle = "red";
context.stroke();

context.clip();

// рисуем второй зеленый прямоугольник
// context.beginPath();
// context.rect(10, 50, 180, 70);
// context.closePath();
// context.strokeStyle = "green";
// context.stroke();

var img = new Image();
img.onload = function() {
    var pattern = context.createPattern(img, "repeat");
    context.fillStyle = pattern;
    context.rect(0, 0, canvas.width, canvas.height);
    context.fill();
    context.stroke();
};
img.src = "http://professorweb.ru/downloads/brick_tile.gif";

// Вспомогательная функция для рисования фигуры в виде сердца
// function drawHeart(x, y) {
//     context.beginPath();
//     context.moveTo(x, y);
//     context.bezierCurveTo(x, y - 40, x - 45, y - 40, x - 48, y);
//     context.bezierCurveTo(x - 45, y + 30, x, y + 40, x, y + 80);
//     context.bezierCurveTo(x, y + 90, x + 45, y + 40, x + 45, y);
//     context.bezierCurveTo(x + 45, y - 30, x, y - 30, x, y);
//     context.closePath();
//     context.fill();
//     context.stroke();
// }

