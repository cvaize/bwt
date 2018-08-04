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
            width: 400px;
            height: 200px;
            background-image: url(/img/training/setka.png);
            border: 1px solid;
        }
    </style>
</head>
<body>
<div class="mx-auto my-5 d-flex justify-content-center align-items-center">
    <div class="position-relative">
        <canvas id="canvas" width="400" height="200">

        </canvas>
    </div>
</div>
<script src="/js/canvas2.js"></script>
</body>
</html>
