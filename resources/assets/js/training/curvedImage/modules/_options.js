module.exports = function optionsModule(options) {
    return $.extend({
        offset: 100,
        width: 700,
        height: 500,
        fitChunk: 10
    }, options);
};