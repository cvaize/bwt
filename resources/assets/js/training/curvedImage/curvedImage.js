window.$ = require('jquery');
window.jQuery = window.$;
window.jquery = window.$;
require("setimmediate");

// setImmediate(function () {
//     console.log('setImmediate run');
// });

(function($){
    jQuery.fn.curvedImage = function(options){
        if(typeof options === "string"){
            switch (options){
                case "destroy":
                    console.log("Команда destroy");
                    return this;
                default:
                    console.log("Неверно передана команда");
                    return this;
            }
        }
        options = require('./modules/_options')(options);

        let make = function(t){
            let data = require("./modules/_getDataParam")(t, options);
            if(typeof data === "boolean" && !data){
                return;
            }
            let img = new Image();
            img.src = data.img;
            img.onload = function () {
                $(t).trigger('curvedImage.readyImage');
            };
            img.onerror = function() {
                console.log('Ошибка: при загрузке изображения в элементе -', t);
            };
            $(t).on("curvedImage.readyImage", function () {
                t.curvedImage = {}; t.curvedImage.data = data;
                t.curvedImage.data.imgObject = img;
                $(t).trigger('curvedImage.readyOptions');
            });
            require("./modules/_maker")(t);
            require("./modules/_binding")(t);

        };

        let maked = function(t){
        };

        let controller = function () {
            if(this.curvedImage){
                maked(this);
            }else{
                make(this);
            }
        };

        return this.each(controller);
    };
})(jQuery);

console.log($('.js-curved-image').curvedImage());