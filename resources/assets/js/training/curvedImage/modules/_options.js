module.exports = function optionsModule(options) {
    return $.extend({
        offset: 100,
        width: 900,
        height: 500,
        lineWidth: 1,
        strokeStyle: "white",
        fitChunk: 1,
        offsetMode: 1 //1, 2
    }, options);
};