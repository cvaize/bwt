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
        .header__link{
            position: relative;
            line-height: 20px;
            display: inline-block;
            padding: 50px 5px;
            z-index: 2;
            color: white;
        }
        .header__link:hover{
            color: white;
        }
        .hover-blob{
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 1;
            transition: all .35s ease-out;
            pointer-events: none;
        }
        .blob{
            position: absolute;
            top: 50%;
            left: 50%;
            border-radius: 100px;
            opacity: 0;
            transition: all .35s ease-out;
            /*transition: background .35s ease-out;*/
            pointer-events: none;
        }
    </style>
</head>
<body>
<div class="mx-auto my-5 d-flex justify-content-center align-items-center" style="width: 400px; height: 400px; background: rgba(0,0,0,0.93);">
    <div class="position-relative">
        <a class="header__link" href="#">
            Dmitry
        </a>
        <div class="hover-blob" style="filter: url('#blob-filter')">
            <div class="blob" style="left: 20%; top: 50%; width: 50px; height: 50px; margin-left: -25px; margin-top: -25px; opacity: 0; background-color: rgb(255, 0, 252); transform: matrix(1, 0, 0, 1, 0, 0);"></div>
            <div class="blob" style="left: 40%; top: 50%; width: 50px; height: 50px; margin-left: -25px; margin-top: -25px; opacity: 0; background-color: rgb(255, 0, 252); transform: matrix(1, 0, 0, 1, 0, 0);"></div>
            <div class="blob" style="left: 60%; top: 50%; width: 50px; height: 50px; margin-left: -25px; margin-top: -25px; opacity: 0; background-color: rgb(255, 0, 252); transform: matrix(1, 0, 0, 1, 0, 0);"></div>
            <div class="blob" style="left: 80%; top: 50%; width: 50px; height: 50px; margin-left: -25px; margin-top: -25px; opacity: 0; background-color: rgb(255, 0, 252); transform: matrix(1, 0, 0, 1, 0, 0);"></div>
        </div>
    </div>
</div>
<svg xmlns="http://www.w3.org/2000/svg" version="1.1"><defs><filter id="blob-filter"><feGaussianBlur in="SourceGraphic" stdDeviation="7" result="blur" /><feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9"  /></filter></defs></svg>
<script src="/js/demo2.js"></script>
</body>
</html>
