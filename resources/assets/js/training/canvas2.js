window.$ = require('jquery');
window.jQuery = window.$;
window.jquery = window.$;

(function ($) {
    let canvas = document.getElementById('canvas');
    let ctx = canvas.getContext('2d');

    ctx.strokeStyle = "black";
    ctx.lineCap = "round";
    ctx.lineWidth = 4;
    let arr = [
        { //Домик
            start:{x:100, y:100},
            end:{x:100, y:200}
        },
        {
            start:{x:100, y:200},
            end:{x:200, y:200}
        },
        {
            start:{x:200, y:200},
            end:{x:200, y:100}
        },
        {
            start:{x:200, y:100},
            end:{x:100, y:100}
        },
        {
            start:{x:100, y:100},
            end:{x:150, y:50}
        },
        {
            start:{x:150, y:50},
            end:{x:200, y:100}
        },//Окно
        {
            start:{x:130, y:120},
            end:{x:170, y:120}
        },
        {
            start:{x:170, y:120},
            end:{x:170, y:170}
        },
        {
            start:{x:170, y:170},
            end:{x:130, y:170}
        },
        {
            start:{x:130, y:170},
            end:{x:130, y:120}
        }, //Шторки окна
        {
            start:{x:150, y:120},
            end:{x:170, y:150}
        },
        {
            start:{x:150, y:120},
            end:{x:130, y:150}
        },
        ];
    arr.forEach(function (elem) {
        ctx.beginPath();
        ctx.moveTo(elem.start.x, elem.start.y);
        ctx.lineTo(elem.end.x, elem.end.y);
        ctx.stroke();
    });


})($);