module.exports = function binding(t) {
    $(t).on("curvedImage.readyMaker", function () {
        let data = t.curvedImage.data;
        $(data.canvas).hover(function () {
            // data.active = true;
            data.activeTimeoutWrite = true;
            console.log('hover', t);
            $(data.canvas).on('mousemove', function (event) {
                setImmediate(function () {
                    data.withard(event);
                });
            });
            setImmediate(data.write);
        }, function () {
            $(data.canvas).unbind('mousemove');
            // data.active = false;
            data.activeTimeoutWrite = false;
            console.log('unhover', t);
            // clearTimeout(data.timeoutWrite);
            // activeMain = false;
        })
    });
};