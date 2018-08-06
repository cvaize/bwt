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
        canvas{
            /*position: absolute;*/
            /*top: -100px;*/
            /*left: -100px;*/
            /*width: 1160px;*/
            /*height: 630px;*/
            /*background-image: url(/img/training/setka.png);*/
            /*background: green;*/
            /*border: 1px solid;*/
        }
        .js-curved-image{
            width: 700px;
            height: 400px;
            background: green;
        }
    </style>
</head>
<body>
<div class="p-5">
    <div class="js-curved-image mx-auto" data-img="/img/training/looi_work_plate_01_job-today.jpg" data-options='{"offset":50,"width":960,"height":430,"fitChunk":10}'></div>
    <div class="js-curved-image mx-auto" data-img="/img/training/looi_work_plate_01_job-today.jpg" data-options='{"offset":50,"width":700,"height":500,"fitChunk":10}'></div>
    <div class="js-curved-image mx-auto" data-img="/img/training/looi_work_plate_01_job-today.jpg" data-options='{"offset":50,"width":700,"height":500,"fitChunk":10}'></div>
</div>
<script src="/js/curvedImage.js"></script>
</body>
</html>
