<!doctype html>
<html lang="{{ app()->getLocale() }}">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>BWT @Welcome@</title>
        <link rel="stylesheet" href="/css/all.css">
        <link rel="stylesheet" href="/css/app.css">
        <link rel="stylesheet" href="/css/welcome.css">

    </head>
    <body>
    {{--Отличный вариант на чистом css, но нам не подходит--}}
    {{--<div class="horizontal-scroll-wrapper  rectangles">--}}
        {{--@foreach(range(1, 20) as $item)--}}
        {{--<div class="embed-responsive embed-responsive-1by1">--}}
            {{--<div class="embed-responsive-item" >--}}
                {{--item {{$item}}--}}
            {{--</div>--}}
        {{--</div>--}}
        {{--@endforeach--}}
    {{--</div>--}}
    <style id="js-style-logo">

        /*@keyframes logo__0 {*/
            /*from {*/
                /*top: 0;*/
                /*left: 0px;*/
            /*}*/

            /*50% {*/
                /*top: 30px;*/
                /*left: 0px;*/
            /*}*/

            /*to {*/
                /*top: 30px;*/
                /*left: -15px;*/
            /*}*/
        /*}*/

        /*#logo[data-trigger="0"] #logo__0{*/
            /*-webkit-animation-name: logo__0;*/
            /*animation-name: logo__0;*/
            /*-webkit-animation-duration: .6s;*/
            /*animation-duration: .6s;*/
            /*-webkit-animation-fill-mode: both;*/
            /*animation-fill-mode: both;*/
        /*}*/
    </style>
    <div id="welcome">
        <a href="#" class="logo">
            <h1 id="logo" class="logo">
                Eugene Batyukov Studio
            </h1>
        </a>
        <div id="menu">
            <ul>
                <li>
                    <a href="#">
                        Работы
                    </a>
                </li>
                <li>
                    <a href="#">
                        О нас
                    </a>
                </li>
                <li>
                    <a href="#">
                        Контакты
                    </a>
                </li>
            </ul>
        </div>
        <div id="border" class="border"></div>
        <div id="row">
            @foreach(range(1, 5) as $item)
                <div>
                    <a href="/" class="img-blur__link">
                        <div class="img-cover w-100 h-100 img-blur" data-blur='10' style="background-image: url(/img/welcome/DEM.png);"></div>
                    </a>
                </div>
            @endforeach
        </div>
    </div>
    <script src="/js/welcome.js"></script>
    </body>
</html>
