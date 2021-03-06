module.exports = function maker(t) {
    $(t).on("curvedImage.readyOptions", function () {
        let data = t.curvedImage.data;
        $(t).css({width:data.width, height:data.height});
        $(t).append("<div><canvas></canvas></div>");
        let div = $(t).find(">div");
        div.css({
            position: "relative",
            lineHeight: 1,
            fontSize: 0,
            width: data.width,
            height: data.height
        });
        let canvas = $(t).find("canvas");
        switch (data.offsetMode){
            case 2:
                canvas.attr("width", data.width+2*data.offset);
                canvas.attr("height", data.height+2*data.offset);
                canvas.css({
                    width: data.width+2*data.offset,
                    height: data.height+2*data.offset,
                    position: "absolute",
                    left: -1*data.offset,
                    top: -1*data.offset
                });
                break;
            default:
                canvas.attr("width", data.width);
                canvas.attr("height", data.height);
                canvas.css({
                    width: data.width,
                    height: data.height,
                    position: "relative"
                });
                break;
        }
        canvas = canvas.get(0);

        let width = canvas.width;
        let height = canvas.height;
        let offset = data.offset;
        data.arrData = ["top", "right", "bottom", "left"];
        data.start = {
            x: offset,
            y: offset
        };
        data.top = {
            controlX:width/2,
            controlY:offset,
            endX:width - offset,
            endY:offset,
            coordinatesAmbition: {
                controlX:width/2,
                controlY:offset,
            },
            coordinatesCurrent: {
                controlX:width/2,
                controlY:offset,
            },
            dovodchick: true
        };
        data.right = {
            controlX:width - offset,
            controlY:height/2,
            endX:width - offset,
            endY:height - offset,
            coordinatesAmbition: {
                controlX:width - offset,
                controlY:height/2,
            },
            coordinatesCurrent: {
                controlX:width - offset,
                controlY:height/2,
            },
            dovodchick: true
        };
        data.bottom = {
            controlX:width/2,
            controlY:height - offset,
            endX:offset,
            endY:height - offset,
            coordinatesAmbition: {
                controlX:width/2,
                controlY:height - offset,
            },
            coordinatesCurrent: {
                controlX:width/2,
                controlY:height - offset,
            },
            dovodchick: true
        };
        data.left = {
            controlX:offset,
            controlY:height/2,
            endX:offset,
            endY:offset,
            coordinatesAmbition: {
                controlX:offset,
                controlY:height/2,
            },
            coordinatesCurrent: {
                controlX:offset,
                controlY:height/2,
            },
            dovodchick: true
        };
        data.timeoutWrite = null;
        data.timeoutFit = null;
        // data.active = false;
        data.activeTimeoutWrite = false;
        // console.log("curvedImage.readyOptions", options);
        if(!canvas){
            console.log("Ошибка: холст не найден в",t);
           return false;
        }
        let ctx = canvas.getContext('2d');
        let pattern = ctx.createPattern(data.imgObject, "repeat");
        data.pattern = pattern;
        ctx.fillStyle = pattern;
        data.canvas = canvas;
        data.ctx = ctx;
        function checkDovodchik() {
            let arrData = data.arrData;
            let active = false;
            for(let i = 0; i < arrData.length; i++){
                let currentX = data[arrData[i]].coordinatesCurrent.controlX;
                let currentY = data[arrData[i]].coordinatesCurrent.controlY;
                let ambitionX = data[arrData[i]].controlX;
                let ambitionY = data[arrData[i]].controlY;
                if(currentX !== ambitionX || currentY !== ambitionY){
                    active = true;
                }
            }
            return active;
        }
        function write() {
            let arrData = data.arrData;
            data.ctx.beginPath();
            data.ctx.clearRect(0,0,canvas.width, canvas.height);
            data.ctx.beginPath();
            data.ctx.lineWidth = data.lineWidth;
            data.ctx.moveTo(data.start.x, data.start.y);
            for(let i = 0; i < arrData.length; i++){
                data.ctx.quadraticCurveTo(data[arrData[i]].coordinatesCurrent.controlX, data[arrData[i]].coordinatesCurrent.controlY, data[arrData[i]].endX, data[arrData[i]].endY);
            }
            data.ctx.strokeStyle = data.strokeStyle;
            data.ctx.stroke();
            data.ctx.fillStyle = pattern;
            data.ctx.fill();
            setImmediate(data.fit);
            if(data.activeTimeoutWrite){
                data.timeoutWrite = setImmediate(data.write);
            }else{
                if(checkDovodchik()){
                    data.timeoutWrite = setImmediate(data.write);
                }
            }
        }

        function fit() {
            let arrData = data.arrData;
            let fitChunk = data.fitChunk;
            for(let i = 0; i < arrData.length; i++){
                let currentX = data[arrData[i]].coordinatesCurrent.controlX;
                let currentY = data[arrData[i]].coordinatesCurrent.controlY;
                let ambitionX;
                let ambitionY;
                if(data[arrData[i]].dovodchick || !data.activeTimeoutWrite){
                    ambitionX = data[arrData[i]].controlX;
                    ambitionY = data[arrData[i]].controlY;
                }else{
                    ambitionX = data[arrData[i]].coordinatesAmbition.controlX;
                    ambitionY = data[arrData[i]].coordinatesAmbition.controlY;
                }
                if(currentX > ambitionX){
                    currentX -= fitChunk;
                    if(currentX < ambitionX){
                        currentX = ambitionX;
                    }
                }
                if(currentX < ambitionX){
                    currentX += fitChunk;
                    if(currentX > ambitionX){
                        currentX = ambitionX;
                    }
                }
                if(currentY > ambitionY){
                    currentY -= fitChunk;
                    if(currentY < ambitionY){
                        currentY = ambitionY;
                    }
                }
                if(currentY < ambitionY){
                    currentY += fitChunk;
                    if(currentY > ambitionY){
                        currentY = ambitionY;
                    }
                }
                data[arrData[i]].coordinatesCurrent.controlX = currentX;
                data[arrData[i]].coordinatesCurrent.controlY = currentY;
            }
        }

        function withard(event){
            let x = event.offsetX;
            let y = event.offsetY;
            if(x < 0){ x = 0; } if(y < 0){ y = 0; }
            let offset = data.offset;
            if(x >= offset && x <= canvas.width - offset && y <= 2*offset){
                console.log("Верх");
                data.top.coordinatesAmbition.controlX = x;
                data.top.coordinatesAmbition.controlY = y;
                data.top.dovodchick = false;
            }else{
                data.top.dovodchick = true;
            }
            if(x >= canvas.width-2*offset && y >= offset && y <= canvas.height - offset){
                console.log("Право");
                data.right.coordinatesAmbition.controlX = x;
                data.right.coordinatesAmbition.controlY = y;
                data.right.dovodchick = false;
            }else{
                data.right.dovodchick = true;
            }
            if(x >= offset && x<= canvas.width - offset && y >= canvas.height - 2*offset){
                console.log("Низ");
                data.bottom.coordinatesAmbition.controlX = x;
                data.bottom.coordinatesAmbition.controlY = y;
                data.bottom.dovodchick = false;
            }else{
                data.bottom.dovodchick = true;
            }
            if(x <= 2*offset && y >= offset && y <= canvas.height - offset){
                console.log("Лево");
                data.left.coordinatesAmbition.controlX = x;
                data.left.coordinatesAmbition.controlY = y;
                data.left.dovodchick = false;
            }else{
                data.left.dovodchick = true;
            }
        }
        data.write = write;
        data.fit = fit;
        data.withard = withard;
        data.write();

        $(t).trigger('curvedImage.readyMaker');
    });
};