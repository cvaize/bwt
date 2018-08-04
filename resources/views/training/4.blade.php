<!doctype html>
<html lang="{{ app()->getLocale() }}">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>BWT @Welcome@</title>
    <link rel="stylesheet" href="/css/all.css">
    <link rel="stylesheet" href="/css/app.css">
    <style>
        #canvas{
            position: absolute;
            top: -100px;
            left: -100px;
            width: 1160px;
            height: 630px;
            /*background-image: url(/img/training/setka.png);*/
            background: green;
            border: 1px solid;
        }
    </style>
</head>
<body>
<div style="padding: 200px;">
    <div class="position-relative">
        <canvas id="canvas" width="1160" height="630">

        </canvas>
    </div>
</div>
<script src="/js/canvas4.js"></script>
</body>
</html>
