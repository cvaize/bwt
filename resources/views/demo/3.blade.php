<!doctype html>
<html lang="{{ app()->getLocale() }}">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>BWT @Welcome@</title>
    <link rel="stylesheet" href="/css/all.css">
    <link rel="stylesheet" href="/css/app.css">
    <link rel="stylesheet" href="/css/demo3.css">

</head>
<body>
<div class="mx-auto my-5 d-flex justify-content-center align-items-center" style="width: 400px; height: 400px; background: rgba(0,0,0,0.93);">
    <div class="position-relative header__item">
        <a class="header__link" href="#">
            Dmitry
        </a>
        <div class="hover-blob" style="filter: url('#blob-filter')">
        </div>
    </div>
</div>
<svg xmlns="http://www.w3.org/2000/svg" version="1.1">
    <defs>
        <filter id="blob-filter">
            <feGaussianBlur in="SourceGraphic" stdDeviation="7" result="blur" />
            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9"  />
        </filter>
    </defs>
</svg>
<script src="/js/demo3.js"></script>
</body>
</html>
