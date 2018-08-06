module.exports = function binding(t) {
    $(t).on("curvedImage.readyMaker", function () {
        console.log("curvedImage.readyMaker");
    });
};