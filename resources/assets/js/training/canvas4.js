window.$ = require('jquery');
window.jQuery = window.$;
window.jquery = window.$;

(function ($) {
    let canvas = document.getElementById('canvas');
    let ctx = canvas.getContext('2d');
    // ctx.stroke();

    let width = 960;
    let height = 430;
    let offset = 100;
    let data = {
        top:{
            controlX:canvas.width/2,
            controlY:offset,
            endX:canvas.width - offset,
            endY:offset,
            coordinatesAmbition: {
                controlX:canvas.width/2,
                controlY:offset,
            },
            coordinatesCurrent: {
                controlX:canvas.width/2,
                controlY:offset,
            }
        },
        right: {
            controlX:canvas.width - offset,
            controlY:canvas.height/2,
            endX:canvas.width - offset,
            endY:canvas.height - offset,
            coordinatesAmbition: {
                controlX:canvas.width - offset,
                controlY:canvas.height/2,
            },
            coordinatesCurrent: {
                controlX:canvas.width - offset,
                controlY:canvas.height/2,
            }
        },
        bottom: {
            controlX:canvas.width/2,
            controlY:canvas.height - offset,
            endX:offset,
            endY:canvas.height - offset,
            coordinatesAmbition: {
                controlX:canvas.width/2,
                controlY:canvas.height - offset,
            },
            coordinatesCurrent: {
                controlX:canvas.width/2,
                controlY:canvas.height - offset,
            }
        },
        left: {
            controlX:offset,
            controlY:canvas.height/2,
            endX:offset,
            endY:offset,
            coordinatesAmbition: {
                controlX:offset,
                controlY:canvas.height/2,
            },
            coordinatesCurrent: {
                controlX:offset,
                controlY:canvas.height/2,
            }
        }
    };
    let arrData = ["top", "right", "bottom", "left"];
    let fitChunk = 10;
    let timeoutWrite = null;
    let timeoutFit = null;
    let img = new Image();
    let active = false;
    img.src = "/img/training/looi_work_plate_01_job-today.jpg";
    img.onload = function() {
        let pattern = ctx.createPattern(img, "repeat");
        ctx.fillStyle = pattern;

        function write() {
            ctx.beginPath();
            // ctx.fillStyle = pattern;
            // ctx.fillRect(0,0,canvas.width, canvas.height);
            // ctx.globalCompositeOperation = 'source-in';
            // ctx.fill();
            ctx.clearRect(0,0,canvas.width, canvas.height);
            // ctx.save();
            ctx.beginPath();
            ctx.lineWidth = 1;
            ctx.moveTo(offset, offset);
            for(let i = 0; i < arrData.length; i++){
                ctx.quadraticCurveTo(data[arrData[i]].coordinatesCurrent.controlX, data[arrData[i]].coordinatesCurrent.controlY, data[arrData[i]].endX, data[arrData[i]].endY);
                // ctx.quadraticCurveTo(data[arrData[i]].coordinatesAmbition.controlX, data[arrData[i]].coordinatesAmbition.controlY, data[arrData[i]].endX, data[arrData[i]].endY);
            }
            ctx.strokeStyle = "black";
            ctx.stroke();
            ctx.fillStyle = pattern;
            ctx.fill();
            timeoutWrite = setTimeout(write, 0);
            fit();
        }
        function fit() {
            active = false;
            console.log(data);
            for(let i = 0; i < arrData.length; i++){
                let currentX = data[arrData[i]].coordinatesCurrent.controlX;
                let currentY = data[arrData[i]].coordinatesCurrent.controlY;
                let ambitionX = data[arrData[i]].coordinatesAmbition.controlX;
                let ambitionY = data[arrData[i]].coordinatesAmbition.controlY;
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
                if(currentX !== ambitionX || currentY !== ambitionY){
                    active = true;
                }
            }
            // write();
            // if(active){
            //
            // }
            // fit();
        }
        function withard(event){
            let x = event.offsetX;
            let y = event.offsetY;
            if(x < 0){ x = 0; } if(y < 0){ y = 0; }
            if(x >= 100 && x <= canvas.width - 100 && y <= 200){
                console.log("Верх");
                data.top.coordinatesAmbition.controlX = x;
                data.top.coordinatesAmbition.controlY = y;
            }
            if(x >= canvas.width-200 && y >= 100 && y <= canvas.height - 100){
                console.log("Право");
                data.right.coordinatesAmbition.controlX = x;
                data.right.coordinatesAmbition.controlY = y;
            }
            if(x >= 100 && x<= canvas.width - 100 && y >= canvas.height - 200){
                console.log("Низ");
                data.bottom.coordinatesAmbition.controlX = x;
                data.bottom.coordinatesAmbition.controlY = y;
            }
            if(x <= 200 && y >= 100 && y <= canvas.height - 100){
                console.log("Лево");
                data.left.coordinatesAmbition.controlX = x;
                data.left.coordinatesAmbition.controlY = y;
            }
        }
        write();
        $(canvas).on('mousemove', function (event) {
            setTimeout(withard(event), 0);
        });
        $(canvas).hover(function () {
            console.log('hover');
            // write();
            timeoutWrite = setTimeout(write, 0);
            // activeMain = true;
        }, function () {
            console.log('unhover');
            clearTimeout(timeoutWrite);
            // activeMain = false;
        })
    };

})($);