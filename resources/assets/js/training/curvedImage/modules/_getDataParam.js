module.exports = function getDataParam(t, optionsMain) {
    let dataImg = $(t).data('img');
    if(!dataImg){
        console.log('Ошибка: Обязательно укажите изображение в атрибуте data-img в элементе -', t);
        return false;
    }
    let data = {};
    data.img = dataImg;
    let options = $(t).attr('data-options');
    if(options){
        options = JSON.parse(options);
        options.img = data.img;
        data = options;
    }
    let copyOptions = Object.assign({}, optionsMain);
    data = $.extend(copyOptions, data);
    
    return data;
};